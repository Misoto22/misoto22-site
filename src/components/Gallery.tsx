"use client"
import Image from 'next/image'
import { useState, useEffect } from 'react'
import exifr from 'exifr';

interface GalleryImage {
  id: number;
  title: string;
  location: string;
  year: string;
  r2Key: string;
  aspect: string;
  className: string;
}

interface ExifData {
  Make?: string;
  Model?: string;
  LensModel?: string;
  FNumber?: number;
  ExposureTime?: number;
  ISO?: number;
}

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exifData, setExifData] = useState<ExifData | null>(null);
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

  useEffect(() => {
    const fetchImageUrls = async () => {
      if (!Array.isArray(images) || images.length === 0) return;

      const urls: Record<string, string> = {};
      const batchSize = 3; // 每次加载3张图片
      
      for (let i = 0; i < images.length; i += batchSize) {
        const batch = images.slice(i, i + batchSize);
        await Promise.all(
          batch.map(async (image) => {
            try {
              const response = await fetch(`/api/images/url?key=${encodeURIComponent(image.r2Key)}`);
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              console.log(`Got URL for ${image.title}:`, data.url);
              urls[image.r2Key] = data.url;
            } catch (error) {
              console.error(`Error fetching URL for ${image.title}:`, error);
            }
          })
        );
        setImageUrls(prev => ({ ...prev, ...urls }));
      }
    };

    fetchImageUrls();
  }, [images]);

  const handleImageLoad = (r2Key: string) => {
    setLoadedImages(prev => new Set([...prev, r2Key]));
  };

  const handleImageClick = async (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
    setIsModalOpen(true);

    try {
      const response = await fetch(`/api/images/url?key=${encodeURIComponent(image.r2Key)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSelectedImageUrl(data.url);
      
      // Try to get EXIF data
      try {
        const exifData = await exifr.parse(data.url);
        setExifData(exifData);
      } catch (error) {
        console.log('Failed to read image EXIF data:', error);
        setExifData(null);
      }
    } catch (error) {
      console.error('Error fetching selected image URL:', error);
    }
  };

  const handlePrevImage = async () => {
    if (selectedIndex > 0) {
      const prevIndex = selectedIndex - 1;
      const prevImage = images[prevIndex];
      setSelectedImage(prevImage);
      setSelectedIndex(prevIndex);

      try {
        const response = await fetch(`/api/images/url?key=${encodeURIComponent(prevImage.r2Key)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSelectedImageUrl(data.url);
      } catch (error) {
        console.error('Error fetching previous image URL:', error);
      }
    }
  };

  const handleNextImage = async () => {
    if (selectedIndex < images.length - 1) {
      const nextIndex = selectedIndex + 1;
      const nextImage = images[nextIndex];
      setSelectedImage(nextImage);
      setSelectedIndex(nextIndex);

      try {
        const response = await fetch(`/api/images/url?key=${encodeURIComponent(nextImage.r2Key)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSelectedImageUrl(data.url);
      } catch (error) {
        console.error('Error fetching next image URL:', error);
      }
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
  }, [isModalOpen]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading images...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <p>Error: {error}</p>
        </div>
      </div>
    );
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
    <section className="max-w-7xl mx-auto px-6 pt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`relative group overflow-hidden cursor-pointer ${image.className}`}
            onClick={() => handleImageClick(image, index)}
          >
            <div className={`relative ${image.aspect} w-full h-[300px] bg-gray-100`}>
              {imageUrls[image.r2Key] && (
                <>
                  {!loadedImages.has(image.r2Key) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-pulse bg-gray-200 w-full h-full"></div>
                    </div>
                  )}
                  <Image
                    src={imageUrls[image.r2Key]}
                    alt={image.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={75}
                    priority={index < 4}
                    loading={index < 4 ? "eager" : "lazy"}
                    className={`object-cover transition-opacity duration-300 ${
                      loadedImages.has(image.r2Key) ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => handleImageLoad(image.r2Key)}
                  />
                </>
              )}
            </div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-white text-lg font-light tracking-wide">{image.title}</h3>
                <p className="text-gray-100 text-sm">{image.location}, {image.year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {isModalOpen && selectedImage && selectedImageUrl && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={handleCloseModal}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative max-w-7xl max-h-[90vh] w-full h-[90vh]" onClick={e => e.stopPropagation()}>
            <Image
              src={selectedImageUrl}
              alt={selectedImage.title}
              fill
              quality={90}
              priority
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4">
            <h3 className="text-xl mb-2">{selectedImage.title}</h3>
            <p className="text-sm text-gray-300 mb-1">{selectedImage.location}, {selectedImage.year}</p>
            {exifData && (
              <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                {exifData.Make && exifData.Model && (
                  <span>📷 {exifData.Make} {exifData.Model}</span>
                )}
                {exifData.LensModel && (
                  <span>🔭 {exifData.LensModel}</span>
                )}
                {exifData.FNumber && (
                  <span>⭕ f/{exifData.FNumber}</span>
                )}
                {exifData.ExposureTime && (
                  <span>⚡ {formatShutterSpeed(exifData.ExposureTime)}</span>
                )}
                {exifData.ISO && (
                  <span>📊 ISO {exifData.ISO}</span>
                )}
              </div>
            )}
          </div>
          {/* Navigation Buttons */}
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-2"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevImage();
            }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-2"
            onClick={(e) => {
              e.stopPropagation();
              handleNextImage();
            }}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}

export default Gallery