import { lately } from '@/lib/data'
import Reveal from './Reveal'
import TrainingCard from './lately/TrainingCard'
import LastWorkoutCard from './lately/LastWorkoutCard'
import SpotifyCard from './lately/SpotifyCard'
import GuitarCard from './lately/GuitarCard'

export default function Personal() {
  return (
    <section id="personal" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-content">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Personal</p>
          <h2 className="mt-2 font-playfair text-3xl font-bold text-ink md:text-4xl">{lately.heading}</h2>
        </Reveal>

        <div className="mx-auto mt-12 max-w-2xl">
          <Reveal delay={0.06}>
            <TrainingCard />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-6">
              <LastWorkoutCard />
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <SpotifyCard />
              <GuitarCard />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
