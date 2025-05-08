"use client"
import React from 'react'
import Image from 'next/image'
import AnimatedSection from '@/components/AnimatedSection'

interface PhotoGallery {
  title: string;
  description: string;
  images: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
}

const galleries: PhotoGallery[] = [
  {
    title: "Landscape Photography",
    description: "Capturing the beauty of nature and urban landscapes from around the world.",
    images: [
      {
        src: "/images/photography/landscape-1.jpg",
        alt: "Mountain landscape at sunset",
        width: 1920,
        height: 1080
      },
      {
        src: "/images/photography/landscape-2.jpg",
        alt: "City skyline at night",
        width: 1920,
        height: 1080
      },
      {
        src: "/images/photography/landscape-3.jpg",
        alt: "Beach sunset",
        width: 1920,
        height: 1080
      }
    ]
  },
  {
    title: "Street Photography",
    description: "Documenting everyday life and urban culture through candid moments.",
    images: [
      {
        src: "/images/photography/street-1.jpg",
        alt: "Street market scene",
        width: 1920,
        height: 1080
      },
      {
        src: "/images/photography/street-2.jpg",
        alt: "City street at rush hour",
        width: 1920,
        height: 1080
      },
      {
        src: "/images/photography/street-3.jpg",
        alt: "Urban architecture",
        width: 1920,
        height: 1080
      }
    ]
  }
];

export default function PhotographyPage() {
  return (
    <section className="pt-24 min-h-screen bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <h1 className="text-4xl md:text-5xl font-heading mb-4 tracking-wide text-[var(--foreground)] text-center">
            Photography
          </h1>
          <p className="text-[var(--secondary-text)] mb-12 text-center text-lg max-w-2xl mx-auto">
            A collection of my photographic work, capturing moments and memories through my lens.
          </p>
        </AnimatedSection>

        <div className="space-y-16">
          {galleries.map((gallery, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <div className="bg-[var(--card-background)] rounded-2xl p-8 shadow-lg border border-[var(--border-color)] hover:shadow-xl transition-all duration-300">
                <div className="mb-8">
                  <h2 className="text-2xl font-heading text-[var(--foreground)] mb-2">{gallery.title}</h2>
                  <p className="text-[var(--secondary-text)]">{gallery.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gallery.images.map((image, i) => (
                    <div
                      key={i}
                      className="relative aspect-[4/3] rounded-lg overflow-hidden group"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-16">
          <div className="bg-[var(--card-background)] rounded-2xl p-8 shadow-lg border border-[var(--border-color)]">
            <h2 className="text-2xl font-heading text-[var(--foreground)] mb-4">About My Photography</h2>
            <div className="space-y-4 text-[var(--secondary-text)]">
              <p>
                Photography has been my passion for over 5 years. I specialize in landscape and street photography,
                focusing on capturing the beauty of nature and the essence of urban life.
              </p>
              <p>
                My work has been featured in several local exhibitions and publications. I'm always looking for
                new opportunities to collaborate and share my vision with others.
              </p>
              <p>
                If you're interested in purchasing prints or collaborating on a project, please don't hesitate to
                reach out through the contact page.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}