interface RecentItem {
  name: string
  badge: string
  color: string
  role: string
  period: string
}

const recentItems: RecentItem[] = [
  {
    name: 'appli ai',
    badge: 'AI',
    color: '#7C3AED',
    role: 'software engineering intern',
    period: 'jun 2026 – present',
  },
  {
    name: 'algoverse',
    badge: 'AV',
    color: '#0891B2',
    role: 'ml research intern',
    period: 'jun 2026 – present',
  },
  {
    name: 'university of waterloo',
    badge: 'UW',
    color: '#D4AC0D',
    role: 'management engineering',
    period: 'fall 2026',
  },
]

export default function Hero() {
  return (
    <section id="hero" className="px-6 pb-16 pt-36 md:px-16 md:pb-24 md:pt-44 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <h1 className="font-playfair text-5xl font-bold tracking-tight text-[#2C2A27] md:text-6xl">
            hey, i&apos;m nick.
          </h1>

          <p className="mt-6 max-w-xl text-[16px] leading-7 text-[#4A4540] md:text-[17px]">
            i&apos;m an incoming management engineering student at the university of waterloo. i like
            building useful software, exploring machine learning, and turning ambitious ideas into
            things people can actually use.
          </p>
          <p className="mt-3 max-w-xl text-[16px] leading-7 text-[#4A4540] md:text-[17px]">
            currently building at <span className="font-medium text-[#2C2A27]">appli ai</span> and
            researching at <span className="font-medium text-[#2C2A27]">algoverse</span>.
          </p>

          <div className="mt-10">
            <h2 className="font-playfair text-2xl font-semibold text-[#2C2A27]">recently:</h2>

            <div className="mt-3 space-y-2.5">
              {recentItems.map(item => (
                <div
                  key={item.name}
                  className="flex items-center gap-3 rounded-xl border border-[#E5E0D8] bg-white/30 p-3 transition-colors duration-150 hover:border-[#C8C2B8] hover:bg-white/60"
                >
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.badge}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-medium text-[#2C2A27]">{item.name}</p>
                    <p className="truncate text-sm text-[#7A7570]">{item.role}</p>
                  </div>

                  <p className="hidden flex-shrink-0 text-sm text-[#9A9490] sm:block">{item.period}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
