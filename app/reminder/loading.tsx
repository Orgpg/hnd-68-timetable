export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-black flex flex-col">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 flex-1">
        <div className="text-center mb-8 sm:mb-12">
          <div className="mx-auto h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-teal-600/30 dark:bg-teal-400/30 animate-pulse mb-4" />
          <div className="h-8 w-64 sm:w-80 mx-auto rounded bg-gray-200 dark:bg-gray-800 animate-pulse mb-3" />
          <div className="h-5 w-full max-w-2xl mx-auto rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
        </div>

        <div className="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 dark:bg-gray-950 dark:border-gray-800">
          <div className="h-6 w-48 rounded bg-gray-200 dark:bg-gray-800 animate-pulse mb-4" />
          <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800 animate-pulse mb-6" />

          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-800 animate-pulse mb-2" />
                <div className="h-10 w-full rounded bg-gray-200 dark:bg-gray-800 animate-pulse" />
              </div>
            ))}
            <div className="h-10 w-full rounded bg-teal-600/50 dark:bg-cyan-600/50 animate-pulse pt-2" />
          </div>
        </div>
      </div>
    </div>
  )
}
