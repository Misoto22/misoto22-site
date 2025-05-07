'use client'

import AnimatedSection from '@/components/AnimatedSection'
import Image from 'next/image'

const projects = [
  {
    title: "Personal Website",
    description: "A modern, responsive personal website built with Next.js, TypeScript, and Tailwind CSS. Features dark mode, smooth animations, and a photography gallery.",
    link: "https://github.com/Misoto22/my-website",
    deploy: "https://www.misoto22.com/",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    image: "/images/projects/personal-website.jpeg"
  },
  {
    title: "Australia EOI Points Calculator",
    description: "A modern web application for calculating points for Australian Expression of Interest (EOI) for skilled migration visas. Features real-time calculation, bilingual support, responsive design, and dark/light mode.",
    link: "https://github.com/Misoto22/eoi-points-calculator",
    deploy: "https://eoi-points-calculator.vercel.app/",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "i18next", "Framer Motion"],
    image: "/images/projects/eoi-calculator.jpeg"
  }
]

export default function Projects() {
  return (
    <section className="pt-24 min-h-screen bg-[var(--background)]">
      <AnimatedSection className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-semibold mb-16 tracking-wide text-[var(--foreground)] text-center">
          Projects
        </h1>
        
        <div className="space-y-16">
          {projects.map((project, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className="bg-transparent dark:bg-transparent rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-8 p-6">
                  {/* Left side - Content */}
                  <div className="flex flex-col justify-center">
                    <h2 className="text-2xl font-medium mb-4 text-[var(--foreground)]">{project.title}</h2>
                    <p className="text-[var(--secondary-text)] mb-6">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="bg-[color:var(--tag-bg,#e5e7eb)] text-[color:var(--tag-text,#22223b)] px-3 py-1 rounded-full text-sm font-medium hover:bg-[color:var(--tag-hover-bg,#d1d5db)] transition-colors duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--secondary-text)] hover:text-[var(--foreground)] transition-colors inline-flex items-center"
                    >
                      View GitHub Repo
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                  
                  {/* Right side - Image */}
                  <a 
                    href={project.deploy} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="relative aspect-video rounded-lg overflow-hidden hover:opacity-90 transition-opacity duration-200"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </a>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </AnimatedSection>
    </section>
  )
}
