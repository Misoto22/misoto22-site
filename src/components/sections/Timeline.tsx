'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, ANIMATION, viewportConfig } from '@/lib/animation'

interface TimelineProps {
  children: ReactNode
}

export function Timeline({ children }: TimelineProps) {
  return (
    <div className="relative">
      {/* 垂直连接线 */}
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-(--border-color)" />
      <div className="space-y-12">{children}</div>
    </div>
  )
}

interface TimelineItemProps {
  children: ReactNode
  index?: number
}

export function TimelineItem({ children, index = 0 }: TimelineItemProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={{
        duration: ANIMATION.duration.slow,
        delay: index * 0.08,
        ease: ANIMATION.ease.out,
      }}
      className="relative pl-12 md:pl-20"
    >
      {/* 时间线节点 */}
      <div className="absolute left-2.5 md:left-6.5 top-2 w-3 h-3 rounded-full bg-(--accent) border-2 border-(--background)" />
      {children}
    </motion.div>
  )
}
