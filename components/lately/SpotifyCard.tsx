'use client'

import Image from 'next/image'
import { Music2, ExternalLink } from 'lucide-react'
import { lately } from '@/lib/data'
import { useJsonFetch } from '@/lib/useJsonFetch'
import type { SpotifyNowPlaying } from '@/lib/spotify'

const POLL_MS = 30_000

export default function SpotifyCard() {
  const state = useJsonFetch<SpotifyNowPlaying>('/api/spotify', POLL_MS)

  return (
    <div className="rounded-2xl border border-border bg-surface-raised p-4 shadow-sm transition-colors duration-200 hover:border-accent/40">
      <div className="flex items-center gap-2">
        <Music2 size={15} className="text-accent" aria-hidden="true" />
        <h3 className="font-playfair text-sm font-semibold text-ink">{lately.spotify.heading}</h3>
      </div>

      {state.status === 'loading' && <SpotifySkeleton />}
      {state.status === 'error' && <SpotifyUnavailable />}
      {state.status === 'ready' && <SpotifyContent data={state.data} />}
    </div>
  )
}

function SpotifyContent({ data }: { data: SpotifyNowPlaying }) {
  const progressPct =
    data.isPlaying && data.durationMs > 0 ? Math.min(100, Math.round((data.progressMs / data.durationMs) * 100)) : 0

  return (
    <div className="mt-3">
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border border-border">
          <Image src={data.albumArt} alt="" fill sizes="48px" className="object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-ink">{data.title}</p>
          <p className="truncate text-xs text-ink-muted">{data.artist}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {data.isPlaying ? (
          <span className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-accent">
            <Equalizer />
            {data.label}
          </span>
        ) : (
          <span className="text-[11px] font-medium uppercase tracking-wide text-ink-faint">{data.label}</span>
        )}
        {!data.live && (
          <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-medium text-accent">
            Preview
          </span>
        )}
      </div>

      {data.isPlaying && (
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-surface" aria-hidden="true">
          <div className="h-full rounded-full bg-accent" style={{ width: `${progressPct}%` }} />
        </div>
      )}

      <a
        href={data.trackUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open "${data.title}" by ${data.artist} on Spotify`}
        className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-ink transition-colors duration-150 hover:text-accent"
      >
        <ExternalLink size={12} aria-hidden="true" />
        Open in Spotify
      </a>
    </div>
  )
}

function Equalizer() {
  return (
    <span className="flex h-3 items-end gap-[2px]" aria-hidden="true">
      <span
        className="w-[2px] bg-accent motion-safe:animate-[eq_0.9s_ease-in-out_infinite]"
        style={{ height: '40%', animationDelay: '0ms' }}
      />
      <span
        className="w-[2px] bg-accent motion-safe:animate-[eq_0.9s_ease-in-out_infinite]"
        style={{ height: '100%', animationDelay: '150ms' }}
      />
      <span
        className="w-[2px] bg-accent motion-safe:animate-[eq_0.9s_ease-in-out_infinite]"
        style={{ height: '65%', animationDelay: '300ms' }}
      />
    </span>
  )
}

function SpotifySkeleton() {
  return (
    <div className="mt-3 animate-pulse space-y-3" role="status" aria-label="Loading now-playing data">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-lg bg-surface" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-3/4 rounded bg-surface" />
          <div className="h-3 w-1/2 rounded bg-surface" />
        </div>
      </div>
      <div className="h-3 w-24 rounded bg-surface" />
    </div>
  )
}

function SpotifyUnavailable() {
  return (
    <div className="mt-3 rounded-xl border border-dashed border-border px-3 py-4 text-center">
      <p className="text-xs text-ink-muted">Now-playing data is unavailable.</p>
    </div>
  )
}
