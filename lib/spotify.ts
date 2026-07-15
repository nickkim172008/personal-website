import { lately } from './data'

// Server-only module: reads Spotify credentials from the environment and
// talks to the Spotify Web API. Never import this from a client component —
// it is only ever called from app/api/spotify/route.ts, which keeps the
// client secret and refresh token on the server.

export interface SpotifyNowPlaying {
  live: boolean
  isPlaying: boolean
  label: 'Listening now' | 'Last played'
  title: string
  artist: string
  albumArt: string
  progressMs: number
  durationMs: number
  trackUrl: string
}

interface SpotifyTrack {
  name: string
  artists: { name: string }[]
  album: { images: { url: string }[] }
  duration_ms: number
  external_urls: { spotify: string }
}

const TOKEN_URL = 'https://accounts.spotify.com/api/token'
const API_BASE = 'https://api.spotify.com/v1'

export async function getSpotifyNowPlaying(): Promise<SpotifyNowPlaying> {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN

  if (!clientId || !clientSecret || !refreshToken) {
    return placeholderNowPlaying()
  }

  try {
    const accessToken = await getAccessToken(clientId, clientSecret, refreshToken)
    const current = await fetchCurrentlyPlaying(accessToken)
    if (current) return current

    const recent = await fetchMostRecentlyPlayed(accessToken)
    if (recent) return recent

    return placeholderNowPlaying()
  } catch {
    return placeholderNowPlaying()
  }
}

async function getAccessToken(clientId: string, clientSecret: string, refreshToken: string): Promise<string> {
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken }),
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`Spotify token refresh failed with ${res.status}`)
  }

  const json = (await res.json()) as { access_token: string }
  return json.access_token
}

async function fetchCurrentlyPlaying(accessToken: string): Promise<SpotifyNowPlaying | null> {
  const res = await fetch(`${API_BASE}/me/player/currently-playing`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'no-store',
  })

  if (res.status === 204) return null
  if (!res.ok) throw new Error(`Spotify currently-playing failed with ${res.status}`)

  const json = (await res.json()) as { is_playing: boolean; item: SpotifyTrack | null; progress_ms: number | null }
  if (!json.item) return null

  return normalizeTrack(json.item, {
    live: true,
    isPlaying: json.is_playing,
    label: 'Listening now',
    progressMs: json.progress_ms ?? 0,
  })
}

async function fetchMostRecentlyPlayed(accessToken: string): Promise<SpotifyNowPlaying | null> {
  const res = await fetch(`${API_BASE}/me/player/recently-played?limit=1`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'no-store',
  })

  if (!res.ok) throw new Error(`Spotify recently-played failed with ${res.status}`)

  const json = (await res.json()) as { items?: { track: SpotifyTrack }[] }
  const track = json.items?.[0]?.track
  if (!track) return null

  return normalizeTrack(track, { live: true, isPlaying: false, label: 'Last played', progressMs: 0 })
}

function normalizeTrack(
  track: SpotifyTrack,
  meta: { live: boolean; isPlaying: boolean; label: SpotifyNowPlaying['label']; progressMs: number }
): SpotifyNowPlaying {
  return {
    live: meta.live,
    isPlaying: meta.isPlaying,
    label: meta.label,
    title: track.name,
    artist: track.artists.map(a => a.name).join(', '),
    albumArt: track.album.images[0]?.url ?? lately.spotify.placeholderTrack.albumArt,
    progressMs: meta.progressMs,
    durationMs: track.duration_ms,
    trackUrl: track.external_urls.spotify,
  }
}

function placeholderNowPlaying(): SpotifyNowPlaying {
  const track = lately.spotify.placeholderTrack
  return {
    live: false,
    isPlaying: true,
    label: 'Listening now',
    title: track.title,
    artist: track.artist,
    albumArt: track.albumArt,
    progressMs: Math.round(track.durationMs * 0.4),
    durationMs: track.durationMs,
    trackUrl: 'https://open.spotify.com',
  }
}
