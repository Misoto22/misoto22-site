"use client"
import Image from 'next/image'
import { useState, useEffect } from 'react'
import AnimatedSection from '@/components/AnimatedSection'

interface GalleryImage {
  id: number;
  title: string;
  location: string;
  year: string;
  r2Key: string;
  aspect: string;
  className: string;
  exif: {
    Make?: string;
    Model?: string;
    LensModel?: string;
    FNumber?: number;
    ExposureTime?: number;
    ISO?: number;
  };
}

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/api/images');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched images:', data);
        
        if (!Array.isArray(data)) {
          console.error('Received non-array data:', data);
          throw new Error('Invalid data format received from API');
        }
        
        setImages(data);
      } catch (error) {
        console.error('Error fetching images:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch images');
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleImageLoad = (r2Key: string) => {
    setLoadedImages(prev => new Set([...prev, r2Key]));
  };

  const handleImageClick = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const handlePrevImage = () => {
    if (selectedIndex > 0) {
      const prevIndex = selectedIndex - 1;
      setSelectedImage(images[prevIndex]);
      setSelectedIndex(prevIndex);
    }
  };

  const handleNextImage = () => {
    if (selectedIndex < images.length - 1) {
      const nextIndex = selectedIndex + 1;
      setSelectedImage(images[nextIndex]);
      setSelectedIndex(nextIndex);
    }
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  // Helper function to convert shutter speed
  const formatShutterSpeed = (speed: number): string => {
    if (speed >= 1) {
      return `${speed}s`;
    }
    const denominator = Math.round(1 / speed);
    return `1/${denominator}`;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      
      if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'Escape') {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, selectedIndex, images]);

  if (isLoading) {
    return (
      <AnimatedSection className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-700">Loading...</div>
      </AnimatedSection>
    )
  }

  if (error) {
    return (
      <AnimatedSection className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-600">Error: {error}</div>
      </AnimatedSection>
    )
  }

  if (!Array.isArray(images) || images.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-gray-600">
          <p>No images found</p>
        </div>
      </div>
    );
  }

  return (
    <section className="pt-24 min-h-screen bg-[var(--background)] px-4">
      <AnimatedSection className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[var(--foreground)]">
          Photography
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <AnimatedSection key={image.id} delay={index * 0.1}>
              <div 
                className={`relative cursor-pointer group ${image.className}`}
                onClick={() => handleImageClick(image, index)}
              >
                <Image
                  src={image.r2Key}
                  alt={image.title}
                  width={800}
                  height={600}
                  className={`rounded-lg transition-opacity duration-300 ${
                    loadedImages.has(image.r2Key) ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => handleImageLoad(image.r2Key)}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-lg font-semibold">{image.title}</h3>
                    <p className="text-sm">{image.location}, {image.year}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </AnimatedSection>

      {/* Modal */}
      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <AnimatedSection className="relative max-w-7xl mx-auto p-4">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="relative">
              <Image
                src={selectedImage.r2Key}
                alt={selectedImage.title}
                width={1200}
                height={800}
                className="rounded-lg"
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
                <h2 className="text-2xl font-semibold">{selectedImage.title}</h2>
                <p className="text-lg">{selectedImage.location}, {selectedImage.year}</p>
                {selectedImage.exif && (
                  <div className="mt-2 text-sm">
                    <p>{selectedImage.exif.Make} {selectedImage.exif.Model}</p>
                    <p>Lens: {selectedImage.exif.LensModel}</p>
                    <p>ƒ/{selectedImage.exif.FNumber} • {formatShutterSpeed(selectedImage.exif.ExposureTime || 0)} • ISO {selectedImage.exif.ISO}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={handlePrevImage}
                disabled={selectedIndex === 0}
                className="text-white hover:text-gray-300 disabled:opacity-50"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNextImage}
                disabled={selectedIndex === images.length - 1}
                className="text-white hover:text-gray-300 disabled:opacity-50"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </AnimatedSection>
        </div>
      )}
    </section>
  )
}

export default Gallery