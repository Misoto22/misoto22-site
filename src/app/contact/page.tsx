'use client'

import AnimatedSection from '@/components/AnimatedSection'

export default function Contact() {
  return (
    <section className="pt-24 min-h-screen bg-[var(--background)]">
      <AnimatedSection className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-semibold mb-8 tracking-wide text-[var(--foreground)] text-center">
          Contact
        </h1>
        <AnimatedSection delay={0.1}>
          <p className="text-[var(--secondary-text)] mb-8 text-center text-lg">
            For inquiries about prints, commissions, or collaborations, please reach out via email.
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <div className="flex justify-center">
            <a 
              href="mailto:cxw8848@hotmail.com" 
              className="text-xl text-[var(--foreground)] hover:text-[var(--secondary-text)] transition-colors inline-flex items-center"
            >
              cxw8848@hotmail.com
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </AnimatedSection>
      </AnimatedSection>
    </section>
  )
}