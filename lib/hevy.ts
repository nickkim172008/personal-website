import { lately } from './data'

// Server-only module: reads HEVY_API_KEY from the environment and talks to
// the Hevy API. Never import this from a client component — it is only ever
// called from app/api/hevy/route.ts, which keeps the key on the server.

export interface CalendarDay {
  date: string // ISO yyyy-mm-dd
  didWorkout: boolean
}

export interface WorkoutSet {
  weightLb: number | null
  reps: number | null
  durationSeconds: number | null
  distanceMeters: number | null
}

export interface WorkoutExercise {
  name: string
  sets: WorkoutSet[]
}

export interface HevyDashboardData {
  live: boolean
  streakDays: number
  workoutsThisWeek: number
  workoutsThisMonth: number
  calendar: CalendarDay[]
  mostRecent: {
    title: string
    date: string
    durationMinutes: number
    exerciseSummary: string
    exercises: WorkoutExercise[]
  } | null
}

interface HevyRawSet {
  type?: string
  weight_kg?: number | null
  reps?: number | null
  duration_seconds?: number | null
  distance_meters?: number | null
}

interface HevyRawExercise {
  title?: string
  sets?: HevyRawSet[]
}

interface HevyRawWorkout {
  title?: string
  start_time: string
  end_time?: string
  exercises?: HevyRawExercise[]
}

const KG_TO_LB = 2.20462262

function kgToLb(kg: number): number {
  return Math.round(kg * KG_TO_LB * 2) / 2
}

const HEVY_API_BASE = 'https://api.hevyapp.com/v1'

export async function getHevyDashboard(): Promise<HevyDashboardData> {
  const apiKey = process.env.HEVY_API_KEY

  if (!apiKey) {
    return buildPlaceholderDashboard()
  }

  try {
    const workouts = await fetchRecentWorkouts(apiKey)
    return buildDashboardFromWorkouts(workouts)
  } catch {
    return buildPlaceholderDashboard()
  }
}

async function fetchRecentWorkouts(apiKey: string): Promise<HevyRawWorkout[]> {
  const res = await fetch(`${HEVY_API_BASE}/workouts?page=1&pageSize=10`, {
    headers: { 'api-key': apiKey },
    next: { revalidate: 300 },
  })

  if (!res.ok) {
    throw new Error(`Hevy API responded with ${res.status}`)
  }

  const json = (await res.json()) as { workouts?: HevyRawWorkout[] }
  return json.workouts ?? []
}

function buildDashboardFromWorkouts(workouts: HevyRawWorkout[]): HevyDashboardData {
  const sorted = [...workouts].sort(
    (a, b) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime()
  )
  const workoutDates = new Set(sorted.map(w => w.start_time.slice(0, 10)))
  const today = new Date()
  const stats = computeStatsFromDates(workoutDates, today)

  const latest = sorted[0]
  const mostRecent = latest
    ? {
        title: latest.title || 'Workout',
        date: latest.start_time.slice(0, 10),
        durationMinutes: latest.end_time
          ? Math.max(
              1,
              Math.round((new Date(latest.end_time).getTime() - new Date(latest.start_time).getTime()) / 60000)
            )
          : 0,
        exerciseSummary: summarizeExercises(latest.exercises ?? []),
        exercises: mapExercises(latest.exercises ?? []),
      }
    : null

  return { live: true, ...stats, mostRecent }
}

function summarizeExercises(exercises: HevyRawExercise[]): string {
  const names = exercises.map(e => e.title).filter((title): title is string => Boolean(title))
  if (names.length === 0) return 'No exercises logged'
  const shown = names.slice(0, 3)
  const remainder = names.length - shown.length
  return remainder > 0 ? `${shown.join(', ')} +${remainder} more` : shown.join(', ')
}

function mapExercises(exercises: HevyRawExercise[]): WorkoutExercise[] {
  return exercises
    .filter(e => e.title)
    .map(e => ({
      name: e.title as string,
      sets: (e.sets ?? [])
        .filter(s => s.type !== 'warmup')
        .map(s => ({
          weightLb: typeof s.weight_kg === 'number' ? kgToLb(s.weight_kg) : null,
          reps: typeof s.reps === 'number' ? s.reps : null,
          durationSeconds: typeof s.duration_seconds === 'number' ? s.duration_seconds : null,
          distanceMeters: typeof s.distance_meters === 'number' ? s.distance_meters : null,
        })),
    }))
}

/** Deterministic Mon/Wed/Fri/Sat training pattern, used only when live Hevy data is unavailable. */
function isPlaceholderWorkoutDay(date: Date): boolean {
  const day = date.getDay()
  return day === 1 || day === 3 || day === 5 || day === 6
}

function buildPlaceholderDashboard(): HevyDashboardData {
  const today = new Date()
  const workoutDates = new Set<string>()

  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(today.getFullYear(), today.getMonth(), d)
    if (date <= today && isPlaceholderWorkoutDay(date)) {
      workoutDates.add(toIsoDate(date))
    }
  }

  const stats = computeStatsFromDates(workoutDates, today)

  const lastWorkoutDate = Array.from(workoutDates).sort().at(-1)
  const mostRecent = lastWorkoutDate
    ? {
        title: lately.training.placeholderWorkout.title,
        date: lastWorkoutDate,
        durationMinutes: lately.training.placeholderWorkout.durationMinutes,
        exerciseSummary: lately.training.placeholderWorkout.exerciseSummary,
        exercises: lately.training.placeholderWorkout.exercises,
      }
    : null

  return { live: false, ...stats, mostRecent }
}

function computeStatsFromDates(
  workoutDates: Set<string>,
  today: Date
): Omit<HevyDashboardData, 'live' | 'mostRecent'> {
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
  const calendar: CalendarDay[] = []
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(today.getFullYear(), today.getMonth(), d)
    const iso = toIsoDate(date)
    calendar.push({ date: iso, didWorkout: date <= today && workoutDates.has(iso) })
  }

  // If today hasn't been logged yet, the streak still counts back from
  // yesterday — it only breaks once a full day is missed, not the moment
  // today's workout hasn't happened yet.
  let streakDays = 0
  const cursor = new Date(today)
  if (!workoutDates.has(toIsoDate(cursor))) {
    cursor.setDate(cursor.getDate() - 1)
  }
  while (workoutDates.has(toIsoDate(cursor))) {
    streakDays += 1
    cursor.setDate(cursor.getDate() - 1)
  }

  const weekAgo = new Date(today)
  weekAgo.setDate(weekAgo.getDate() - 6)
  const workoutsThisWeek = Array.from(workoutDates).filter(iso => {
    const date = fromIsoDate(iso)
    return date >= weekAgo && date <= today
  }).length

  const workoutsThisMonth = calendar.filter(day => day.didWorkout).length

  return { streakDays, workoutsThisWeek, workoutsThisMonth, calendar }
}

function toIsoDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function fromIsoDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}
