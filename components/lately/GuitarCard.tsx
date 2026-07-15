import Image from 'next/image'
import { Guitar, ExternalLink } from 'lucide-react'
import { lately } from '@/lib/data'

export default function GuitarCard() {
  return (
    <div className="rounded-2xl border border-border bg-surface-raised p-4 shadow-sm transition-colors duration-200 hover:border-accent/40">
      <div className="flex items-center gap-2">
        <Guitar size={15} className="text-accent" aria-hidden="true" />
        <h3 className="font-playfair text-sm font-semibold text-ink">{lately.guitar.heading}</h3>
      </div>

      <div className="relative mt-3 aspect-[4/3] w-full overflow-hidden rounded-xl border border-border">
        <Image src={lately.guitar.image} alt={lately.guitar.imageAlt} fill sizes="200px" className="object-cover" />
      </div>

      <p className="mt-3 text-xs leading-5 text-ink-muted">{lately.guitar.sentence}</p>
      <p className="mt-2 text-xs font-medium text-ink">{lately.guitar.tiktokHandle}</p>

      <a
        href={lately.guitar.tiktokHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Watch ${lately.guitar.tiktokHandle}'s guitar covers on TikTok`}
        className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-ink transition-colors duration-150 hover:text-accent"
      >
        <ExternalLink size={12} aria-hidden="true" />
        {lately.guitar.cta}
      </a>
    </div>
  )
}
