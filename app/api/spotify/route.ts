import { NextResponse } from 'next/server'
import { getSpotifyNowPlaying } from '@/lib/spotify'

export const dynamic = 'force-dynamic'

export async function GET() {
  const data = await getSpotifyNowPlaying()
  return NextResponse.json(data)
}
