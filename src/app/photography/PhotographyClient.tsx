'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Masonry from 'react-masonry-css';
import ImageModal from '@/components/photography/ImageModal';
import PageHeader from '@/components/layout/PageHeader';

interface Photo {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
}

interface PhotosData {
  photos: Photo[];
  hasMore: boolean;
  totalCount: number;
}

interface PhotographyClientProps {
  initialData: PhotosData;
}

export default function PhotographyClient({ initialData }: PhotographyClientProps) {
  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const [photos, setPhotos] = useState<Photo[]>(initialData.photos);
  const [hasMore, setHasMore] = useState(initialData.hasMore);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Define breakpoints for the Masonry layout
  const breakpointColumnsObj = {
    default: 3,
    1200: 3,
    900: 2,
    600: 1
  };

  // Handle photo click to open modal
  const handlePhotoClick = (photo: Photo) => {
    const index = photos.findIndex(p => p.id === photo.id);
    setSelectedPhoto(photo);
    setSelectedPhotoIndex(index);
    setModalOpen(true);
  };

  // Navigate to previous photo
  const handlePreviousPhoto = () => {
    if (selectedPhotoIndex > 0) {
      const newIndex = selectedPhotoIndex - 1;
      setSelectedPhotoIndex(newIndex);
      setSelectedPhoto(photos[newIndex]);
    }
  };

  // Navigate to next photo
  const handleNextPhoto = () => {
    if (selectedPhotoIndex < photos.length - 1) {
      const newIndex = selectedPhotoIndex + 1;
      setSelectedPhotoIndex(newIndex);
      setSelectedPhoto(photos[newIndex]);
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPhoto(null);
  };

  // Load more photos
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call when Supabase is implemented
      // For now, just simulate loading
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock: no more photos to load
      setHasMore(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more photos');
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore]);

  // Effect for initial mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Effect for intersection observer
  useEffect(() => {
    if (!mounted) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && hasMore) {
        loadMore();
      }
    }, { threshold: 0.1 });

    const loadingElement = document.getElementById('loading-indicator');
    if (loadingElement) {
      observer.observe(loadingElement);
    }

    return () => {
      if (loadingElement) {
        observer.unobserve(loadingElement);
      }
    };
  }, [mounted, loading, hasMore, loadMore]);

  if (!mounted) {
    return null;
  }

  return (
    <main className="pt-24 min-h-screen bg-[var(--background)]">
      <div className="max-w-6xl mx-auto px-6">
        <PageHeader
          title="Photography"
          description="My photography portfolio, capturing the beauty of nature and the city."
        />

        {photos.length > 0 ? (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex w-full sm:-ml-4 [contain:layout_style] [will-change:contents] [transform:translateZ(0)]"
            columnClassName="sm:pl-4 bg-clip-padding [contain:layout_style] [will-change:transform] [transform:translateZ(0)] h-full"
          >
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="mb-3 sm:mb-4 block relative cursor-pointer animate-[fadeIn_0.5s_ease-in-out] [will-change:opacity] [transform:translateZ(0)] [contain:layout_paint_style] min-h-[100px] group"
                onClick={() => handlePhotoClick(photo)}
              >
                <div
                  className="relative w-full overflow-hidden bg-[var(--card-background,#f0f0f0)] bg-gradient-to-r from-transparent via-white/50 to-transparent bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] min-h-[100px] [contain:layout_paint] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow duration-300"
                  style={{ paddingBottom: `${(photo.height / photo.width) * 100}%` }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4="
                    className="w-full h-auto object-cover block"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={(e) => {
                      const target = e.target as HTMLElement;
                      target.parentElement?.remove();
                    }}
                    style={{
                      objectFit: 'cover',
                      opacity: 0,
                      transition: 'opacity 0.5s ease-in-out',
                      transform: 'translateZ(0)',
                      willChange: 'opacity'
                    }}
                    onLoad={(event) => {
                      requestAnimationFrame(() => {
                        const img = event.currentTarget;
                        img.style.opacity = '1';
                      });
                    }}
                  />
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2.5 py-1 rounded text-xs opacity-0 group-hover:opacity-90 transition-opacity duration-200">
                    View Full Size
                  </div>
                </div>
              </div>
            ))}
          </Masonry>
        ) : (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="text-gray-500 text-center">
              <p>No photos available at the moment.</p>
            </div>
          </div>
        )}

        {/* Loading indicator for infinite scroll */}
        {hasMore && (
          <div id="loading-indicator" className="flex justify-center items-center py-8">
            {loading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
            ) : (
              <div className="h-8 w-8"></div>
            )}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="text-red-500 text-center">
              <p>Error loading photos: {error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={modalOpen}
        photo={selectedPhoto}
        onClose={handleCloseModal}
        onPrevious={handlePreviousPhoto}
        onNext={handleNextPhoto}
        currentIndex={selectedPhotoIndex}
        totalCount={photos.length}
        hasPrevious={selectedPhotoIndex > 0}
        hasNext={selectedPhotoIndex < photos.length - 1}
      />
    </main>
  );
}
