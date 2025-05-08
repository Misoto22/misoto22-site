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
    image: "/images/projects/personal-website.jpeg",
    category: "Full-stack"
  },
  {
    title: "Australia EOI Points Calculator",
    description: "A modern web application for calculating points for Australian Expression of Interest (EOI) for skilled migration visas. Features real-time calculation, bilingual support, responsive design, and dark/light mode.",
    link: "https://github.com/Misoto22/eoi-points-calculator",
    deploy: "https://eoi-points-calculator.vercel.app/",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "i18next", "Framer Motion"],
    image: "/images/projects/eoi-calculator.jpeg",
    category: "Web Dev"
  },
  {
    title: "Smart Vision Hat",
    description: "An IoT-based wearable device designed to assist visually impaired individuals. Built with Raspberry Pi and a YOLOv8 object detection model, it provides real-time audio feedback and emergency alerts.",
    link: "https://github.com/Dhrubub/Smart-Vision-Hat",
    technologies: ["Raspberry Pi", "Python", "Flask", "Firebase", "YOLOv8", "OpenCV"],
    image: "/images/projects/smart-vision-hat.png",
    category: "IoT"
  },
  {
    title: "Parallel Fish School Search",
    description: "A high-performance computing project simulating fish school behavior using C, OpenMP, and MPI. Achieved massive speedups on the Setonix supercomputer through thread/process-level optimization.",
    link: "https://github.com/Misoto22/Parallel-Implementation",
    technologies: ["C", "OpenMP", "MPI", "Bash"],
    image: "/images/projects/fish-school-hpc.png",
    category: "HPC"
  }  
]

export default function Projects() {
  return (
    <section className="pt-24 min-h-screen bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <h1 className="text-4xl md:text-5xl font-heading mb-4 tracking-wide text-[var(--foreground)] text-center">
            Projects
          </h1>
          <p className="text-[var(--secondary-text)] mb-12 text-center text-lg max-w-2xl mx-auto">
            Here are some of my recent projects. Each one represents a unique challenge and learning opportunity.
          </p>
        </AnimatedSection>
        
        <div className="space-y-16">
          {projects.map((project, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className="bg-[var(--card-background)] rounded-2xl p-8 shadow-lg border border-[var(--border-color)] hover:shadow-xl transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left side - Content */}
                  <div className="flex flex-col justify-center">
                    <h2 className="text-2xl font-heading text-[var(--foreground)] mb-1">{project.title}</h2>
                    <span className="mb-3 self-start px-3 py-1 text-sm font-bold rounded bg-[var(--foreground)] text-[var(--background)] shadow-sm tracking-widest uppercase">
                      {project.category}
                    </span>
                    <p className="text-[var(--secondary-text)] mb-6">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="bg-[var(--card-background)] text-[var(--foreground)] px-3 py-1 rounded-full text-sm font-medium border border-[var(--border-color)] hover:bg-[var(--background)] transition-colors duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-[var(--foreground)] hover:opacity-80 transition-colors duration-300"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        View Code
                      </a>
                      {project.deploy && (
                        <a
                          href={project.deploy}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-[var(--foreground)] hover:opacity-80 transition-colors duration-300"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                  {/* Right side - Image */}
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
