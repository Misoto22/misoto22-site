'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { staggerContainer, fadeInUp, ANIMATION, viewportConfig } from '@/lib/animation'

interface StaggerChildrenProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export default function StaggerChildren({
  children,
  className = '',
  staggerDelay = ANIMATION.stagger.normal,
}: StaggerChildrenProps) {
  return (
    <motion.div
      variants={{
        ...staggerContainer,
        visible: {
          transition: { staggerChildren: staggerDelay },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// 子元素包装器 — 用于 StaggerChildren 内部
export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={fadeInUp}
      transition={{ duration: ANIMATION.duration.slow, ease: ANIMATION.ease.out }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
