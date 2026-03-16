'use client'

import { motion } from 'framer-motion'
import { fadeInUp, ANIMATION, viewportConfig } from '@/lib/animation'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  className?: string
}

export default function SectionHeading({ title, subtitle, className = '' }: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={{ duration: ANIMATION.duration.slow, ease: ANIMATION.ease.out }}
      className={`mb-12 md:mb-16 ${className}`}
    >
      <h2 className="font-heading text-3xl md:text-4xl text-(--foreground) mb-3">
        {title}
      </h2>
      <div className="w-12 h-px bg-(--accent) mb-4" />
      {subtitle && (
        <p className="text-(--secondary-text) text-lg max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
