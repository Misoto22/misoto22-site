'use client'

import AnimatedSection from '@/components/AnimatedSection'

const projects = [
  {
    title: "Personal Website",
    description: "A modern, responsive personal website built with Next.js, TypeScript, and Tailwind CSS. Features dark mode, smooth animations, and a photography gallery.",
    link: "https://github.com/yourusername/my-website",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
  },
  {
    title: "Data Analysis Tool",
    description: "A Python-based data analysis tool for processing and visualizing large datasets. Includes automated reporting and data export capabilities.",
    link: "https://github.com/yourusername/data-analysis-tool",
    technologies: ["Python", "Pandas", "Matplotlib", "Jupyter"]
  }
]

export default function Projects() {
  return (
    <section className="pt-24 min-h-screen bg-[var(--background)]">
      <AnimatedSection className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-semibold mb-16 tracking-wide text-[var(--foreground)] text-center">
          Projects
        </h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className="bg-white/90 dark:bg-black/40 p-6 rounded-lg hover:shadow-lg transition-all duration-300">
                <h2 className="text-xl font-medium mb-4 text-[var(--foreground)]">{project.title}</h2>
                <p className="text-[var(--secondary-text)] mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--secondary-text)] hover:text-[var(--foreground)] transition-colors inline-flex items-center"
                  >
                    View Project
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
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
