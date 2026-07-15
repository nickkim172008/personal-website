// Single typed source of truth for all site copy, links, and placeholder content.
// Replace the placeholder strings here to personalize the site — no layout
// component needs to change.

export interface NavLink {
  href: string
  label: string
}

export const navLinks: NavLink[] = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#projects', label: 'Projects' },
  { href: '#personal', label: 'Personal' },
  { href: '#contact', label: 'Contact' },
]

export interface SocialLink {
  label: string
  href: string
  icon: 'github' | 'linkedin' | 'resume' | 'email'
}

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/nickkim172008', icon: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/nicholaskim17', icon: 'linkedin' },
  { label: 'Résumé', href: '/resume.pdf', icon: 'resume' },
]

export const site = {
  name: 'Nicholas',
  fullName: 'Nicholas [Kim]',
  title: 'Your short professional title goes here',
  description:
    "Placeholder portfolio site — a short SEO description of who you are and what you build goes here.",
  email: 'your.email@example.com',
}

export const hero = {
  greeting: "Hi, I'm",
  name: site.name,
  tagline:
    'Building software, exploring AI, and learning a little more every day.',
  primaryCta: { label: 'View My Work', href: '#projects' },
  secondaryCta: { label: 'Résumé', href: '/resume.pdf' },
  portraitSrc: '/images/portrait.jpg',
  portraitAlt: 'Portrait photo of Nicholas',
}

export const about = {
  heading: 'About',
  waterloo: {
    name: 'University of Waterloo',
    href: 'https://uwaterloo.ca/engineering/',
    logo: '/images/work/waterloo-seal.svg',
  },
  paragraphs: [
    "Hey, I'm Nick. I'm starting Management Engineering at the University of Waterloo this fall, where I'm interested in AI systems, LLMs, machine learning, and full-stack development.",
    "Currently, I'm a Software Engineering Intern at Appli AI and conduct AI safety research focused on RAG and self-improving harnesses. Away from my keyboard, you'll usually find me at the gym, playing guitar, competing at hackathons, or hanging out with friends.",
  ],
  technicalInterests: ['Placeholder Interest One', 'Placeholder Interest Two', 'Placeholder Interest Three'],
  tags: ['Tag One', 'Tag Two', 'Tag Three', 'Tag Four', 'Tag Five'],
}

// Content and links for the "Lately" dashboard on the About section — a set of
// small live/placeholder cards (training, now-playing, guitar) that stand in
// for a repeated portrait. Real API data is fetched server-side in
// lib/hevy.ts and lib/spotify.ts; the fields below are used either as direct
// config (links, guitar card) or as the fallback content those fetchers
// return when credentials are absent or a request fails.
export const lately = {
  heading: 'Lately',
  training: {
    heading: 'Training',
    hevyProfileHref: 'https://hevy.com/user/kimmer17',
    profileLinkLabel: 'Open my Hevy training profile in a new tab',
    // Used to fill in the "most recent workout" slot of the placeholder
    // dashboard returned by lib/hevy.ts when HEVY_API_KEY is not configured.
    placeholderWorkout: {
      title: 'Placeholder Push Day',
      durationMinutes: 52,
      exerciseSummary: 'Bench press, incline dumbbell press, lateral raises',
      exercises: [
        {
          name: 'Bench Press (Barbell)',
          sets: [
            { weightLb: 135, reps: 8, durationSeconds: null, distanceMeters: null },
            { weightLb: 135, reps: 8, durationSeconds: null, distanceMeters: null },
            { weightLb: 135, reps: 6, durationSeconds: null, distanceMeters: null },
          ],
        },
        {
          name: 'Incline Dumbbell Press',
          sets: [
            { weightLb: 50, reps: 10, durationSeconds: null, distanceMeters: null },
            { weightLb: 50, reps: 9, durationSeconds: null, distanceMeters: null },
          ],
        },
        {
          name: 'Lateral Raise (Machine)',
          sets: [
            { weightLb: 30, reps: 12, durationSeconds: null, distanceMeters: null },
            { weightLb: 30, reps: 11, durationSeconds: null, distanceMeters: null },
          ],
        },
      ],
    },
  },
  spotify: {
    heading: 'Now playing',
    // Used by lib/spotify.ts when Spotify credentials are absent or a request fails.
    placeholderTrack: {
      title: 'Placeholder Track Title',
      artist: 'Placeholder Artist',
      albumArt: '/images/spotify-album-placeholder.svg',
      durationMs: 3 * 60 * 1000 + 24 * 1000,
    },
  },
  guitar: {
    heading: 'Guitar',
    image: '/images/guitar.jpg',
    imageAlt: 'Nicholas playing guitar and singing at home',
    sentence: "Just for fun — I post covers sometimes and genuinely don't care about the followers lol.",
    tiktokHandle: '@kimmer_music17',
    tiktokHref: 'https://www.tiktok.com/@kimmer_music17',
    cta: 'Watch my covers',
  },
}

