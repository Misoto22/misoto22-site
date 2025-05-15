'use client'

import React from 'react'
import AnimatedSection from '@/components/common/AnimatedSection'
import Image from 'next/image'
import Card from '@/components/ui/Card'

interface Education {
  degree: string;
  school: string;
  schoolLink?: string;
  location: string;
  period: string;
  description: string[];
  courses: string[];
  logo: string;
}

const education: Education[] = [
  {
    degree: "Master of Information Technology",
    school: "The University of Western Australia",
    schoolLink: "https://www.uwa.edu.au/",
    location: "Perth, WA",
    period: "2023 - 2024",
    description: [
      "Dedicated to Software Engineering"
    ],
    courses: [
      "IoT", "High Performance Computing", "Geographic Info Systems", "Artificial Intelligence",
      "Cloud Computing", "Cybersecurity", "Data Analysis"
    ],
    logo: "/icons/uni/uwa.svg"
  },
  {
    degree: "Bachelor of Computing",
    school: "The University of Sydney",
    schoolLink: "https://www.sydney.edu.au/",
    location: "Sydney, NSW",
    period: "2020 - 2022",
    description: [
      "Major in Computer Science"
    ],
    courses: [
      "Data Structures & Algorithms", "Systems Programming", "Models of Computation",
      "OS and Network", "Algorithm Design", "Agile Software Development", "Database Management"
    ],
    logo: "/icons/uni/usyd.svg"
  }
];

export default function EducationPage() {
  return (
    <section className="pt-24 min-h-screen bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-heading mb-4 tracking-wide text-[var(--foreground)]">
              Education
            </h1>
            <div className="w-24 h-1 bg-[var(--accent)] mx-auto mb-4"></div>
            <p className="text-[var(--secondary-text)] text-lg max-w-2xl mx-auto">
              My academic journey and the knowledge I&apos;ve gained along the way.
            </p>
          </div>
        </AnimatedSection>

        <div className="space-y-12">
          {education.map((edu, index) => (
            <Card 
              key={index} 
              delay={index * 0.1}
              width="full"
            >
              <div className="flex flex-col md:flex-row gap-8">
                {/* School Logo Section */}
                <div className="md:w-1/4 flex justify-center items-center">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-[var(--border-color)] bg-white">
                    <Image
                      src={edu.logo}
                      alt={`${edu.school} logo`}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="md:w-3/4 space-y-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
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
                      <p className="text-[var(--foreground)] font-medium bg-[var(--accent)] px-4 py-1 rounded-full inline-block">
                        {edu.period}
                      </p>
                      <p className="text-[var(--secondary-text)]">{edu.location}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {edu.description.map((desc, i) => (
                      <p key={i} className="text-[var(--secondary-text)] leading-relaxed">
                        {desc}
                      </p>
                    ))}
                  </div>

                  <div>
                    <h4 className="text-[var(--foreground)] font-medium mb-3">Key Courses:</h4>
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
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
} 