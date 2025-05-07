"use client"
import Image from 'next/image'
import { useState, useEffect } from 'react'
import AnimatedSection from '@/components/AnimatedSection'
import Masonry from 'react-masonry-css'

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

  // Masonry breakpoints
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

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
        <h1 className="text-4xl font-semibold tracking-wide text-center mb-12 text-[var(--foreground)]">
          Photography
        </h1>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {images.map((image, index) => (
            <AnimatedSection key={image.id} delay={index * 0.1}>
              <div 
                className={`relative cursor-pointer group mb-6 ${image.className}`}
                onClick={() => handleImageClick(image, index)}
              >
                <Image
                  src={image.r2Key}
                  alt={image.title}
                  width={800}
                  height={800 / (parseFloat(image.aspect) || 1.5)}
                  className={`rounded-md transition-opacity duration-300 ${
                    loadedImages.has(image.r2Key) ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => handleImageLoad(image.r2Key)}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-md pointer-events-none">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 rounded-b-md pointer-events-auto">
                    <h3 className="text-lg font-semibold">{image.title}</h3>
                    <p className="text-sm">{image.location}, {image.year}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </Masonry>
      </AnimatedSection>

      {/* Modal */}
      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <AnimatedSection className="relative max-w-7xl mx-auto p-0">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-50 text-white hover:text-red-400 transition-colors duration-200"
              style={{ fontSize: 0 }}
              aria-label="Close"
            >
              <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="11" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative flex items-center justify-center min-h-[90vh]">
              <button
                onClick={handlePrevImage}
                disabled={selectedIndex === 0}
                className="fixed left-2 top-1/2 -translate-y-1/2 z-40 text-white hover:text-blue-400 transition-colors duration-200 p-0 bg-transparent border-none outline-none"
                aria-label="Previous"
                style={{ fontSize: 0 }}
              >
                <svg className="w-14 h-14 drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 48 48">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M30 36L18 24l12-12" />
                </svg>
              </button>
              <button
                onClick={handleNextImage}
                disabled={selectedIndex === images.length - 1}
                className="fixed right-2 top-1/2 -translate-y-1/2 z-40 text-white hover:text-blue-400 transition-colors duration-200 p-0 bg-transparent border-none outline-none"
                aria-label="Next"
                style={{ fontSize: 0 }}
              >
                <svg className="w-14 h-14 drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 48 48">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 12l12 12-12 12" />
                </svg>
              </button>
              <Image
                src={selectedImage.r2Key}
                alt={selectedImage.title}
                width={1200}
                height={1200 / (parseFloat(selectedImage.aspect) || 1.5)}
                className="rounded-lg object-contain max-h-[90vh] w-auto mx-auto shadow-xl"
                style={{ maxWidth: '100%' }}
              />
              <div className="absolute left-1/2 -translate-x-1/2 bottom-4 w-[92%] md:w-2/3 bg-black/40 text-white px-4 py-2 rounded-xl backdrop-blur-sm shadow-lg flex flex-col items-center pointer-events-auto">
                <h2 className="text-base md:text-lg font-semibold mb-1 text-center">{selectedImage.title}</h2>
                <p className="text-xs md:text-sm mb-1 text-center">{selectedImage.location}, {selectedImage.year}</p>
                {selectedImage.exif && (
                  <div className="mt-1 text-[10px] md:text-xs opacity-80 text-center">
                    <p>{selectedImage.exif.Make} {selectedImage.exif.Model}</p>
                    <p>Lens: {selectedImage.exif.LensModel}</p>
                    <p>
                      ƒ/{selectedImage.exif.FNumber} • {formatShutterSpeed(selectedImage.exif.ExposureTime || 0)} • ISO {selectedImage.exif.ISO}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      )}
    </section>
  )
}

export default Gallery