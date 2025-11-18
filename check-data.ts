import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkData() {
  try {
    console.log("=== DATABASE DATA CHECK ===");

    const profileCount = await prisma.profile.count();
    const projectCount = await prisma.project.count();
    const skillCount = await prisma.skill.count();
    const educationCount = await prisma.education.count();
    const experienceCount = await prisma.experience.count();
    const messageCount = await prisma.contactMessage.count();
    const adminCount = await prisma.admin.count();

    console.log("Profile:", profileCount);
    console.log("Projects:", projectCount);
    console.log("Skills:", skillCount);
    console.log("Education:", educationCount);
    console.log("Experience:", experienceCount);
    console.log("Contact Messages:", messageCount);
    console.log("Admin Users:", adminCount);

    if (profileCount > 0) {
      const profile = await prisma.profile.findFirst();
      console.log("\nProfile data:", profile);
    }

    if (adminCount > 0) {
      const admin = await prisma.admin.findFirst();
      console.log("\nAdmin data:", { ...admin, password: "[HIDDEN]" });
    }

    if (projectCount > 0) {
      const projects = await prisma.project.findMany({ take: 3 });
      console.log(
        "\nSample Projects:",
        projects.map((p) => ({ id: p.id, title: p.title }))
      );
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkData();
