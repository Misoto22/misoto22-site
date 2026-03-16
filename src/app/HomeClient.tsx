'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import TextReveal from '@/components/animations/TextReveal'
import FadeInSlideUp from '@/components/animations/FadeInSlideUp'
import SkillsSection from '@/components/sections/SkillsSection'
import PhotoStrip from '@/components/sections/PhotoStrip'
import FeaturedWork from '@/components/sections/FeaturedWork'
import SectionHeading from '@/components/layout/SectionHeading'
import { fadeInUp, ANIMATION, viewportConfig } from '@/lib/animation'
import { FULL_NAME, PROFESSION, EMAIL, GITHUB_URL, LINKEDIN_URL, INSTAGRAM_URL } from '@/lib/constants'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import Image from 'next/image'
import type { Project, BlogPost } from '@/lib/supabase'

interface HomeClientProps {
  photos: { id: string; src: string; width: number; height: number; alt: string }[]
  projects: Project[]
  blogPosts: BlogPost[]
}

export default function HomeClient({ photos, projects, blogPosts }: HomeClientProps) {
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
              <TextReveal text="Developer." />
              <br />
              <TextReveal text="Photographer." staggerDelay={0.08} />
            </h1>

            <FadeInSlideUp delay={0.4}>
              <p className="text-base md:text-lg text-(--secondary-text) max-w-md mb-8 leading-relaxed">
                Building thoughtful software & capturing quiet moments. {PROFESSION}.
              </p>
            </FadeInSlideUp>

            <FadeInSlideUp delay={0.6}>
              <div className="flex flex-wrap items-center gap-6">
                <Link
                  href="/projects"
                  className="text-(--foreground) hover:text-(--accent) transition-colors duration-200 flex items-center gap-2"
                >
                  View projects <span aria-hidden="true">&rarr;</span>
                </Link>
                <Link
                  href="/photography"
                  className="text-(--secondary-text) hover:text-(--foreground) transition-colors duration-200 flex items-center gap-2"
                >
                  Browse photography <span aria-hidden="true">&rarr;</span>
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
            <h2 className="font-heading text-3xl md:text-4xl text-(--foreground) mb-4">About</h2>
            <div className="w-12 h-px bg-(--accent) mb-6" />
            <p className="text-(--foreground-muted) leading-relaxed mb-4">
              A Computer Science graduate based in Sydney, I combine fullstack development with DevOps engineering to build efficient, scalable solutions.
            </p>
            <p className="text-(--foreground-muted) leading-relaxed mb-6">
              Beyond code, my photography captures the interplay between urban landscapes and natural beauty across Australia.
            </p>
            <Link
              href="/experience"
              className="text-sm text-(--accent) hover:text-(--accent-hover) transition-colors duration-200 flex items-center gap-2"
            >
              Read more <span aria-hidden="true">&rarr;</span>
            </Link>
          </motion.div>

          <SkillsSection />
        </div>
      </section>

      {/* ─── Latest Blog Posts ─── */}
      {blogPosts.length > 0 && (
        <section className="py-16 md:py-24 max-w-7xl mx-auto px-6">
          <SectionHeading title="Writing" subtitle="Thoughts on development, photography, and life" />

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
              View all posts <span aria-hidden="true">&rarr;</span>
            </Link>
          </motion.div>
        </section>
      )}

      {/* ─── Contact CTA ─── */}
      <section className="py-16 md:py-24 bg-(--accent-muted)">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeInSlideUp>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-(--foreground) mb-4">
              Let&apos;s work together.
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
