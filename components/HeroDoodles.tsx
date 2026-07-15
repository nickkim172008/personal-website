import Image from 'next/image'

// Decorative hand-drawn notebook doodles scattered around the hero's outer
// edges. Pure CSS drift (see the doodle-drift-* keyframes in globals.css) —
// no JS/framer-motion needed since the motion is a simple ambient loop.
// Responsive count is controlled by `visibility` Tailwind classes, and the
// animation itself only ever runs at `sm:` and up via `motion-safe:sm:`, so
// mobile always gets a static pair and prefers-reduced-motion is respected.

interface Doodle {
  name: string
  src: string
  width: number
  height: number
  rotate: string
  position: string
  visibility: string
  animation: string
}

const doodles: Doodle[] = [
  {
    name: 'guitar',
    src: '/images/doodles/guitar.png',
    width: 72,
    height: 69,
    rotate: '-9deg',
    position: 'top-[14%] left-[5%]',
    visibility: 'block',
    animation: 'motion-safe:sm:animate-[doodle-drift-a_9s_ease-in-out_infinite]',
  },
  {
    name: 'hockey stick and puck',
    src: '/images/doodles/hockey.png',
    width: 66,
    height: 61,
    rotate: '8deg',
    position: 'bottom-[16%] right-[5%]',
    visibility: 'block',
    animation: 'motion-safe:sm:animate-[doodle-drift-d_10s_ease-in-out_infinite]',
  },
  {
    name: 'dumbbell',
    src: '/images/doodles/dumbbell.png',
    width: 64,
    height: 39,
    rotate: '7deg',
    position: 'top-[16%] right-[6%]',
    visibility: 'hidden sm:block',
    animation: 'motion-safe:animate-[doodle-drift-b_11s_ease-in-out_infinite]',
  },
  {
    name: 'laptop',
    src: '/images/doodles/laptop.png',
    width: 74,
    height: 63,
    rotate: '-6deg',
    position: 'bottom-[14%] left-[6%]',
    visibility: 'hidden sm:block',
    animation: 'motion-safe:animate-[doodle-drift-c_8s_ease-in-out_infinite]',
  },
  {
    name: 'golf flag and ball',
    src: '/images/doodles/golf.png',
    width: 54,
    height: 55,
    rotate: '-5deg',
    position: 'top-[42%] left-[3%]',
    visibility: 'hidden md:block',
    animation: 'motion-safe:animate-[doodle-drift-a_12s_ease-in-out_infinite]',
  },
  {
    name: 'piano keyboard',
    src: '/images/doodles/piano.png',
    width: 76,
    height: 42,
    rotate: '4deg',
    position: 'top-[52%] right-[3%]',
    visibility: 'hidden lg:block',
    animation: 'motion-safe:animate-[doodle-drift-b_7s_ease-in-out_infinite]',
  },
  {
    name: 'calculator',
    src: '/images/doodles/calculator.png',
    width: 50,
    height: 62,
    rotate: '-7deg',
    position: 'bottom-[38%] left-[3%]',
    visibility: 'hidden lg:block',
    animation: 'motion-safe:animate-[doodle-drift-c_10.5s_ease-in-out_infinite]',
  },
]

export default function HeroDoodles() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {doodles.map(doodle => (
        <div
          key={doodle.name}
          className={`absolute opacity-[0.32] ${doodle.visibility} ${doodle.position} ${doodle.animation}`}
          style={{ rotate: doodle.rotate, ['--doodle-rot' as string]: doodle.rotate }}
        >
          <Image src={doodle.src} alt="" width={doodle.width} height={doodle.height} className="dark:invert" />
        </div>
      ))}
    </div>
  )
}
