import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import { join } from "path";

config({ path: join(process.cwd(), ".env") });

// Temporary fix: hardcode DATABASE_URL
process.env.DATABASE_URL =
  "postgres://62bacebb305892ea3f80398f53fb7c9da90e43c7e8bf916dc4844c1f3a7aa86c:sk_rTfOoQgrpBLmrdtmLAdPj@db.prisma.io:5432/postgres?sslmode=require";

const prisma = new PrismaClient();

async function main() {
  // Create Profile
  await prisma.profile.upsert({
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

  console.log("Profile created/updated");

  // Create Admin User
  const hashedPassword = await bcrypt.hash("rifqy110205", 12);

  await prisma.admin.upsert({
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

  console.log("Admin user created/updated");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
