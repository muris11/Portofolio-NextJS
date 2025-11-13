const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Create Profile
  const profile = await prisma.profile.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      fullName: "John Doe",
      title: "Fullstack Developer",
      bio: "Saya adalah seorang Fullstack Developer yang passionate tentang teknologi dan inovasi. Dengan pengalaman lebih dari 5 tahun dalam mengembangkan aplikasi web, saya menciptakan solusi digital yang tidak hanya fungsional tetapi juga memberikan pengalaman pengguna yang luar biasa. Saya terus belajar dan mengikuti perkembangan teknologi terbaru untuk memberikan solusi yang terbaik.",
      email: "john.doe@example.com",
      phone: "+62 812-3456-7890",
      location: "Jakarta, Indonesia",
      githubUrl: "https://github.com/johndoe",
      linkedinUrl: "https://linkedin.com/in/johndoe",
      instagramUrl: "https://instagram.com/johndoe",
    },
  });

  // Create Skills
  const skills = [
    // Frontend
    {
      id: "react",
      name: "React",
      category: "Frontend",
      icon: "react",
      level: 5,
    },
    {
      id: "nextjs",
      name: "Next.js",
      category: "Frontend",
      icon: "nextjs",
      level: 5,
    },
    {
      id: "typescript",
      name: "TypeScript",
      category: "Frontend",
      icon: "typescript",
      level: 4,
    },
    {
      id: "tailwind",
      name: "Tailwind CSS",
      category: "Frontend",
      icon: "tailwind",
      level: 5,
    },
    { id: "vue", name: "Vue.js", category: "Frontend", icon: "vue", level: 3 },

    // Backend
    {
      id: "nodejs",
      name: "Node.js",
      category: "Backend",
      icon: "nodejs",
      level: 4,
    },
    {
      id: "express",
      name: "Express.js",
      category: "Backend",
      icon: "express",
      level: 4,
    },
    {
      id: "python",
      name: "Python",
      category: "Backend",
      icon: "python",
      level: 3,
    },
    {
      id: "postgresql",
      name: "PostgreSQL",
      category: "Backend",
      icon: "postgresql",
      level: 4,
    },

    // Database
    {
      id: "mongodb",
      name: "MongoDB",
      category: "Database",
      icon: "mongodb",
      level: 3,
    },
    {
      id: "mysql",
      name: "MySQL",
      category: "Database",
      icon: "mysql",
      level: 4,
    },
    {
      id: "sqlite",
      name: "SQLite",
      category: "Database",
      icon: "sqlite",
      level: 4,
    },
    {
      id: "redis",
      name: "Redis",
      category: "Database",
      icon: "redis",
      level: 3,
    },

    // Tools
    { id: "git", name: "Git", category: "Tools", icon: "git", level: 5 },
    {
      id: "docker",
      name: "Docker",
      category: "Tools",
      icon: "docker",
      level: 3,
    },
    { id: "aws", name: "AWS", category: "Tools", icon: "aws", level: 3 },
    { id: "figma", name: "Figma", category: "Tools", icon: "figma", level: 4 },
  ];

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { id: skill.id },
      update: skill,
      create: skill,
    });
  }

  // Create Education
  const education = [
    {
      institution: "Universitas Indonesia",
      degree: "S1 Teknik Informatika",
      startDate: "2018",
      endDate: "2022",
      description:
        "Fokus pada pengembangan software dan rekayasa perangkat lunak. Aktif dalam organisasi mahasiswa dan beberapa proyek pengembangan aplikasi.",
    },
    {
      institution: "SMK Negeri 1 Jakarta",
      degree: "Rekayasa Perangkat Lunak",
      startDate: "2015",
      endDate: "2018",
      description:
        "Mempelajari dasar-dasar pemrograman dan pengembangan software. Mengikuti berbagai kompetisi programming tingkat sekolah.",
    },
  ];

  for (const edu of education) {
    await prisma.education.upsert({
      where: { id: edu.institution.replace(/\s+/g, "-").toLowerCase() },
      update: edu,
      create: {
        ...edu,
        id: edu.institution.replace(/\s+/g, "-").toLowerCase(),
      },
    });
  }

  // Create Experience
  const experience = [
    {
      company: "Tech Company Indonesia",
      role: "Fullstack Developer",
      description:
        "Mengembangkan aplikasi web menggunakan React dan Node.js. Bertanggung jawab untuk design arsitektur sistem dan implementasi fitur-fitur baru. Kolaborasi dengan tim product dan design untuk menghasilkan produk yang user-friendly.",
      startDate: "Jan 2023",
      endDate: "Sekarang",
    },
    {
      company: "Digital Agency Jakarta",
      role: "Frontend Developer",
      description:
        "Membangun UI/UX untuk berbagai klien menggunakan React dan Vue.js. Optimasi performa website dan implementasi responsive design. Bekerja dengan tim backend untuk integrasi API.",
      startDate: "Jul 2021",
      endDate: "Des 2022",
    },
    {
      company: "Startup Teknologi",
      role: "Junior Web Developer",
      description:
        "Magang dan kemudian menjadi junior developer. Membantu pengembangan MVP produk menggunakan Next.js dan Express.js. Belajar best practices dalam pengembangan web modern.",
      startDate: "Jan 2021",
      endDate: "Jun 2021",
    },
  ];

  for (const exp of experience) {
    await prisma.experience.upsert({
      where: { id: exp.company.replace(/\s+/g, "-").toLowerCase() },
      update: exp,
      create: { ...exp, id: exp.company.replace(/\s+/g, "-").toLowerCase() },
    });
  }

  // Create Projects
  const projects = [
    {
      id: "ecommerce-platform",
      title: "E-Commerce Platform",
      description:
        "Platform e-commerce lengkap dengan fitur payment gateway, inventory management, dan dashboard admin. Dibangun menggunakan Next.js, TypeScript, dan PostgreSQL dengan Redux untuk state management.",
      imageUrl:
        "https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=E-Commerce",
      techStack: JSON.stringify([
        "Next.js",
        "TypeScript",
        "PostgreSQL",
        "Redux",
        "Stripe",
      ]),
      liveUrl: "https://example-ecommerce.com",
      githubUrl: "https://github.com/johndoe/ecommerce-platform",
      featured: true,
    },
    {
      id: "task-management",
      title: "Task Management App",
      description:
        "Aplikasi manajemen tugas dengan fitur real-time collaboration, drag-and-drop interface, dan notifikasi. Menggunakan React dengan Context API untuk state management dan Socket.io untuk real-time features.",
      imageUrl:
        "https://via.placeholder.com/400x300/10B981/FFFFFF?text=Task+Manager",
      techStack: JSON.stringify([
        "React",
        "Node.js",
        "Socket.io",
        "MongoDB",
        "Tailwind CSS",
      ]),
      liveUrl: "https://example-taskmanager.com",
      githubUrl: "https://github.com/johndoe/task-management",
      featured: true,
    },
    {
      id: "weather-dashboard",
      title: "Weather Dashboard",
      description:
        "Dashboard cuaca interaktif dengan forecast 7 hari, maps integration, dan personalisasi lokasi. Mengintegrasi multiple weather APIs dan menampilkan data visualisasi yang menarik.",
      imageUrl:
        "https://via.placeholder.com/400x300/F59E0B/FFFFFF?text=Weather",
      techStack: JSON.stringify([
        "Vue.js",
        "Chart.js",
        "OpenWeather API",
        "Leaflet Maps",
      ]),
      liveUrl: "https://example-weather.com",
      githubUrl: "https://github.com/johndoe/weather-dashboard",
      featured: true,
    },
    {
      id: "blog-platform",
      title: "Blog Platform",
      description:
        "Platform blogging dengan markdown support, SEO optimization, dan comment system. Fitur admin dashboard untuk content management dan analytics.",
      imageUrl: "https://via.placeholder.com/400x300/8B5CF6/FFFFFF?text=Blog",
      techStack: JSON.stringify([
        "Next.js",
        "MDX",
        "Prisma",
        "PostgreSQL",
        "Vercel",
      ]),
      liveUrl: "https://example-blog.com",
      githubUrl: "https://github.com/johndoe/blog-platform",
      featured: false,
    },
    {
      id: "social-analytics",
      title: "Social Media Analytics",
      description:
        "Tools untuk analisis social media metrics dengan data visualization, reporting otomatis, dan integration dengan multiple social platforms.",
      imageUrl:
        "https://via.placeholder.com/400x300/EF4444/FFFFFF?text=Analytics",
      techStack: JSON.stringify([
        "React",
        "D3.js",
        "Python",
        "FastAPI",
        "PostgreSQL",
      ]),
      liveUrl: "https://example-analytics.com",
      githubUrl: "https://github.com/johndoe/social-analytics",
      featured: false,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { id: project.id },
      update: project,
      create: project,
    });
  }

  // Create Admin User (password: admin123)
  await prisma.admin.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3bp.Gm.F5e", // admin123
      name: "Admin User",
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
