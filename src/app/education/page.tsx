'use client'

import React from 'react'
import PageHeader from '@/components/layout/PageHeader'
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
        <PageHeader 
          title="Education"
          description="My academic journey and the knowledge I've gained along the way."
          showDivider={true}
        />

        <div className="space-y-12">
          {education.map((edu, index) => (
            <EducationCard key={index} education={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
} 