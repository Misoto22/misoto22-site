const Gallery = () => {
    return (
      <section className="max-w-6xl mx-auto px-6 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <GalleryItem key={item} />
          ))}
        </div>
      </section>
    )
  }
  
  const GalleryItem = () => (
    <div className="relative group overflow-hidden">
      <img
        src="/api/placeholder/800/600"
        alt="Gallery item"
        className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="text-white text-lg font-light tracking-wide">Image Title</h3>
          <p className="text-gray-200 text-sm">Location, Year</p>
        </div>
      </div>
    </div>
  )
  
  export default Gallery