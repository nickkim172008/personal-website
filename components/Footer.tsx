import { footer, socialLinks } from '@/lib/data'

const resume = socialLinks.find(l => l.icon === 'resume')

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-content flex-col items-center gap-6 text-center">
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
