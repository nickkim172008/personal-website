interface Job {
  company: string
  badge: string
  color: string
  role: string
  period: string
  description: string
  current?: boolean
}

const jobs: Job[] = [
  {
    company: 'Appli AI',
    badge: 'AI',
    color: '#7C3AED',
    role: 'Software Engineering Intern',
    period: 'Jun 2026 – Present',
    description: 'Building AI-powered products from the ground up.',
    current: true,
  },
  {
    company: 'Algoverse',
    badge: 'AV',
    color: '#0891B2',
    role: 'ML Research Intern',
    period: 'Jun 2026 – Present',
    description: 'Machine learning research and applied model development.',
    current: true,
  },
  {
    company: 'One2One Tutoring',
    badge: '1:1',
    color: '#EA580C',
    role: 'Founder & Tutor',
    period: 'Sep 2024 – Present',
    description: 'Founded a tutoring business and scaled it to 5-figure profitability.',
    current: true,
  },
  {
    company: 'Hockey Canada',
    badge: 'HC',
    color: '#DC2626',
    role: 'Hockey Referee',
    period: 'Oct 2023 – Mar 2025',
    description: 'Officiated competitive hockey games across multiple age divisions.',
  },
  {
    company: 'City of Toronto',
    badge: 'TO',
    color: '#1D4ED8',
    role: 'Lifeguard',
    period: 'Jun 2023 – Aug 2024',
    description: 'Ensured patron safety at municipal aquatic facilities.',
  },
]

export default function Experience() {
  return (
    <section id="experience" className="px-6 md:px-16 lg:px-24 py-24">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-10 text-[#2C2A27]">
          experience
        </h2>

        <div className="space-y-3">
          {jobs.map(job => (
            <div
              key={`${job.company}-${job.role}`}
              className="flex gap-4 p-5 rounded-xl border border-[#E5E0D8] bg-white/30 hover:bg-white/60 hover:border-[#C8C2B8] transition-all duration-150"
            >
              {/* Company badge */}
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5"
                style={{ backgroundColor: job.color }}
              >
                {job.badge}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                  <span className="font-medium text-[15px] text-[#2C2A27]">{job.role}</span>
                  <span className="text-[#9A9490] text-sm">@</span>
                  <span
                    className="text-[13px] font-medium px-1.5 py-0.5 rounded-md"
                    style={{
                      backgroundColor: `${job.color}18`,
                      color: job.color,
                    }}
                  >
                    {job.company}
                  </span>
                  {job.current && (
                    <span className="text-[10px] bg-[#DCFCE7] text-[#16A34A] px-1.5 py-0.5 rounded-full font-medium">
                      now
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#9A9490] mt-0.5">{job.period}</p>
                <p className="text-sm text-[#4A4540] mt-1.5 leading-relaxed">{job.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
