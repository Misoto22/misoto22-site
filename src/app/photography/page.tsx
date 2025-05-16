'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Masonry from 'react-masonry-css';
import ImageModal from '@/components/photography/ImageModal';
import PageHeader from '@/components/layout/PageHeader';

// Use the provided photo metadata array
const photos = [
  {
    "id": "00001",
    "src": "https://images.misoto22.com/00001.webp",
    "width": 4000,
    "height": 6000,
    "alt": "00001"
  },
  {
    "id": "00002",
    "src": "https://images.misoto22.com/00002.webp",
    "width": 7008,
    "height": 4672,
    "alt": "00002"
  },
  {
    "id": "00003",
    "src": "https://images.misoto22.com/00003.webp",
    "width": 6222,
    "height": 4148,
    "alt": "00003"
  },
  {
    "id": "00004",
    "src": "https://images.misoto22.com/00004.webp",
    "width": 4664,
    "height": 6996,
    "alt": "00004"
  },
  {
    "id": "00005",
    "src": "https://images.misoto22.com/00005.webp",
    "width": 3864,
    "height": 5796,
    "alt": "00005"
  },
  {
    "id": "00006",
    "src": "https://images.misoto22.com/00006.webp",
    "width": 3865,
    "height": 5797,
    "alt": "00006"
  },
  {
    "id": "00007",
    "src": "https://images.misoto22.com/00007.webp",
    "width": 5545,
    "height": 3119,
    "alt": "00007"
  },
  {
    "id": "00008",
    "src": "https://images.misoto22.com/00008.webp",
    "width": 3967,
    "height": 5951,
    "alt": "00008"
  },
  {
    "id": "00009",
    "src": "https://images.misoto22.com/00009.webp",
    "width": 4057,
    "height": 5934,
    "alt": "00009"
  },
  {
    "id": "00010",
    "src": "https://images.misoto22.com/00010.webp",
    "width": 6240,
    "height": 4160,
    "alt": "00010"
  },
  {
    "id": "00011",
    "src": "https://images.misoto22.com/00011.webp",
    "width": 4568,
    "height": 3045,
    "alt": "00011"
  },
  {
    "id": "00012",
    "src": "https://images.misoto22.com/00012.webp",
    "width": 4160,
    "height": 6240,
    "alt": "00012"
  },
  {
    "id": "00013",
    "src": "https://images.misoto22.com/00013.webp",
    "width": 6000,
    "height": 4000,
    "alt": "00013"
  },
  {
    "id": "00014",
    "src": "https://images.misoto22.com/00014.webp",
    "width": 3068,
    "height": 4602,
    "alt": "00014"
  },
  {
    "id": "00015",
    "src": "https://images.misoto22.com/00015.webp",
    "width": 6000,
    "height": 4000,
    "alt": "00015"
  },
  {
    "id": "00016",
    "src": "https://images.misoto22.com/00016.webp",
    "width": 2560,
    "height": 1707,
    "alt": "00016"
  },
  {
    "id": "00017",
    "src": "https://images.misoto22.com/00017.webp",
    "width": 2560,
    "height": 1707,
    "alt": "00017"
  },
  {
    "id": "00018",
    "src": "https://images.misoto22.com/00018.webp",
    "width": 1707,
    "height": 2560,
    "alt": "00018"
  },
  {
    "id": "00019",
    "src": "https://images.misoto22.com/00019.webp",
    "width": 2560,
    "height": 1707,
    "alt": "00019"
  },
  {
    "id": "00020",
    "src": "https://images.misoto22.com/00020.webp",
    "width": 2560,
    "height": 1440,
    "alt": "00020"
  },
  {
    "id": "00021",
    "src": "https://images.misoto22.com/00021.webp",
    "width": 2560,
    "height": 1707,
    "alt": "00021"
  },
  {
    "id": "00022",
    "src": "https://images.misoto22.com/00022.webp",
    "width": 1440,
    "height": 1800,
    "alt": "00022"
  },
  {
    "id": "00023",
    "src": "https://images.misoto22.com/00023.webp",
    "width": 3120,
    "height": 1760,
    "alt": "00023"
  },
  {
    "id": "00024",
    "src": "https://images.misoto22.com/00024.webp",
    "width": 1707,
    "height": 2560,
    "alt": "00024"
  },
  {
    "id": "00025",
    "src": "https://images.misoto22.com/00025.webp",
    "width": 1707,
    "height": 2560,
    "alt": "00025"
  }
];

