'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ANIMATION } from '@/lib/animation'
import type { FrontendPhoto } from '@/lib/data'

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  photo: FrontendPhoto | null
  onPrevious: () => void
  onNext: () => void
  currentIndex: number
  totalCount: number
  hasPrevious: boolean
  hasNext: boolean
  photos: FrontendPhoto[]
}

// 切换方向动画 variants
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -200 : 200,
    opacity: 0,
    scale: 0.95,
  }),
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
  photos,
}) => {
  const [loaded, setLoaded] = useState(false)
  const [direction, setDirection] = useState(0)
  const [showExif, setShowExif] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // 缩放状态
  const [scale, setScale] = useState(1)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const translateStart = useRef({ x: 0, y: 0 })
  const lastTapTime = useRef(0)
  const imageContainerRef = useRef<HTMLDivElement>(null)

  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const isZoomed = scale > 1

  // 切换照片时重置状态
  useEffect(() => {
    setLoaded(false)
    setScale(1)
    setTranslate({ x: 0, y: 0 })
  }, [photo?.id])

  // 关闭时重置 EXIF 面板
  useEffect(() => {
    if (!isOpen) {
      setShowExif(false)
      setScale(1)
      setTranslate({ x: 0, y: 0 })
    }
  }, [isOpen])

  // 预加载相邻照片
  useEffect(() => {
    if (!isOpen || photos.length === 0) return

    const toPreload: string[] = []
    if (currentIndex > 0) toPreload.push(photos[currentIndex - 1].src)
    if (currentIndex < photos.length - 1) toPreload.push(photos[currentIndex + 1].src)

    toPreload.forEach((src) => {
      const img = new window.Image()
      img.src = src
    })
  }, [isOpen, currentIndex, photos])

  // 带方向的导航
  const navigatePrevious = useCallback(() => {
    if (isAnimating || !hasPrevious || isZoomed) return
    setDirection(-1)
    onPrevious()
  }, [isAnimating, hasPrevious, isZoomed, onPrevious])

  const navigateNext = useCallback(() => {
    if (isAnimating || !hasNext || isZoomed) return
    setDirection(1)
    onNext()
  }, [isAnimating, hasNext, isZoomed, onNext])

  // 双击缩放
  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    if (scale > 1) {
      setScale(1)
      setTranslate({ x: 0, y: 0 })
    } else {
      // 以点击位置为中心放大到 2x
      const rect = imageContainerRef.current?.getBoundingClientRect()
      if (rect) {
        const offsetX = e.clientX - rect.left - rect.width / 2
        const offsetY = e.clientY - rect.top - rect.height / 2
        setScale(2)
        setTranslate({ x: -offsetX, y: -offsetY })
      } else {
        setScale(2)
      }
    }
  }, [scale])

  // 滚轮缩放
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.stopPropagation()
    const delta = e.deltaY > 0 ? -0.2 : 0.2
    setScale((prev) => {
      const next = Math.min(3, Math.max(1, prev + delta))
      if (next <= 1) setTranslate({ x: 0, y: 0 })
      return next
    })
  }, [])

  // 拖拽平移（放大状态下）
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (!isZoomed) return
    e.preventDefault()
    setIsDragging(true)
    dragStart.current = { x: e.clientX, y: e.clientY }
    translateStart.current = { ...translate }
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }, [isZoomed, translate])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return
    const dx = e.clientX - dragStart.current.x
    const dy = e.clientY - dragStart.current.y
    setTranslate({
      x: translateStart.current.x + dx,
      y: translateStart.current.y + dy,
    })
  }, [isDragging])

  const handlePointerUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // 移动端双击检测
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const now = Date.now()
    if (now - lastTapTime.current < 300) {
      e.preventDefault()
      // 模拟双击
      if (scale > 1) {
        setScale(1)
        setTranslate({ x: 0, y: 0 })
      } else {
        setScale(2)
      }
    }
    lastTapTime.current = now
  }, [scale])

  // Focus trap + keyboard handling
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled])'
      )
      if (!focusable || focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
      return
    }

    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault()
      e.stopPropagation()
    }
    if (e.key === 'Escape') {
      if (isZoomed) {
        setScale(1)
        setTranslate({ x: 0, y: 0 })
      } else {
        onClose()
      }
    } else if (e.key === 'ArrowLeft') navigatePrevious()
    else if (e.key === 'ArrowRight') navigateNext()
    else if (e.key === 'i') setShowExif((prev) => !prev)
  }, [onClose, navigatePrevious, navigateNext, isZoomed])

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown, true)
      setTimeout(() => closeButtonRef.current?.focus(), 50)
    }
    return () => window.removeEventListener('keydown', handleKeyDown, true)
  }, [isOpen, handleKeyDown])

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

  // 检查是否有 EXIF 数据
  const hasExifData = photo && (photo.camera || photo.lens || photo.focalLength || photo.aperture || photo.shutterSpeed || photo.iso)

  return (
    <AnimatePresence>
      {isOpen && photo && (
        <motion.div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label={photo.alt}
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
              {/* Prev / Next 边缘热区 */}
              {hasPrevious && !isZoomed && (
                <button
                  onClick={navigatePrevious}
                  disabled={isAnimating}
                  className="absolute left-0 inset-y-0 w-16 md:w-24 z-20 flex items-center justify-start pl-2 md:pl-4 text-white/40 hover:text-white transition-colors duration-200 disabled:opacity-20"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {hasNext && !isZoomed && (
                <button
                  onClick={navigateNext}
                  disabled={isAnimating}
                  className="absolute right-0 inset-y-0 w-16 md:w-24 z-20 flex items-center justify-end pr-2 md:pr-4 text-white/40 hover:text-white transition-colors duration-200 disabled:opacity-20"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}

              {/* Close button */}
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="absolute top-0 right-0 z-30 p-3 text-white/50 hover:text-white transition-colors duration-200"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* 底部工具栏：计数器 + EXIF 按钮 */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4">
                <span className="text-white/50 font-mono text-xs tracking-widest">
                  {currentIndex + 1} / {totalCount}
                </span>
                {hasExifData && (
                  <button
                    onClick={() => setShowExif((prev) => !prev)}
                    className={`text-xs font-mono tracking-wider transition-colors duration-200 ${
                      showExif ? 'text-white' : 'text-white/40 hover:text-white/70'
                    }`}
                    aria-label="Toggle EXIF info"
                    title="Toggle EXIF info (i)"
                  >
                    INFO
                  </button>
                )}
              </div>

              {/* 缩放提示 */}
              {isZoomed && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 text-white/40 font-mono text-xs tracking-widest">
                  {Math.round(scale * 100)}%
                </div>
              )}

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

              {/* 带切换动画的图片 */}
              <AnimatePresence
                initial={false}
                custom={direction}
                mode="popLayout"
                onExitComplete={() => setIsAnimating(false)}
              >
                <motion.div
                  key={photo.id}
                  ref={imageContainerRef}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.2 },
                  }}
                  onAnimationStart={() => setIsAnimating(true)}
                  onAnimationComplete={() => setIsAnimating(false)}
                  className="flex items-center justify-center select-none"
                  style={{
                    transform: `scale(${scale}) translate(${translate.x / scale}px, ${translate.y / scale}px)`,
                    cursor: isZoomed ? (isDragging ? 'grabbing' : 'grab') : 'default',
                  }}
                  onDoubleClick={handleDoubleClick}
                  onWheel={handleWheel}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onTouchEnd={handleTouchEnd}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    className={`max-w-full max-h-[85vh] object-contain transition-opacity duration-300 pointer-events-none ${
                      loaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setLoaded(true)}
                    priority
                    draggable={false}
                  />
                </motion.div>
              </AnimatePresence>

              {/* EXIF 信息面板 */}
              <AnimatePresence>
                {showExif && hasExifData && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: ANIMATION.duration.fast }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 bg-black/80 backdrop-blur-sm rounded-lg px-5 py-3 border border-white/10"
                  >
                    <div className="flex items-center gap-5 text-white/70 font-mono text-xs tracking-wide whitespace-nowrap">
                      {photo.camera && (
                        <span className="flex items-center gap-1.5">
                          <CameraIcon />
                          {photo.camera}
                        </span>
                      )}
                      {photo.lens && (
                        <span className="flex items-center gap-1.5">
                          <LensIcon />
                          {photo.lens}
                        </span>
                      )}
                      {photo.focalLength && (
                        <span>{photo.focalLength}</span>
                      )}
                      {photo.aperture && (
                        <span>ƒ/{photo.aperture}</span>
                      )}
                      {photo.shutterSpeed && (
                        <span>{photo.shutterSpeed}s</span>
                      )}
                      {photo.iso && (
                        <span>ISO {photo.iso}</span>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// 小图标组件
function CameraIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
    </svg>
  )
}

function LensIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
      <circle cx="12" cy="12" r="4" strokeWidth={1.5} />
    </svg>
  )
}

export default ImageModal
