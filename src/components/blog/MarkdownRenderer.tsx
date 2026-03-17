"use client"

import React, { useCallback, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import Image from 'next/image'
import { Link } from 'next-view-transitions'

// 从 pre > code 子节点中提取纯文本
function extractText(node: React.ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (!node) return ''
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (typeof node === 'object' && 'props' in node) {
    const el = node as React.ReactElement<{ children?: React.ReactNode }>
    return extractText(el.props.children)
  }
  return ''
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>(null)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setCopied(false), 2000)
  }, [code])

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 p-1.5 rounded-md bg-(--background)/60 backdrop-blur-sm border border-(--border-subtle) text-(--secondary-text) hover:text-(--foreground) hover:border-(--border-color) transition-all duration-200 opacity-0 group-hover:opacity-100"
      aria-label={copied ? 'Copied' : 'Copy code'}
    >
      {copied ? (
        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )}
    </button>
  )
}

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
          // Custom code block renderer with copy button
          pre: ({ children, ...props }) => {
            const code = extractText(children)
            return (
              <div className="relative group">
                <CopyButton code={code} />
                <pre className="overflow-x-auto" {...props}>
                  {children}
                </pre>
              </div>
            )
          },
          // Custom table renderer
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto">
              <table {...props}>{children}</table>
            </div>
          ),
          // Custom blockquote renderer
          blockquote: ({ children, ...props }) => (
            <blockquote className="border-l-4 border-(--foreground) pl-6 italic text-(--secondary-text) my-6" {...props}>
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
