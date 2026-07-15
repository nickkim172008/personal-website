'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Github, Linkedin, FileText, Menu, X } from 'lucide-react'
import { navLinks, socialLinks, site } from '@/lib/data'
import { useActiveSection } from '@/lib/useActiveSection'
import ThemeToggle from './ThemeToggle'

const sectionIds = navLinks.map(link => link.href.replace('#', ''))

const iconFor = {
  github: Github,
  linkedin: Linkedin,
  resume: FileText,
  email: FileText,
} as const

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const activeId = useActiveSection(sectionIds)

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }

  function handleLogoClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-surface/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4 md:px-10">
        <nav className="flex items-center gap-6 md:gap-8" aria-label="Primary">
          <a
            href="#top"
            onClick={handleLogoClick}
            className="group relative inline-flex items-center font-playfair text-lg font-bold tracking-tight text-ink"
          >
            <span className="opacity-100 transition-opacity duration-300 ease-out group-hover:opacity-0">
              {site.name}
            </span>
            <span className="absolute inset-y-0 left-0 flex items-center opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
              <Image
                src="/images/korea-flag.png"
                alt={site.name}
                width={36}
                height={24}
                className="rounded-[2px] shadow-sm"
              />
            </span>
          </a>

          <ul className="hidden items-center gap-6 md:flex">
            {navLinks.map(link => {
              const id = link.href.replace('#', '')
              const isActive = activeId === id
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={e => handleNavClick(e, link.href)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`text-sm transition-colors duration-150 ${
                      isActive ? 'text-ink font-medium' : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-4 md:flex">
            {socialLinks.map(link => {
              const Icon = iconFor[link.icon]
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.icon === 'resume' ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-ink-muted transition-colors duration-150 hover:text-ink"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              )
            })}
          </div>

          <ThemeToggle />

          <button
            type="button"
            className="text-ink md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(open => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-border/60 bg-surface/95 px-6 py-6 backdrop-blur-md md:hidden"
        >
          <ul className="flex flex-col gap-4">
            {navLinks.map(link => {
              const id = link.href.replace('#', '')
              const isActive = activeId === id
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={e => handleNavClick(e, link.href)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`text-base ${isActive ? 'text-ink font-medium' : 'text-ink-muted'}`}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="mt-6 flex items-center gap-5 border-t border-border/60 pt-6">
            {socialLinks.map(link => {
              const Icon = iconFor[link.icon]
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.icon === 'resume' ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex items-center gap-2 text-sm text-ink-muted"
                >
                  <Icon size={16} aria-hidden="true" />
                  {link.label}
                </a>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
