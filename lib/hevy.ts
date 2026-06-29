export interface HevySet {
  index: number
  type: 'normal' | 'warmup' | 'failure' | 'dropset'
  weight_kg: number | null
  reps: number | null
  distance_meters: number | null
  duration_seconds: number | null
}

export interface HevyExercise {
  index: number
  title: string
  notes: string
  sets: HevySet[]
}

export interface HevyWorkout {
  id: string
  title: string
  description: string
  start_time: string
  end_time: string
  updated_at: string
  created_at: string
  exercises: HevyExercise[]
}

interface HevyResponse {
  page: number
  page_count: number
  workouts: HevyWorkout[]
}

async function fetchPage(page: number, pageSize: number): Promise<HevyResponse | null> {
  const apiKey = process.env.HEVY_API_KEY
  if (!apiKey) return null

  try {
    const res = await fetch(
      `https://api.hevyapp.com/v1/workouts?page=${page}&pageSize=${pageSize}`,
      {
        headers: { 'api-key': apiKey },
        next: { revalidate: 3600 },
      }
    )
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export async function getWorkoutsForYear(): Promise<HevyWorkout[]> {
  const apiKey = process.env.HEVY_API_KEY
  if (!apiKey) return []

  const yearAgo = new Date()
  yearAgo.setFullYear(yearAgo.getFullYear() - 1)
  const yearAgoStr = yearAgo.toISOString()

  const allWorkouts: HevyWorkout[] = []

  for (let page = 1; page <= 10; page++) {
    const data = await fetchPage(page, 10)
    if (!data || !data.workouts?.length) break

    allWorkouts.push(...data.workouts)

    const oldestInBatch = data.workouts[data.workouts.length - 1].start_time
    if (oldestInBatch < yearAgoStr || page >= data.page_count) break
  }

  return allWorkouts.filter(w => w.start_time >= yearAgoStr)
}
