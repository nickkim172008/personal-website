'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import type { Project } from '@/lib/data'
import Reveal from './Reveal'

interface ProjectCardProps {
  project: Project
  reversed?: boolean
}

export default function ProjectCard({ project, reversed = false }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [shouldReduceMotion ? 0 : -24, shouldReduceMotion ? 0 : 24])

  const imageSizes = project.featured
    ? '(min-width: 1024px) 42rem, 100vw'
    : '(min-width: 1024px) 32rem, 100vw'

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 items-center gap-8 lg:gap-14 ${
        project.featured
          ? 'lg:grid-cols-[1.15fr_1fr]'
          : `lg:grid-cols-2 ${reversed ? 'lg:[&>*:first-child]:order-2' : ''}`
      }`}
    >
      <Reveal y={32}>
        {project.demoHref ? (
          <a
            href={project.demoHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title} live demo`}
            className={`group relative block overflow-hidden rounded-2xl border border-border bg-surface-raised shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-surface ${
              project.featured ? 'aspect-[16/11]' : 'aspect-[16/10]'
            }`}
          >
            <motion.div style={{ y: parallaxY }} className="absolute inset-0 transition-transform duration-300 group-hover:scale-[1.02]">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes={imageSizes}
                className="object-cover"
              />
            </motion.div>
          </a>
        ) : (
          <div
          className={`relative overflow-hidden rounded-2xl border border-border bg-surface-raised shadow-sm ${
            project.featured ? 'aspect-[16/11]' : 'aspect-[16/10]'
          }`}
        >
          <motion.div style={{ y: parallaxY }} className="absolute inset-0">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes={imageSizes}
              className="object-cover"
            />
          </motion.div>
          </div>
        )}
      </Reveal>

      <Reveal delay={0.1}>
        <div className={project.featured ? '' : ''}>
          {project.featured && (
            <span className="mb-3 inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-medium uppercase tracking-wide text-accent">
              Featured
            </span>
          )}
          <h3 className={`font-playfair font-bold text-ink ${project.featured ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>
            {project.title}
          </h3>
          <p className="mt-4 max-w-xl text-sm leading-6 text-ink-muted md:text-base">{project.description}</p>
          <p className="mt-3 text-sm font-medium text-ink">{project.result}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="rounded-full bg-surface-raised px-3 py-1 text-xs text-ink-muted ring-1 ring-inset ring-border"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-5">
            {project.demoHref && (
              <a
                href={project.demoHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium text-ink transition-colors duration-150 hover:text-accent"
              >
                <ExternalLink size={15} aria-hidden="true" />
                {project.demoLabel ?? 'Live demo'}
              </a>
            )}
            {project.sourceHref && (
              <a
                href={project.sourceHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium text-ink transition-colors duration-150 hover:text-accent"
              >
                <Github size={15} aria-hidden="true" />
                {project.sourceLabel ?? 'Source'}
              </a>
            )}
            {project.devpostHref && (
              <a
                href={project.devpostHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium text-ink transition-colors duration-150 hover:text-accent"
              >
                <ExternalLink size={15} aria-hidden="true" />
                Devpost
              </a>
            )}
          </div>
        </div>
      </Reveal>
    </div>
  )
}
