'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface ParallaxImageProps {
  children: ReactNode
  className?: string
  // 视差强度（像素偏移量）
  offset?: number
}

export default function ParallaxImage({
  children,
  className = '',
  offset = 50,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset])

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="relative w-full h-full">
        {children}
      </motion.div>
    </div>
  )
}
