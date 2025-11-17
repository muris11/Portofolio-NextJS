import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { db } = await import("@/lib/db");

    // Test all data fetching functions used in the frontend
    const results = {
      timestamp: new Date().toISOString(),
      profile: null,
      featuredProjects: [],
      skills: [],
      errors: []
    };

    // Test getProfile function
    try {
      const profile = await db.profile.findFirst();
      results.profile = profile;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      results.errors.push(`Profile fetch error: ${errorMessage}`);
    }

    // Test getFeaturedProjects function
    try {
      const projects = await db.project.findMany({
        where: { featured: true },
        orderBy: { createdAt: "desc" },
        take: 6,
      });
      results.featuredProjects = projects.map((project) => ({
        id: project.id,
        title: project.title,
        description: project.description,
        imageUrl: project.imageUrl,
        techStack: project.techStack,
        liveUrl: project.liveUrl,
        githubUrl: project.githubUrl,
        featured: project.featured,
        createdAt: project.createdAt
      }));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      results.errors.push(`Projects fetch error: ${errorMessage}`);
    }

    // Test getSkills function
    try {
      const skills = await db.skill.findMany({
        orderBy: { level: "desc" },
        take: 8,
      });
      results.skills = skills.map((skill) => ({
        id: skill.id,
        name: skill.name,
        category: skill.category,
        icon: skill.icon,
        level: skill.level
      }));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      results.errors.push(`Skills fetch error: ${errorMessage}`);
    }

    return NextResponse.json({
      status: "Frontend Data Test",
      message: "Data yang dikembalikan oleh functions yang sama dengan frontend",
      results
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({
      status: "Data Test Error",
      error: errorMessage
    }, { status: 500 });
  }
}