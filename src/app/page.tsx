import HomeClient from './HomeClient'
import { getProjects, getPhotos, getBlogPosts } from '@/lib/data'

export const revalidate = 3600

export default async function Home() {
  const [projects, photosData, blogData] = await Promise.all([
    getProjects(),
    getPhotos(1, 8),
    getBlogPosts({ page: 1, limit: 3 }),
  ])

  return (
    <HomeClient
      photos={photosData.photos}
      projects={projects}
      blogPosts={blogData.posts}
    />
  )
}