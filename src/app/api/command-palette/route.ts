import { NextResponse } from 'next/server'
import { getProjects, getBlogPosts, getExperience, getEducation } from '@/lib/data'

export async function GET() {
  const [projects, { posts }, experience, education] = await Promise.all([
    getProjects(),
    getBlogPosts({ limit: 100 }),
    getExperience(),
    getEducation(),
  ])

  const data = {
    projects: projects.map((p) => ({
      title: p.title,
      href: p.deploy || p.link,
      subtitle: p.category,
      keywords: p.technologies.join(' '),
    })),
    posts: posts.map((p) => ({
      title: p.title,
      href: `/blog/${p.slug}`,
      subtitle: p.category?.name ?? '',
      keywords: p.tags?.map((t) => t.name).join(' ') ?? '',
    })),
    experience: experience.map((e) => ({
      title: e.title,
      href: '/experience',
      subtitle: e.company,
      keywords: e.technologies.join(' '),
    })),
    education: education.map((e) => ({
      title: e.degree,
      href: '/education',
      subtitle: e.school,
      keywords: `${e.location} ${e.courses?.join(' ') ?? ''}`,
    })),
  }

  return NextResponse.json(data, {
    headers: { 'Cache-Control': 'public, s-maxage=3600' },
  })
}
