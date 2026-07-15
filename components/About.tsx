import Image from 'next/image'
import { about } from '@/lib/data'
import Reveal from './Reveal'

export default function About() {
  return (
    <section id="about" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-content">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">{about.heading}</p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1fr)_18rem] md:gap-16">
          <div>
            {about.paragraphs.map((paragraph, i) => (
              <Reveal key={paragraph} delay={i * 0.08}>
                <p className="mt-4 max-w-2xl text-base leading-7 text-ink-muted first:mt-0 md:text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.16}>
              <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
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
                <div>
                  <h3 className="font-playfair text-lg font-semibold text-ink">Personal interests</h3>
                  <ul className="mt-3 space-y-2 text-sm text-ink-muted">
                    {about.personalInterests.map(interest => (
                      <li key={interest} className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                        {interest}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-8 flex flex-wrap gap-2">
                {about.tags.map(tag => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 text-xs text-ink-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="order-first md:order-last">
            <div className="relative aspect-[4/5] w-full max-w-xs overflow-hidden rounded-2xl border border-border bg-surface-raised shadow-sm md:max-w-none">
              <Image
                src="/images/about-placeholder.svg"
                alt={about.portraitAlt}
                fill
                sizes="(min-width: 768px) 18rem, 20rem"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
