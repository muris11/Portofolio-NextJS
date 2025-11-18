import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(process.cwd(), '.env') });

// Temporary fix: hardcode DATABASE_URL
process.env.DATABASE_URL = 'postgres://62bacebb305892ea3f80398f53fb7c9da90e43c7e8bf916dc4844c1f3a7aa86c:sk_rTfOoQgrpBLmrdtmLAdPj@db.prisma.io:5432/postgres?sslmode=require';

const prisma = new PrismaClient();

async function seedPortfolioData() {
  try {
    console.log('🌱 Seeding portfolio data...');

    // 1. Update Profile
    await prisma.profile.upsert({
      where: { id: 'default' },
      update: {
        fullName: 'Muhammad Rifqy Saputra',
        title: 'Full Stack Developer, Mobile Developer and System Analyst',
        bio: 'I am a dedicated Fullstack Developer, Mobile Developer, and System Analyst with a strong passion for technology, innovation, and high-quality software development.',
        email: 'rifqysaputra1102@gmail.com',
        phone: '+62 857 7381 8846',
        location: 'Bekasi, Indonesia',
        githubUrl: 'https://github.com/muris11',
        linkedinUrl: 'https://www.linkedin.com/in/rifqy-saputra-022236261/',
        instagramUrl: 'https://instagram.com/rfqy_sptr',
      },
      create: {
        id: 'default',
        fullName: 'Muhammad Rifqy Saputra',
        title: 'Full Stack Developer, Mobile Developer and System Analyst',
        bio: 'I am a dedicated Fullstack Developer, Mobile Developer, and System Analyst with a strong passion for technology, innovation, and high-quality software development.',
        email: 'rifqysaputra1102@gmail.com',
        phone: '+62 857 7381 8846',
        location: 'Bekasi, Indonesia',
        githubUrl: 'https://github.com/muris11',
        linkedinUrl: 'https://www.linkedin.com/in/rifqy-saputra-022236261/',
        instagramUrl: 'https://instagram.com/rfqy_sptr',
      },
    });
    console.log('✅ Profile updated');

    // 2. Add Skills
    const skills = [
      { name: 'JavaScript', category: 'Frontend', icon: 'SiJavascript', level: 90 },
      { name: 'TypeScript', category: 'Frontend', icon: 'SiTypescript', level: 85 },
      { name: 'React', category: 'Frontend', icon: 'SiReact', level: 90 },
      { name: 'Next.js', category: 'Frontend', icon: 'SiNextdotjs', level: 85 },
      { name: 'Tailwind CSS', category: 'Frontend', icon: 'SiTailwindcss', level: 80 },
      { name: 'Node.js', category: 'Backend', icon: 'SiNodedotjs', level: 85 },
      { name: 'Express.js', category: 'Backend', icon: 'SiExpress', level: 80 },
      { name: 'PostgreSQL', category: 'Database', icon: 'SiPostgresql', level: 75 },
      { name: 'MongoDB', category: 'Database', icon: 'SiMongodb', level: 70 },
      { name: 'Git', category: 'Tools', icon: 'SiGit', level: 85 },
      { name: 'Docker', category: 'Tools', icon: 'SiDocker', level: 70 },
      { name: 'Figma', category: 'Tools', icon: 'SiFigma', level: 75 },
    ];

    for (const skill of skills) {
      await prisma.skill.create({ data: skill });
    }
    console.log('✅ Skills added');

    // 3. Add Education
    const educations = [
      {
        institution: 'Universitas Islam 45',
        degree: 'S1 Sistem Informasi',
        startDate: '2021',
        endDate: '2025',
        description: 'Mahasiswa aktif dengan IPK 3.96, fokus pada pengembangan sistem informasi dan teknologi digital.',
        logoUrl: 'https://via.placeholder.com/100x100?text=UNISMA45',
      },
      {
        institution: 'SMA Negeri 1 Bekasi',
        degree: 'IPA (Ilmu Pengetahuan Alam)',
        startDate: '2018',
        endDate: '2021',
        description: 'Lulus dengan prestasi akademik yang baik, fokus pada matematika dan sains.',
        logoUrl: 'https://via.placeholder.com/100x100?text=SMA1+Bekasi',
      },
    ];

    for (const education of educations) {
      await prisma.education.create({ data: education });
    }
    console.log('✅ Education added');

    // 4. Add Experience
    const experiences = [
      {
        company: 'PT. Tech Solutions Indonesia',
        role: 'Fullstack Developer',
        description: 'Mengembangkan dan memelihara aplikasi web perusahaan menggunakan React, Next.js, dan Node.js.',
        startDate: 'Jan 2024',
        endDate: 'Sekarang',
        logoUrl: 'https://via.placeholder.com/100x100?text=TechCorp',
      },
      {
        company: 'Freelance Developer',
        role: 'Web & Mobile Developer',
        description: 'Mengerjakan berbagai proyek freelance termasuk pengembangan website dan aplikasi mobile.',
        startDate: 'Jun 2023',
        endDate: 'Sekarang',
        logoUrl: 'https://via.placeholder.com/100x100?text=Freelance',
      },
      {
        company: 'StartupXYZ',
        role: 'Frontend Developer Intern',
        description: 'Membantu pengembangan UI/UX untuk platform e-commerce menggunakan React dan Tailwind CSS.',
        startDate: 'Jan 2023',
        endDate: 'May 2023',
        logoUrl: 'https://via.placeholder.com/100x100?text=StartupXYZ',
      },
    ];

    for (const experience of experiences) {
      await prisma.experience.create({ data: experience });
    }
    console.log('✅ Experience added');

    // 5. Create Admin User
    const hashedPassword = await bcrypt.hash('rifqy110205', 12);
    await prisma.admin.upsert({
      where: { email: 'rifqysaputra1102@gmail.com' },
      update: { password: hashedPassword },
      create: {
        email: 'rifqysaputra1102@gmail.com',
        password: hashedPassword,
        name: 'Rifqy Saputra',
      },
    });
    console.log('✅ Admin user created/updated');

    console.log('🎉 Portfolio data seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedPortfolioData();