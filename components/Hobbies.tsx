import Reveal from './Reveal'
import TrainingCard from './hobbies/TrainingCard'
import LastWorkoutCard from './hobbies/LastWorkoutCard'
import GuitarCard from './hobbies/GuitarCard'

export default function Hobbies() {
  return (
    <section id="hobbies" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-content">
        <Reveal>
          <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Hobbies</h2>
        </Reveal>

        <div className="mt-12 grid items-start gap-6 md:grid-cols-3">
          <Reveal delay={0.06}>
            <TrainingCard />
          </Reveal>

          <Reveal delay={0.1}>
            <LastWorkoutCard />
          </Reveal>

          <Reveal delay={0.14}>
            <GuitarCard />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
