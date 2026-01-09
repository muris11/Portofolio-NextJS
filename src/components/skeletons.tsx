export function ProjectCardSkeleton() {
  return (
    <div className="bg-white border-4 border-black shadow-neo overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="relative h-48 bg-gray-200 border-b-4 border-black"></div>

      {/* Content Skeleton */}
      <div className="p-6">
        <div className="space-y-4">
          {/* Title */}
          <div className="h-8 bg-gray-200 w-3/4" />

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200" />
            <div className="h-4 bg-gray-200 w-5/6" />
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            <div className="h-6 bg-gray-200 w-16 border-2 border-transparent" />
            <div className="h-6 bg-gray-200 w-20 border-2 border-transparent" />
            <div className="h-6 bg-gray-200 w-16 border-2 border-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkillIconSkeleton() {
  return (
    <div className="flex flex-col items-center p-4 bg-white border-4 border-black shadow-neo animate-pulse w-full">
      <div className="w-16 h-16 bg-gray-200 border-4 border-black mb-4 shadow-neo-sm" />
      <div className="h-6 bg-gray-200 w-24 mb-1" />
      <div className="h-4 bg-gray-200 w-16 mb-3" />
      <div className="w-full">
        <div className="flex justify-between mb-1">
          <div className="h-3 w-16 bg-gray-200" />
          <div className="h-3 w-8 bg-gray-200" />
        </div>
        <div className="w-full h-4 border-2 border-black p-0.5">
          <div className="h-full bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function TimelineItemSkeleton() {
  return (
    <div className="relative flex items-start space-x-6 animate-pulse">
      {/* Timeline Line */}
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 bg-white border-4 border-black z-10" />
        <div className="w-1 h-full bg-black -mt-2"></div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-12">
        <div className="bg-white p-6 border-4 border-black shadow-neo">
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 w-1/2" />
            <div className="h-6 bg-gray-200 w-1/3" />
            <div className="h-4 bg-gray-200" />
            <div className="h-4 bg-gray-200 w-5/6" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="h-16 bg-gray-200 w-3/4 border-4 border-transparent" />
            <div className="h-10 bg-gray-200 w-1/2 border-4 border-transparent" />
          </div>

          <div className="space-y-2 pl-6 border-l-4 border-gray-200">
            <div className="h-5 bg-gray-200 w-full" />
            <div className="h-5 bg-gray-200 w-5/6" />
            <div className="h-5 bg-gray-200 w-4/5" />
          </div>

          <div className="flex space-x-4">
            <div className="h-12 bg-gray-200 w-32 border-4 border-transparent" />
            <div className="h-12 bg-gray-200 w-32 border-4 border-transparent" />
          </div>
        </div>

        {/* Profile Image */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-64 h-64 sm:w-80 sm:h-80 bg-gray-200 border-4 border-black shadow-neo" />
        </div>
      </div>
    </div>
  );
}

export function AdminSectionSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 p-6 bg-white border-4 border-black shadow-neo">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-200 border-2 border-black" />
            <div className="space-y-2">
              <div className="h-8 bg-gray-200 w-48" />
              <div className="h-4 bg-gray-200 w-64" />
            </div>
          </div>
        </div>
        <div className="h-12 bg-gray-200 w-32 border-2 border-transparent" />
      </div>

      {/* Content Skeleton */}
      <div className="bg-white border-4 border-black shadow-neo p-6">
        <div className="space-y-4">
          {/* Table Header */}
          <div className="hidden lg:block border-b-4 border-black pb-4">
            <div className="grid grid-cols-4 gap-6">
              <div className="h-6 bg-gray-200 w-24" />
              <div className="h-6 bg-gray-200 w-32" />
              <div className="h-6 bg-gray-200 w-24" />
              <div className="h-6 bg-gray-200 w-20" />
            </div>
          </div>

          {/* Table Rows */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="hidden lg:block">
              <div className="grid grid-cols-4 gap-6 py-4 border-b-2 border-gray-200 last:border-b-0">
                <div className="space-y-2">
                  <div className="h-5 bg-gray-200 w-32" />
                  <div className="h-4 bg-gray-200 w-24" />
                </div>
                <div className="h-5 bg-gray-200 w-20" />
                <div className="flex space-x-2">
                  <div className="h-6 bg-gray-200 w-16" />
                  <div className="h-6 bg-gray-200 w-20" />
                </div>
                <div className="flex space-x-2">
                  <div className="h-8 bg-gray-200 w-16" />
                  <div className="h-8 bg-gray-200 w-16" />
                </div>
              </div>
            </div>
          ))}

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="bg-white border-2 border-black p-4 shadow-neo-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 border-2 border-black" />
                    <div className="space-y-2">
                      <div className="h-5 bg-gray-200 w-32" />
                      <div className="h-4 bg-gray-200 w-20" />
                    </div>
                  </div>
                  <div className="h-6 bg-gray-200 w-16" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200" />
                  <div className="h-4 bg-gray-200 w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
