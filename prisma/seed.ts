const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Create Profile
  const profile = await prisma.profile.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      fullName: "Your Name",
      title: "Your Title",
      bio: "Add your bio here...",
      email: "",
      phone: "",
      location: "",
      githubUrl: "",
      linkedinUrl: "",
      instagramUrl: "",
    },
  });

  console.log("Profile created/updated:", profile);

  // Skills, Education, Experience, Projects, and Admin user will be added manually through the admin panel
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
