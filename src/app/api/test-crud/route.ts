import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { db } = await import("@/lib/db");

    // Test all admin operations
    const results = {
      timestamp: new Date().toISOString(),
      database: {
        connection: "Testing...",
        adminCount: 0,
        profileCount: 0,
        projectsCount: 0,
        skillsCount: 0,
        educationCount: 0,
        experienceCount: 0,
      },
      operations: {
        create: "Not tested",
        read: "Not tested",
        update: "Not tested",
        delete: "Not tested"
      }
    };

    // Test connection and counts
    results.database.adminCount = await db.admin.count();
    results.database.profileCount = await db.profile.count();
    results.database.projectsCount = await db.project.count();
    results.database.skillsCount = await db.skill.count();
    results.database.educationCount = await db.education.count();
    results.database.experienceCount = await db.experience.count();

    results.database.connection = "✅ Connected";

    // Test CREATE operation (add a test skill)
    try {
      const testSkill = await db.skill.create({
        data: {
          name: "Test Skill",
          category: "Test",
          level: 50,
          icon: "test-icon"
        }
      });
      results.operations.create = "✅ Success";

      // Test READ operation
      const readSkill = await db.skill.findUnique({
        where: { id: testSkill.id }
      });
      results.operations.read = readSkill ? "✅ Success" : "❌ Failed";

      // Test UPDATE operation
      const updatedSkill = await db.skill.update({
        where: { id: testSkill.id },
        data: { name: "Updated Test Skill" }
      });
      results.operations.update = updatedSkill.name === "Updated Test Skill" ? "✅ Success" : "❌ Failed";

      // Test DELETE operation
      await db.skill.delete({
        where: { id: testSkill.id }
      });
      results.operations.delete = "✅ Success";

    } catch (crudError: unknown) {
      const errorMessage = crudError instanceof Error ? crudError.message : 'Unknown error';
      results.operations.create = `❌ Failed: ${errorMessage}`;
      results.operations.read = "❌ Skipped";
      results.operations.update = "❌ Skipped";
      results.operations.delete = "❌ Skipped";
    }

    return NextResponse.json({
      status: "CRUD Operations Test",
      results
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({
      status: "Database Test Error",
      error: errorMessage
    }, { status: 500 });
  }
}