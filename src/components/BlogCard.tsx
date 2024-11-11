import Image from 'next/image'

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
      <Image
        src={post.image}
        alt={post.title}
        width={800}
        height={400}
        className="w-full h-64 object-cover"
      />
      <div className="pt-6">
        <time className="text-sm text-[var(--secondary-text)]">{post.date}</time>
        <h3 className="mt-2 text-xl font-light tracking-wide">
          <a href="#" className="hover:text-[var(--secondary-text)]">
            {post.title}
          </a>
        </h3>
        <p className="mt-3 text-[var(--secondary-text)] line-clamp-2">
          {post.excerpt}
        </p>
      </div>
    </article>
  )
  
  export default BlogCard