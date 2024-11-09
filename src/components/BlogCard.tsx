const BlogCard = () => (
    <article className="bg-white">
      <img
        src="/api/placeholder/800/600"
        alt="Blog post"
        className="w-full h-64 object-cover"
      />
      <div className="pt-6">
        <time className="text-sm text-gray-500">January 15, 2024</time>
        <h3 className="mt-2 text-xl font-light tracking-wide">
          <a href="#" className="hover:text-gray-600">
            The Art of Minimalist Photography
          </a>
        </h3>
        <p className="mt-3 text-gray-600 line-clamp-2">
          Exploring the power of negative space and composition in modern photography...
        </p>
      </div>
    </article>
  )
  
  export default BlogCard