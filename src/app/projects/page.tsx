export default function Projects() {
  return (
    <section className="pt-24 min-h-screen bg-[var(--background)]">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-light mb-16 tracking-wide text-[var(--foreground)]">
          Projects
        </h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          {/* Project Card Example */}
          <div className="bg-[var(--card-background)] p-6 rounded-lg">
            <h2 className="text-xl font-medium mb-4 text-[var(--foreground)]">Project Name</h2>
            <p className="text-[var(--secondary-text)] mb-4">Project description goes here</p>
            <div className="flex gap-2">
              <a 
                href="project-link" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-[var(--secondary-text)] hover:text-[var(--foreground)] transition-colors"
              >
                View Project →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
