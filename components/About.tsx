import { about } from '@/lib/data'
import Image from 'next/image'
import Reveal from './Reveal'
import PhotoStack from './PhotoStack'

const taggedMentions = [about.waterloo, about.appliAI]
const mentionPattern = new RegExp(`(${taggedMentions.map(m => m.name).join('|')})`, 'g')

function AboutParagraph({ text }: { text: string }) {
  const segments = text.split(mentionPattern)

  return (
    <>
      {segments.map((segment, i) => {
        const mention = taggedMentions.find(m => m.name === segment)
        if (!mention) return <span key={i}>{segment}</span>

        return (
          <a
            key={i}
            href={mention.href}
            target="_blank"
            rel="noreferrer"
            className="group mx-1 whitespace-nowrap font-medium text-ink underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span className="relative mr-1.5 inline-block h-6 w-6 align-middle">
              <Image src={mention.logo} alt="" fill sizes="24px" className="object-contain" />
            </span>
            {mention.name}
          </a>
        )
      })}
    </>
  )
}

export default function About() {
  return (
    <section id="about" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-content">
        <Reveal>
          <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-accent">{about.heading}</h2>
        </Reveal>

        <div className="mt-8 flex flex-col gap-12 md:flex-row md:items-start md:justify-between md:gap-10">
          <div className="max-w-2xl">
            {about.paragraphs.map((paragraph, i) => (
              <Reveal key={paragraph} delay={i * 0.08}>
                <p className={`${i === 0 ? '' : 'mt-6'} text-lg leading-8 text-ink-muted md:text-xl`}>
                  <AboutParagraph text={paragraph} />
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.16}>
              <div className="mt-10">
                <h3 className="font-playfair text-lg font-semibold text-ink">{about.exploring.heading}</h3>
                <ul className="mt-3 space-y-2 text-sm text-ink-muted">
                  {about.exploring.items.map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="self-center md:shrink-0 md:self-start">
            <PhotoStack />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
