'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IoClose, IoChevronBack, IoChevronForward } from 'react-icons/io5';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  photo: {
    id: string;
    src: string;
    width: number;
    height: number;
    alt: string;
  } | null;
  onPrevious: () => void;
  onNext: () => void;
  currentIndex: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  photo,
  onPrevious,
  onNext,
  currentIndex,
  totalCount,
  hasPrevious,
  hasNext
}) => {
  const [loaded, setLoaded] = useState(false);

  // Reset loaded state when photo changes
  useEffect(() => {
    setLoaded(false);
  }, [photo]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent global keyboard navigation when modal is open
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        e.stopPropagation();
      }

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrevious) {
        onPrevious();
      } else if (e.key === 'ArrowRight' && hasNext) {
        onNext();
      }
    };

    if (isOpen) {
      // Use capture phase to intercept events before global handlers
      window.addEventListener('keydown', handleKeyDown, true);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [isOpen, onClose, onPrevious, onNext, hasPrevious, hasNext]);

  // Hide scroll and scroll-to-top button when modal is open
  useEffect(() => {
    const scrollToTopButton = document.querySelector('button[aria-label="Scroll to top"]');

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Hide scroll to top button
      if (scrollToTopButton) {
        (scrollToTopButton as HTMLElement).style.display = 'none';
      }
    } else {
      document.body.style.overflow = '';
      // Show scroll to top button
      if (scrollToTopButton) {
        (scrollToTopButton as HTMLElement).style.display = '';
      }
    }

    return () => {
      document.body.style.overflow = '';
      // Restore scroll to top button
      if (scrollToTopButton) {
        (scrollToTopButton as HTMLElement).style.display = '';
      }
    };
  }, [isOpen]);

  if (!isOpen || !photo) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-90 backdrop-blur-xs" />

      {/* Image container */}
      <div
        className="relative z-10 flex items-center justify-center w-full h-full px-4 py-4 md:px-24 md:py-20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image wrapper with relative positioning */}
        <div className="relative w-full h-full max-w-[95vw] max-h-[90vh] md:max-w-[85vw] md:max-h-[85vh] flex items-center justify-center">
          {/* Previous button - positioned outside image on desktop, overlay on mobile */}
          {hasPrevious && (
            <button
              onClick={onPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-all duration-200 p-2 md:p-3 bg-black/30 hover:bg-black/50 rounded-full backdrop-blur-xs z-20
                         md:-left-24 md:bg-black/50 md:hover:bg-black/70
                         sm:left-2 sm:opacity-70 hover:opacity-100"
              aria-label="Previous image"
            >
              <IoChevronBack size={20} className="md:w-6 md:h-6" />
            </button>
          )}

          {/* Next button - positioned outside image on desktop, overlay on mobile */}
          {hasNext && (
            <button
              onClick={onNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-all duration-200 p-2 md:p-3 bg-black/30 hover:bg-black/50 rounded-full backdrop-blur-xs z-20
                         md:-right-24 md:bg-black/50 md:hover:bg-black/70
                         sm:right-2 sm:opacity-70 hover:opacity-100"
              aria-label="Next image"
            >
              <IoChevronForward size={20} className="md:w-6 md:h-6" />
            </button>
          )}

          {/* Close button - positioned relative to image */}
          <button
            onClick={onClose}
            className="absolute -top-8 md:-top-20 right-0 text-white hover:text-gray-300 transition-colors duration-200 p-2"
            aria-label="Close modal"
          >
            <IoClose size={28} className="md:w-8 md:h-8" />
          </button>

          {/* Image counter - positioned relative to image */}
          <div className="absolute -top-8 md:-top-20 left-0 text-white text-sm bg-black/30 px-3 py-1 rounded-sm backdrop-blur-xs">
            {currentIndex + 1} / {totalCount}
          </div>

          {/* Loading spinner */}
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
            </div>
          )}

          {/* Main image */}
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setLoaded(true)}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
