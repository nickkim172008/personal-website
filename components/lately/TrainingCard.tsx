'use client'

import { Dumbbell, ExternalLink } from 'lucide-react'
import { lately } from '@/lib/data'
import { useJsonFetch } from '@/lib/useJsonFetch'
import type { HevyDashboardData } from '@/lib/hevy'
import CalendarGrid from './CalendarGrid'

export default function TrainingCard() {
  const state = useJsonFetch<HevyDashboardData>('/api/hevy')

  return (
    <div className="rounded-2xl border border-border bg-surface-raised p-5 shadow-sm transition-colors duration-200 hover:border-accent/40 sm:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Dumbbell size={16} className="text-accent" aria-hidden="true" />
          <h3 className="font-playfair text-base font-semibold text-ink">{lately.training.heading}</h3>
        </div>
        <a
          href={lately.training.hevyProfileHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={lately.training.profileLinkLabel}
          className="text-ink-faint transition-colors duration-150 hover:text-accent"
        >
          <ExternalLink size={14} aria-hidden="true" />
        </a>
      </div>

      {state.status === 'loading' && <TrainingSkeleton />}
      {state.status === 'error' && <TrainingUnavailable />}
      {state.status === 'ready' && <TrainingContent data={state.data} />}
    </div>
  )
}

function TrainingContent({ data }: { data: HevyDashboardData }) {
  return (
    <div className="mt-4">
      {!data.live && (
        <span className="mb-3 inline-block rounded-full bg-accent-soft px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-accent">
          Preview data
        </span>
      )}

      <CalendarGrid days={data.calendar} />

      <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl bg-surface px-2 py-2.5">
          <dt className="text-[11px] uppercase tracking-wide text-ink-faint">Streak</dt>
          <dd className="mt-1 font-playfair text-lg font-semibold text-ink">{data.streakDays}d</dd>
        </div>
        <div className="rounded-xl bg-surface px-2 py-2.5">
          <dt className="text-[11px] uppercase tracking-wide text-ink-faint">This week</dt>
          <dd className="mt-1 font-playfair text-lg font-semibold text-ink">{data.workoutsThisWeek}</dd>
        </div>
        <div className="rounded-xl bg-surface px-2 py-2.5">
          <dt className="text-[11px] uppercase tracking-wide text-ink-faint">This month</dt>
          <dd className="mt-1 font-playfair text-lg font-semibold text-ink">{data.workoutsThisMonth}</dd>
        </div>
      </dl>

      <div className="mt-4 border-t border-border pt-4">
        {data.mostRecent ? (
          <>
            <div className="flex items-baseline justify-between gap-2">
              <p className="truncate text-sm font-medium text-ink">{data.mostRecent.title}</p>
              <p className="flex-shrink-0 text-xs text-ink-faint">{formatShortDate(data.mostRecent.date)}</p>
            </div>
            <p className="mt-1 text-xs leading-5 text-ink-muted">
              {data.mostRecent.durationMinutes} min · {data.mostRecent.exerciseSummary}
            </p>
          </>
        ) : (
          <p className="text-sm text-ink-faint">No workouts logged yet.</p>
        )}
      </div>
    </div>
  )
}

function TrainingSkeleton() {
  return (
    <div className="mt-4 animate-pulse space-y-4" role="status" aria-label="Loading training data">
      <div className="h-24 rounded-xl bg-surface" />
      <div className="grid grid-cols-3 gap-2">
        <div className="h-14 rounded-xl bg-surface" />
        <div className="h-14 rounded-xl bg-surface" />
        <div className="h-14 rounded-xl bg-surface" />
      </div>
      <div className="h-10 rounded-xl bg-surface" />
    </div>
  )
}

function TrainingUnavailable() {
  return (
    <div className="mt-4 rounded-xl border border-dashed border-border px-4 py-6 text-center">
      <p className="text-sm text-ink-muted">Training data is unavailable right now.</p>
      <p className="mt-1 text-xs text-ink-faint">Check back soon.</p>
    </div>
  )
}

function formatShortDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
