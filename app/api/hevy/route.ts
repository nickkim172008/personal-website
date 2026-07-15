import { NextResponse } from 'next/server'
import { getHevyDashboard } from '@/lib/hevy'

export const dynamic = 'force-dynamic'

export async function GET() {
  const data = await getHevyDashboard()
  return NextResponse.json(data)
}
