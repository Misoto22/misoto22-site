import BlogCard from '@/components/BlogCard'

export default function Blog() {
  return (
    <section className="pt-24 max-w-6xl mx-auto px-6">
      <h2 className="text-3xl font-light mb-12 tracking-wide">Blog</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <BlogCard key={item} />
        ))}
      </div>
    </section>
  )
}