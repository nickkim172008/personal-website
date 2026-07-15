import { Github, Linkedin, Mail } from 'lucide-react'
import { contact, site, socialLinks } from '@/lib/data'
import Reveal from './Reveal'

const github = socialLinks.find(l => l.icon === 'github')
const linkedin = socialLinks.find(l => l.icon === 'linkedin')

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-content text-center">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Contact</p>
          <h2 className="mt-2 font-playfair text-3xl font-bold text-ink md:text-4xl">{contact.heading}</h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-ink-muted md:text-lg">
            {contact.invitation}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-surface transition-transform duration-150 hover:scale-[1.03] active:scale-[0.98]"
            >
              <Mail size={16} aria-hidden="true" />
              {contact.emailCta}
            </a>

            {github && (
              <a
                href={github.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-ink transition-colors duration-150 hover:border-accent hover:text-accent"
              >
                <Github size={16} aria-hidden="true" />
                GitHub
              </a>
            )}

            {linkedin && (
              <a
                href={linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-ink transition-colors duration-150 hover:border-accent hover:text-accent"
              >
                <Linkedin size={16} aria-hidden="true" />
                LinkedIn
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
