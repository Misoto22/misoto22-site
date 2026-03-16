'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, viewportConfig, ANIMATION } from '@/lib/animation'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  // 是否使用窄宽度（适合文字内容）
  narrow?: boolean
  // 是否全宽无内边距
  fullBleed?: boolean
  // 背景变体
  variant?: 'default' | 'elevated' | 'accent'
  // 是否启用入场动画
  animate?: boolean
}

export default function Section({
  children,
  className = '',
  id,
  narrow = false,
  fullBleed = false,
  variant = 'default',
  animate = true,
}: SectionProps) {
  const bgClasses = {
    default: '',
    elevated: 'bg-(--background-elevated)',
    accent: 'bg-(--accent-muted)',
  }

  const widthClasses = fullBleed
    ? ''
    : narrow
      ? 'max-w-3xl mx-auto px-6'
      : 'max-w-7xl mx-auto px-6'

  const content = (
    <section
      id={id}
      className={`py-16 md:py-24 ${bgClasses[variant]} ${widthClasses} ${className}`}
    >
      {children}
    </section>
  )

  if (!animate) return content

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={{ duration: ANIMATION.duration.slow, ease: ANIMATION.ease.out }}
    >
      {content}
    </motion.div>
  )
}
