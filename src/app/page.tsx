'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import AnimatedSection from '@/components/AnimatedSection'

export default function Home() {
  return (
    <section className="pt-24 min-h-screen bg-gradient-to-b from-[var(--background)] to-[var(--background-secondary)] flex flex-col items-center px-4">
      <div className="w-full flex flex-col items-center">
        {/* Hero Section */}
        <AnimatedSection className="relative flex flex-col items-center mb-16 w-full">
          {/* Illustration */}
          <div className="flex justify-center w-full">
            <Image
              src="/illustration.png"
              alt="Coding Illustration"
              width={320}
              height={220}
              className="rounded-lg w-40 h-auto md:w-80"
              priority
            />
          </div>
          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-wide text-[var(--foreground)] mt-4 bg-[var(--background)] px-6 py-3 rounded-lg z-10">
            Henry Chen
          </h1>
          {/* Subtitle */}
          <p className="text-lg md:text-2xl text-[#333] mt-6 max-w-2xl text-center leading-relaxed">
            A Computer Science student and photographer capturing the beauty of Western Australia through code and lens.
          </p>
          {/* CTA Button */}
          <motion.a
            href="/resume.pdf"
            className="mt-8 px-8 py-3 bg-gray-800 text-white rounded-full font-medium hover:bg-gray-700 transition-colors duration-300 shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download My Resume
          </motion.a>
        </AnimatedSection>

        {/* My Skills Section */}
        <div id="skills" className="w-full max-w-2xl my-16 scroll-mt-24">
          <AnimatedSection delay={0.1} className="w-full">
            <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-[var(--foreground)] text-center">
              My Skills
            </h2>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-center">Web Development</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
                <div className="flex flex-col items-center">
                  <Image src="/icons/react.svg" alt="React" width={40} height={40} />
                  <span className="mt-2 text-sm">React</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/nextjs.svg" alt="Next.js" width={40} height={40} />
                  <span className="mt-2 text-sm">Next.js</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/typescript.svg" alt="TypeScript" width={40} height={40} />
                  <span className="mt-2 text-sm">TypeScript</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/javascript.svg" alt="JavaScript" width={40} height={40} />
                  <span className="mt-2 text-sm">JavaScript</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/html5.svg" alt="HTML5" width={40} height={40} />
                  <span className="mt-2 text-sm">HTML5</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/tailwind.svg" alt="Tailwind CSS" width={40} height={40} />
                  <span className="mt-2 text-sm">Tailwind CSS</span>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-center">Backend Development</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
                <div className="flex flex-col items-center">
                  <Image src="/icons/python.svg" alt="Python" width={40} height={40} />
                  <span className="mt-2 text-sm">Python</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/java.svg" alt="Java" width={40} height={40} />
                  <span className="mt-2 text-sm">Java</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/c.svg" alt="C" width={40} height={40} />
                  <span className="mt-2 text-sm">C</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/nodejs.svg" alt="Node.js" width={40} height={40} />
                  <span className="mt-2 text-sm">Node.js</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/flask.svg" alt="Flask" width={40} height={40} />
                  <span className="mt-2 text-sm">Flask</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/git.svg" alt="Git" width={40} height={40} />
                  <span className="mt-2 text-sm">Git</span>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-center">Data Analysis</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
                <div className="flex flex-col items-center">
                  <Image src="/icons/r.svg" alt="R" width={40} height={40} />
                  <span className="mt-2 text-sm">R</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/python.svg" alt="Python" width={40} height={40} />
                  <span className="mt-2 text-sm">Python</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/pandas.svg" alt="Pandas" width={40} height={40} />
                  <span className="mt-2 text-sm">Pandas</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/excel.svg" alt="Excel" width={40} height={40} />
                  <span className="mt-2 text-sm">Excel</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/postgresql.svg" alt="PostgreSQL" width={40} height={40} />
                  <span className="mt-2 text-sm">PostgreSQL</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/jupyter.svg" alt="Jupyter" width={40} height={40} />
                  <span className="mt-2 text-sm">Jupyter</span>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-center">DevOps & Cloud</h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-6 justify-items-center">
                <div className="flex flex-col items-center">
                  <Image src="/icons/docker.svg" alt="Docker" width={40} height={40} />
                  <span className="mt-2 text-sm">Docker</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/githubactions.svg" alt="GitHub Actions" width={40} height={40} />
                  <span className="mt-2 text-sm">GitHub Actions</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/aws.svg" alt="AWS" width={40} height={40} />
                  <span className="mt-2 text-sm">AWS</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/firebase.svg" alt="Firebase" width={40} height={40} />
                  <span className="mt-2 text-sm">Firebase</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/bash.svg" alt="Bash" width={40} height={40} />
                  <span className="mt-2 text-sm">Bash</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/vercel.svg" alt="Vercel" width={40} height={40} />
                  <span className="mt-2 text-sm">Vercel</span>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-center">Creative Tools</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
                <div className="flex flex-col items-center">
                  <Image src="/icons/lightroom.svg" alt="Lightroom" width={40} height={40} />
                  <span className="mt-2 text-sm">Lightroom</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/photoshop.svg" alt="Photoshop" width={40} height={40} />
                  <span className="mt-2 text-sm">Photoshop</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/figma.svg" alt="Figma" width={40} height={40} />
                  <span className="mt-2 text-sm">Figma</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/captureone.svg" alt="Capture One" width={40} height={40} />
                  <span className="mt-2 text-sm">Capture One</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/finalcutpro.svg" alt="Final Cut Pro" width={40} height={40} />
                  <span className="mt-2 text-sm">Final Cut Pro</span>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-center">Documentation</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
                <div className="flex flex-col items-center">
                  <Image src="/icons/markdown.svg" alt="Markdown" width={40} height={40} />
                  <span className="mt-2 text-sm">Markdown</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/icons/latex.svg" alt="LaTeX" width={40} height={40} />
                  <span className="mt-2 text-sm">LaTeX</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* What do I do? Section */}
        <AnimatedSection delay={0.2} className="w-full max-w-2xl space-y-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-[var(--foreground)] text-center">
              What do I do?
            </h2>
            <div className="space-y-6 text-[#333]">
              <p className="leading-relaxed text-lg">
                <b className="text-gray-700">Academic Journey:</b> Currently pursuing my degree in Computer Science, I bring a technical mindset to everything I do. My academic focus lies in software development and artificial intelligence, where I combine theoretical knowledge with practical applications.
              </p>
              <p className="leading-relaxed text-lg">
                Having spent four years in Sydney before moving to Perth, I&apos;ve developed a unique perspective that bridges different Australian cultures and academic environments. This experience has enriched my understanding of both technology and human interaction.
              </p>
              <p className="leading-relaxed text-lg">
                <b className="text-gray-700">Photography Passion:</b> My photography journey is driven by three main themes: the raw beauty of nature, the dynamic energy of urban landscapes, and the subtle moments of human connection. Through my lens, I aim to capture the interplay between these elements, documenting both the grand vistas of Western Australia and the intimate details of city life.
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
      </div>
    </section>
  )
}