'use client'

import { useEffect, useState } from 'react'

export type FetchState<T> = { status: 'loading' } | { status: 'ready'; data: T } | { status: 'error' }

/** Fetches a JSON endpoint client-side, optionally polling, with loading/ready/error states. */
export function useJsonFetch<T>(url: string, pollMs?: number): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`Request to ${url} failed with ${res.status}`)
        const data = (await res.json()) as T
        if (!cancelled) setState({ status: 'ready', data })
      } catch {
        if (!cancelled) setState({ status: 'error' })
      }
    }

    load()

    if (!pollMs) return () => {
      cancelled = true
    }

    const id = setInterval(load, pollMs)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [url, pollMs])

  return state
}