export default function PhotographyPage() {
  const [mounted, setMounted] = useState(false);
  const [visiblePhotos, setVisiblePhotos] = useState<typeof photos>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);
  const photosPerPage = 8;

  // Define breakpoints for the Masonry layout
  const breakpointColumnsObj = {
    default: 3, // Reduce default column count to minimize gaps
    1200: 3,
    900: 2,
    600: 1
  };

  // Handle photo click to open modal
  const handlePhotoClick = (photo: typeof photos[0]) => {
    setSelectedPhoto(photo);
    setModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Optimize photo ordering to improve masonry layout
  const optimizePhotoOrder = useCallback((photoArray: typeof photos) => {
    // Sort by aspect ratio, alternating portrait and landscape photos
    const sortedPhotos = [...photoArray].sort((a, b) => {
      const ratioA = a.width / a.height;
      const ratioB = b.width / b.height;
      return ratioA - ratioB; // Sort from portrait to landscape
    });

    // Further optimization: group by columns to ensure similar heights
    const columns = 3; // Default column count
    const result: typeof photos = [];

    // Create column arrays
    const columnGroups: typeof photos[] = Array(columns).fill(null).map(() => []);

    // Use "greedy" algorithm to distribute photos across columns for balanced heights
    sortedPhotos.forEach((photo) => {
      // Find the column with the smallest current height
      const shortestColumnIndex = columnGroups
        .map((column, i) => ({
          index: i,
          height: column.reduce((sum, p) => sum + (p.height / p.width), 0)
        }))
        .sort((a, b) => a.height - b.height)[0].index;

      // Add the photo to this column
      columnGroups[shortestColumnIndex].push(photo);
    });

    // Merge all columns into a single array
    columnGroups.forEach(column => {
      result.push(...column);
    });

    return result;
  }, []);

  // Pre-optimize photo order, execute only once
  const optimizedInitialPhotos = useMemo(() => {
    return optimizePhotoOrder(photos);
  }, [optimizePhotoOrder, photos]);

  // Load more photos when the user scrolls to the bottom
  const loadMorePhotos = useCallback(() => {
    if (page * photosPerPage >= photos.length) {
      setLoading(false);
      return;
    }

    const nextPage = page + 1;
    const nextBatchEnd = nextPage * photosPerPage;

    // Only get new photos, don't re-sort the entire array
    const newBatchPhotos = optimizedInitialPhotos.slice(visiblePhotos.length, nextBatchEnd);

    // Use functional update to avoid depending on previous state
    setVisiblePhotos(prevPhotos => [...prevPhotos, ...newBatchPhotos]);
    setPage(nextPage);

    if (nextBatchEnd >= photos.length) {
      setLoading(false);
    }
  }, [page, photosPerPage, photos.length, visiblePhotos.length, optimizedInitialPhotos]);

  // Effect for initial mounting
  useEffect(() => {
    setMounted(true);
    // Initial load of photos with optimized order
    setVisiblePhotos(optimizedInitialPhotos.slice(0, photosPerPage));
  }, [optimizedInitialPhotos, photosPerPage]);

  // Effect for intersection observer
  useEffect(() => {
    if (!mounted) return;

    // Set up intersection observer for infinite scroll
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && loading) {
        loadMorePhotos();
      }
    }, { threshold: 0.1 });

    // Observe the loading element
    const loadingElement = document.getElementById('loading-indicator');
    if (loadingElement) {
      observer.observe(loadingElement);
    }

    return () => {
      if (loadingElement) {
        observer.unobserve(loadingElement);
      }
    };
  }, [mounted, loading, loadMorePhotos]);

  if (!mounted) {
    return null;
  }

  return (
    <main className="p-8 max-w-6xl mx-auto min-h-[calc(100vh-200px)] mt-20 mb-30">
      <PageHeader
        title="Photography"
        description="My photography portfolio, capturing the beauty of nature and the city."
      />

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-full -ml-6 [contain:layout_style] [will-change:contents] [transform:translateZ(0)]"
        columnClassName="pl-6 bg-clip-padding [contain:layout_style] [will-change:transform] [transform:translateZ(0)] h-full"
      >
        {visiblePhotos.map((photo) => (
          <div
            key={photo.id}
            className="mb-6 block relative transition-transform duration-300 ease-in-out cursor-pointer animate-[fadeIn_0.5s_ease-in-out] [will-change:transform,opacity] [transform:translateZ(0)] [contain:layout_paint_style] min-h-[100px] hover:scale-105 hover:z-10 group"
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
                  transform: 'translateZ(0)', // Enable hardware acceleration
                  willChange: 'opacity' // Hint browser for optimization
                }}
                onLoadingComplete={(image) => {
                  // Use requestAnimationFrame to ensure style changes in the next frame
                  // This helps reduce layout shifts
                  requestAnimationFrame(() => {
                    image.style.opacity = '1';
                  });
                }}
              />
              {/* View Full Size indicator */}
              <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2.5 py-1 rounded text-xs opacity-0 group-hover:opacity-90 transition-opacity duration-200">
                View Full Size
              </div>
            </div>
          </div>
        ))}
      </Masonry>

      {loading && visiblePhotos.length < photos.length && (
        <div id="loading-indicator" className="flex justify-center items-center min-h-[100px] text-lg text-gray-600 mt-8 p-4 rounded-lg bg-gray-100 shadow-sm animate-pulse [contain:content] [will-change:opacity] [transform:translateZ(0)] h-[100px] w-full relative">
          Loading more photos...
        </div>
      )}

      {/* Image Modal */}
      <ImageModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        photo={selectedPhoto}
      />
    </main>
  );
}
