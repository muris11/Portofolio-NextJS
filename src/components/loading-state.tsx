"use client";

import { ProjectCardSkeleton } from "./skeletons";

export function ProjectsLoading() {
  return (
    <div className="min-h-screen bg-neo-canvas text-black overflow-x-hidden">
      {/* Header Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b-4 border-black bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-neo-secondary border-2 border-black px-4 py-1 shadow-neo-sm mb-6 transform -rotate-2">
            <div className="h-4 w-32 bg-black/10 animate-pulse" />
          </div>

          <div className="h-16 w-3/4 mx-auto bg-black/10 animate-pulse mb-6" />
          <div className="h-6 w-1/2 mx-auto bg-black/10 animate-pulse" />
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function ResumeLoading() {
  return (
    <div className="min-h-screen bg-neo-canvas text-black overflow-x-hidden">
      {/* Header Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b-4 border-black bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-neo-secondary border-2 border-black px-4 py-1 shadow-neo-sm mb-6 transform -rotate-2">
            <div className="h-4 w-32 bg-black/10 animate-pulse" />
          </div>

          <div className="h-16 w-3/4 mx-auto bg-black/10 animate-pulse mb-6" />
          <div className="h-6 w-1/2 mx-auto bg-black/10 animate-pulse" />
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <div className="h-10 w-48 mx-auto bg-black/10 animate-pulse mb-4" />
            <div className="h-6 w-96 mx-auto bg-black/10 animate-pulse" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="h-32 bg-white border-4 border-black shadow-neo animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function HomeLoading() {
  return (
    <div className="min-h-screen bg-neo-canvas text-black">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 border-b-4 border-black bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="h-96 bg-black/5 border-4 border-black shadow-neo animate-pulse" />
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neo-secondary border-b-4 border-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-10 w-48 mx-auto bg-black/10 animate-pulse mb-4" />
            <div className="h-6 w-96 mx-auto bg-black/10 animate-pulse" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="h-32 bg-white border-4 border-black shadow-neo animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-10 w-48 mx-auto bg-black/10 animate-pulse mb-4" />
            <div className="h-6 w-96 mx-auto bg-black/10 animate-pulse" />
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
