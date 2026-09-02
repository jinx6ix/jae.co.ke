export default function BlogLoading() {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header Skeleton */}
        <div className="h-16 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-full flex items-center">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
  
        {/* Hero Skeleton */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="h-5 w-48 bg-orange-500 rounded animate-pulse mb-4" />
            <div className="h-12 md:h-16 w-full max-w-3xl bg-orange-500 rounded-lg animate-pulse mb-6" />
            <div className="h-6 w-full max-w-2xl bg-orange-500 rounded-lg animate-pulse" />
          </div>
        </div>
  
        {/* Category Filter Skeleton */}
        <div className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="flex flex-wrap gap-3 justify-center">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="h-10 w-24 bg-gray-200 rounded-full animate-pulse" />
              ))}
            </div>
          </div>
        </div>
  
        {/* Featured Posts Skeleton */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="h-10 w-64 bg-gray-300 rounded-lg animate-pulse mb-12 mx-auto" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                  <div className="aspect-[4/3] bg-gray-300 animate-pulse" />
                  <div className="p-6">
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-4" />
                    <div className="h-6 w-full bg-gray-200 rounded animate-pulse mb-3" />
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse mb-6" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
                        <div>
                          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-1" />
                          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                        </div>
                      </div>
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* All Posts Skeleton */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <div className="h-10 w-72 bg-gray-300 rounded-lg animate-pulse mb-12 mx-auto" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-9">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                  <div className="aspect-[4/3] bg-gray-300 animate-pulse" />
                  <div className="p-6">
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-4" />
                    <div className="h-6 w-full bg-gray-200 rounded animate-pulse mb-3" />
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse mb-6" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
                        <div>
                          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-1" />
                          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                        </div>
                      </div>
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* Footer Skeleton */}
        <div className="h-12 bg-gray-800">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-full flex items-center justify-center">
            <div className="h-4 w-48 bg-gray-600 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }