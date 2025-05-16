'use client'

import React, { useState, useEffect } from 'react'
import PageHeader from '@/components/layout/PageHeader'
import ProjectCard from '@/components/sections/ProjectCard'

interface Project {
  title: string;
  description: string;
  link: string;
  deploy?: string;
  technologies: string[];
  image: string;
  category: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects data');
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="pt-24 min-h-screen bg-[var(--background)]">
        <div className="max-w-6xl mx-auto px-6">
          <PageHeader 
            title="Projects"
            description="Here are some of my recent projects. Each one represents a unique challenge and learning opportunity."
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
          title="Projects"
          description="Here are some of my recent projects. Each one represents a unique challenge and learning opportunity."
        />
        
        <div className="space-y-16">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
