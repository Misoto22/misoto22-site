export default function Loading() {
  return (
    <section className="pt-24 min-h-screen bg-(--background)">
      <div className="max-w-6xl mx-auto px-6">
        {/* Hero skeleton */}
        <div className="mb-12 animate-pulse">
          <div className="h-12 bg-(--card-background) rounded-lg w-3/4 mb-4" />
          <div className="h-6 bg-(--card-background) rounded-lg w-1/2" />
        </div>

        {/* Content skeleton grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-(--card-background) rounded-xl overflow-hidden"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Image placeholder */}
              <div className="aspect-video bg-(--border)" />

              {/* Content placeholder */}
              <div className="p-6">
                <div className="h-5 bg-(--border) rounded w-3/4 mb-3" />
                <div className="h-4 bg-(--border) rounded w-full mb-2" />
                <div className="h-4 bg-(--border) rounded w-5/6" />

                {/* Tags placeholder */}
                <div className="flex gap-2 mt-4">
                  <div className="h-6 bg-(--border) rounded-full w-16" />
                  <div className="h-6 bg-(--border) rounded-full w-20" />
                  <div className="h-6 bg-(--border) rounded-full w-14" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
