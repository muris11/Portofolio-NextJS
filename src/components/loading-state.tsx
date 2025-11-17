"use client";

import { ProjectCardSkeleton } from "./skeletons";

export function ProjectsLoading() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"></div>
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 -left-4 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
          <div className="absolute top-0 -right-4 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-4000"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-sky-500 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-6000"></div>
        </div>
      </div>

      {/* Header Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
            <div className="w-8 h-8 bg-primary/20 rounded-lg animate-pulse"></div>
          </div>
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-white/10 rounded-2xl animate-pulse w-1/2 mx-auto" />
            <div className="h-6 bg-white/5 rounded-xl animate-pulse w-3/4 mx-auto" />
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProjectCardSkeleton />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function ResumeLoading() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"></div>
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 -left-4 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
          <div className="absolute top-0 -right-4 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-4000"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-sky-500 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-6000"></div>
        </div>
      </div>

      {/* Header Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
            <div className="w-8 h-8 bg-primary/20 rounded-lg animate-pulse"></div>
          </div>
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-white/10 rounded-2xl animate-pulse w-1/3 mx-auto" />
            <div className="h-6 bg-white/5 rounded-xl animate-pulse w-2/3 mx-auto" />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <div className="animate-pulse space-y-4">
              <div className="h-10 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-300 dark:to-gray-600 rounded-xl animate-pulse w-1/4 mx-auto" />
              <div className="h-6 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-300 dark:to-gray-600 rounded-lg animate-pulse w-1/2 mx-auto" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[...Array(8)].map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function HomeLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto">
          <ProjectCardSkeleton />
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="animate-pulse space-y-4">
              <div className="h-10 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-300 dark:to-gray-600 rounded-xl animate-pulse w-1/4 mx-auto" />
              <div className="h-6 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-300 dark:to-gray-600 rounded-lg animate-pulse w-1/2 mx-auto" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="animate-pulse space-y-4">
              <div className="h-10 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-300 dark:to-gray-600 rounded-xl animate-pulse w-1/3 mx-auto" />
              <div className="h-6 bg-gradient-to-r from-gray-200 dark:from-gray-700 to-gray-300 dark:to-gray-600 rounded-lg animate-pulse w-2/3 mx-auto" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
