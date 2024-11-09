// src/app/about/page.tsx
export default function About() {
    return (
      <section className="pt-24 max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-light mb-12 tracking-wide">About</h2>
        <div className="space-y-8 text-gray-600 leading-relaxed">
          <p className="text-lg">
            Hi, I&apos;m Henry, a Computer Science student and photographer based in Perth, Western Australia.
          </p>
          
          <div className="space-y-6">
            <p>
              Originally from Shanghai, China, I&apos;ve had the privilege of experiencing life in different parts of Australia. 
              Before settling in Perth, I spent four enriching years in Sydney, which significantly influenced my 
              perspective as a photographer.
            </p>
  
            <p>
              My photography focuses on three main themes: the raw beauty of nature, the dynamic energy of urban landscapes, 
              and the subtle moments of human connection. Through my lens, I aim to capture the interplay between these 
              elements, documenting both the grand vistas of Western Australia and the intimate details of city life.
            </p>
  
            <p>
              When I&apos;m not coding or studying, you&apos;ll find me exploring new locations with my camera, 
              whether it&apos;s discovering hidden urban corners or venturing into the natural landscapes 
              that make Western Australia unique.
            </p>
          </div>
  
          <div className="pt-8 border-t border-gray-100">
            <h3 className="text-xl font-light mb-4 tracking-wide">Technical Background</h3>
            <p>
              Currently pursuing my degree in Computer Science, I bring a technical mindset to my 
              creative work, finding interesting parallels between the precision of programming and 
              the artistry of photography.
            </p>
          </div>
        </div>
  
        <div className="mt-12 flex gap-6">
          <a 
            href="mailto:your.email@example.com" 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Get in touch
          </a>
          <span className="text-gray-300">|</span>
          <a 
            href="/cv.pdf" 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Resume
          </a>
        </div>
      </section>
    )
  }