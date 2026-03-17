'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ANIMATION } from '@/lib/animation'

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  photo: {
    id: string
    src: string
    width: number
    height: number
    alt: string
  } | null
  onPrevious: () => void
  onNext: () => void
  currentIndex: number
  totalCount: number
  hasPrevious: boolean
  hasNext: boolean
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  photo,
  onPrevious,
  onNext,
  currentIndex,
  totalCount,
  hasPrevious,
  hasNext,
}) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(false)
  }, [photo])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault()
        e.stopPropagation()
      }
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft' && hasPrevious) onPrevious()
      else if (e.key === 'ArrowRight' && hasNext) onNext()
    }

    if (isOpen) window.addEventListener('keydown', handleKeyDown, true)
    return () => window.removeEventListener('keydown', handleKeyDown, true)
  }, [isOpen, onClose, onPrevious, onNext, hasPrevious, hasNext])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.setAttribute('data-modal-open', 'true')
    } else {
      document.body.style.overflow = ''
      document.body.removeAttribute('data-modal-open')
    }
    return () => {
      document.body.style.overflow = ''
      document.body.removeAttribute('data-modal-open')
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: ANIMATION.duration.normal }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={onClose}
        >
          {/* Dark backdrop */}
          <div className="absolute inset-0 bg-black/95" />

          <div
            className="relative z-10 flex items-center justify-center w-full h-full px-4 py-4 md:px-16 md:py-12"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-w-[95vw] max-h-[90vh] md:max-w-[85vw] md:max-h-[85vh] flex items-center justify-center">
              {/* Prev / Next as edge hotspots */}
              {hasPrevious && (
                <button
                  onClick={onPrevious}
                  className="absolute left-0 inset-y-0 w-16 md:w-24 z-20 flex items-center justify-start pl-2 md:pl-4 text-white/40 hover:text-white transition-colors duration-200"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {hasNext && (
                <button
                  onClick={onNext}
                  className="absolute right-0 inset-y-0 w-16 md:w-24 z-20 flex items-center justify-end pr-2 md:pr-4 text-white/40 hover:text-white transition-colors duration-200"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-0 right-0 z-30 p-3 text-white/50 hover:text-white transition-colors duration-200"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Counter */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 text-white/50 font-mono text-xs tracking-widest">
                {currentIndex + 1} / {totalCount}
              </div>

              {/* Loading */}
              {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex space-x-2">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-white/40 animate-[pulse_1.5s_infinite]"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Image */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: ANIMATION.duration.normal, ease: ANIMATION.ease.out }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  className={`max-w-full max-h-[85vh] object-contain transition-opacity duration-300 ${
                    loaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setLoaded(true)}
                  priority
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ImageModal
