'use client'

import React from 'react'
import PageHeader from '@/components/layout/PageHeader'
import ExperienceCard from '@/components/sections/ExperienceCard'

interface Experience {
  title: string;
  company: string;
  companyLink?: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
  logo: string;
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
    technologies: ["ETL", "Data Visualization", "Web Development", "IT Strategy", "Data Management"],
    logo: "/icons/company/path-of-hope.svg"
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
    technologies: ["Curriculum Development", "Student Assessment", "Educational Technology", "Communication", "Problem Solving"],
    logo: "/icons/company/hd-education.svg"
  }
];

export default function ExperiencePage() {
  return (
    <section className="pt-24 min-h-screen bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-6">
        <PageHeader 
          title="Professional Experience"
          description="My journey through various roles and responsibilities, each contributing to my growth as a professional."
          showDivider={true}
        />

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
} 