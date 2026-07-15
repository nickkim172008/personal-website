'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'
import { work } from '@/lib/data'
import Reveal from './Reveal'

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.75', 'end 0.4'],
  })
  const lineHeight = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })

  return (
    <section id="work" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-content">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Work</p>
          <h2 className="mt-2 font-playfair text-3xl font-bold text-ink md:text-4xl">Experience</h2>
        </Reveal>

        <div ref={sectionRef} className="relative mt-14">
          {/* Track */}
          <div className="absolute left-[7px] top-1 h-full w-px bg-border md:left-[7px]" aria-hidden="true" />
          {/* Progressive draw */}
          <motion.div
            className="absolute left-[7px] top-1 w-px origin-top bg-accent md:left-[7px]"
            style={{
              height: '100%',
              scaleY: shouldReduceMotion ? 1 : lineHeight,
            }}
            aria-hidden="true"
          />

          <ol className="flex flex-col gap-14">
            {work.map((entry, i) => (
              <li key={`${entry.organization}-${entry.title}`} className="relative pl-8">
                <span
                  className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-accent bg-surface"
                  aria-hidden="true"
                />
                <Reveal delay={i * 0.05}>
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                    {entry.organizationHref ? (
                      <a
                        href={entry.organizationHref}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
                        aria-label={`${entry.title} at ${entry.organization} — visit website`}
                      >
                        <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md border border-border bg-white">
                          <Image src={entry.logo} alt="" fill sizes="36px" className="object-contain p-1" />
                        </span>
                        <h3 className="font-playfair text-xl font-semibold text-ink transition-colors group-hover:text-accent">
                          {entry.title} <span className="font-sans text-base font-normal text-ink-faint">at</span>{' '}
                          <span className="underline decoration-border underline-offset-4 group-hover:decoration-accent">
                            {entry.organization}
                          </span>
                        </h3>
                      </a>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md border border-border bg-white">
                          <Image src={entry.logo} alt={entry.logoAlt} fill sizes="36px" className="object-contain p-1" />
                        </span>
                        <h3 className="font-playfair text-xl font-semibold text-ink">
                          {entry.title} <span className="font-sans text-base font-normal text-ink-faint">at</span>{' '}
                          {entry.organization}
                        </h3>
                      </div>
                    )}
                    <span className="text-sm text-ink-faint">{entry.dates}</span>
                  </div>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-muted md:text-base">
                    {entry.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {entry.tags.map(tag => (
                      <span
                        key={tag}
                        className="rounded-full bg-surface-raised px-3 py-1 text-xs text-ink-muted ring-1 ring-inset ring-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
