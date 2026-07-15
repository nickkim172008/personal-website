import { about } from '@/lib/data'
import Image from 'next/image'
import Reveal from './Reveal'

function AboutParagraph({ text }: { text: string }) {
  const universityName = about.waterloo.name
  const parts = text.split(universityName)

  if (parts.length === 1) return <>{text}</>

  return (
    <>
      {parts[0]}
      <a
        href={about.waterloo.href}
        target="_blank"
        rel="noreferrer"
        className="group mx-1 font-medium text-ink underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <span className="relative mr-1.5 inline-block h-6 w-6 align-middle">
          <Image src={about.waterloo.logo} alt="" fill sizes="24px" className="object-contain" />
        </span>
        {universityName}
      </a>
      {parts[1]}
    </>
  )
}

export default function About() {
  return (
    <section id="about" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-content">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">{about.heading}</p>
        </Reveal>

        <div className="mt-8 max-w-2xl">
          {about.paragraphs.map((paragraph, i) => (
            <Reveal key={paragraph} delay={i * 0.08}>
              <p className="mt-4 text-base leading-7 text-ink-muted first:mt-0 md:text-lg">
                <AboutParagraph text={paragraph} />
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.16}>
            <div className="mt-10">
              <h3 className="font-playfair text-lg font-semibold text-ink">Technical interests</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink-muted">
                {about.technicalInterests.map(interest => (
                  <li key={interest} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                    {interest}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-8 flex flex-wrap gap-2">
              {about.tags.map(tag => (
                <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-ink-muted">
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
