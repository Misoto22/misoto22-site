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
    setSelectedPhoto(photo);
    setModalOpen(true);
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
          className="flex w-full sm:-ml-6 [contain:layout_style] [will-change:contents] [transform:translateZ(0)]"
          columnClassName="sm:pl-6 bg-clip-padding [contain:layout_style] [will-change:transform] [transform:translateZ(0)] h-full"
        >
          {visiblePhotos.map((photo) => (
            <div
              key={photo.id}
              className="mb-4 sm:mb-6 block relative transition-transform duration-300 ease-in-out cursor-pointer animate-[fadeIn_0.5s_ease-in-out] [will-change:transform,opacity] [transform:translateZ(0)] [contain:layout_paint_style] min-h-[100px] hover:scale-105 hover:z-10 group"
              onClick={() => handlePhotoClick(photo)}
            >
            <div
              className="relative w-full overflow-hidden rounded-lg bg-[var(--card-background,#f0f0f0)] bg-gradient-to-r from-transparent via-white/50 to-transparent bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] min-h-[100px] [contain:layout_paint]"
              style={{ paddingBottom: `${(photo.height / photo.width) * 100}%` }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlZWVlZWUiLz48L3N2Zz4="
                className="w-full h-auto object-cover rounded-lg shadow-md block"
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
          <div id="loading-indicator" className="flex justify-center items-center min-h-[100px] text-lg text-gray-600 mt-8 p-4 rounded-lg bg-gray-100 shadow-sm animate-pulse [contain:content] [will-change:opacity] [transform:translateZ(0)] h-[100px] w-full relative">
            {loading ? 'Loading more photos...' : 'Scroll to load more'}
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
        />
      </div>
    </main>
  );
}
