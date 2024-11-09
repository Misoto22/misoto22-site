"use client"
import Image from 'next/image'

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  location: string;
  year: string;
  className: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: '/images/portfolio/A.Summers.Tale.jpg',
    title: 'A.Summers.Tale',
    location: 'Sydney',
    year: '2022',
    className: 'col-span-2 md:col-span-2' // Wide image for the landscape photo
  },
  {
    id: 2,
    src: '/images/portfolio/TownHall.JPG',
    title: 'Sydney Town Hall',
    location: 'Sydney',
    year: '2023',
    className: 'col-span-1 row-span-1' // Regular square/vertical image
  },
  {
    id: 3,
    src: '/images/portfolio/USYD.JPG',
    title: 'University of Sydney',
    location: 'Sydney',
    year: '2022',
    className: 'col-span-1 row-span-1' // Regular square/vertical image
  },
  {
    id: 4,
    src: '/images/portfolio/Nanchang.jpg',
    title: '南昌朝阳大桥',
    location: '南昌',
    year: '2023',
    className: 'col-span-2 md:col-span-2' // Wide image for the landscape photo
  }
];

const Gallery = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[300px]">
        {galleryImages.map((image) => (
          <GalleryItem key={image.id} image={image} />
        ))}
      </div>
    </section>
  )
}

const GalleryItem = ({ image }: { image: GalleryImage }) => (
  <div className={`relative group overflow-hidden ${image.className}`}>
    <div className="absolute inset-0">
      <Image
        src={image.src}
        alt={image.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={95}  // Set high quality here
        priority={image.id <= 4}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="absolute bottom-0 left-0 p-6">
        <h3 className="text-white text-lg font-light tracking-wide">{image.title}</h3>
        <p className="text-gray-200 text-sm">{image.location}, {image.year}</p>
      </div>
    </div>
  </div>
)

export default Gallery