import ProjectsGrid from "@/app/(site)/projects/ProjectsGrid";
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
    <div className="min-h-screen bg-neo-canvas text-black overflow-x-hidden">
      {/* Header Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 border-b-4 border-black bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block bg-neo-secondary border-2 border-black px-4 py-1 shadow-neo-sm mb-6 transform -rotate-2">
            <span className="font-bold uppercase tracking-widest text-sm">
              Portfolio Showcase
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tighter mb-6">
            My Projects
          </h1>
          <p className="text-xl font-medium max-w-3xl mx-auto border-l-4 border-black pl-6 text-left md:text-center md:border-l-0 md:pl-0">
            A curated collection of innovative solutions and creative endeavors
            that showcase my passion for technology and design.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-24">
          {/* Featured Projects Grid */}
          {featuredProjects.length > 0 && (
            <div className="space-y-12">
              <div className="text-center">
                <div className="inline-block bg-neo-accent border-2 border-black px-4 py-1 shadow-neo-sm mb-6 transform rotate-1">
                  <span className="font-bold uppercase tracking-widest text-sm">
                    Featured Work
                  </span>
                </div>

                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6">
                  Featured Projects
                </h2>
                <p className="text-lg font-medium max-w-3xl mx-auto">
                  Highlighted works that showcase my expertise and passion for
                  creating exceptional digital experiences
                </p>
              </div>

              <ProjectsGrid projects={featuredProjects} />
            </div>
          )}

          {/* Regular Projects Grid */}
          {regularProjects.length > 0 && (
            <div className="space-y-12">
              <div className="text-center">
                <div className="inline-block bg-neo-secondary border-2 border-black px-4 py-1 shadow-neo-sm mb-6 transform -rotate-1">
                  <span className="font-bold uppercase tracking-widest text-sm">
                    Complete Collection
                  </span>
                </div>

                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6">
                  All Projects
                </h2>
                <p className="text-lg font-medium max-w-3xl mx-auto">
                  A comprehensive showcase of my work, from small experiments to
                  full-scale applications
                </p>
              </div>

              <ProjectsGrid projects={regularProjects} />
            </div>
          )}

          {/* Empty State */}
          {projects.length === 0 && (
            <div className="text-center py-20 neo-card p-12 bg-white">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-neo-secondary border-4 border-black mb-6 shadow-neo">
                <span className="text-4xl font-black">?</span>
              </div>
              <h3 className="text-2xl font-black uppercase mb-3">
                No Projects Yet
              </h3>
              <p className="font-medium mb-8 max-w-md mx-auto">
                Projects are being added regularly. Check back soon to see my
                latest work and creations.
              </p>
              <div className="flex justify-center space-x-4">
                <div className="w-4 h-4 bg-black animate-bounce"></div>
                <div className="w-4 h-4 bg-neo-accent animate-bounce delay-100"></div>
                <div className="w-4 h-4 bg-neo-secondary animate-bounce delay-200"></div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
