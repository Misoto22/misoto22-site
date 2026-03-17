import PageHeader from '@/components/layout/PageHeader'
import AboutClient from './AboutClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'A passionate developer with a strong foundation in software development and DevOps practices.',
}

export default function AboutPage() {
  return (
    <section className="pt-24 pb-24 min-h-screen bg-(--background)">
      <div className="max-w-7xl mx-auto px-6">
        <PageHeader
          title="About"
          description="A passionate developer with a strong foundation in software development and DevOps practices."
        />
        <AboutClient />
      </div>
    </section>
  )
}
