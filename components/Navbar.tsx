import { Github, Linkedin } from 'lucide-react'

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.766l7.73-8.835L1.254 2.25H8.08l4.259 5.629L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  )
}

const navLinks = [
  { href: '#about', label: 'about' },
  { href: '#experience', label: 'experience' },
  { href: '#projects', label: 'projects' },
]

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 flex items-center justify-between backdrop-blur-md bg-[#FAF7F2]/80 border-b border-[#E5E0D8]/60">
      <div className="flex items-center gap-5 md:gap-8">
        {navLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm text-[#7A7570] hover:text-[#2C2A27] transition-colors duration-150"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <a
          href="https://github.com/YOUR_GITHUB_USERNAME"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-[#7A7570] hover:text-[#2C2A27] transition-colors duration-150"
        >
          <Github size={18} />
        </a>
        <a
          href="https://x.com/YOUR_X_HANDLE"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X (Twitter)"
          className="text-[#7A7570] hover:text-[#2C2A27] transition-colors duration-150"
        >
          <XIcon />
        </a>
        <a
          href="https://linkedin.com/in/YOUR_LINKEDIN"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-[#7A7570] hover:text-[#2C2A27] transition-colors duration-150"
        >
          <Linkedin size={18} />
        </a>
      </div>
    </nav>
  )
}
