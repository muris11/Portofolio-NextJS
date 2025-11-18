import { PrismaClient } from "@prisma/client";

async function seedPortfolioData() {
  const prisma = new PrismaClient();

  try {
    // 3. Add Education
    console.log("🗑️  Clearing old education data...");
    await prisma.education.deleteMany({});

    const educations = [
      {
        institution: "Universitas Islam 45",
        degree: "S1 Sistem Informasi",
        startDate: "2021",
        endDate: "2025",
        description:
          "Mahasiswa aktif dengan IPK 3.96, fokus pada pengembangan sistem informasi dan teknologi digital.",
        logoUrl: "https://picsum.photos/200/200?random=1",
      },
      {
        institution: "SMA Negeri 1 Bekasi",
        degree: "IPA (Ilmu Pengetahuan Alam)",
        startDate: "2018",
        endDate: "2021",
        description:
          "Lulus dengan prestasi akademik yang baik, fokus pada matematika dan sains.",
        logoUrl: "https://picsum.photos/200/200?random=2",
      },
    ];

    // 4. Add Experience
    console.log("🗑️  Clearing old experience data...");
    await prisma.experience.deleteMany({});

    const experiences = [
      {
        company: "PT. Tech Solutions Indonesia",
        role: "Fullstack Developer",
        description:
          "Mengembangkan dan memelihara aplikasi web perusahaan menggunakan React, Next.js, dan Node.js.",
        startDate: "Jan 2024",
        endDate: "Sekarang",
        logoUrl: "https://picsum.photos/200/200?random=3",
      },
      {
        company: "Freelance Developer",
        role: "Web & Mobile Developer",
        description:
          "Mengerjakan berbagai proyek freelance termasuk pengembangan website dan aplikasi mobile.",
        startDate: "Jun 2023",
        endDate: "Sekarang",
        logoUrl: "https://picsum.photos/200/200?random=4",
      },
      {
        company: "StartupXYZ",
        role: "Frontend Developer Intern",
        description:
          "Membantu pengembangan UI/UX untuk platform e-commerce menggunakan React dan Tailwind CSS.",
        startDate: "Jan 2023",
        endDate: "May 2023",
        logoUrl: "https://picsum.photos/200/200?random=5",
      },
    ];

    for (const education of educations) {
      await prisma.education.create({ data: education });
    }
    console.log("✅ Education added");

    for (const experience of experiences) {
      await prisma.experience.create({ data: experience });
    }
    console.log("✅ Experience added");
  } finally {
    await prisma.$disconnect();
  }
}

seedPortfolioData();
