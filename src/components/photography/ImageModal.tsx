'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';

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
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, photo }) => {
  const [loaded, setLoaded] = useState(false);

  // Reset loaded state when photo changes
  useEffect(() => {
    setLoaded(false);
  }, [photo]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

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
      <div className="absolute inset-0 bg-black bg-opacity-90 backdrop-blur-sm" />

      {/* Image container */}
      <div
        className="relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200 p-2"
          aria-label="Close modal"
        >
          <IoClose size={32} />
        </button>
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
          </div>
        )}
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          className={`max-w-[95vw] max-h-[90vh] object-contain transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setLoaded(true)}
          priority
        />
      </div>
    </div>
  );
};

export default ImageModal;
