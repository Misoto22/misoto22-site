'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Masonry from 'react-masonry-css'
import ImageModal from '@/components/photography/ImageModal'
import { motion } from 'framer-motion'
import { fadeInUp, ANIMATION, viewportConfig } from '@/lib/animation'
import type { FrontendPhoto as Photo } from '@/lib/data'

interface PhotosData {
  photos: Photo[]
  hasMore: boolean
  totalCount: number
}

interface PhotographyClientProps {
  initialData: PhotosData
}

export default function PhotographyClient({ initialData }: PhotographyClientProps) {
  const [mounted, setMounted] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0)
  const [photos, setPhotos] = useState<Photo[]>(initialData.photos)
  const [hasMore, setHasMore] = useState(initialData.hasMore)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const breakpointColumnsObj = {
    default: 3,
    1200: 3,
    768: 2,
    480: 1,
  }

  const handlePhotoClick = (photo: Photo) => {
    const index = photos.findIndex((p) => p.id === photo.id)
    setSelectedPhoto(photo)
    setSelectedPhotoIndex(index)
    setModalOpen(true)
  }

  const handlePreviousPhoto = () => {
    if (selectedPhotoIndex > 0) {
      const newIndex = selectedPhotoIndex - 1
      setSelectedPhotoIndex(newIndex)
      setSelectedPhoto(photos[newIndex])
    }
  }

  const handleNextPhoto = () => {
    if (selectedPhotoIndex < photos.length - 1) {
      const newIndex = selectedPhotoIndex + 1
      setSelectedPhotoIndex(newIndex)
      setSelectedPhoto(photos[newIndex])
    }
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedPhoto(null)
  }

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    setError(null)

    try {
      const nextPage = currentPage + 1
      const response = await fetch(`/api/photos?page=${nextPage}&limit=8`)

      if (!response.ok) throw new Error('Failed to fetch photos')

      const data = await response.json()
      setPhotos((prev) => [...prev, ...data.photos])
      setHasMore(data.hasMore)
      setCurrentPage(nextPage)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more photos')
    } finally {
      setLoading(false)
    }
  }, [loading, hasMore, currentPage])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    const loadingElement = document.getElementById('loading-indicator')
    if (loadingElement) observer.observe(loadingElement)

    return () => {
      if (loadingElement) observer.unobserve(loadingElement)
    }
  }, [mounted, loading, hasMore, loadMore])

  return (
    <main className="pt-24 min-h-screen bg-(--background)">
      {/* Hero header — editorial style */}
      <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-16">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={{ duration: ANIMATION.duration.slow, ease: ANIMATION.ease.out }}
        >
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-(--foreground) mb-4">
            Photography
          </h1>
          <div className="w-12 h-px bg-(--accent) mb-4" />
          <p className="text-(--secondary-text) text-lg max-w-xl">
            Capturing the beauty of urban landscapes and natural wonders across Australia.
          </p>
        </motion.div>
      </div>

      {/* Full-bleed masonry grid */}
      <div className="px-2 md:px-4">
        {photos.length > 0 ? (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex w-full -ml-2 md:-ml-4"
            columnClassName="pl-2 md:pl-4 bg-clip-padding"
          >
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="mb-2 md:mb-4 relative cursor-pointer group"
                onClick={() => handlePhotoClick(photo)}
              >
                <div
                  className="relative w-full overflow-hidden rounded-sm bg-(--border-subtle)"
                  style={{ paddingBottom: `${(photo.height / photo.width) * 100}%` }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4="
                    className="object-cover transition-all duration-500 group-hover:brightness-105 group-hover:scale-[1.01]"
                    sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
                    style={{
                      opacity: 0,
                      transition: 'opacity 0.5s ease-in-out, filter 0.3s, transform 0.5s',
                    }}
                    onLoad={(event) => {
                      requestAnimationFrame(() => {
                        event.currentTarget.style.opacity = '1'
                      })
                    }}
                  />
                  {/* Hover caption */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-sm">{photo.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </Masonry>
        ) : (
          <div className="flex justify-center items-center min-h-[200px]">
            <p className="text-(--secondary-text)">No photos available at the moment.</p>
          </div>
        )}

        {/* Loading indicator */}
        {hasMore && (
          <div id="loading-indicator" className="flex justify-center items-center py-12">
            {loading ? (
              <div className="flex space-x-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-(--accent) animate-[pulse_1.5s_infinite]"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            ) : (
              <div className="h-8" />
            )}
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center py-8">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}
      </div>

      <ImageModal
        isOpen={modalOpen}
        photo={selectedPhoto}
        onClose={handleCloseModal}
        onPrevious={handlePreviousPhoto}
        onNext={handleNextPhoto}
        currentIndex={selectedPhotoIndex}
        totalCount={photos.length}
        hasPrevious={selectedPhotoIndex > 0}
        hasNext={selectedPhotoIndex < photos.length - 1}
      />
    </main>
  )
}
