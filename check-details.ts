import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkDetails() {
  try {
    console.log('=== DETAILED DATA CHECK ===');

    const education = await prisma.education.findMany();
    console.log('Education records:', education.length);
    education.forEach((edu, i) => {
      console.log(`  ${i+1}. ${edu.institution} - logoUrl: ${edu.logoUrl || 'NULL'}`);
    });

    const experience = await prisma.experience.findMany();
    console.log('Experience records:', experience.length);
    experience.forEach((exp, i) => {
      console.log(`  ${i+1}. ${exp.company} - logoUrl: ${exp.logoUrl || 'NULL'}`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDetails();