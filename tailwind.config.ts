import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        surface: {
          DEFAULT: 'var(--color-surface)',
          raised: 'var(--color-surface-raised)',
        },
        ink: {
          DEFAULT: 'var(--color-ink)',
          muted: 'var(--color-ink-muted)',
          faint: 'var(--color-ink-faint)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          soft: 'var(--color-accent-soft)',
          strong: 'var(--color-accent-strong)',
        },
      },
      maxWidth: {
        content: '72rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'blob-move': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(4%, -6%) scale(1.05)' },
          '66%': { transform: 'translate(-3%, 4%) scale(0.97)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'blob-move': 'blob-move 22s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
