'use client'

import { Link } from '@/i18n/navigation'
import { motion } from 'framer-motion'
import TextReveal from '@/components/animations/TextReveal'
import FadeInSlideUp from '@/components/animations/FadeInSlideUp'
import SkillsSection from '@/components/sections/SkillsSection'
import PhotoStrip from '@/components/sections/PhotoStrip'
import FeaturedWork from '@/components/sections/FeaturedWork'
import SectionHeading from '@/components/layout/SectionHeading'
import { fadeInUp, ANIMATION, viewportConfig } from '@/lib/animation'
import { FULL_NAME, EMAIL, RESUME_URL, GITHUB_URL, LINKEDIN_URL, INSTAGRAM_URL } from '@/lib/constants'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import Image from 'next/image'
import type { Project, BlogPost, FrontendPhoto } from '@/lib/data'
import { useTranslations } from 'next-intl'

interface HomeClientProps {
  photos: FrontendPhoto[]
  projects: Project[]
  blogPosts: BlogPost[]
}

export default function HomeClient({ photos, projects, blogPosts }: HomeClientProps) {
  const t = useTranslations()

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="min-h-screen flex items-center pt-16 pb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left: text — 5 cols on desktop */}
          <div className="lg:col-span-5">
            <FadeInSlideUp>
              <p className="text-sm font-mono uppercase tracking-widest text-(--secondary-text) mb-6">
                {FULL_NAME}
              </p>
            </FadeInSlideUp>

            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-(--foreground) leading-[1.2] mb-6">
              <TextReveal text={t('Hero.title1')} />
              <br />
              <TextReveal text={t('Hero.title2')} staggerDelay={0.08} />
            </h1>

            <FadeInSlideUp delay={0.4}>
              <p className="text-base md:text-lg text-(--secondary-text) max-w-md mb-8 leading-relaxed">
                {t('Hero.subtitle')}
              </p>
            </FadeInSlideUp>

            <FadeInSlideUp delay={0.6}>
              <div className="flex flex-wrap items-center gap-6">
                <Link
                  href="/projects"
                  className="text-(--foreground) hover:text-(--accent) transition-colors duration-200 flex items-center gap-2"
                >
                  {t('Hero.viewProjects')} <span aria-hidden="true">&rarr;</span>
                </Link>
                <Link
                  href="/photography"
                  className="text-(--secondary-text) hover:text-(--foreground) transition-colors duration-200 flex items-center gap-2"
                >
                  {t('Hero.browsePhotography')} <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </FadeInSlideUp>
          </div>

          {/* Right: abstract geometric composition — viewfinder meets terminal */}
          <div className="hidden lg:block lg:col-span-7 relative" aria-hidden="true">
            <div className="relative h-[540px] w-full">

              {/* ── Outer viewfinder frame ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: ANIMATION.ease.out }}
                className="absolute inset-[10%] border border-(--border-color)"
              />

              {/* ── Inner frame — offset, creating asymmetry ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.45, ease: ANIMATION.ease.out }}
                className="absolute top-[18%] left-[22%] right-[6%] bottom-[14%] border border-(--accent) opacity-50"
              />

              {/* ── Viewfinder crosshair — horizontal ── */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: ANIMATION.ease.out }}
                className="absolute top-1/2 left-[10%] right-[10%] h-px bg-(--border-subtle) origin-left"
              />

              {/* ── Viewfinder crosshair — vertical ── */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.8, delay: 0.75, ease: ANIMATION.ease.out }}
                className="absolute top-[10%] bottom-[10%] left-[55%] w-px bg-(--border-subtle) origin-top"
              />

              {/* ── Aperture circle at intersection ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1, ease: ANIMATION.ease.out }}
                className="absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-(--accent) opacity-60"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.1, ease: ANIMATION.ease.out }}
                className="absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-(--accent) opacity-40"
              />

              {/* ── Corner brackets (viewfinder marks) ── */}
              {/* Top-left */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="absolute top-[10%] left-[10%]"
              >
                <div className="w-5 h-px bg-(--accent)" />
                <div className="w-px h-5 bg-(--accent)" />
              </motion.div>
              {/* Bottom-right */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.5, delay: 0.95 }}
                className="absolute bottom-[10%] right-[10%] flex flex-col items-end"
              >
                <div className="w-5 h-px bg-(--accent)" />
                <div className="w-px h-5 bg-(--accent) self-end" />
              </motion.div>

              {/* ── Decorative code fragments ── */}
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 0.3, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="absolute top-[14%] right-[12%] font-mono text-[10px] tracking-wider text-(--secondary-text)"
              >
                f/2.8 · 1/250s
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 0.3, x: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="absolute bottom-[18%] left-[12%] font-mono text-[10px] tracking-wider text-(--secondary-text)"
              >
                const capture = () =&gt;
              </motion.p>

              {/* ── Large background type — layered, rotated ── */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.04 }}
                transition={{ duration: 1.2, delay: 0.5 }}
                className="absolute top-[20%] left-[15%] font-heading text-[10rem] xl:text-[13rem] leading-none select-none"
                style={{ color: 'var(--foreground)' }}
              >
                HC
              </motion.span>

              {/* ── Location marker ── */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.4 }}
                className="absolute bottom-[6%] right-[10%] flex items-center gap-2"
              >
                <div className="w-8 h-px bg-(--accent) opacity-50" />
                <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-(--secondary-text)">
                  33.8688°S 151.2093°E
                </p>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* ─── Photo Strip ─── */}
      <PhotoStrip photos={photos.slice(0, 8)} />

      {/* ─── Featured Work ─── */}
      <FeaturedWork projects={projects} />

      {/* ─── About Excerpt + Skills ─── */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ duration: ANIMATION.duration.slow, ease: ANIMATION.ease.out }}
          >
            <h2 className="font-heading text-3xl md:text-4xl text-(--foreground) mb-4">{t('Home.aboutHeading')}</h2>
            <div className="w-12 h-px bg-(--accent) mb-6" />
            <p className="text-(--foreground-muted) leading-relaxed mb-4">
              {t('Home.aboutBio1')}
            </p>
            <p className="text-(--foreground-muted) leading-relaxed mb-4">
              {t('Home.aboutBio2')}
            </p>
            <p className="text-(--foreground-muted) leading-relaxed mb-6">
              {t('Home.aboutBio3')}
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="/experience"
                className="text-sm text-(--accent) hover:text-(--accent-hover) transition-colors duration-200 flex items-center gap-2"
              >
                {t('Home.readMore')} <span aria-hidden="true">&rarr;</span>
              </Link>
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
                  {t('Home.resume')}
                </span>
              </a>
            </div>
          </motion.div>

          <SkillsSection />
        </div>
      </section>

      {/* ─── Latest Blog Posts ─── */}
      {blogPosts.length > 0 && (
        <section className="py-16 md:py-24 max-w-7xl mx-auto px-6">
          <SectionHeading title={t('Home.blogHeading')} subtitle={t('Home.blogSubtitle')} />

          {blogPosts.length <= 2 ? (
            <div className="space-y-8">
              {blogPosts.map((post, i) => (
                <motion.div
                  key={post.slug}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportConfig}
                  transition={{ duration: ANIMATION.duration.slow, delay: i * 0.1, ease: ANIMATION.ease.out }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
                      {post.coverImage && (
                        <div className="aspect-video relative rounded-lg overflow-hidden">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-mono text-xs text-(--secondary-text) mb-3">
                          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          }) : ''}
                        </p>
                        <h3 className="font-heading text-2xl md:text-3xl text-(--foreground) group-hover:text-(--accent) transition-colors duration-200 mb-3">
                          {post.title}
                        </h3>
                        {post.summary && (
                          <p className="text-(--secondary-text) leading-relaxed mb-4">{post.summary}</p>
                        )}
                        <span className="text-sm text-(--accent) flex items-center gap-2">
                          {t('Home.readArticle')} <span aria-hidden="true">&rarr;</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.slice(0, 3).map((post, i) => (
                <motion.div
                  key={post.slug}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportConfig}
                  transition={{ duration: ANIMATION.duration.slow, delay: i * 0.1, ease: ANIMATION.ease.out }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block">
                    {post.coverImage && (
                      <div className="aspect-video relative rounded-lg overflow-hidden mb-4">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    )}
                    <p className="font-mono text-xs text-(--secondary-text) mb-2">
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      }) : ''}
                    </p>
                    <h3 className="font-heading text-xl text-(--foreground) group-hover:text-(--accent) transition-colors duration-200 mb-2">
                      {post.title}
                    </h3>
                    {post.summary && (
                      <p className="text-sm text-(--secondary-text) line-clamp-2">{post.summary}</p>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ duration: ANIMATION.duration.slow, ease: ANIMATION.ease.out }}
            className="mt-8"
          >
            <Link
              href="/blog"
              className="text-sm text-(--accent) hover:text-(--accent-hover) transition-colors duration-200 flex items-center gap-2"
            >
              {t('Home.viewAllPosts')} <span aria-hidden="true">&rarr;</span>
            </Link>
          </motion.div>
        </section>
      )}

      {/* ─── Contact CTA ─── */}
      <section className="py-16 md:py-24 bg-(--accent-muted)">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeInSlideUp>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-(--foreground) mb-4">
              {t('Home.ctaHeading')}
            </h2>
            <a
              href={`mailto:${EMAIL}`}
              className="text-lg text-(--accent) hover:text-(--accent-hover) transition-colors duration-200 underline underline-offset-4 decoration-(--accent-muted) hover:decoration-(--accent)"
            >
              {EMAIL}
            </a>
            <div className="flex justify-center space-x-6 mt-8">
              {[
                { href: GITHUB_URL, icon: FaGithub, label: 'GitHub' },
                { href: LINKEDIN_URL, icon: FaLinkedin, label: 'LinkedIn' },
                { href: INSTAGRAM_URL, icon: FaInstagram, label: 'Instagram' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-(--secondary-text) hover:text-(--foreground) transition-colors duration-200"
                  aria-label={label}
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </FadeInSlideUp>
        </div>
      </section>
    </>
  )
}
