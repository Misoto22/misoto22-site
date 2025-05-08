'use client'

import React from 'react'
import AnimatedSection from '@/components/AnimatedSection'

interface Experience {
  title: string;
  company: string;
  companyLink?: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
}

const experiences: Experience[] = [
  {
    title: "IT and Data Intern",
    company: "Path of Hope Foundation",
    companyLink: "https://www.linkedin.com/company/rotary-path-of-hope/",
    location: "Perth, WA",
    period: "Jul 2024 - Oct 2024",
    description: [
      "Conducted data extraction, transformation, and loading (ETL) processes, along with data cleaning and visualization, contributing to the foundation's \"HOPE Report: 100 Years and One Hundred Reports\" initiative aimed at preventing family domestic violence.",
      "Migrated the foundation's official website to a more secure and scalable platform, enhancing user experience and overall site performance.",
      "Collaborated with leadership and cross-functional teams to develop IT and data management improvement strategies, ensuring alignment with organizational goals and best practices."
    ],
    technologies: ["ETL", "Data Visualization", "Web Development", "IT Strategy", "Data Management"]
  },
  {
    title: "Senior Math Tutor",
    company: "HD Education",
    companyLink: "https://www.linkedin.com/company/hdeducation/",
    location: "Sydney, NSW",
    period: "Jul 2019 - Jan 2023",
    description: [
      "Devised and implemented targeted curricula with innovative teaching techniques.",
      "Fostered a supportive learning environment through strong communication with students.",
      "Tailored lesson plans based on individual student progress for improved understanding and retention."
    ],
    technologies: ["Curriculum Development", "Student Assessment", "Educational Technology", "Communication", "Problem Solving"]
  }
];

export default function ExperiencePage() {
  return (
    <section className="pt-24 min-h-screen bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <h1 className="text-4xl md:text-5xl font-heading mb-4 tracking-wide text-[var(--foreground)] text-center">
            Professional Experience
          </h1>
          <p className="text-[var(--secondary-text)] mb-12 text-center text-lg max-w-2xl mx-auto">
            My journey through various roles and responsibilities, each contributing to my growth as a professional.
          </p>
        </AnimatedSection>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className="bg-[var(--card-background)] rounded-2xl p-8 shadow-lg border border-[var(--border-color)] hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-heading text-[var(--foreground)]">{exp.title}</h2>
                    <h3 className="text-xl text-[var(--secondary-text)]">
                      {exp.companyLink ? (
                        <a 
                          href={exp.companyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[var(--foreground)] transition-colors duration-200 inline-flex items-center font-normal"
                        >
                          {exp.company}
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ) : (
                        exp.company
                      )}
                    </h3>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-[var(--foreground)] font-medium">{exp.period}</p>
                    <p className="text-[var(--secondary-text)]">{exp.location}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  {exp.description.map((desc, i) => (
                    <p key={i} className="text-[var(--secondary-text)] leading-relaxed">
                      {desc}
                    </p>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-[var(--card-background)] text-[var(--foreground)] px-3 py-1 rounded-full text-sm font-medium border border-[var(--border-color)] hover:bg-[var(--background)] transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
} 