'use client'

import React from 'react'
import PageHeader from '@/components/layout/PageHeader'
import EducationCard from '@/components/sections/EducationCard'
import { useEducation } from '@/hooks/useApiData'

interface Education {
  degree: string;
  school: string;
  schoolLink?: string;
  location: string;
  period: string;
  description: string[];
  courses: string[];
  logo: string;
  order?: number;
}

export default function EducationPage() {
  const { data: education, loading, error } = useEducation();

  if (loading) {
    return (
      <section className="pt-24 min-h-screen bg-[var(--background)]">
        <div className="max-w-6xl mx-auto px-6">
          <PageHeader
            title="Education"
            description="My academic journey and the knowledge I've gained along the way."
            showDivider={true}
          />
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-24 min-h-screen bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-6">
        <PageHeader
          title="Education"
          description="My academic journey and the knowledge I've gained along the way."
          showDivider={true}
        />

        <div className="space-y-12">
          {education && education.map((edu, index) => (
            <EducationCard key={index} education={edu} index={index} />
          ))}
        </div>

        {error && (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="text-red-500 text-center">
              <p>Error loading education: {error}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}