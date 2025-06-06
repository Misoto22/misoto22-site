"use client"

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import Image from 'next/image'
import Link from 'next/link'

interface MarkdownRendererProps {
  content: string
  className?: string
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  return (
    <div className={`prose prose-lg max-w-4xl ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeSlug]}
        components={{
          // Custom heading renderer with proper IDs for TOC
          h1: ({ children, id, ...props }) => (
            <h1 id={id} className="scroll-mt-24" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, id, ...props }) => (
            <h2 id={id} className="scroll-mt-24" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, id, ...props }) => (
            <h3 id={id} className="scroll-mt-24" {...props}>
              {children}
            </h3>
          ),
          h4: ({ children, id, ...props }) => (
            <h4 id={id} className="scroll-mt-24" {...props}>
              {children}
            </h4>
          ),
          h5: ({ children, id, ...props }) => (
            <h5 id={id} className="scroll-mt-24" {...props}>
              {children}
            </h5>
          ),
          h6: ({ children, id, ...props }) => (
            <h6 id={id} className="scroll-mt-24" {...props}>
              {children}
            </h6>
          ),
          // Custom image renderer using Next.js Image
          img: ({ src, alt }) => {
            if (!src || typeof src !== 'string') return null

            return (
              <div className="relative w-full my-8">
                <Image
                  src={src}
                  alt={alt || ''}
                  width={800}
                  height={400}
                  className="rounded-xl shadow-lg object-cover w-full h-auto"
                />
              </div>
            )
          },
          // Custom link renderer
          a: ({ href, children, ...props }) => {
            if (!href) return <span {...props}>{children}</span>
            
            // Internal links
            if (href.startsWith('/') || href.startsWith('#')) {
              return (
                <Link href={href} {...props}>
                  {children}
                </Link>
              )
            }
            
            // External links
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              >
                {children}
              </a>
            )
          },
          // Custom code block renderer
          pre: ({ children, ...props }) => (
            <pre className="overflow-x-auto" {...props}>
              {children}
            </pre>
          ),
          // Custom table renderer
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto">
              <table {...props}>{children}</table>
            </div>
          ),
          // Custom blockquote renderer
          blockquote: ({ children, ...props }) => (
            <blockquote className="border-l-4 border-[var(--foreground)] pl-6 italic text-[var(--secondary-text)] my-6" {...props}>
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer
