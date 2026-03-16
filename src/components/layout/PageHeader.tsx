'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, ANIMATION, viewportConfig } from '@/lib/animation'

interface PageHeaderProps {
  title: string
  description: string
  showDivider?: boolean
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  showDivider = true,
}) => {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={{ duration: ANIMATION.duration.slow, ease: ANIMATION.ease.out }}
      className="mb-16 md:mb-20"
    >
      <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-(--foreground) mb-4">
        {title}
      </h1>
      {showDivider && <div className="w-12 h-px bg-(--accent) mb-4" />}
      <p className="text-(--secondary-text) text-lg max-w-2xl">
        {description}
      </p>
    </motion.div>
  )
}

export default PageHeader
