'use client'

import Badge from '@/components/ui/Badge'
import { motion } from 'framer-motion'
import { fadeInUp, ANIMATION, viewportConfig, staggerContainer } from '@/lib/animation'
import { RESUME_URL } from '@/lib/constants'
import { useTranslations } from 'next-intl'

const skills = [
  { categoryKey: 'programming' as const, items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'SQL'] },
  { categoryKey: 'web' as const, items: ['React', 'Next.js', 'Node.js', 'HTML5', 'CSS3', 'Tailwind CSS'] },
  { categoryKey: 'devops' as const, items: ['Docker', 'AWS', 'CI/CD', 'GitHub Actions', 'Linux'] },
  { categoryKey: 'tools' as const, items: ['Git', 'VS Code', 'PostgreSQL', 'SQL Server', 'Jira', 'Agile'] },
]

const interestKeys = ['photography', 'hiking', 'technology'] as const

export default function AboutClient() {
  const t = useTranslations('About')

  return (
    <>
      {/* Two-column: Bio + Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 mb-24">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={{ duration: ANIMATION.duration.slow, ease: ANIMATION.ease.out }}
          className="space-y-6"
        >
          <h2 className="font-heading text-2xl md:text-3xl text-(--foreground)">{t('backgroundHeading')}</h2>
          <div className="space-y-4 text-(--secondary-text) leading-relaxed">
            <p>{t('bio1')}</p>
            <p>{t('bio2')}</p>
            <p>{t('bio3')}</p>
          </div>
          <a
            href={RESUME_URL}
            download
            className="group inline-flex items-center gap-2 border border-(--border-color) hover:border-(--accent) px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-sm"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-(--secondary-text) group-hover:text-(--accent) transition-colors duration-300"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <polyline points="9 15 12 18 15 15" />
            </svg>
            <span className="font-mono text-xs tracking-wide text-(--foreground-muted) group-hover:text-(--accent) transition-colors duration-300">
              {t('resume')}
            </span>
          </a>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          transition={{ duration: ANIMATION.duration.slow, delay: 0.1, ease: ANIMATION.ease.out }}
          className="space-y-8"
        >
          <h2 className="font-heading text-2xl md:text-3xl text-(--foreground)">{t('skillsHeading')}</h2>
          {skills.map((skill) => (
            <div key={skill.categoryKey}>
              <h3 className="font-mono text-xs uppercase tracking-widest text-(--secondary-text) mb-3">
                {t(`skillCategories.${skill.categoryKey}`)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Interests */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        className="mb-24"
      >
        <motion.h2
          variants={fadeInUp}
          transition={{ duration: ANIMATION.duration.slow, ease: ANIMATION.ease.out }}
          className="font-heading text-2xl md:text-3xl text-(--foreground) mb-10"
        >
          {t('interestsHeading')}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {interestKeys.map((key) => (
            <motion.div
              key={key}
              variants={fadeInUp}
              transition={{ duration: ANIMATION.duration.slow, ease: ANIMATION.ease.out }}
            >
              <h3 className="font-heading text-xl text-(--foreground) mb-2">{t(`interests.${key}`)}</h3>
              <p className="text-(--secondary-text) leading-relaxed">{t(`interests.${key}Desc`)}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  )
}
