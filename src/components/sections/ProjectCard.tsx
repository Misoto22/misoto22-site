'use client'

import React from 'react'
import Image from 'next/image'
import Badge from '@/components/ui/Badge'
import { motion } from 'framer-motion'
import { fadeInUp, ANIMATION, viewportConfig } from '@/lib/animation'

interface Project {
  title: string
  description: string
  link: string
  deploy?: string
  technologies: string[]
  image: string
  category: string
  order?: number
}

interface ProjectCardProps {
  project: Project
  index: number
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  // 奇偶行交替布局方向
  const isReversed = index % 2 === 1

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={{ duration: ANIMATION.duration.slow, delay: index * 0.08, ease: ANIMATION.ease.out }}
      className={`grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 items-center ${
        isReversed ? 'md:[direction:rtl]' : ''
      }`}
    >
      {/* Image — 60% */}
      <div className={`md:col-span-3 ${isReversed ? 'md:[direction:ltr]' : ''}`}>
        <div className="relative aspect-video rounded-xl overflow-hidden group">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        </div>
      </div>

      {/* Content — 40% */}
      <div className={`md:col-span-2 space-y-4 ${isReversed ? 'md:[direction:ltr]' : ''}`}>
        <span className="font-mono text-xs uppercase tracking-widest text-(--secondary-text)">
          {project.category}
        </span>
        <h2 className="font-heading text-2xl md:text-3xl text-(--foreground)">{project.title}</h2>
        <p className="text-(--foreground-muted) leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, i) => (
            <Badge key={i}>{tech}</Badge>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-2">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-(--foreground) underline underline-offset-4 decoration-(--border-color) hover:decoration-(--foreground) transition-colors duration-200"
          >
            Source code
          </a>
          {project.deploy && (
            <a
              href={project.deploy}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-(--foreground) underline underline-offset-4 decoration-(--border-color) hover:decoration-(--foreground) transition-colors duration-200"
            >
              Live demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard
