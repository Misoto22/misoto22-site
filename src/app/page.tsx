import Image from 'next/image'

export default function Home() {
  return (
    <section className="pt-24 min-h-screen bg-[var(--background)] flex flex-col items-center px-4">
      <div className="w-full flex flex-col items-center">
        {/* 插画和名字融合区 */}
        <div className="relative flex flex-col items-center mb-12 w-full">
          {/* Illustration */}
          <div className="flex justify-center w-full">
            <Image
              src="/illustration.png"
              alt="Coding Illustration"
              width={320}
              height={220}
              className="rounded-lg w-40 h-auto md:w-80"
              priority
            />
          </div>
          {/* 名字，稍微叠加在插画下方 */}
          <h1 className="text-4xl md:text-6xl font-semibold tracking-wide text-[var(--foreground)] mt-[-32px] bg-[var(--background)] px-4 py-2 rounded-lg z-10">
            Henry Chen
          </h1>
          {/* 简介 */}
          <p className="text-base md:text-xl text-[var(--secondary-text)] mt-4 max-w-xl text-center leading-relaxed">
            A Computer Science student and photographer capturing the beauty of Western Australia through code and lens.
          </p>
        </div>
        {/* What do I do? 区块 */}
        <div className="w-full max-w-3xl space-y-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-light mb-6 text-[var(--foreground)] text-center">
              What do I do?
            </h2>
            <div className="space-y-4 text-[var(--secondary-text)] text-center">
              <p className="leading-relaxed">
                <b>Academic Journey:</b> Currently pursuing my degree in Computer Science, I bring a technical mindset to everything I do. My academic focus lies in software development and artificial intelligence, where I combine theoretical knowledge with practical applications.
              </p>
              <p className="leading-relaxed">
                Having spent four years in Sydney before moving to Perth, I've developed a unique perspective that bridges different Australian cultures and academic environments. This experience has enriched my understanding of both technology and human interaction.
              </p>
              <p className="leading-relaxed">
                <b>Photography Passion:</b> My photography journey is driven by three main themes: the raw beauty of nature, the dynamic energy of urban landscapes, and the subtle moments of human connection. Through my lens, I aim to capture the interplay between these elements, documenting both the grand vistas of Western Australia and the intimate details of city life.
              </p>
              <div className="pt-2">
                <a 
                  href="/photography" 
                  className="inline-flex items-center text-[var(--foreground)] hover:text-[var(--secondary-text)] transition-colors"
                >
                  View My Photography
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}