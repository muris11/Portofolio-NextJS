import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [
      projectsCount,
      skillsCount,
      educationCount,
      experienceCount,
      messagesCount,
    ] = await Promise.all([
      db.project.count(),
      db.skill.count(),
      db.education.count(),
      db.experience.count(),
      db.contactMessage.count(),
    ]);

    return NextResponse.json({
      projects: projectsCount,
      skills: skillsCount,
      education: educationCount,
      experience: experienceCount,
      messages: messagesCount,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
