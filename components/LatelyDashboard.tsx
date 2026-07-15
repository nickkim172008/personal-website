import { lately } from '@/lib/data'
import Reveal from './Reveal'
import TrainingCard from './lately/TrainingCard'
import SpotifyCard from './lately/SpotifyCard'
import GuitarCard from './lately/GuitarCard'

export default function LatelyDashboard() {
  return (
    <div>
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">{lately.heading}</p>
      </Reveal>

      <div className="mt-6 flex flex-col gap-6">
        <Reveal delay={0.06}>
          <TrainingCard />
        </Reveal>

        <Reveal delay={0.12}>
          {/*
            Side-by-side only when there's genuinely room: full page width on
            mobile/tablet (>= sm) fits two cards fine, but once the two-column
            About layout kicks in at lg the right column narrows to ~40% of
            the page, so we stack again until xl gives it room to breathe.
          */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <SpotifyCard />
            <GuitarCard />
          </div>
        </Reveal>
      </div>
    </div>
  )
}
