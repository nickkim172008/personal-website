import Image from 'next/image'
import { Guitar, ExternalLink } from 'lucide-react'
import { hobbies } from '@/lib/data'

export default function GuitarCard() {
  return (
    <a
      href={hobbies.guitar.tiktokHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch ${hobbies.guitar.tiktokHandle}'s guitar covers on TikTok`}
      className="block rounded-2xl border border-border bg-surface-raised p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md md:h-[410px]"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Guitar size={15} className="text-accent" aria-hidden="true" />
          <h3 className="font-playfair text-sm font-semibold text-ink">{hobbies.guitar.heading}</h3>
        </div>
        <ExternalLink size={12} className="text-ink-faint" aria-hidden="true" />
      </div>

      <div className="relative mt-3 aspect-[4/3] w-full overflow-hidden rounded-xl border border-border">
        <Image src={hobbies.guitar.image} alt={hobbies.guitar.imageAlt} fill sizes="200px" className="object-cover" />
      </div>

      <p className="mt-3 text-xs leading-5 text-ink-muted">{hobbies.guitar.sentence}</p>
      <p className="mt-2 text-xs font-medium text-ink">{hobbies.guitar.tiktokHandle}</p>

      <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-ink">
        {hobbies.guitar.cta}
      </span>
    </a>
  )
}
