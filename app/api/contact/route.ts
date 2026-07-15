import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { site } from '@/lib/data'

export const dynamic = 'force-dynamic'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Minimum time (ms) between a real visitor loading the form and submitting it.
// Bots that auto-fill and submit instantly get caught by this.
const MIN_FILL_TIME_MS = 2000

// Best-effort per-IP rate limit. Resets on cold start / redeploy, which is an
// acceptable tradeoff for a low-traffic personal contact form — the goal is
// to blunt casual bot abuse, not withstand a determined attacker.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 5
const submissionsByIp = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (submissionsByIp.get(ip) ?? []).filter(t => now - t < RATE_LIMIT_WINDOW_MS)
  timestamps.push(now)
  submissionsByIp.set(ip, timestamps)
  return timestamps.length > RATE_LIMIT_MAX
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many messages sent. Please try again later.' }, { status: 429 })
  }

  const { name, email, message, company, loadedAt } = await request.json()

  // Honeypot: a field real users never see or fill. Bots that auto-fill every
  // input trip this. Respond as if it succeeded so we don't tip them off.
  if (typeof company === 'string' && company.trim()) {
    return NextResponse.json({ ok: true })
  }

  if (typeof loadedAt !== 'number' || Date.now() - loadedAt < MIN_FILL_TIME_MS) {
    return NextResponse.json({ error: 'Please try submitting again.' }, { status: 400 })
  }

  if (
    typeof name !== 'string' || !name.trim() ||
    typeof email !== 'string' || !EMAIL_PATTERN.test(email) ||
    typeof message !== 'string' || !message.trim()
  ) {
    return NextResponse.json({ error: 'Please fill in all fields with a valid email.' }, { status: 400 })
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set — cannot send contact email.')
    return NextResponse.json({ error: 'Email sending is not configured.' }, { status: 500 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  const { error } = await resend.emails.send({
    from: 'Nick — Portfolio <contact@nickkim.dev>',
    to: site.email,
    replyTo: email,
    subject: `New message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
