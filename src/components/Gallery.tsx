"use client"
import Image from 'next/image'
import { useState } from 'react'
import exifr from 'exifr';

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  location: string;
  year: string;
  className: string;
  aspect: string;
}

interface ExifData {
  Make?: string;
  Model?: string;
  LensModel?: string;
  FNumber?: number;
  ExposureTime?: number;
  ISO?: number;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: '/images/portfolio/A.Summers.Tale.jpg',
    title: 'A.Summers.Tale',
    location: 'Sydney',
    year: '2022',
    className: 'col-span-2 md:col-span-2',
    aspect: 'aspect-[16/9]'
  },
  {
    id: 2,
    src: '/images/portfolio/TownHall.JPG',
    title: 'Sydney Town Hall',
    location: 'Sydney',
    year: '2023',
    className: 'col-span-1 row-span-1',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 3,
    src: '/images/portfolio/USYD.JPG',
    title: 'University of Sydney',
    location: 'Sydney',
    year: '2022',
    className: 'col-span-1 row-span-1',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 4,
    src: '/images/portfolio/Nanchang.jpg',
    title: '南昌朝阳大桥',
    location: '南昌',
    year: '2023',
    className: 'col-span-2 md:col-span-2',
    aspect: 'aspect-[16/9]'
  },
  {
    id: 5,
    src: '/images/portfolio/Sydney Harbour Bridge.JPG',
    title: 'Sydney Harbour Bridge',
    location: 'Sydney',
    year: '2020',
    className: 'col-span-2 md:col-span-2',
    aspect: 'aspect-[16/9]'
  },
  {
    id: 6,
    src: '/images/portfolio/Wollongong Beach.JPG',
    title: 'Wollongong Beach',
    location: 'Wollongong',
    year: '2023',
    className: 'col-span-1 row-span-1',
    aspect: 'aspect-[3/2]'
  },
  {
    id: 7,
    src: '/images/portfolio/Chongqing.JPG',
    title: 'Chongqing Raffles',
    location: 'Chongqing',
    year: '2023',
    className: 'col-span-2 md:col-span-2',
    aspect: 'aspect-[2/3]'
  },
  {
    id: 8,
    src: '/images/portfolio/Tourist Wheel Fremantle.JPG',
    title: 'Tourist Wheel Fremantle',
    location: 'Fremantle, WA',
    year: '2023',
    className: 'col-span-1 row-span-1',
    aspect: 'aspect-[2/3]'
  },
  {
    id: 9,
    src: '/images/portfolio/Sydney George Street.JPG',
    title: 'Sydney George Street',
    location: 'Sydney',
    year: '2021',
    className: 'col-span-2 md:col-span-2',
    aspect: 'aspect-[2/3]'
  },
  {
    id: 10,
    src: '/images/portfolio/Milky Way.JPG',
    title: 'Milky Way',
    location: 'Lake Ninan, WA',
    year: '2024',
    className: 'col-span-1 row-span-1',
    aspect: 'aspect-[2/3]'
  }
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exifData, setExifData] = useState<ExifData | null>(null);

  const handleImageClick = async (image: GalleryImage) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    
    try {
      const fullUrl = `${window.location.origin}${image.src}`;
      const data = await exifr.parse(fullUrl);
      setExifData(data);
    } catch (error) {
      console.log('无法读取图片 EXIF 数据:', error);
      setExifData(null);
    }
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  // 添加一个辅助函数来转换快门速度
  const formatShutterSpeed = (speed: number): string => {
    if (speed >= 1) {
      return `${speed}s`;
    }
    // 将小数转换为分数
    const denominator = Math.round(1 / speed);
    return `1/${denominator}`;
  };

  return (
    <section className="max-w-7xl mx-auto px-6 pt-24">
      <div className="max-w-6xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-4 [&>div]:mb-4">
        {galleryImages.map((image) => (
          <GalleryItem 
            key={image.id} 
            image={image} 
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>

      {/* Image Modal */}
      {isModalOpen && selectedImage && (
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
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full" onClick={e => e.stopPropagation()}>
            <Image
              src={selectedImage.src}
              alt={selectedImage.title}
              fill
              quality={100}
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
        </div>
      )}
    </section>
  )
}

const GalleryItem = ({ 
  image, 
  onClick 
}: { 
  image: GalleryImage;
  onClick: () => void;
}) => (
  <div 
    className="relative group overflow-hidden break-inside-avoid cursor-pointer"
    onClick={onClick}
  >
    <div className={`relative ${image.aspect} w-full`}>
      <Image
        src={image.src}
        alt={image.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={95}
        priority={image.id <= 4}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="absolute bottom-0 left-0 p-6">
        <h3 className="text-white text-lg font-light tracking-wide">{image.title}</h3>
        <p className="text-gray-100 text-sm">{image.location}, {image.year}</p>
      </div>
    </div>
  </div>
)

export default Gallery