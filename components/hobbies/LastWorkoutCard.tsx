'use client'

import { ExternalLink, ListChecks } from 'lucide-react'
import { hobbies } from '@/lib/data'
import { useJsonFetch } from '@/lib/useJsonFetch'
import type { HevyDashboardData, WorkoutSet } from '@/lib/hevy'

export default function LastWorkoutCard() {
  const state = useJsonFetch<HevyDashboardData>('/api/hevy')

  return (
    <a
      href={hobbies.training.hevyProfileHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open my latest workouts on Hevy"
      className="block rounded-2xl border border-border bg-surface-raised p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md sm:p-6 md:flex md:h-[410px] md:flex-col md:overflow-hidden"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ListChecks size={16} className="text-accent" aria-hidden="true" />
          <h3 className="font-playfair text-base font-semibold text-ink">Last workout</h3>
        </div>
        <ExternalLink size={14} className="text-ink-faint" aria-hidden="true" />
      </div>

      {state.status === 'loading' && <LastWorkoutSkeleton />}
      {state.status === 'error' && <LastWorkoutUnavailable />}
      {state.status === 'ready' && <LastWorkoutContent data={state.data} />}
    </a>
  )
}

function LastWorkoutContent({ data }: { data: HevyDashboardData }) {
  const workout = data.mostRecent

  if (!workout) {
    return (
      <div className="mt-4">
        <p className="text-sm text-ink-faint">No workouts logged yet.</p>
      </div>
    )
  }

  return (
    <div className="mt-4 md:min-h-0 md:flex-1 md:overflow-y-auto md:pr-2">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-sm font-medium text-ink">{workout.title}</p>
        <p className="flex-shrink-0 text-xs text-ink-faint">
          {formatShortDate(workout.date)} · {workout.durationMinutes} min
        </p>
      </div>

      <ul className="mt-4 space-y-3.5">
        {workout.exercises.map(exercise => (
          <li key={exercise.name}>
            <p className="text-sm font-medium text-ink">{exercise.name}</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {exercise.sets.map((set, i) => (
                <span
                  key={i}
                  className="rounded-md bg-surface px-2 py-1 text-xs text-ink-muted ring-1 ring-inset ring-border"
                >
                  {formatSet(set)}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function formatSet(set: WorkoutSet): string {
  if (set.weightLb !== null && set.reps !== null) return `${formatWeight(set.weightLb)} lb × ${set.reps}`
  if (set.reps !== null) return `${set.reps} reps`
  if (set.durationSeconds !== null) return `${Math.round(set.durationSeconds / 60)} min`
  if (set.distanceMeters !== null) return `${(set.distanceMeters / 1000).toFixed(1)} km`
  return 'Logged'
}

function formatWeight(weightLb: number): string {
  return Number.isInteger(weightLb) ? String(weightLb) : weightLb.toFixed(1)
}

function LastWorkoutSkeleton() {
  return (
    <div className="mt-4 animate-pulse space-y-3.5" role="status" aria-label="Loading last workout">
      <div className="h-4 w-2/3 rounded bg-surface" />
      {[0, 1, 2].map(i => (
        <div key={i} className="space-y-1.5">
          <div className="h-3.5 w-1/2 rounded bg-surface" />
          <div className="flex gap-1.5">
            <div className="h-6 w-14 rounded-md bg-surface" />
            <div className="h-6 w-14 rounded-md bg-surface" />
          </div>
        </div>
      ))}
    </div>
  )
}

function LastWorkoutUnavailable() {
  return (
    <div className="mt-4 rounded-xl border border-dashed border-border px-4 py-6 text-center">
      <p className="text-sm text-ink-muted">Last workout data is unavailable right now.</p>
      <p className="mt-1 text-xs text-ink-faint">Check back soon.</p>
    </div>
  )
}

function formatShortDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
