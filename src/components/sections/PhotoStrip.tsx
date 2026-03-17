'use client'

import Image from 'next/image'
import { Link } from 'next-view-transitions'

interface PhotoStripProps {
  photos: { id: string; src: string; width: number; height: number; alt: string }[]
}

export default function PhotoStrip({ photos }: PhotoStripProps) {
  if (photos.length === 0) return null

  // 双倍照片实现无缝循环
  const doubledPhotos = [...photos, ...photos]

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="relative group">
        <div
          className="flex gap-4 animate-[scroll_40s_linear_infinite] group-hover:[animation-play-state:paused]"
          style={{ width: 'max-content' }}
        >
          {doubledPhotos.map((photo, index) => (
            <div
              key={`${photo.id}-${index}`}
              className="relative flex-shrink-0 h-44 sm:h-64 md:h-80 rounded-lg overflow-hidden"
              style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 280px, 360px"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-6 flex items-center">
        <Link
          href="/photography"
          className="text-sm text-(--secondary-text) hover:text-(--foreground) transition-colors duration-200 flex items-center gap-2"
        >
          <span className="font-mono text-xs uppercase tracking-widest">Photography</span>
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  )
}
