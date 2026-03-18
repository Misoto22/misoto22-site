'use client'

import Image from 'next/image'
import { Link } from 'next-view-transitions'
import { motion } from 'framer-motion'
import { fadeInUp, ANIMATION, viewportConfig } from '@/lib/animation'
import Tag from '@/components/ui/Tag'
import SectionHeading from '@/components/layout/SectionHeading'
import { useTranslations } from 'next-intl'
import type { Project } from '@/lib/supabase'

interface FeaturedWorkProps {
  projects: Project[]
}

export default function FeaturedWork({ projects }: FeaturedWorkProps) {
  const t = useTranslations('Home')
  if (projects.length === 0) return null

  const featured = projects.slice(0, 3)
  const [first, ...rest] = featured

  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-6">
      <SectionHeading title={t('selectedWork')} subtitle={t('selectedWorkSubtitle')} />

      <div className="space-y-8">
        {/* 首个项目 — 全宽 */}
        {first && (
          <FeaturedCard project={first} delay={0} large />
        )}

        {/* 剩余项目 — 双列 */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rest.map((project, i) => (
              <FeaturedCard key={project.title} project={project} delay={(i + 1) * 0.1} />
            ))}
          </div>
        )}
      </div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        transition={{ duration: ANIMATION.duration.slow, ease: ANIMATION.ease.out }}
        className="mt-8"
      >
        <Link
          href="/projects"
          className="text-sm text-(--accent) hover:text-(--accent-hover) transition-colors duration-200 flex items-center gap-2"
        >
          {t('viewAllProjects')} <span aria-hidden="true">&rarr;</span>
        </Link>
      </motion.div>
    </section>
  )
}

function FeaturedCard({
  project,
  delay = 0,
  large = false,
}: {
  project: Project
  delay?: number
  large?: boolean
}) {
  const href = project.deploy || project.link || '#'

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={{ duration: ANIMATION.duration.slow, delay, ease: ANIMATION.ease.out }}
    >
      <Link href={href} target="_blank" rel="noopener noreferrer" className="group block rounded-xl border border-(--border-color) hover:border-(--accent) transition-colors duration-300 overflow-hidden">
        {/* Image */}
        <div className={`relative overflow-hidden ${large ? 'aspect-video md:aspect-[21/9]' : 'aspect-video'}`}>
          {project.image && (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
              sizes={large ? '(max-width: 1280px) 100vw, 1280px' : '(max-width: 768px) 100vw, 50vw'}
            />
          )}
        </div>
        {/* Content below image */}
        <div className="p-4 sm:p-6 bg-(--card-background)">
          <h3 className="font-heading text-lg md:text-2xl text-(--foreground) mb-2">
            {project.title}
          </h3>
          <p className="text-(--secondary-text) text-sm mb-3 line-clamp-2">{project.description}</p>
          {project.technologies && (
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
