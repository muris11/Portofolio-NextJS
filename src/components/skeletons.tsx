export function ProjectCardSkeleton() {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="relative h-48 bg-gradient-to-br from-white/5 to-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
      </div>

      {/* Content Skeleton */}
      <div className="p-6">
        <div className="space-y-4">
          {/* Title */}
          <div className="h-6 bg-white/10 rounded-xl animate-pulse w-3/4" />

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 bg-white/5 rounded-lg animate-pulse" />
            <div className="h-4 bg-white/5 rounded-lg animate-pulse w-5/6" />
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            <div className="h-6 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full animate-pulse w-16" />
            <div className="h-6 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full animate-pulse w-20" />
            <div className="h-6 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full animate-pulse w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkillIconSkeleton() {
  return (
    <div className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 animate-pulse">
      <div className="w-16 h-16 bg-gradient-to-br from-white/10 to-white/20 rounded-xl animate-pulse mb-3" />
      <div className="h-4 bg-gradient-to-r from-white/10 to-white/20 rounded-lg animate-pulse w-16 mb-1" />
      <div className="h-3 bg-gradient-to-r from-white/10 to-white/20 rounded animate-pulse w-12" />
    </div>
  );
}

export function TimelineItemSkeleton() {
  return (
    <div className="relative flex items-start space-x-4 animate-pulse">
      {/* Timeline Line */}
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 bg-gradient-to-br from-white/10 to-white/20 rounded-xl animate-pulse" />
        <div className="w-0.5 h-full bg-white/20 mt-2"></div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/10">
          <div className="space-y-3">
            <div className="h-6 bg-gradient-to-r from-white/10 to-white/20 rounded-xl animate-pulse w-1/2" />
            <div className="h-4 bg-gradient-to-r from-white/10 to-white/20 rounded-lg animate-pulse w-1/3" />
            <div className="h-4 bg-gradient-to-r from-white/10 to-white/20 rounded-lg animate-pulse" />
            <div className="h-4 bg-gradient-to-r from-white/10 to-white/20 rounded-lg animate-pulse w-5/6" />
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
            <div className="h-12 bg-gradient-to-r from-white/10 to-white/20 rounded-2xl animate-pulse w-3/4" />
            <div className="h-8 bg-gradient-to-r from-white/10 to-white/20 rounded-xl animate-pulse w-1/2" />
          </div>

          <div className="space-y-2">
            <div className="h-5 bg-gradient-to-r from-white/10 to-white/20 rounded-lg animate-pulse w-full" />
            <div className="h-5 bg-gradient-to-r from-white/10 to-white/20 rounded-lg animate-pulse w-5/6" />
            <div className="h-5 bg-gradient-to-r from-white/10 to-white/20 rounded-lg animate-pulse w-4/5" />
          </div>

          <div className="flex space-x-4">
            <div className="h-12 bg-gradient-to-r from-white/10 to-white/20 rounded-xl animate-pulse w-32" />
            <div className="h-12 bg-gradient-to-r from-white/10 to-white/20 rounded-xl animate-pulse w-32" />
          </div>
        </div>

        {/* Profile Image */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-br from-white/10 to-white/20 rounded-2xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function AdminSectionSkeleton() {
  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      {/* Header Skeleton */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 p-6 bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-white/10 to-white/20 rounded-xl animate-pulse" />
            <div className="space-y-2">
              <div className="h-8 bg-gradient-to-r from-white/10 to-white/20 rounded-xl animate-pulse w-48" />
              <div className="h-4 bg-gradient-to-r from-white/10 to-white/20 rounded-lg animate-pulse w-64" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/30 rounded-full animate-pulse" />
              <div className="h-4 bg-gradient-to-r from-white/10 to-white/20 rounded animate-pulse w-16" />
            </div>
          </div>
        </div>
        <div className="h-12 bg-gradient-to-r from-white/10 to-white/20 rounded-xl animate-pulse w-32" />
      </div>

      {/* Content Skeleton */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 p-6">
        <div className="space-y-4">
          {/* Table Header */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-4 gap-6 mb-4">
              <div className="h-5 bg-gradient-to-r from-white/10 to-white/20 rounded animate-pulse" />
              <div className="h-5 bg-gradient-to-r from-white/10 to-white/20 rounded animate-pulse" />
              <div className="h-5 bg-gradient-to-r from-white/10 to-white/20 rounded animate-pulse" />
              <div className="h-5 bg-gradient-to-r from-white/10 to-white/20 rounded animate-pulse w-20" />
            </div>
          </div>

          {/* Table Rows */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="hidden lg:block">
              <div className="grid grid-cols-4 gap-6 py-4 border-b border-white/10 last:border-b-0">
                <div className="space-y-2">
                  <div className="h-5 bg-gradient-to-r from-white/10 to-white/20 rounded animate-pulse w-32" />
                  <div className="h-4 bg-gradient-to-r from-white/10 to-white/20 rounded animate-pulse w-24" />
                </div>
                <div className="h-5 bg-gradient-to-r from-white/10 to-white/20 rounded animate-pulse w-20" />
                <div className="flex space-x-2">
                  <div className="h-6 bg-gradient-to-r from-white/10 to-white/20 rounded-full animate-pulse w-16" />
                  <div className="h-6 bg-gradient-to-r from-white/10 to-white/20 rounded-full animate-pulse w-20" />
                </div>
                <div className="flex space-x-2">
                  <div className="h-8 bg-gradient-to-r from-white/10 to-white/20 rounded-lg animate-pulse w-16" />
                  <div className="h-8 bg-gradient-to-r from-white/10 to-white/20 rounded-lg animate-pulse w-16" />
                </div>
              </div>
            </div>
          ))}

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 animate-pulse"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-white/10 to-white/20 rounded-xl" />
                    <div className="space-y-2">
                      <div className="h-5 bg-gradient-to-r from-white/10 to-white/20 rounded animate-pulse w-32" />
                      <div className="h-4 bg-gradient-to-r from-white/10 to-white/20 rounded animate-pulse w-20" />
                    </div>
                  </div>
                  <div className="h-6 bg-gradient-to-r from-white/10 to-white/20 rounded-full animate-pulse w-16" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gradient-to-r from-white/10 to-white/20 rounded animate-pulse" />
                  <div className="h-4 bg-gradient-to-r from-white/10 to-white/20 rounded animate-pulse w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
