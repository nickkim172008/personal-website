'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { hero } from '@/lib/data'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

function scrollToId(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const variants = shouldReduceMotion ? undefined : container
  const childVariants = shouldReduceMotion ? undefined : item

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center md:px-10"
    >
      {/* Subtle animated background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-accent-soft opacity-60 blur-3xl motion-safe:animate-blob-move" />
        <div
          className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-accent-soft opacity-40 blur-3xl motion-safe:animate-blob-move"
          style={{ animationDelay: '-9s' }}
        />
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={variants}
        className="flex max-w-2xl flex-col items-center"
      >
        <motion.div variants={childVariants} className="mb-8">
          <div className="relative h-32 w-32 overflow-hidden rounded-full border border-border bg-surface-raised shadow-sm md:h-36 md:w-36">
            <Image
              src="/images/portrait-placeholder.svg"
              alt={hero.portraitAlt}
              fill
              sizes="144px"
              priority
              className="object-cover"
            />
          </div>
        </motion.div>

        <motion.p variants={childVariants} className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
          {hero.greeting}
        </motion.p>

        <motion.h1
          variants={childVariants}
          className="mt-3 font-playfair text-5xl font-bold tracking-tight text-ink md:text-7xl"
        >
          {hero.name}
        </motion.h1>

        <motion.p variants={childVariants} className="mt-5 max-w-lg text-base leading-7 text-ink-muted md:text-lg">
          {hero.tagline}
        </motion.p>

        <motion.div variants={childVariants} className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href={hero.primaryCta.href}
            onClick={e => {
              e.preventDefault()
              scrollToId(hero.primaryCta.href)
            }}
            className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-surface transition-transform duration-150 hover:scale-[1.03] active:scale-[0.98]"
          >
            {hero.primaryCta.label}
          </a>
          <a
            href={hero.secondaryCta.href}
            className="rounded-full border border-border px-6 py-3 text-sm font-medium text-ink transition-colors duration-150 hover:border-accent hover:text-accent"
          >
            {hero.secondaryCta.label}
          </a>
        </motion.div>
      </motion.div>

      <a
        href="#about"
        onClick={e => {
          e.preventDefault()
          scrollToId('#about')
        }}
        aria-label="Scroll to About section"
        className="absolute bottom-10 flex flex-col items-center gap-2 text-ink-faint transition-colors duration-150 hover:text-ink"
      >
        <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
        <ArrowDown size={16} className="motion-safe:animate-bounce" aria-hidden="true" />
      </a>
    </section>
  )
}
