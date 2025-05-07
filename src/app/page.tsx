'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import AnimatedSection from '@/components/AnimatedSection'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { SiUnsplash } from 'react-icons/si';

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
        <div className="w-full flex flex-col items-center">
          {/* Hero Section */}
          <AnimatedSection className="relative flex flex-col items-center mb-16 w-full">
            {/* Greeting */}
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--foreground)] mb-2 text-center">
              Hi, I'm Henry Chen! <span className="inline-block">👋</span>
            </h2>
            {/* Illustration */}
            <div className="flex justify-center w-full mb-2">
              <Image
                src="/images/avatar/avatar.jpg"
                alt="Henry's Avatar"
                width={120}
                height={120}
                className="rounded-full w-28 h-28 md:w-36 md:h-36 border-4 border-gray-200 shadow-lg bg-white"
                priority
              />
            </div>
            {/* Identity Tags */}
            <div className="flex flex-col items-center gap-2 mt-2 mb-2">
              <span className="text-3xl md:text-5xl font-medium text-[var(--foreground)] flex items-center gap-2">
                Developer <span>👨‍💻</span>
              </span>
              <span className="text-3xl md:text-5xl font-medium text-[var(--foreground)] flex items-center gap-2">
                Photographer <span>📸</span>
              </span>
            </div>
            {/* Short Description */}
            <div className="mt-8 mb-8 flex flex-col items-center">
              <p className="text-lg md:text-xl font-semibold text-[var(--foreground)] mb-2">
                Welcome to my personal page!
              </p>
              <p className="text-base md:text-lg text-[var(--muted-foreground)] mb-1 leading-relaxed text-center max-w-2xl">
                I&apos;m a <span className="font-medium">fullstack developer & DevOps engineer</span> who loves building things that make my life easier.
              </p>
              <p className="text-base md:text-lg text-[var(--muted-foreground)] leading-relaxed text-center max-w-2xl">
                I am also passionate about photography, capturing the beauty in everyday life.
              </p>
            </div>
            {/* Social Icons */}
            <div className="w-full flex flex-col items-center gap-y-8 mt-6 mb-10 md:flex-row md:justify-center md:gap-10">
              {/* 第一行：移动端前2个，桌面端隐藏 */}
              <div className="flex justify-center gap-12 w-full md:hidden">
                {/* GitHub */}
                <a href="https://github.com/Misoto22" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:scale-110 transition-transform">
                  <span className="bg-gray-900 rounded-full flex items-center justify-center w-12 h-12">
                    <FaGithub size={28} color="#fff" />
                  </span>
                </a>
                {/* LinkedIn */}
                <a href="https://linkedin.com/in/henry-misoto22" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:scale-110 transition-transform">
                  <span className="bg-[#0077B5] rounded-full flex items-center justify-center w-12 h-12">
                    <FaLinkedin size={28} color="#fff" />
                  </span>
                </a>
              </div>
              {/* 第二行：移动端后3个，桌面端隐藏 */}
              <div className="flex justify-center gap-12 w-full md:hidden">
                {/* Email */}
                <a href="mailto:cxw8848@hotmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email" className="hover:scale-110 transition-transform">
                  <span className="bg-yellow-400 rounded-full flex items-center justify-center w-12 h-12">
                    <MdEmail size={28} color="#fff" />
                  </span>
                </a>
                {/* Instagram */}
                <a href="https://instagram.com/hry.photography" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:scale-110 transition-transform">
                  <span className="bg-pink-500 rounded-full flex items-center justify-center w-12 h-12">
                    <FaInstagram size={28} color="#fff" />
                  </span>
                </a>
                {/* Unsplash */}
                <a href="https://unsplash.com/@misoto22" target="_blank" rel="noopener noreferrer" aria-label="Unsplash" className="hover:scale-110 transition-transform">
                  <span className="bg-black rounded-full flex items-center justify-center w-12 h-12">
                    <SiUnsplash size={24} color="#fff" />
                  </span>
                </a>
              </div>
              {/* 桌面端一行5个，移动端隐藏 */}
              <div className="hidden md:flex justify-center gap-10 w-full">
                {/* GitHub */}
                <a href="https://github.com/Misoto22" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:scale-110 transition-transform">
                  <span className="bg-gray-900 rounded-full flex items-center justify-center w-12 h-12">
                    <FaGithub size={28} color="#fff" />
                  </span>
                </a>
                {/* LinkedIn */}
                <a href="https://linkedin.com/in/henry-misoto22" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:scale-110 transition-transform">
                  <span className="bg-[#0077B5] rounded-full flex items-center justify-center w-12 h-12">
                    <FaLinkedin size={28} color="#fff" />
                  </span>
                </a>
                {/* Email */}
                <a href="mailto:cxw8848@hotmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email" className="hover:scale-110 transition-transform">
                  <span className="bg-yellow-400 rounded-full flex items-center justify-center w-12 h-12">
                    <MdEmail size={28} color="#fff" />
                  </span>
                </a>
                {/* Instagram */}
                <a href="https://instagram.com/hry.photography" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:scale-110 transition-transform">
                  <span className="bg-pink-500 rounded-full flex items-center justify-center w-12 h-12">
                    <FaInstagram size={28} color="#fff" />
                  </span>
                </a>
                {/* Unsplash */}
                <a href="https://unsplash.com/@misoto22" target="_blank" rel="noopener noreferrer" aria-label="Unsplash" className="hover:scale-110 transition-transform">
                  <span className="bg-black rounded-full flex items-center justify-center w-12 h-12">
                    <SiUnsplash size={24} color="#fff" />
                  </span>
                </a>
              </div>
            </div>
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
        className="min-h-screen flex flex-col justify-center items-center bg-[var(--background)] px-4"
      >
        <div className="w-full max-w-2xl scroll-mt-24">
          <AnimatedSection delay={0.1} className="w-full">
            <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-[var(--foreground)] text-center">
              My Skills
            </h2>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-center">Web Development</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
                <div className="flex flex-col items-center">
                  <Image src="/icons/skills/react.svg" alt="React" width={40} height={40} />
                  <span className="mt-2 text-sm">React</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/skills/nextjs.svg" alt="Next.js" width={40} height={40} />
                  <span className="mt-2 text-sm">Next.js</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/skills/typescript.svg" alt="TypeScript" width={40} height={40} />
                  <span className="mt-2 text-sm">TypeScript</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/skills/javascript.svg" alt="JavaScript" width={40} height={40} />
                  <span className="mt-2 text-sm">JavaScript</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/skills/html5.svg" alt="HTML5" width={40} height={40} />
                  <span className="mt-2 text-sm">HTML5</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/skills/tailwind.svg" alt="Tailwind CSS" width={40} height={40} />
                  <span className="mt-2 text-sm">Tailwind CSS</span>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-center">Backend Development</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
                <div className="flex flex-col items-center">
                  <Image src="/icons/skills/python.svg" alt="Python" width={40} height={40} />
                  <span className="mt-2 text-sm">Python</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/skills/java.svg" alt="Java" width={40} height={40} />
                  <span className="mt-2 text-sm">Java</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/skills/c.svg" alt="C" width={40} height={40} />
                  <span className="mt-2 text-sm">C</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/skills/nodejs.svg" alt="Node.js" width={40} height={40} />
                  <span className="mt-2 text-sm">Node.js</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/skills/flask.svg" alt="Flask" width={40} height={40} />
                  <span className="mt-2 text-sm">Flask</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/skills/git.svg" alt="Git" width={40} height={40} />
                  <span className="mt-2 text-sm">Git</span>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-center">Data Analysis</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
                <div className="flex flex-col items-center">
                  <Image src="/icons/skills/r.svg" alt="R" width={40} height={40} />
                  <span className="mt-2 text-sm">R</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/skills/python.svg" alt="Python" width={40} height={40} />
                  <span className="mt-2 text-sm">Python</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/skills/pandas.svg" alt="Pandas" width={40} height={40} />
                  <span className="mt-2 text-sm">Pandas</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/skills/excel.svg" alt="Excel" width={40} height={40} />
                  <span className="mt-2 text-sm">Excel</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/skills/postgresql.svg" alt="PostgreSQL" width={40} height={40} />
                  <span className="mt-2 text-sm">PostgreSQL</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/skills/jupyter.svg" alt="Jupyter" width={40} height={40} />
                  <span className="mt-2 text-sm">Jupyter</span>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-center">DevOps & Cloud</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
                <div className="flex flex-col items-center">
                  <Image src="/icons/skills/docker.svg" alt="Docker" width={40} height={40} />
                  <span className="mt-2 text-sm">Docker</span>
                </div>
                <div className="w-16 flex flex-col items-center justify-center">
                  <Image src="/icons/skills/githubactions.svg" alt="GitHub Actions" width={40} height={40} className="ml-3" />
                  <span className="mt-2 text-sm">GitHub Actions</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/skills/aws.svg" alt="AWS" width={40} height={40} />
                  <span className="mt-2 text-sm">AWS</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/skills/firebase.svg" alt="Firebase" width={40} height={40} />
                  <span className="mt-2 text-sm">Firebase</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/skills/bash.svg" alt="Bash" width={40} height={40} />
                  <span className="mt-2 text-sm">Bash</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/skills/vercel.svg" alt="Vercel" width={40} height={40} />
                  <span className="mt-2 text-sm">Vercel</span>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-center">Creative Tools</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
                <div className="flex flex-col items-center">
                  <Image src="/icons/skills/lightroom.svg" alt="Lightroom" width={40} height={40} />
                  <span className="mt-2 text-sm">Lightroom</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/skills/photoshop.svg" alt="Photoshop" width={40} height={40} />
                  <span className="mt-2 text-sm">Photoshop</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/skills/figma.svg" alt="Figma" width={40} height={40} />
                  <span className="mt-2 text-sm">Figma</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/skills/captureone.svg" alt="Capture One" width={40} height={40} />
                  <span className="mt-2 text-sm">Capture One</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/skills/finalcutpro.svg" alt="Final Cut Pro" width={40} height={40} />
                  <span className="mt-2 text-sm">Final Cut Pro</span>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-center">Documentation</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
                <div className="flex flex-col items-center">
                  <Image src="/icons/skills/markdown.svg" alt="Markdown" width={40} height={40} />
                  <span className="mt-2 text-sm">Markdown</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/skills/latex.svg" alt="LaTeX" width={40} height={40} />
                  <span className="mt-2 text-sm">LaTeX</span>
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
        className="w-full max-w-2xl mx-auto space-y-16 px-4 md:px-0"
      >
        <AnimatedSection delay={0.2} className="w-full max-w-2xl mx-auto space-y-16 px-4 md:px-0">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-[var(--foreground)] text-center">
              What do I do?
            </h2>
            <div className="space-y-6 text-[var(--muted-foreground)]">
              <p className="leading-relaxed text-lg">
                <b className="text-gray-700 dark:text-white">Academic Journey:</b> Currently pursuing my degree in Computer Science, I bring a technical mindset to everything I do. My academic focus lies in software development and artificial intelligence, where I combine theoretical knowledge with practical applications.
              </p>
              <p className="leading-relaxed text-lg">
                Having spent four years in Sydney before moving to Perth, I&apos;ve developed a unique perspective that bridges different Australian cultures and academic environments. This experience has enriched my understanding of both technology and human interaction.
              </p>
              <p className="leading-relaxed text-lg">
                <b className="text-gray-700 dark:text-white">Photography Passion:</b> My photography journey is driven by three main themes: the raw beauty of nature, the dynamic energy of urban landscapes, and the subtle moments of human connection. Through my lens, I aim to capture the interplay between these elements, documenting both the grand vistas of Western Australia and the intimate details of city life.
              </p>
              <div className="pt-4">
                <motion.a 
                  href="/photography" 
                  className="inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-300 text-lg font-medium"
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