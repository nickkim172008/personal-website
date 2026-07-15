'use client'

import { Dumbbell, ExternalLink } from 'lucide-react'
import { hobbies } from '@/lib/data'
import { useJsonFetch } from '@/lib/useJsonFetch'
import type { HevyDashboardData } from '@/lib/hevy'
import CalendarGrid from './CalendarGrid'

export default function TrainingCard() {
  const state = useJsonFetch<HevyDashboardData>('/api/hevy')

  return (
    <a
      href={hobbies.training.hevyProfileHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={hobbies.training.profileLinkLabel}
      className="block rounded-2xl border border-border bg-surface-raised p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md sm:p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Dumbbell size={16} className="text-accent" aria-hidden="true" />
          <h3 className="font-playfair text-base font-semibold text-ink">{hobbies.training.heading}</h3>
        </div>
        <span className="text-ink-faint" aria-hidden="true">
          <ExternalLink size={14} aria-hidden="true" />
        </span>
      </div>

      {state.status === 'loading' && <TrainingSkeleton />}
      {state.status === 'error' && <TrainingUnavailable />}
      {state.status === 'ready' && <TrainingContent data={state.data} />}
    </a>
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
          <dd className="mt-1 font-playfair text-lg font-semibold text-ink">
            {data.streakDays}d <span aria-hidden="true">🔥</span>
          </dd>
        </div>
        <div className="rounded-xl bg-surface px-2 py-2.5">
          <dt className="text-[11px] uppercase tracking-wide text-ink-faint">This week</dt>
          <dd className="mt-1 font-playfair text-lg font-semibold text-ink">{data.workoutsThisWeek}</dd>
          <dd className="text-[10px] text-ink-faint">workouts</dd>
        </div>
        <div className="rounded-xl bg-surface px-2 py-2.5">
          <dt className="text-[11px] uppercase tracking-wide text-ink-faint">This month</dt>
          <dd className="mt-1 font-playfair text-lg font-semibold text-ink">{data.workoutsThisMonth}</dd>
          <dd className="text-[10px] text-ink-faint">workouts</dd>
        </div>
      </dl>
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
