interface BlogPost {
    id: number;
    title: string;
    date: string;
    excerpt: string;
    image: string;
  }
  
  interface BlogCardProps {
    post: BlogPost;
  }
  
  const BlogCard = ({ post }: BlogCardProps) => (
    <article className="bg-white">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-64 object-cover"
      />
      <div className="pt-6">
        <time className="text-sm text-gray-500">{post.date}</time>
        <h3 className="mt-2 text-xl font-light tracking-wide">
          <a href="#" className="hover:text-gray-600">
            {post.title}
          </a>
        </h3>
        <p className="mt-3 text-gray-600 line-clamp-2">
          {post.excerpt}
        </p>
      </div>
    </article>
  )
  
  export default BlogCard