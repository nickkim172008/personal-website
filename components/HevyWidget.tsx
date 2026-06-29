import { getWorkoutsForYear, HevyWorkout } from '@/lib/hevy'

function buildHeatmap(workouts: HevyWorkout[]) {
  const dateMap = new Map<string, number>()
  for (const w of workouts) {
    const d = w.start_time.split('T')[0]
    dateMap.set(d, (dateMap.get(d) ?? 0) + 1)
  }

  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]

  // Align start to Monday, 52 weeks back
  const startDate = new Date(today)
  startDate.setDate(startDate.getDate() - 52 * 7)
  const dow = startDate.getDay()
  startDate.setDate(startDate.getDate() - (dow === 0 ? 6 : dow - 1))

  const weeks: { dateStr: string; count: number; isToday: boolean; isFuture: boolean }[][] = []
  const cur = new Date(startDate)

  while (weeks.length < 53) {
    const week: { dateStr: string; count: number; isToday: boolean; isFuture: boolean }[] = []
    for (let d = 0; d < 7; d++) {
      const dateStr = cur.toISOString().split('T')[0]
      week.push({
        dateStr,
        count: dateMap.get(dateStr) ?? 0,
        isToday: dateStr === todayStr,
        isFuture: cur > today,
      })
      cur.setDate(cur.getDate() + 1)
    }
    weeks.push(week)
    if (cur > today) break
  }

  return { weeks, dateMap }
}

function getMonthLabels(weeks: { dateStr: string }[][]) {
  const labels: { label: string; col: number }[] = []
  let last = ''
  weeks.forEach((week, col) => {
    const m = new Date(week[0].dateStr + 'T12:00:00').toLocaleString('en-US', { month: 'short' })
    if (m !== last) { labels.push({ label: m, col }); last = m }
  })
  return labels
}

function cellColor(count: number, isFuture: boolean) {
  if (isFuture) return 'bg-transparent'
  if (count === 0) return 'bg-[#E5E0D8]'
  if (count === 1) return 'bg-[#A3C4A8]'
  if (count === 2) return 'bg-[#6BA877]'
  return 'bg-[#3B8C4E]'
}

function formatDuration(start: string, end: string) {
  const mins = Math.round((new Date(end).getTime() - new Date(start).getTime()) / 60000)
  if (mins < 60) return `${mins}m`
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default async function HevyWidget() {
  const workouts = await getWorkoutsForYear()

  if (workouts.length === 0) {
    return (
      <div className="mt-8 p-4 rounded-xl border border-dashed border-[#E5E0D8] text-sm text-[#9A9490]">
        {process.env.HEVY_API_KEY
          ? 'no workout data found'
          : 'set HEVY_API_KEY in .env.local to show fitness stats'}
      </div>
    )
  }

  const { weeks } = buildHeatmap(workouts)
  const monthLabels = getMonthLabels(weeks)
  const recent = workouts[0]
  const totalWorkouts = workouts.length

  return (
    <div className="mt-10 space-y-5">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-[#2C2A27]">fitness</span>
        <span className="text-xs text-[#9A9490]">· {totalWorkouts} workouts this year</span>
      </div>

      {/* Heatmap */}
      <div className="overflow-x-auto pb-1">
        <div className="relative" style={{ minWidth: `${weeks.length * 13 + 24}px` }}>
          {/* Month labels */}
          <div className="relative h-4 mb-1 ml-6">
            {monthLabels.map(({ label, col }) => (
              <span
                key={`${label}-${col}`}
                className="absolute text-[10px] text-[#9A9490]"
                style={{ left: `${col * 13}px` }}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="flex gap-0">
            {/* Day-of-week labels */}
            <div className="flex flex-col gap-[3px] mr-1.5 mt-0.5">
              {['M', '', 'W', '', 'F', '', 'S'].map((day, i) => (
                <div key={i} className="h-[10px] text-[9px] text-[#9A9490] leading-none flex items-center w-4">
                  {day}
                </div>
              ))}
            </div>

            {/* Grid */}
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px] mr-[3px]">
                {week.map((day, di) => (
                  <div
                    key={di}
                    title={`${day.dateStr}${day.count > 0 ? ` — ${day.count} workout${day.count > 1 ? 's' : ''}` : ''}`}
                    className={`w-[10px] h-[10px] rounded-[2px] ${cellColor(day.count, day.isFuture)} ${day.isToday ? 'ring-1 ring-[#2C2A27] ring-offset-1 ring-offset-[#FAF7F2]' : ''}`}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-1.5 mt-2 ml-6">
            <span className="text-[10px] text-[#9A9490]">less</span>
            {['bg-[#E5E0D8]', 'bg-[#A3C4A8]', 'bg-[#6BA877]', 'bg-[#3B8C4E]'].map(c => (
              <div key={c} className={`w-[10px] h-[10px] rounded-[2px] ${c}`} />
            ))}
            <span className="text-[10px] text-[#9A9490]">more</span>
          </div>
        </div>
      </div>

      {/* Most recent workout */}
      {recent && (
        <div className="p-4 rounded-xl bg-white/50 border border-[#E5E0D8]">
          <div className="flex items-start justify-between gap-2 mb-3">
            <div>
              <p className="text-sm font-medium text-[#2C2A27]">
                {recent.title || 'workout'}
              </p>
              <p className="text-xs text-[#9A9490] mt-0.5">
                {formatDate(recent.start_time)} · {formatDuration(recent.start_time, recent.end_time)}
              </p>
            </div>
            <span className="text-[10px] bg-[#F0EDE8] text-[#7A7570] px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
              most recent
            </span>
          </div>

          <div className="space-y-1">
            {recent.exercises.slice(0, 5).map((ex, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-[#5A5550]">
                <span className="w-1 h-1 rounded-full bg-[#C8C2B8] flex-shrink-0" />
                <span>
                  {ex.title}
                  {ex.sets.length > 0 && (
                    <span className="text-[#9A9490] ml-1">
                      · {ex.sets.length} set{ex.sets.length !== 1 ? 's' : ''}
                      {ex.sets[0]?.weight_kg != null && ` · ${ex.sets[0].weight_kg}kg`}
                    </span>
                  )}
                </span>
              </div>
            ))}
            {recent.exercises.length > 5 && (
              <p className="text-xs text-[#9A9490] pl-3">+{recent.exercises.length - 5} more</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
