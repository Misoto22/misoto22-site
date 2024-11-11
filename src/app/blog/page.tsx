// src/app/blog/page.tsx
export default function Blog() {
    return (
      <section className="pt-24 min-h-[70vh] flex items-center justify-center bg-[var(--background)]">
        <div className="text-center px-6 py-12 bg-[var(--card-background)] shadow-sm rounded-lg max-w-lg mx-auto">
          <h2 className="text-4xl font-light tracking-wider text-[var(--foreground)] mb-6">Blog</h2>
          <p className="text-lg opacity-80 mb-4">Coming Soon</p>
          <p className="text-sm opacity-60">
            I&apos;m working on creating inspiring content.
          </p>
        </div>
      </section>
    )
  }