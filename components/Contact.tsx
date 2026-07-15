import Image from 'next/image'
import { Send } from 'lucide-react'
import { contact, site } from '@/lib/data'
import Reveal from './Reveal'

const fieldClassName =
  'mt-2 w-full rounded-xl border border-border bg-surface-raised px-4 py-3.5 text-base text-ink shadow-sm outline-none transition placeholder:text-ink-faint hover:border-ink-faint focus:border-accent focus:ring-2 focus:ring-accent/20'

export default function Contact() {
  return (
    <section id="contact" className="border-t border-border px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-content">
        <Reveal>
          <div className="max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Contact</p>
            <h2 className="mt-2 font-playfair text-4xl font-bold text-ink md:text-5xl">
              {contact.heading}
            </h2>
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

          <form
            action={`mailto:${site.email}`}
            method="post"
            encType="text/plain"
            className="space-y-6"
          >
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

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-surface transition-transform duration-150 hover:scale-[1.03] active:scale-[0.98]"
            >
              {contact.submitLabel}
              <Send size={16} aria-hidden="true" />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
