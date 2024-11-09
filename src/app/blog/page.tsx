import BlogCard from '@/components/BlogCard'

const blogPosts = [
  {
    id: 1,
    title: 'The Art of Minimalist Photography',
    date: 'January 15, 2024',
    excerpt: 'Exploring the power of negative space and composition in modern photography...',
    image: '/images/blog/post1.jpg'
  },
  // Add more blog posts here
];

export default function Blog() {
  return (
    <section className="pt-24 max-w-6xl mx-auto px-6">
      <h2 className="text-3xl font-light mb-12 tracking-wide">Blog</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}