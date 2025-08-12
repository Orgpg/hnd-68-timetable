export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-black">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-6 sm:space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 opacity-30" />
          <div className="mt-3 h-7 w-64 sm:w-80 mx-auto rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
          <div className="mt-2 h-4 w-72 sm:w-96 mx-auto rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
        </div>

        <div className="sticky top-16 z-30">
          <div className="rounded-xl border-none shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="h-10 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
              <div className="h-10 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
              <div className="h-10 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-12 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 opacity-30" />
              <div className="rounded-xl border-none shadow-lg overflow-hidden bg-white/70 dark:bg-gray-900/70 backdrop-blur p-5">
                <div className="space-y-3">
                  {[...Array(5)].map((__, j) => (
                    <div key={j} className="grid grid-cols-6 gap-3">
                      <div className="col-span-2 h-4 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                      <div className="col-span-1 h-4 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                      <div className="col-span-2 h-4 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                      <div className="col-span-1 h-4 rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
