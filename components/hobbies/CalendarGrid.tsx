import type { CalendarDay } from '@/lib/hevy'

interface CalendarGridProps {
  days: CalendarDay[]
}

const WEEKDAYS = [
  { label: 'S', full: 'Sunday' },
  { label: 'M', full: 'Monday' },
  { label: 'T', full: 'Tuesday' },
  { label: 'W', full: 'Wednesday' },
  { label: 'T', full: 'Thursday' },
  { label: 'F', full: 'Friday' },
  { label: 'S', full: 'Saturday' },
]

/** Month-at-a-glance calendar: day numbers, with workout days marked by a filled accent circle. */
export default function CalendarGrid({ days }: CalendarGridProps) {
  if (days.length === 0) return null

  const [year, month] = days[0].date.split('-').map(Number)
  const firstWeekday = new Date(year, month - 1, 1).getDay()
  const todayIso = toTorontoIsoDate(new Date())
  const monthLabel = new Date(year, month - 1, 1).toLocaleDateString('en-US', { month: 'long' })

  return (
    <div>
      <p className="font-playfair text-base font-semibold text-ink">{monthLabel}</p>

      <div
        role="group"
        aria-label={`${monthLabel} workout calendar: ${days.filter(d => d.didWorkout).length} of ${days.length} days logged`}
        className="mt-3 grid grid-cols-7 gap-y-1"
      >
        {WEEKDAYS.map((day, i) => (
          <abbr key={i} title={day.full} className="text-center text-[10px] font-medium uppercase text-ink-faint no-underline">
            {day.label}
          </abbr>
        ))}

        {Array.from({ length: firstWeekday }).map((_, i) => (
          <div key={`pad-${i}`} aria-hidden="true" />
        ))}

        {days.map(day => {
          const dayNumber = Number(day.date.slice(-2))
          const isToday = day.date === todayIso
          const label = `${monthLabel} ${dayNumber}${day.didWorkout ? ', workout logged' : ''}${isToday ? ' (today)' : ''}`

          return (
            <div key={day.date} className="flex items-center justify-center py-0.5">
              <span
                aria-label={label}
                title={label}
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-colors duration-150 ${
                  day.didWorkout
                    ? 'bg-accent text-surface'
                    : isToday
                      ? 'text-accent-strong'
                      : 'text-ink-muted'
                }`}
              >
                {dayNumber}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function toTorontoIsoDate(date: Date): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Toronto',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date)
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find(item => item.type === type)?.value ?? ''
  return `${part('year')}-${part('month')}-${part('day')}`
}
