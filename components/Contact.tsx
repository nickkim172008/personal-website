'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Github, Linkedin, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { contact, socialLinks } from '@/lib/data'
import Reveal from './Reveal'
import XBrandIcon from './XBrandIcon'

const fieldClassName =
  'mt-2 w-full rounded-xl border border-border bg-surface-raised px-4 py-3.5 text-base text-ink shadow-sm outline-none transition placeholder:text-ink-faint hover:border-ink-faint focus:border-accent focus:ring-2 focus:ring-accent/20'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function Contact() {
  const iconFor = { github: Github, linkedin: Linkedin, x: XBrandIcon } as const
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>

    setStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const body = await res.json()

      if (!res.ok) {
        setStatus('error')
        setErrorMessage(body.error ?? 'Something went wrong. Please try again.')
        return
      }

      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <section id="contact" className="border-t border-border px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-content">
        <Reveal>
          <div className="max-w-4xl">
            <div className="flex items-center gap-5">
              <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Contact</h2>
              <div className="flex items-center gap-4 text-ink-muted">
                {socialLinks.map(link => {
                  const Icon = iconFor[link.icon]
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="transition-colors duration-150 hover:text-accent"
                    >
                      <Icon size={20} />
                    </a>
                  )
                })}
              </div>
            </div>
            <p className="mt-6 text-lg leading-8 text-ink-muted md:text-xl md:leading-9">
              {contact.invitation}
            </p>
          </div>

          <div className="my-12 flex justify-center md:my-16">
            <div className="relative aspect-square w-52 overflow-hidden rounded-full ring-1 ring-border md:w-64">
              <Image
                src={contact.portraitSrc}
                alt={contact.portraitAlt}
                fill
                sizes="(min-width: 768px) 256px, 208px"
                className="object-cover"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="contact-name" className="text-sm font-medium text-ink">
                Full Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Full name"
                className={fieldClassName}
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="text-sm font-medium text-ink">
                Email Address
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className={fieldClassName}
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="text-sm font-medium text-ink">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={7}
                placeholder="Type your message"
                className={`${fieldClassName} resize-y`}
              />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-surface transition-transform duration-150 hover:scale-[1.03] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
              >
                {status === 'submitting' ? (
                  <>
                    Sending
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    {contact.submitLabel}
                    <Send size={16} aria-hidden="true" />
                  </>
                )}
              </button>

              {status === 'success' && (
                <p className="flex items-center gap-1.5 text-sm font-medium text-ink" role="status">
                  <CheckCircle2 size={16} className="text-accent" aria-hidden="true" />
                  Message sent — I'll get back to you soon.
                </p>
              )}

              {status === 'error' && (
                <p className="flex items-center gap-1.5 text-sm font-medium text-ink" role="alert">
                  <AlertCircle size={16} className="text-red-500" aria-hidden="true" />
                  {errorMessage}
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
