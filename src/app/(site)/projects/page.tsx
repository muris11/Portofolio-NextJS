import ProjectCard from "@/components/ProjectCard";
import { db } from "@/lib/db";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore my portfolio of innovative web development projects and creative solutions",
};

// Enable ISR with 5 minute revalidation for better performance
export const revalidate = 300; // 5 minutes

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
          <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-sky-600 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        {/* Geometric patterns */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-20 left-10 w-40 h-40 border border-blue-500/20 rotate-45"></div>
          <div className="absolute top-40 right-20 w-32 h-32 border border-cyan-500/20 rotate-12"></div>
          <div className="absolute bottom-32 left-1/4 w-24 h-24 border border-indigo-500/20 rotate-30"></div>
          <div className="absolute bottom-20 right-1/3 w-36 h-36 border border-sky-500/20 -rotate-45"></div>
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
        <div className="max-w-6xl mx-auto text-center">
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
        <div className="max-w-6xl mx-auto space-y-16">
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

              <div className="grid grid-cols-1 gap-8 lg:gap-10">
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

              <div className="grid grid-cols-1 gap-8 lg:gap-10">
                {regularProjects.map((project, index) => (
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
    </div>
  );
}
