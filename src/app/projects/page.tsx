'use client'

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

const projects: Project[] = [
  {
    title: "Personal Website",
    description: "A modern, responsive personal website built with Next.js, TypeScript, and Tailwind CSS. Features dark mode, smooth animations, and a photography gallery.",
    link: "https://github.com/Misoto22/my-website",
    deploy: "https://www.misoto22.com/",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    image: "/images/projects/personal-website.jpeg",
    category: "Full-stack"
  },
  {
    title: "Australia EOI Points Calculator",
    description: "A modern web application for calculating points for Australian Expression of Interest (EOI) for skilled migration visas. Features real-time calculation, bilingual support, responsive design, and dark/light mode.",
    link: "https://github.com/Misoto22/eoi-points-calculator",
    deploy: "https://eoi-points-calculator.vercel.app/",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "i18next", "Framer Motion"],
    image: "/images/projects/eoi-calculator.jpeg",
    category: "Web Dev"
  },
  {
    title: "Smart Vision Hat",
    description: "An IoT-based wearable device designed to assist visually impaired individuals. Built with Raspberry Pi and a YOLOv8 object detection model, it provides real-time audio feedback and emergency alerts.",
    link: "https://github.com/Dhrubub/Smart-Vision-Hat",
    technologies: ["Raspberry Pi", "Python", "Flask", "Firebase", "YOLOv8", "OpenCV"],
    image: "/images/projects/smart-vision-hat.png",
    category: "IoT"
  },
  {
    title: "Parallel Fish School Search",
    description: "A high-performance computing project simulating fish school behavior using C, OpenMP, and MPI. Achieved massive speedups on the Setonix supercomputer through thread/process-level optimization.",
    link: "https://github.com/Misoto22/Parallel-Implementation",
    technologies: ["C", "OpenMP", "MPI", "Bash"],
    image: "/images/projects/fish-school-hpc.png",
    category: "HPC"
  }  
]

export default function Projects() {
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
