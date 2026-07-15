import { NextResponse } from 'next/server'
import { getHevyDashboard } from '@/lib/hevy'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const data = await getHevyDashboard()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Unable to load Hevy data:', error)
    return NextResponse.json({ error: 'Training data is unavailable.' }, { status: 503 })
  }
}
