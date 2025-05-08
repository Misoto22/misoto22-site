'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import AnimatedSection from '@/components/AnimatedSection'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { SiUnsplash } from 'react-icons/si';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

export default function Home() {
  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="min-h-screen flex flex-col justify-center items-center bg-[var(--background)] px-4 pt-24 md:pt-32"
      >
        <div className="w-full max-w-6xl mx-auto px-6">
          {/* Hero Section */}
          <AnimatedSection className="relative flex flex-col items-center mb-16 w-full">
            {/* Greeting */}
            <h2 className="text-2xl md:text-3xl font-heading text-[var(--foreground)] mb-2 text-center">
              Hi, I&apos;m Henry Chen! <span className="inline-block">👋</span>
            </h2>
            {/* Illustration */}
            <div className="flex justify-center w-full mb-2">
              <Image
                src="/images/avatar/avatar.jpg"
                alt="Henry's Avatar"
                width={120}
                height={120}
                className="rounded-full w-28 h-28 md:w-36 md:h-36 border-4 border-[var(--border-color)] shadow-lg bg-[var(--card-background)]"
                priority
              />
            </div>
            {/* Identity Tags */}
            <div className="flex flex-col items-center gap-2 mt-2 mb-2">
              <span className="text-3xl md:text-5xl font-heading text-[var(--foreground)] flex items-center gap-2">
                Developer <span>👨‍💻</span>
              </span>
              <span className="text-3xl md:text-5xl font-heading text-[var(--foreground)] flex items-center gap-2">
                Photographer <span>📸</span>
              </span>
            </div>
            {/* Short Description */}
            <div className="mt-8 mb-8 flex flex-col items-center">
              <p className="text-lg md:text-xl font-heading text-[var(--foreground)] mb-2">
                Welcome to my personal page!
              </p>
              <p className="text-base md:text-lg text-[var(--foreground)] mb-1 leading-relaxed text-center max-w-2xl">
                I&apos;m a <span className="font-medium">fullstack developer & DevOps engineer</span> who loves building things that make my life easier.
              </p>
              <p className="text-base md:text-lg text-[var(--foreground)] leading-relaxed text-center max-w-2xl">
                I am also passionate about photography, capturing the beauty in everyday life.
              </p>
            </div>
            {/* CTA Button */}
            <motion.a
              href="/files/resume.pdf"
              className="mt-8 px-8 py-3 bg-[var(--foreground)] text-[var(--background)] rounded-full font-medium hover:opacity-90 transition-colors duration-300 shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download My Resume
            </motion.a>
          </AnimatedSection>
        </div>
      </motion.section>

      {/* My Skills Section */}
      <motion.section
        id="skills"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="min-h-screen flex flex-col justify-center items-center bg-[var(--background)] px-4 relative"
      >
        <div className="w-full max-w-6xl mx-auto px-6 scroll-mt-24">
          <AnimatedSection delay={0.1} className="w-full">
            <h2 className="text-3xl md:text-4xl font-heading mb-12 text-[var(--foreground)] text-center">
              My Skills
            </h2>
            
            {/* Fullstack Development */}
            <div className="mb-12">
              <div className="bg-[var(--card-background)] rounded-2xl p-8 shadow-lg border border-[var(--border-color)] hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-heading mb-6 text-[var(--foreground)] flex items-center gap-2">
                  <span>Fullstack Development</span>
                  <span className="text-sm font-normal text-[var(--secondary-text)]">(Core)</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <motion.div 
                    className="flex flex-col items-center group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image src="/icons/skills/react.svg" alt="React" width={48} height={48} className="mb-2 group-hover:brightness-110 transition-all duration-300" />
                    <span className="mt-2 text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--foreground)] transition-colors duration-300">React</span>
                  </motion.div>
                  <motion.div 
                    className="flex flex-col items-center group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image src="/icons/skills/nextjs.svg" alt="Next.js" width={48} height={48} className="mb-2 group-hover:brightness-110 transition-all duration-300" />
                    <span className="mt-2 text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--foreground)] transition-colors duration-300">Next.js</span>
                  </motion.div>
                  <motion.div 
                    className="flex flex-col items-center group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image src="/icons/skills/typescript.svg" alt="TypeScript" width={48} height={48} className="mb-2 group-hover:brightness-110 transition-all duration-300" />
                    <span className="mt-2 text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--foreground)] transition-colors duration-300">TypeScript</span>
                  </motion.div>
                  <motion.div 
                    className="flex flex-col items-center group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image src="/icons/skills/nodejs.svg" alt="Node.js" width={48} height={48} className="mb-2 group-hover:brightness-110 transition-all duration-300" />
                    <span className="mt-2 text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--foreground)] transition-colors duration-300">Node.js</span>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* DevOps & Cloud */}
            <div className="mb-12">
              <div className="bg-[var(--card-background)] rounded-2xl p-8 shadow-lg border border-[var(--border-color)] hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-heading mb-6 text-[var(--foreground)] flex items-center gap-2">
                  <span>DevOps & Cloud</span>
                  <span className="text-sm font-normal text-[var(--secondary-text)]">(Infrastructure)</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <motion.div 
                    className="flex flex-col items-center group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image src="/icons/skills/docker.svg" alt="Docker" width={48} height={48} className="mb-2 group-hover:brightness-110 transition-all duration-300" />
                    <span className="mt-2 text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--foreground)] transition-colors duration-300">Docker</span>
                  </motion.div>
                  <motion.div 
                    className="flex flex-col items-center group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image src="/icons/skills/aws.svg" alt="AWS" width={48} height={48} className="mb-2 group-hover:brightness-110 transition-all duration-300" />
                    <span className="mt-2 text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--foreground)] transition-colors duration-300">AWS</span>
                  </motion.div>
                  <motion.div 
                    className="flex flex-col items-center group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image src="/icons/skills/githubactions.svg" alt="GitHub Actions" width={48} height={48} className="mb-2 group-hover:brightness-110 transition-all duration-300" />
                    <span className="mt-2 text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--foreground)] transition-colors duration-300">GitHub Actions</span>
                  </motion.div>
                  <motion.div 
                    className="flex flex-col items-center group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image src="/icons/skills/vercel.svg" alt="Vercel" width={48} height={48} className="mb-2 group-hover:brightness-110 transition-all duration-300" />
                    <span className="mt-2 text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--foreground)] transition-colors duration-300">Vercel</span>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Data & ML */}
            <div className="mb-12">
              <div className="bg-[var(--card-background)] rounded-2xl p-8 shadow-lg border border-[var(--border-color)] hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl font-heading mb-6 text-[var(--foreground)] flex items-center gap-2">
                  <span>Data & ML</span>
                  <span className="text-sm font-normal text-[var(--secondary-text)]">(Research)</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <motion.div 
                    className="flex flex-col items-center group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image src="/icons/skills/python.svg" alt="Python" width={48} height={48} className="mb-2 group-hover:brightness-110 transition-all duration-300" />
                    <span className="mt-2 text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--foreground)] transition-colors duration-300">Python</span>
                  </motion.div>
                  <motion.div 
                    className="flex flex-col items-center group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image src="/icons/skills/pandas.svg" alt="Pandas" width={48} height={48} className="mb-2 group-hover:brightness-110 transition-all duration-300" />
                    <span className="mt-2 text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--foreground)] transition-colors duration-300">Pandas</span>
                  </motion.div>
                  <motion.div 
                    className="flex flex-col items-center group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image src="/icons/skills/postgresql.svg" alt="PostgreSQL" width={48} height={48} className="mb-2 group-hover:brightness-110 transition-all duration-300" />
                    <span className="mt-2 text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--foreground)] transition-colors duration-300">PostgreSQL</span>
                  </motion.div>
                  <motion.div 
                    className="flex flex-col items-center group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image src="/icons/skills/jupyter.svg" alt="Jupyter" width={48} height={48} className="mb-2 group-hover:brightness-110 transition-all duration-300" />
                    <span className="mt-2 text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--foreground)] transition-colors duration-300">Jupyter</span>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Creative Tools */}
            <div className="mb-12">
              <div className="bg-[var(--card-background)] rounded-2xl p-8 shadow-lg border border-[var(--border-color)] hover:shadow-xl transition-all duration-300 opacity-80">
                <h3 className="text-2xl font-heading mb-6 text-[var(--foreground)] flex items-center gap-2">
                  <span>Creative Tools</span>
                  <span className="text-sm font-normal text-[var(--secondary-text)]">(Hobby)</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <motion.div 
                    className="flex flex-col items-center group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image src="/icons/skills/lightroom.svg" alt="Lightroom" width={48} height={48} className="mb-2 group-hover:brightness-110 transition-all duration-300" />
                    <span className="mt-2 text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--foreground)] transition-colors duration-300">Lightroom</span>
                  </motion.div>
                  <motion.div 
                    className="flex flex-col items-center group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image src="/icons/skills/photoshop.svg" alt="Photoshop" width={48} height={48} className="mb-2 group-hover:brightness-110 transition-all duration-300" />
                    <span className="mt-2 text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--foreground)] transition-colors duration-300">Photoshop</span>
                  </motion.div>
                  <motion.div 
                    className="flex flex-col items-center group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image src="/icons/skills/figma.svg" alt="Figma" width={48} height={48} className="mb-2 group-hover:brightness-110 transition-all duration-300" />
                    <span className="mt-2 text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--foreground)] transition-colors duration-300">Figma</span>
                  </motion.div>
                  <motion.div 
                    className="flex flex-col items-center group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image src="/icons/skills/captureone.svg" alt="Capture One" width={48} height={48} className="mb-2 group-hover:brightness-110 transition-all duration-300" />
                    <span className="mt-2 text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--foreground)] transition-colors duration-300">Capture One</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </motion.section>

      {/* What do I do? Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full max-w-6xl mx-auto px-6 relative"
      >
        <AnimatedSection delay={0.2} className="w-full space-y-16">
          <div className="bg-[var(--card-background)] rounded-2xl p-8 shadow-lg border border-[var(--border-color)]">
            <h2 className="text-3xl md:text-4xl font-heading mb-8 text-[var(--foreground)] text-center">
              What do I do?
            </h2>
            <div className="space-y-6 text-[var(--foreground)]">
              <p className="leading-relaxed text-lg">
                <b>Professional Background:</b> As a Computer Science graduate, I combine technical expertise with practical problem-solving skills. My focus lies in full-stack development and DevOps engineering, where I leverage modern technologies to build efficient and scalable solutions.
              </p>
              <p className="leading-relaxed text-lg">
                Having spent four years in Sydney before moving to Perth, I&apos;ve developed a unique perspective that bridges different Australian cultures and professional environments. This experience has enriched my understanding of both technology and human interaction.
              </p>
              <p className="leading-relaxed text-lg">
                <b>Photography Passion:</b> My photography journey is driven by three main themes: the raw beauty of nature, the dynamic energy of urban landscapes, and the subtle moments of human connection. Through my lens, I aim to capture the interplay between these elements, documenting both the grand vistas of Western Australia and the intimate details of city life.
              </p>
              <div className="pt-4">
                <motion.a 
                  href="/photography" 
                  className="inline-flex items-center text-[var(--foreground)] hover:opacity-80 transition-colors duration-300 text-lg font-medium"
                  whileHover={{ x: 5 }}
                >
                  View My Photography
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </motion.div>
    </>
  )
}