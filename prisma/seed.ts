import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

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

  // Create Admin User
  const hashedPassword = await bcrypt.hash("rifqy110205", 12);

  const admin = await prisma.admin.upsert({
    where: { email: "rifqysaputra1102@gmail.com" },
    update: {
      password: hashedPassword,
    },
    create: {
      email: "rifqysaputra1102@gmail.com",
      password: hashedPassword,
      name: "Rifqy Saputra",
    },
  });

  console.log("Admin user created/updated:", admin.email);

  // Skills, Education, Experience, Projects will be added manually through the admin panel
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
