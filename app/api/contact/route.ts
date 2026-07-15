import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { site } from '@/lib/data'

export const dynamic = 'force-dynamic'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  const { name, email, message } = await request.json()

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
    from: 'Portfolio Contact Form <onboarding@resend.dev>',
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
