import { ArrowLeft, ArrowRight } from 'lucide-react'
import { footer, webring, socialLinks } from '@/lib/data'

const resume = socialLinks.find(l => l.icon === 'resume')

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-content flex-col items-center gap-6 text-center">
        <nav aria-label="UW CS Webring" className="flex items-center gap-4 text-sm text-ink-muted">
          <a
            href={webring.prevHref}
            className="flex items-center gap-1 transition-colors duration-150 hover:text-ink"
            rel="noopener noreferrer"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Prev
          </a>
          <a
            href={webring.homeHref}
            className="transition-colors duration-150 hover:text-ink"
            rel="noopener noreferrer"
          >
            {webring.name}
          </a>
          <a
            href={webring.nextHref}
            className="flex items-center gap-1 transition-colors duration-150 hover:text-ink"
            rel="noopener noreferrer"
          >
            Next
            <ArrowRight size={14} aria-hidden="true" />
          </a>
        </nav>

        <div className="flex flex-col items-center gap-1 text-xs text-ink-faint">
          <p>
            {footer.attribution}{' '}
            {resume && (
              <>
                {'· '}
                <a href={resume.href} className="underline decoration-border underline-offset-4 hover:text-ink">
                  Résumé
                </a>
              </>
            )}
          </p>
          <p>{footer.lastUpdated}</p>
        </div>
      </div>
    </footer>
  )
}
