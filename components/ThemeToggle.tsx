'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={mounted ? `Switch to ${isDark ? 'light' : 'dark'} mode` : 'Toggle theme'}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink-muted transition-colors duration-150 hover:border-accent hover:text-ink"
    >
      {mounted && isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
