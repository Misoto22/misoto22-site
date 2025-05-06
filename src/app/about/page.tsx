'use client'

import AnimatedSection from '@/components/AnimatedSection'

export default function About() {
  return (
    <section className="pt-24 min-h-screen bg-[var(--background)]">
      <AnimatedSection className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-semibold mb-16 tracking-wide text-[var(--foreground)] text-center">
          About
        </h1>

        {/* Introduction */}
        <AnimatedSection delay={0.1}>
          <div className="prose prose-lg">
            <p className="text-xl leading-relaxed mb-12 text-[var(--secondary-text)]">
              Hi, I&apos;m Henry, a Computer Science student and photographer based in Perth, Western Australia.
            </p>
          </div>
        </AnimatedSection>

        {/* Main Content */}
        <div className="space-y-12 text-[var(--secondary-text)]">
          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
              <p className="leading-relaxed">
                Originally from Shanghai, China, I&apos;ve had the privilege of experiencing life in different parts of Australia. 
                Before settling in Perth, I spent four enriching years in Sydney, which significantly influenced my 
                perspective as a photographer.
              </p>

              <p className="leading-relaxed">
                My photography focuses on three main themes: the raw beauty of nature, the dynamic energy of urban landscapes, 
                and the subtle moments of human connection. Through my lens, I aim to capture the interplay between these 
                elements, documenting both the grand vistas of Western Australia and the intimate details of city life.
              </p>

              <p className="leading-relaxed">
                When I&apos;m not coding or studying, you&apos;ll find me exploring new locations with my camera, 
                whether it&apos;s discovering hidden urban corners or venturing into the natural landscapes 
                that make Western Australia unique.
              </p>
            </div>
          </AnimatedSection>

          {/* Technical Background */}
          <AnimatedSection delay={0.3}>
            <div className="pt-12 border-t border-[var(--border-color)]">
              <h2 className="text-2xl font-semibold mb-6 tracking-wide text-[var(--foreground)]">
                Technical Background
              </h2>
              <p className="leading-relaxed">
                Currently pursuing my degree in Computer Science, I bring a technical mindset to my 
                creative work, finding interesting parallels between the precision of programming and 
                the artistry of photography.
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* Contact Links */}
        <AnimatedSection delay={0.4}>
          <div className="mt-16 flex gap-8 items-center justify-center">
            <a 
              href="mailto:cxw8848@hotmail.com" 
              className="text-[var(--secondary-text)] hover:text-[var(--foreground)] transition-colors duration-300 inline-flex items-center"
            >
              Get in touch
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
            <span className="text-[var(--border-color)]">|</span>
            <a 
              href="/resume.pdf" 
              className="text-[var(--secondary-text)] hover:text-[var(--foreground)] transition-colors duration-300 inline-flex items-center"
            >
              Resume
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </a>
          </div>
        </AnimatedSection>
      </AnimatedSection>
    </section>
  )
}