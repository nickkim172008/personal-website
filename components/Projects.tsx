interface Project {
  title: string
  description: string
  tags: string[]
  badge?: string
  badgeColor?: string
  collaborators?: string[]
  accentColor?: string
  placeholder?: true
}

const projects: Project[] = [
  {
    title: 'nomad',
    description:
      'blockchain passport system for AI agent identity and permission management. agents carry a cryptographic passport that governs what they can access and do across any system.',
    tags: ['Solana', 'TypeScript', 'AI Agents', 'Blockchain'],
    badge: '🏆 Best Use of Solana · JAMHacks',
    badgeColor: '#9945FF',
    collaborators: ['Michael Mazilu', 'Eric Chen', 'Hansen Lou'],
    accentColor: '#9945FF',
  },
  {
    title: 'your project here',
    description: '',
    tags: [],
    placeholder: true,
  },
  {
    title: 'your project here',
    description: '',
    tags: [],
    placeholder: true,
  },
]

function Tag({ label, color }: { label: string; color?: string }) {
  if (color) {
    return (
      <span
        className="text-xs px-2 py-0.5 rounded-full border font-medium"
        style={{
          backgroundColor: `${color}15`,
          borderColor: `${color}30`,
          color,
        }}
      >
        {label}
      </span>
    )
  }
  return (
    <span className="text-xs px-2 py-0.5 rounded-full border border-[#E5E0D8] bg-[#F5F2EE] text-[#7A7570]">
      {label}
    </span>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="px-6 md:px-16 lg:px-24 py-24">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-10 text-[#2C2A27]">
          projects
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) =>
            project.placeholder ? (
              <div
                key={i}
                className="rounded-xl border-2 border-dashed border-[#E5E0D8] p-6 flex items-center justify-center min-h-[220px] text-[#C8C2B8] text-sm font-medium"
              >
                coming soon
              </div>
            ) : (
              <div
                key={project.title}
                className="rounded-xl border border-[#E5E0D8] bg-white/40 p-6 flex flex-col gap-3 hover:bg-white/70 hover:border-[#C8C2B8] transition-all duration-150"
              >
                {project.badge && (
                  <div
                    className="text-[11px] font-medium px-2.5 py-1 rounded-lg w-fit"
                    style={{
                      backgroundColor: `${project.badgeColor}15`,
                      color: project.badgeColor,
                    }}
                  >
                    {project.badge}
                  </div>
                )}

                <h3 className="font-playfair text-2xl font-bold text-[#2C2A27]">
                  {project.title}
                </h3>

                <p className="text-sm text-[#4A4540] leading-relaxed flex-1">
                  {project.description}
                </p>

                {project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map(tag => (
                      <Tag key={tag} label={tag} color={project.accentColor} />
                    ))}
                  </div>
                )}

                {project.collaborators && (
                  <p className="text-xs text-[#9A9490]">
                    with {project.collaborators.join(', ')}
                  </p>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}
