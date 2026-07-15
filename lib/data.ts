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
  { href: '#contact', label: 'Contact' },
]

export interface SocialLink {
  label: string
  href: string
  icon: 'github' | 'linkedin' | 'resume' | 'email'
}

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/your-username', icon: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/your-username', icon: 'linkedin' },
  { label: 'Résumé', href: '/resume.pdf', icon: 'resume' },
]

export const site = {
  name: 'Nicholas',
  fullName: 'Nicholas [Your Last Name]',
  title: 'Your short professional title goes here',
  description:
    "Placeholder portfolio site — a short SEO description of who you are and what you build goes here.",
  email: 'your.email@example.com',
}

export const hero = {
  greeting: "Hi, I'm",
  name: site.name,
  tagline:
    'Your short placeholder sentence goes here — a one-liner about what you build, study, or care about.',
  primaryCta: { label: 'View My Work', href: '#projects' },
  secondaryCta: { label: 'Résumé', href: '/resume.pdf' },
  portraitAlt: 'Placeholder portrait photo of Nicholas',
}

export const about = {
  heading: 'About',
  paragraphs: [
    'Your short introduction goes here. This paragraph should describe your background, what motivates you, and the kind of work you enjoy — replace with real biography content.',
    'A second placeholder paragraph goes here, covering your technical interests: the languages, tools, or problem spaces you gravitate toward.',
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
    hevyProfileHref: 'https://hevy.com/user/your-username',
    profileLinkLabel: 'Open my Hevy training profile in a new tab',
    // Used to fill in the "most recent workout" slot of the placeholder
    // dashboard returned by lib/hevy.ts when HEVY_API_KEY is not configured.
    placeholderWorkout: {
      title: 'Placeholder Push Day',
      durationMinutes: 52,
      exerciseSummary: 'Bench press, incline dumbbell press, lateral raises',
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
    image: '/images/guitar-placeholder.svg',
    imageAlt: 'Placeholder thumbnail of an acoustic guitar',
    sentence: 'A short placeholder sentence about playing guitar and posting covers goes here.',
    tiktokHandle: '@your-tiktok-handle',
    tiktokHref: 'https://www.tiktok.com/@your-tiktok-handle',
    cta: 'Watch my covers',
  },
}

export interface WorkEntry {
  organization: string
  title: string
  dates: string
  description: string
  tags: string[]
}

export const work: WorkEntry[] = [
  {
    organization: 'Placeholder Organization One',
    title: 'Placeholder Role Title',
    dates: '20XX — Present',
    description:
      'Placeholder description of responsibilities and impact for this role goes here. Replace with real details.',
    tags: ['Tech One', 'Tech Two', 'Tech Three'],
  },
  {
    organization: 'Placeholder Organization Two',
    title: 'Placeholder Role Title',
    dates: '20XX — 20XX',
    description:
      'Placeholder description of responsibilities and impact for this role goes here. Replace with real details.',
    tags: ['Tech One', 'Tech Two'],
  },
  {
    organization: 'Placeholder Organization Three',
    title: 'Placeholder Role Title',
    dates: '20XX — 20XX',
    description:
      'Placeholder description of responsibilities and impact for this role goes here. Replace with real details.',
    tags: ['Tech One', 'Tech Two', 'Tech Three'],
  },
  {
    organization: 'Placeholder Organization Four',
    title: 'Placeholder Role Title',
    dates: '20XX — 20XX',
    description:
      'Placeholder description of responsibilities and impact for this role goes here. Replace with real details.',
    tags: ['Tech One', 'Tech Two'],
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
  sourceHref?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    title: 'Featured Project One',
    description:
      'Placeholder description of this featured project — what it does and the problem it solves goes here.',
    result: 'Placeholder role and result summary goes here.',
    image: '/images/project-placeholder-1.svg',
    imageAlt: 'Placeholder artwork for Featured Project One',
    tags: ['Tech One', 'Tech Two', 'Tech Three'],
    demoHref: 'https://example.com/demo-one',
    sourceHref: 'https://github.com/your-username/project-one',
    featured: true,
  },
  {
    title: 'Featured Project Two',
    description:
      'Placeholder description of this project — what it does and the problem it solves goes here.',
    result: 'Placeholder role and result summary goes here.',
    image: '/images/project-placeholder-2.svg',
    imageAlt: 'Placeholder artwork for Featured Project Two',
    tags: ['Tech One', 'Tech Two'],
    demoHref: 'https://example.com/demo-two',
    sourceHref: 'https://github.com/your-username/project-two',
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
