'use client'

import Image from 'next/image'
import { ExternalLink, Github } from 'lucide-react'
import type { Project } from '@/lib/data'
import Reveal from './Reveal'

interface ProjectCardProps {
  project: Project
  reversed?: boolean
}

export default function ProjectCard({ project, reversed = false }: ProjectCardProps) {
  const imageSizes = '(min-width: 1024px) 42rem, 100vw'

  return (
    <div
      className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14 ${
        reversed ? 'lg:[&>*:first-child]:order-2' : ''
      }`}
    >
      <Reveal y={32}>
        {project.imageHref || project.demoHref ? (
          <a
            href={project.imageHref ?? project.demoHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title}`}
            className="group relative block aspect-[16/11] overflow-hidden rounded-2xl border border-border bg-surface-raised shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-surface"
          >
            <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-[1.02]">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes={imageSizes}
                className="object-cover"
              />
            </div>
          </a>
        ) : (
          <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-border bg-surface-raised shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md">
          <div className="absolute inset-0">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes={imageSizes}
              className="object-cover"
            />
          </div>
          </div>
        )}
      </Reveal>

      <Reveal delay={0.1}>
        <div>
          <h3 className="font-playfair text-3xl font-bold text-ink md:text-4xl">{project.title}</h3>
          <p className="mt-4 max-w-xl text-sm leading-6 text-ink-muted md:text-base">{project.description}</p>
          {project.result && <p className="mt-3 text-sm font-medium text-ink">{project.result}</p>}

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
