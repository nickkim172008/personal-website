import { projects } from '@/lib/data'
import ProjectCard from './ProjectCard'
import Reveal from './Reveal'

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-content">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Projects</p>
          <h2 className="mt-2 font-playfair text-3xl font-bold text-ink md:text-4xl">Selected work</h2>
        </Reveal>

        <div className="mt-14 flex flex-col gap-24 md:gap-32">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} reversed={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
