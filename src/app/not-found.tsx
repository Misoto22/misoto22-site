'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeInUp, ANIMATION, staggerContainer } from '@/lib/animation'

export default function NotFound() {
  return (
    <section className="pt-24 min-h-screen bg-(--background) flex flex-col justify-center">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto px-6"
      >
        <motion.h1
          variants={fadeInUp}
          transition={{ duration: ANIMATION.duration.slower, ease: ANIMATION.ease.out }}
          className="font-heading text-6xl md:text-8xl lg:text-9xl text-(--foreground) mb-4"
        >
          404
        </motion.h1>

        <motion.h2
          variants={fadeInUp}
          transition={{ duration: ANIMATION.duration.slow, ease: ANIMATION.ease.out }}
          className="font-heading text-2xl md:text-3xl text-(--foreground) mb-4"
        >
          Page not found
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          transition={{ duration: ANIMATION.duration.slow, ease: ANIMATION.ease.out }}
          className="text-(--secondary-text) text-lg mb-10 leading-relaxed"
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          transition={{ duration: ANIMATION.duration.slow, ease: ANIMATION.ease.out }}
        >
          <Link
            href="/"
            className="text-sm text-(--foreground) underline underline-offset-4 decoration-(--border-color) hover:decoration-(--foreground) transition-colors duration-200"
          >
            &larr; Return home
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
