import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import ThemeProvider from '@/components/ThemeProvider'
import { site } from '@/lib/data'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: `${site.name} — Portfolio (Placeholder)`,
  description: site.description,
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: `${site.name} — Portfolio (Placeholder)`,
    description: site.description,
    type: 'website',
    images: ['/images/og-placeholder.svg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Portfolio (Placeholder)`,
    description: site.description,
    images: ['/images/og-placeholder.svg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-surface font-inter text-ink antialiased transition-colors duration-300">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
