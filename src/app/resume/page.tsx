import SkillIcon from "@/components/SkillIcon";
import TimelineItem from "@/components/TimelineItem";
import { db } from "@/lib/db";

async function getEducation() {
  try {
    const education = await db.education.findMany({
      orderBy: { startDate: "desc" },
    });
    // Convert null to undefined for optional fields
    return education.map((edu) => ({
      ...edu,
      description: edu.description || undefined,
    }));
  } catch (error) {
    console.error("Error fetching education:", error);
    return [];
  }
}

async function getExperience() {
  try {
    const experience = await db.experience.findMany({
      orderBy: { startDate: "desc" },
    });
    return experience;
  } catch (error) {
    console.error("Error fetching experience:", error);
    return [];
  }
}

async function getSkills() {
  try {
    const skills = await db.skill.findMany({
      orderBy: [{ category: "asc" }, { level: "desc" }],
    });
    // Convert null to undefined for optional fields
    return skills.map((skill) => ({
      ...skill,
      icon: skill.icon || undefined,
      level: skill.level || undefined,
    }));
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
}

function groupSkillsByCategory(skills: any[]) {
  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, any[]>);

  return grouped;
}

export default async function ResumePage() {
  const education = await getEducation();
  const experience = await getExperience();
  const skills = await getSkills();
  const groupedSkills = groupSkillsByCategory(skills);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Resume Saya
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ringkasan lengkap mengenai pendidikan, pengalaman kerja, dan
            kemampuan teknis yang saya miliki.
          </p>
        </div>
      </section>

      {/* Education Section */}
      {education.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Riwayat Pendidikan
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Perjalanan akademis saya dalam mengembangkan fondasi
                pengetahuan.
              </p>
            </div>

            <div className="max-w-4xl">
              {education.map((item, index) => (
                <div key={item.id}>
                  <TimelineItem item={item} type="education" />
                  {index === education.length - 1 && (
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground font-bold">
                          ✓
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {experience.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Pengalaman Kerja
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Profesional experience dan kontribusi saya dalam industri
                teknologi.
              </p>
            </div>

            <div className="max-w-4xl">
              {experience.map((item, index) => (
                <div key={item.id}>
                  <TimelineItem item={item} type="experience" />
                  {index === experience.length - 1 && (
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground font-bold">
                          ✓
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Kemampuan Teknis
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Teknologi dan tools yang saya kuasai untuk mengembangkan solusi
                digital.
              </p>
            </div>

            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category} className="mb-12">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 capitalize">
                  {category}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {(categorySkills as any[]).map((skill) => (
                    <SkillIcon key={skill.id} skill={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {education.length === 0 &&
        experience.length === 0 &&
        skills.length === 0 && (
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-gray-400 dark:text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Resume Belum Tersedia
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Informasi pendidikan, pengalaman, dan kemampuan akan segera
                ditambahkan.
              </p>
            </div>
          </section>
        )}

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Tertarik Bekerja Sama?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Berdasarkan pengalaman dan kemampuan saya, saya siap berkontribusi
            pada proyek Anda.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-gray-900 text-primary dark:text-primary-foreground rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium shadow-lg"
          >
            Diskusikan Peluang Kerja Sama
          </a>
        </div>
      </section>
    </div>
  );
}
