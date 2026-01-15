'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import FadeInSlideUp from '@/components/animations/FadeInSlideUp'

import Card from '@/components/ui/Card'
import SkillsSection from '@/components/sections/SkillsSection'
import { FULL_NAME, PROFESSION, SECONDARY_PASSION } from '@/lib/constants'

export default function HomeClient() {
  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="min-h-screen flex flex-col justify-center items-center bg-(--background) px-4 pt-24 md:pt-32"
      >
        <div className="w-full max-w-6xl mx-auto px-6">
          {/* Hero Section */}
          <FadeInSlideUp className="relative flex flex-col items-center mb-16 w-full">
            {/* Greeting */}
            <h2 className="text-2xl md:text-3xl font-heading text-(--foreground) mb-2 text-center">
              Hi, I&apos;m {FULL_NAME}! <span className="inline-block">👋</span>
            </h2>
            {/* Illustration */}
            <div className="flex justify-center w-full mb-2">
              <Image
                src="/images/avatar/avatar.webp"
                alt="Henry's Avatar"
                width={120}
                height={120}
                className="rounded-full w-28 h-28 md:w-36 md:h-36 border-4 border-(--border-color) shadow-lg bg-(--card-background)"
                priority
              />
            </div>
            {/* Identity Tags */}
            <div className="flex flex-col items-center gap-2 mt-2 mb-2">
              <span className="text-3xl md:text-5xl font-heading text-(--foreground) flex items-center gap-2">
                Developer <span>👨‍💻</span>
              </span>
              <span className="text-3xl md:text-5xl font-heading text-(--foreground) flex items-center gap-2">
                Photographer <span>📸</span>
              </span>
            </div>
            {/* Short Description */}
            <div className="mt-8 mb-8 flex flex-col items-center">
              <p className="text-lg md:text-xl font-heading text-(--foreground) mb-2">
                Welcome to my personal page!
              </p>
              <p className="text-base md:text-lg text-(--foreground) mb-1 leading-relaxed text-center max-w-2xl">
                I&apos;m a <span className="font-medium">{PROFESSION}</span> who loves building things that make my life easier.
              </p>
              <p className="text-base md:text-lg text-(--foreground) leading-relaxed text-center max-w-2xl">
                I am also passionate about {SECONDARY_PASSION}, capturing the beauty in everyday life.
              </p>
            </div>
            {/* CTA Button */}
            <motion.a
              href="/files/resume.pdf"
              className="mt-8 px-8 py-3 bg-(--foreground) text-(--background) rounded-full font-medium hover:opacity-90 transition-colors duration-300 shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download My Resume
            </motion.a>
          </FadeInSlideUp>
        </div>
      </motion.section>

      <SkillsSection />

      {/* What do I do? Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full max-w-6xl mx-auto px-6 relative"
      >
        <Card width="full" delay={0.5} className="space-y-16">
          <h2 className="text-3xl md:text-4xl font-heading mb-8 text-(--foreground) text-center">
            What do I do?
          </h2>
          <div className="space-y-6 text-(--foreground)">
            <p className="leading-relaxed text-lg">
              <b>Professional Background:</b> As a Computer Science graduate, I combine technical expertise with practical problem-solving skills. My focus lies in full-stack development and DevOps engineering, where I leverage modern technologies to build efficient and scalable solutions.
            </p>
            <p className="leading-relaxed text-lg">
              Currently based in Sydney, I&apos;ve lived in different parts of Australia, which has given me a unique perspective that bridges diverse Australian cultures and professional environments. This experience has enriched my understanding of both technology and human interaction.
            </p>
            <p className="leading-relaxed text-lg">
              <b>Photography Passion:</b> My photography journey is driven by three main themes: the raw beauty of nature, the dynamic energy of urban landscapes, and the subtle moments of human connection. Through my lens, I aim to capture the interplay between these elements, documenting both the grand vistas across Australia and the intimate details of city life.
            </p>
            <div className="pt-4">
              <motion.a
                href="/photography"
                className="inline-flex items-center text-(--foreground) hover:opacity-80 transition-colors duration-300 text-lg font-medium"
                whileHover={{ x: 5 }}
              >
                View My Photography
                <span className="ml-2">↗</span>
              </motion.a>
            </div>
          </div>
        </Card>
      </motion.div>
    </>
  )
}
