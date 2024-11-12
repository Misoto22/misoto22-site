export default function About() {
  return (
    <section className="pt-24 min-h-screen bg-[var(--background)]">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-light mb-16 tracking-wide text-[var(--foreground)]">
          About
        </h1>

        {/* Introduction */}
        <div className="prose prose-lg">
          <p className="text-xl leading-relaxed mb-12 text-[var(--secondary-text)]">
            Hi, I&apos;m Henry, a Computer Science student and photographer based in Perth, Western Australia.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12 text-[var(--secondary-text)]">
          <div className="space-y-6">
            <p className="leading-relaxed">
              Originally from Shanghai, China, I&apos;ve had the privilege of experiencing life in different parts of Australia. 
              Before settling in Perth, I spent four enriching years in Sydney, which significantly influenced my 
              perspective as a photographer.
            </p>

            <p className="leading-relaxed">
              My photography focuses on three main themes: the raw beauty of nature, the dynamic energy of urban landscapes, 
              and the subtle moments of human connection. Through my lens, I aim to capture the interplay between these 
              elements, documenting both the grand vistas of Western Australia and the intimate details of city life.
            </p>

            <p className="leading-relaxed">
              When I&apos;m not coding or studying, you&apos;ll find me exploring new locations with my camera, 
              whether it&apos;s discovering hidden urban corners or venturing into the natural landscapes 
              that make Western Australia unique.
            </p>
          </div>

          {/* Technical Background */}
          <div className="pt-12 border-t border-[var(--border-color)]">
            <h2 className="text-2xl font-light mb-6 tracking-wide text-[var(--foreground)]">
              Technical Background
            </h2>
            <p className="leading-relaxed">
              Currently pursuing my degree in Computer Science, I bring a technical mindset to my 
              creative work, finding interesting parallels between the precision of programming and 
              the artistry of photography.
            </p>
          </div>
        </div>

        {/* Contact Links */}
        <div className="mt-16 flex gap-8 items-center">
          <a 
            href="mailto:cxw8848@hotmail.com" 
            className="text-[var(--secondary-text)] hover:text-[var(--foreground)] transition-colors duration-300"
          >
            Get in touch
          </a>
          <span className="text-[var(--border-color)]">|</span>
          <a 
            href="/cv.pdf" 
            className="text-[var(--secondary-text)] hover:text-[var(--foreground)] transition-colors duration-300"
          >
            Resume
          </a>
        </div>
      </div>
    </section>
  )
}