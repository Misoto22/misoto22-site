'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Masonry from 'react-masonry-css';
import ImageModal from '@/components/photography/ImageModal';
import PageHeader from '@/components/layout/PageHeader';
import { usePhotos } from '@/hooks/useApiData';

interface Photo {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
}

export default function PhotographyPage() {
  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);

  const { data, loading, error, loadMore } = usePhotos();
  const visiblePhotos = data?.photos || [];
  const hasMore = data?.hasMore || false;

  // Define breakpoints for the Masonry layout
  const breakpointColumnsObj = {
    default: 3,
    1200: 3,
    900: 2,
    600: 1
  };

  // Handle photo click to open modal
  const handlePhotoClick = (photo: Photo) => {
    const index = visiblePhotos.findIndex(p => p.id === photo.id);
    setSelectedPhoto(photo);
    setSelectedPhotoIndex(index);
    setModalOpen(true);
  };

  // Navigate to previous photo
  const handlePreviousPhoto = () => {
    if (selectedPhotoIndex > 0) {
      const newIndex = selectedPhotoIndex - 1;
      setSelectedPhotoIndex(newIndex);
      setSelectedPhoto(visiblePhotos[newIndex]);
    }
  };

  // Navigate to next photo
  const handleNextPhoto = () => {
    if (selectedPhotoIndex < visiblePhotos.length - 1) {
      const newIndex = selectedPhotoIndex + 1;
      setSelectedPhotoIndex(newIndex);
      setSelectedPhoto(visiblePhotos[newIndex]);
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

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

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-full sm:-ml-4 [contain:layout_style] [will-change:contents] [transform:translateZ(0)]"
          columnClassName="sm:pl-4 bg-clip-padding [contain:layout_style] [will-change:transform] [transform:translateZ(0)] h-full"
        >
          {visiblePhotos.map((photo) => (
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

        {hasMore && (
          <div id="loading-indicator" className="flex flex-col justify-center items-center min-h-[100px] mt-8 mb-8 relative">
            <div className="bg-[var(--card-background)] border border-[var(--border-color)] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 w-full max-w-sm">
              <div className="flex flex-col items-center space-y-3">
                {loading ? (
                  <>
                    {/* Loading spinner */}
                    <div className="w-6 h-6 border-2 border-[var(--border-color)] border-t-[var(--secondary-text)] rounded-full animate-spin"></div>
                    <p className="text-[var(--secondary-text)] font-medium">Loading more photos...</p>
                  </>
                ) : (
                  <>
                    {/* Simple scroll indicator */}
                    <div className="w-5 h-8 border-2 border-[var(--border-color)] rounded-full flex justify-center">
                      <div className="w-0.5 h-2 bg-[var(--secondary-text)] rounded-full mt-1.5 animate-bounce"></div>
                    </div>
                    <p className="text-[var(--secondary-text)] font-medium">Scroll to load more</p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-center items-center min-h-[200px] mt-8">
            <div className="text-red-500 text-center">
              <p>Error loading photos: {error}</p>
            </div>
          </div>
        )}

        <ImageModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          photo={selectedPhoto}
          onPrevious={handlePreviousPhoto}
          onNext={handleNextPhoto}
          currentIndex={selectedPhotoIndex}
          totalCount={visiblePhotos.length}
          hasPrevious={selectedPhotoIndex > 0}
          hasNext={selectedPhotoIndex < visiblePhotos.length - 1}
        />
      </div>
    </main>
  );
}
