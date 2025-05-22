'use client'

/**
 * A wrapper component that adds fade-in and slide-up animations to its children
 */

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeInSlideUpProps {
  // Content to be animated
  children: ReactNode
  // Animation delay in seconds
  delay?: number
  // Custom CSS classes
  className?: string
}

/**
 * FadeInSlideUp component that wraps content with a fade-in and slide-up animation
 * 
 * @param {FadeInSlideUpProps} props - Component props
 * @returns {JSX.Element} Animated wrapper component
 */
export default function FadeInSlideUp({ children, delay = 0, className = '' }: FadeInSlideUpProps) {
  return (
    <motion.div
      // Start: invisible, 20px below
      initial={{ opacity: 0, y: 20 }}
      // End: visible, in position
      animate={{ opacity: 1, y: 0 }}
      // 0.6s duration
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
} 