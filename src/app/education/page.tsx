'use client'

import React from 'react'
import AnimatedSection from '@/components/AnimatedSection'

interface Education {
  degree: string;
  school: string;
  schoolLink?: string;
  location: string;
  period: string;
  description: string[];
  courses: string[];
}

const education: Education[] = [
  {
    degree: "Master of Information Technology",
    school: "The University of Western Australia",
    schoolLink: "https://www.uwa.edu.au/",
    location: "Perth, WA",
    period: "2023 - 2024",
    description: [
      "Specializing in Software Engineering and Data Science"
    ],
    courses: [
      "IT Capstone Project", "Python Programming", "IoT", "High Performance Computing",
      "Cloud Computing", "AI Systems", "Cybersecurity", "Data Analysis"
    ]
  },
  {
    degree: "Bachelor of Computing",
    school: "The University of Sydney",
    schoolLink: "https://www.sydney.edu.au/",
    location: "Sydney, NSW",
    period: "2020 - 2023",
    description: [
      "Major in Computer Science"
    ],
    courses: [
      "Data Science", "Data Structures & Algorithms", "Systems Programming",
      "AI", "Algorithm Design", "Software Development", "Database Management"
    ]
  }
];

export default function EducationPage() {
  return (
    <section className="pt-24 min-h-screen bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <h1 className="text-4xl md:text-5xl font-heading mb-4 tracking-wide text-[var(--foreground)] text-center">
            Education
          </h1>
          <p className="text-[var(--secondary-text)] mb-12 text-center text-lg max-w-2xl mx-auto">
            My academic journey and the knowledge I've gained along the way.
          </p>
        </AnimatedSection>

        <div className="space-y-8">
          {education.map((edu, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className="bg-[var(--card-background)] rounded-2xl p-8 shadow-lg border border-[var(--border-color)] hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-heading text-[var(--foreground)]">{edu.degree}</h2>
                    <h3 className="text-xl text-[var(--secondary-text)]">
                      {edu.schoolLink ? (
                        <a 
                          href={edu.schoolLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[var(--foreground)] transition-colors duration-200 inline-flex items-center font-normal"
                        >
                          {edu.school}
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ) : (
                        edu.school
                      )}
                    </h3>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-[var(--foreground)] font-medium">{edu.period}</p>
                    <p className="text-[var(--secondary-text)]">{edu.location}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  {edu.description.map((desc, i) => (
                    <p key={i} className="text-[var(--secondary-text)] leading-relaxed">
                      {desc}
                    </p>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {edu.courses.map((course, i) => (
                    <span
                      key={i}
                      className="bg-[var(--card-background)] text-[var(--foreground)] px-3 py-1 rounded-full text-sm font-medium border border-[var(--border-color)] hover:bg-[var(--background)] transition-colors duration-200"
                    >
                      {course}
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