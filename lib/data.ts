// Central source of truth for the site's copy, links, and content.

export interface NavLink {
  href: string
  label: string
}

export const navLinks: NavLink[] = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#projects', label: 'Projects' },
  { href: '#hobbies', label: 'Hobbies' },
  { href: '#contact', label: 'Contact' },
]

export interface SocialLink {
  label: string
  href: string
  icon: 'github' | 'linkedin' | 'x'
}

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/nickkim172008', icon: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/nicholaskim17', icon: 'linkedin' },
  { label: 'X', href: 'https://x.com/nkimmer_17', icon: 'x' },
]

export const site = {
  name: 'Nick',
  fullName: 'Nicholas [Kim]',
  description:
    'Engineering student at the University of Waterloo exploring AI systems, software engineering, and useful products.',
  email: 'nicholaskimto@gmail.com',
}

export const hero = {
  greeting: "Hi, I'm",
  name: 'Nick Kim',
  tagline:
    'Building software, exploring AI, and learning a little more every day.',
  primaryCta: { label: 'View My Work', href: '#projects' },
  secondaryCta: { label: "Let's Talk", href: '#contact' },
  portraitSrc: '/images/portrait.jpg',
  portraitAlt: 'Portrait photo of Nick',
}

export const about = {
  heading: 'About',
  waterloo: {
    name: 'University of Waterloo',
    href: 'https://uwaterloo.ca/engineering/',
    logo: '/images/work/waterloo-seal.svg',
  },
  appliAI: {
    name: 'Appli AI',
    href: 'https://applisolutions.com',
    logo: '/images/work/appli-ai.png',
  },
  paragraphs: [
    "Hey, I'm Nick. I'm starting Management Engineering at the University of Waterloo this fall, where I'm interested in AI systems, LLMs, machine learning, and full-stack development.",
    "Currently, I'm a Software Engineering Intern at Appli AI and conduct AI safety research focused on RAG and self-improving harnesses. Away from my keyboard, you'll usually find me at the gym, playing guitar, competing at hackathons, or hanging out with friends.",
  ],
  exploring: {
    heading: "What I'm exploring",
    items: ['How LLMs work and reason', 'AI agents and automation', 'Building useful full-stack products'],
  },
  gallery: [
    { src: '/images/gallery/golf.jpeg', alt: 'Lining up a putt on the green with a friend' },
    { src: '/images/gallery/hockey.jpeg', alt: 'Carrying the puck during a hockey game' },
    { src: '/images/gallery/hackathon.jpeg', alt: 'Posing with laptops at a hackathon judging round' },
    { src: '/images/gallery/waterloo.jpeg', alt: 'With friends in University of Waterloo gear' },
    { src: '/images/gallery/soccer.jpeg', alt: 'At a soccer match with family' },
    { src: '/images/gallery/nomad-pitch.jpeg', alt: 'Presenting the Nomad project at a hackathon whiteboard' },
  ],
}

// Content and links for the Hobbies cards. Live training data is fetched
// server-side in lib/hevy.ts; the remaining fields configure external links
// and the guitar card.
export const hobbies = {
  training: {
    heading: 'Training',
    hevyProfileHref: 'https://hevy.com/user/kimmer17',
    profileLinkLabel: 'Open my Hevy training profile in a new tab',
  },
  guitar: {
    heading: 'Guitar',
    image: '/images/guitar.jpg',
    imageAlt: 'Nick playing guitar and singing at home',
    sentence: "Just for fun — I post covers sometimes lol.",
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
      'Building AI-powered matching and backend systems that deliver secure, near-real-time recommendations.',
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
      'Researching safer, self-improving LLM systems using retrieval augmentation and adaptive evaluation.',
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
      'Founded a referral-driven tutoring business that helped 18 students strengthen their mathematics skills.',
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
}

export const projects: Project[] = [
  {
    title: 'nomad',
    description:
      'A Solana-based identity layer that gives AI agents verifiable, revocable permissions.',
    result: 'Co-built with a team of three for JAMHacks 10. Winner of Best Use of Solana.',
    image: '/images/nomad.png',
    imageAlt: 'Nomad AI agent permission interface',
    tags: ['Solana', 'Rust / Anchor', 'TypeScript'],
    demoHref: 'https://x.com/nkimmer_17/status/2066940490096787797',
    demoLabel: 'Live demo',
    sourceHref: 'https://github.com/nickkim172008/nomad',
    sourceLabel: 'View source',
    devpostHref: 'https://devpost.com/software/nomad-nrgx3l',
  },
  {
    title: 'Buzzy',
    description:
      'A social market where users discover trends and trade virtual shares using in-app tokens.',
    result: 'Co-built a full-stack marketplace with live trading and voting for EurekaHacks 2026.',
    image: '/images/buzzy.png',
    imageAlt: 'Buzzy virtual marketplace trading dashboard',
    tags: ['Next.js', 'TypeScript', 'Firebase'],
    demoHref: 'https://buzzly-zeta.vercel.app',
    sourceHref: 'https://github.com/nickkim172008/buzzy',
    devpostHref: 'https://devpost.com/software/buzzy-xd1w2u',
  },
]

export const contact = {
  invitation:
    "Feel free to reach out if you'd like to discuss opportunities, have a quick coffee chat, or just say hi! I'm always looking forward to meeting new people.",
  portraitSrc: '/images/portrait.jpg',
  portraitAlt: 'Nick in front of the Golden Gate Bridge',
  submitLabel: 'Submit',
}

export const footer = {
  attribution: `Designed and built by Nicholas Kim`,
}