export interface WorkEntry {
  organization: string
  organizationHref?: string
  logo: string
  logoAlt: string
  title: string
  dates: string
  description: string
  tags: string[]
}

export const work: WorkEntry[] = [
  {
    organization: 'Appli AI',
    organizationHref: 'https://applisolutions.com',
    logo: '/images/work/appli-ai.png',
    logoAlt: 'Appli AI logo',
    title: 'Software Engineering Intern',
    dates: 'June 2026 — Present',
    description:
      'Building AI-powered recommendation systems and backend infrastructure for a professional networking platform. Designed an eight-signal matching engine, reduced recommendation latency from hours to near real time, and strengthened platform security by fixing a production vulnerability.',
    tags: ['Python', 'TypeScript', 'Neo4j', 'Recommendation Systems', 'Vector Embeddings', 'Backend Development'],
  },
  {
    organization: 'Algoverse',
    organizationHref: 'https://algoverseairesearch.org',
    logo: '/images/work/algoverse.jpeg',
    logoAlt: 'Algoverse logo',
    title: 'Machine Learning Research Intern',
    dates: 'June 2026 — Present',
    description:
      'Conducting AI safety research through a competitive fellowship alongside researchers from MIT, Princeton, and Cornell. My work focuses on self-improving LLM harnesses, exploring how retrieval augmentation and adaptive evaluation can improve safety while preserving model capabilities.',
    tags: ['Python', 'LLMs', 'AI Safety', 'RAG', 'Machine Learning', 'Research'],
  },
  {
    organization: 'One2One Tutoring',
    organizationHref: 'https://one2onetutoring.vercel.app/',
    logo: '/images/work/one2one.png',
    logoAlt: 'One2One Tutoring logo',
    title: 'Founder & Lead Tutor',
    dates: 'Sept 2024 — June 2026',
    description:
      'Founded and grew a tutoring business that helped 18 high school students strengthen their mathematics skills, including AP Calculus. Built the business through referrals while creating personalized learning experiences and simplifying complex concepts.',
    tags: ['Entrepreneurship', 'Teaching', 'Communication', 'Leadership', 'Mathematics'],
  },
]

export interface Project {
  title: string
  description: string
  result: string
  image: string
  imageAlt: string
  tags: string[]
  demoHref?: string
  demoLabel?: string
  sourceHref?: string
  sourceLabel?: string
  devpostHref?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    title: 'nomad',
    description:
      'A permission and identity layer for autonomous AI agents. nomad gives each agent a cryptographically verifiable passport on Solana, allowing services to confirm exactly what it can do—and letting owners narrow or revoke those permissions at any time.',
    result: 'Co-built with a team of three for JAMHacks 10. Winner of Best Use of Solana.',
    image: '/images/nomad.png',
    imageAlt: 'Nomad AI agent permission interface',
    tags: ['Solana', 'Rust / Anchor', 'TypeScript'],
    demoHref: 'https://x.com/nkimmer_17/status/2066940490096787797',
    demoLabel: 'Live demo',
    sourceHref: 'https://github.com/nickkim172008/nomad',
    sourceLabel: 'View source',
    devpostHref: 'https://devpost.com/software/nomad-nrgx3l',
    featured: true,
  },
  {
    title: 'Buzzy',
    description:
      'A social hype market where users discover cultural trends, participate in initial drops, and trade virtual shares using in-app tokens. Prices respond to completed trades, letting users test how early they can identify cultural momentum.',
    result:
      'Co-built a full-stack virtual marketplace with real-time asset listings, portfolios, order books, trade histories, community suggestions, and voting for EurekaHacks 2026.',
    image: '/images/buzzy.png',
    imageAlt: 'Buzzy virtual marketplace trading dashboard',
    tags: ['Next.js', 'TypeScript', 'Firebase'],
    demoHref: 'https://buzzly-zeta.vercel.app',
    sourceHref: 'https://github.com/nickkim172008/buzzy',
    devpostHref: 'https://devpost.com/software/buzzy-xd1w2u',
  },
  {
    title: 'Featured Project Three',
    description:
      'Placeholder description of this project — what it does and the problem it solves goes here.',
    result: 'Placeholder role and result summary goes here.',
    image: '/images/project-placeholder-3.svg',
    imageAlt: 'Placeholder artwork for Featured Project Three',
    tags: ['Tech One', 'Tech Two', 'Tech Three'],
    demoHref: 'https://example.com/demo-three',
    sourceHref: 'https://github.com/your-username/project-three',
  },
]

export const contact = {
  heading: "Let's talk",
  invitation:
    "Placeholder invitation text goes here — a short, friendly line inviting visitors to reach out.",
  emailCta: 'Say hello',
}

export const webring = {
  name: 'UW CS Webring',
  prevHref: 'https://example.com/webring/prev',
  nextHref: 'https://example.com/webring/next',
  homeHref: 'https://example.com/webring',
}

export const footer = {
  attribution: `Designed and built by ${site.name}.`,
  lastUpdated: 'Last updated: placeholder date',
}
