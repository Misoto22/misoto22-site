'use client'

import React, { useState, useEffect } from 'react'
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

export default function EducationPage() {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch('/api/education');
        if (!response.ok) {
          throw new Error('Failed to fetch education data');
        }
        const data = await response.json();
        setEducation(data);
      } catch (error) {
        console.error('Error fetching education data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

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
          {education.map((edu, index) => (
            <EducationCard key={index} education={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
} 