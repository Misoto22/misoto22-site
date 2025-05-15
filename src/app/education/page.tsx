'use client'

import React from 'react'
import AnimatedSection from '@/components/common/AnimatedSection'
import EducationCard from '@/components/sections/EducationCard'

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
            <EducationCard key={index} education={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
} 