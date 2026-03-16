'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { fadeInUp, ANIMATION, viewportConfig } from '@/lib/animation'

interface FadeInSlideUpProps {
  children: ReactNode
  delay?: number
  className?: string
}

export default function FadeInSlideUp({ children, delay = 0, className = '' }: FadeInSlideUpProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={{
        duration: ANIMATION.duration.slow,
        delay,
        ease: ANIMATION.ease.out,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
} 