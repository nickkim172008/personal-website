import { Suspense } from 'react'
import HevyWidget from './HevyWidget'

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.12 8.12 0 004.74 1.51V6.74a4.85 4.85 0 01-.97-.05z" />
    </svg>
  )
}

const education = [
  {
    school: 'University of Waterloo',
    shortName: 'UW',
    degree: 'BASc Management Engineering, Co-op',
    period: 'Fall 2026',
    note: 'incoming student',
    color: '#D4AC0D',
    bgColor: '#FEF9E7',
  },
  {
    school: 'Bishop Allen Academy',
    shortName: 'BA',
    degree: 'Ontario Secondary School Diploma',
    period: '2022 – 2026',
    note: '98.5% avg · Game Dev Club founder · Varsity Hockey & Golf · Math Club · Peer Tutor · Camp Muskoka Councillor',
    color: '#1D4ED8',
    bgColor: '#EFF6FF',
  },
]

export default function About() {
  return (
    <section id="about" className="px-6 md:px-16 lg:px-24 py-24">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-10 text-[#2C2A27]">
          about
        </h2>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          {/* Left: bio + tiktok */}
          <div>
            <p className="text-[#4A4540] leading-relaxed text-[15px]">
              hey, i&apos;m nick — an incoming management engineering student at waterloo (fall 2026).
              i spend my time building software, thinking about markets, and getting outside.
            </p>
            <p className="text-[#4A4540] leading-relaxed text-[15px] mt-3">
              when i&apos;m not at a keyboard, you&apos;ll find me on the golf course, the hockey rink, or
              noodling on guitar. i keep a close eye on the markets and have a soft spot for a good trade thesis.
            </p>

            {/* TikTok card */}
            <a
              href="YOUR_TIKTOK_URL"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-3 px-4 py-3 rounded-xl border border-[#E5E0D8] hover:border-[#C8C2B8] hover:bg-white/40 transition-all duration-150 group"
            >
              <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center flex-shrink-0">
                <TikTokIcon />
              </div>
              <div>
                <p className="text-sm font-medium text-[#2C2A27] group-hover:text-[#1A1816] transition-colors">
                  i post guitar covers on tiktok
                </p>
                <p className="text-xs text-[#9A9490]">@nick · tiktok</p>
              </div>
            </a>
          </div>

          {/* Right: education */}
          <div className="space-y-3">
            {education.map(edu => (
              <div
                key={edu.school}
                className="p-4 rounded-xl border border-[#E5E0D8] bg-white/40"
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span
                    className="inline-flex items-center justify-center w-7 h-7 rounded-md text-white text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: edu.color }}
                  >
                    {edu.shortName}
                  </span>
                  <span className="font-medium text-sm text-[#2C2A27]">{edu.school}</span>
                </div>
                <p className="text-xs text-[#9A9490] mb-1">{edu.degree} · {edu.period}</p>
                <p className="text-xs text-[#5A5550] leading-relaxed">{edu.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hevy widget — fetches server-side, streams independently */}
        <Suspense
          fallback={
            <div className="mt-10 h-48 rounded-xl bg-[#F0EDE8] animate-pulse" />
          }
        >
          <HevyWidget />
        </Suspense>
      </div>
    </section>
  )
}
