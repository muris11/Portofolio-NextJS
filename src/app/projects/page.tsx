import ProjectCard from "@/components/ProjectCard";
import { db } from "@/lib/db";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore my portfolio of innovative web development projects and creative solutions",
};

export const dynamic = "force-dynamic";

async function getProjects() {
  try {
    const projects = await db.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    // Convert null to undefined for optional fields
    return projects.map((project) => ({
      ...project,
      imageUrl: project.imageUrl || undefined,
      liveUrl: project.liveUrl || undefined,
      githubUrl: project.githubUrl || undefined,
    }));
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

async function getFeaturedProjects() {
  try {
    const featuredProjects = await db.project.findMany({
      where: { featured: true },
      orderBy: { createdAt: "desc" },
    });
    return featuredProjects.map((project) => ({
      ...project,
      imageUrl: project.imageUrl || undefined,
      liveUrl: project.liveUrl || undefined,
      githubUrl: project.githubUrl || undefined,
    }));
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return [];
  }
}

export default async function ProjectsPage() {
  const [projects, featuredProjects] = await Promise.all([
    getProjects(),
    getFeaturedProjects(),
  ]);

  // Filter out featured projects from regular projects to avoid duplication
  const regularProjects = projects.filter((project) => !project.featured);

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950">
      {/* Enhanced Animated Background - Consistent with Homepage */}
      <div className="fixed inset-0 -z-10">
        {/* Primary gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950"></div>

        {/* Animated mesh gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-sky-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-6000"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${15 + Math.random() * 15}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Geometric patterns */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-20 left-10 w-40 h-40 border border-blue-500/20 rotate-45 animate-spin-slow"></div>
          <div className="absolute top-40 right-20 w-32 h-32 border border-cyan-500/20 rotate-12 animate-spin-reverse"></div>
          <div className="absolute bottom-32 left-1/4 w-24 h-24 border border-indigo-500/20 rotate-30 animate-spin-slow animation-delay-3000"></div>
          <div className="absolute bottom-20 right-1/3 w-36 h-36 border border-sky-500/20 -rotate-45 animate-spin-reverse animation-delay-5000"></div>
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2363b3ed' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Header Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/30 backdrop-blur-sm mb-10 animate-scale-in shadow-lg shadow-blue-500/10">
            <span className="relative flex h-3 w-3 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-blue-400 to-cyan-400"></span>
            </span>
            <span className="text-sm font-semibold text-white tracking-wide">
              Portfolio Showcase
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-8 animate-slide-in-left tracking-tight">
            My Projects
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-slide-in-right animation-delay-300 font-light">
            A curated collection of innovative solutions and creative endeavors
            that showcase my passion for technology and design.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-20">
          {/* Featured Projects Grid */}
          {featuredProjects.length > 0 && (
            <div className="space-y-16">
              <div className="text-center">
                <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/30 backdrop-blur-sm mb-8 animate-scale-in shadow-lg shadow-blue-500/10">
                  <span className="relative flex h-3 w-3 mr-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-blue-400 to-cyan-400"></span>
                  </span>
                  <span className="text-sm font-semibold text-white tracking-wide">
                    Featured Work
                  </span>
                </div>

                <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-8 animate-slide-in-left tracking-tight">
                  Featured Projects
                </h2>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-slide-in-right animation-delay-300 font-light">
                  Highlighted works that showcase my expertise and passion for
                  creating exceptional digital experiences
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:gap-12">
                {featuredProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out"
                    style={{
                      animationDelay: `${index * 200}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Regular Projects Grid */}
          {regularProjects.length > 0 && (
            <div className="space-y-16">
              <div className="text-center">
                <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/30 backdrop-blur-sm mb-8 animate-scale-in shadow-lg shadow-blue-500/10">
                  <span className="relative flex h-3 w-3 mr-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-blue-400 to-cyan-400"></span>
                  </span>
                  <span className="text-sm font-semibold text-white tracking-wide">
                    Complete Collection
                  </span>
                </div>

                <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-8 animate-slide-in-left tracking-tight">
                  All Projects
                </h2>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-slide-in-right animation-delay-300 font-light">
                  A comprehensive showcase of my work, from small experiments to
                  full-scale applications
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {regularProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out"
                    style={{
                      animationDelay: `${index * 150}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {projects.length === 0 && (
            <div className="text-center py-20 animate-fade-in-up animation-delay-600">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl mb-6 shadow-2xl">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-3">
                No Projects Yet
              </h3>
              <p className="text-gray-300 mb-8 max-w-md mx-auto leading-relaxed">
                Projects are being added regularly. Check back soon to see my
                latest work and creations.
              </p>
              <div className="flex justify-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <div
                  className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-slate-950 to-cyan-950"></div>

        {/* Animated Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-600/10 animate-pulse"></div>
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${10 + Math.random() * 10}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Header */}
          <div className="mb-16 lg:mb-20 animate-fade-in-up">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 border border-white/30 backdrop-blur-sm mb-10 animate-bounce-in shadow-lg shadow-white/10">
              <span className="relative flex h-3 w-3 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
              </span>
              <span className="text-sm font-semibold text-white tracking-wide">
                Ready to Collaborate
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-10 leading-tight animate-slide-in-left tracking-tight">
              Let's Build Something Amazing
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-16 leading-relaxed max-w-4xl mx-auto animate-slide-in-right animation-delay-300 font-light">
              From innovative web applications to scalable platforms,
              transforming ideas into digital reality together
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16 animate-fade-in-up animation-delay-500">
            {/* Primary CTA */}
            <div className="lg:col-span-2">
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center w-full px-10 py-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl hover:from-blue-500 hover:to-cyan-500 transition-all duration-500 font-semibold text-xl shadow-2xl shadow-blue-600/30 hover:shadow-blue-500/40 hover:scale-105 transform-gpu overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Start Your Project Today
                  <svg
                    className="w-7 h-7 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 to-cyan-600 blur-xl opacity-50"></div>
              </Link>
            </div>

            {/* Secondary CTA */}
            <div>
              <Link
                href="/resume"
                className="group inline-flex items-center justify-center w-full px-8 py-6 border-2 border-white/30 text-white rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-500 font-semibold text-lg backdrop-blur-sm hover:scale-105 transform-gpu"
              >
                <span className="flex items-center gap-3">
                  View My Resume
                  <svg
                    className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="animate-fade-in-up animation-delay-700">
            <p className="text-base text-gray-400 mb-10 font-medium">
              Trusted by innovative companies worldwide
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="group flex flex-col items-center p-6 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105 transform-gpu backdrop-blur-sm">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-blue-500/20">
                  <span className="text-3xl">🚀</span>
                </div>
                <span className="text-white font-semibold text-sm">
                  Startups
                </span>
              </div>

              <div className="group flex flex-col items-center p-6 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105 transform-gpu backdrop-blur-sm">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-600/20 to-indigo-600/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-cyan-500/20">
                  <span className="text-3xl">🏢</span>
                </div>
                <span className="text-white font-semibold text-sm">
                  Enterprises
                </span>
              </div>

              <div className="group flex flex-col items-center p-6 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105 transform-gpu backdrop-blur-sm">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-600/20 to-blue-600/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-indigo-500/20">
                  <span className="text-3xl">💡</span>
                </div>
                <span className="text-white font-semibold text-sm">
                  Innovators
                </span>
              </div>

              <div className="group flex flex-col items-center p-6 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105 transform-gpu backdrop-blur-sm">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600/20 to-sky-600/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-blue-500/20">
                  <span className="text-3xl">🌟</span>
                </div>
                <span className="text-white font-semibold text-sm">
                  Visionaries
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
