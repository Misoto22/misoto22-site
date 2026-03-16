'use client'

import { motion } from 'framer-motion'
import { ANIMATION, viewportConfig } from '@/lib/animation'

interface TextRevealProps {
  text: string
  className?: string
  staggerDelay?: number
}

export default function TextReveal({
  text,
  className = '',
  staggerDelay = 0.06,
}: TextRevealProps) {
  const words = text.split(' ')

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{
              duration: ANIMATION.duration.slow,
              ease: ANIMATION.ease.out,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
