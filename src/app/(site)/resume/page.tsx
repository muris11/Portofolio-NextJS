import type { Skill } from "@/app/admin/hooks/useAdminData";
import SkillIcon from "@/components/SkillIcon";
import TimelineItem from "@/components/TimelineItem";
import { db } from "@/lib/db";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "View my professional experience, education, and technical skills as a Fullstack Developer",
};

// Enable ISR with 5 minute revalidation for better performance
export const revalidate = 300; // 5 minutes

async function getEducation() {
  try {
    const education = await db.education.findMany({
      orderBy: { startDate: "desc" },
    });
    // Convert null to undefined for optional fields
    return education.map((edu) => ({
      ...edu,
      description: edu.description || undefined,
      logoUrl: edu.logoUrl || undefined,
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
    // Convert null to undefined for optional fields
    return experience.map((exp) => ({
      ...exp,
      logoUrl: exp.logoUrl || undefined,
    }));
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

function groupSkillsByCategory(skills: Skill[]) {
  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return grouped;
}

export default async function ResumePage() {
  const education = await getEducation();
  const experience = await getExperience();
  const skills = await getSkills();
  const groupedSkills = groupSkillsByCategory(skills);

  return (
    <div className="min-h-screen bg-neo-canvas text-black overflow-x-hidden">
      {/* Header Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b-4 border-black bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-neo-secondary border-2 border-black px-4 py-1 shadow-neo-sm mb-6 transform rotate-2">
            <span className="font-bold uppercase tracking-widest text-sm">
              Professional Journey
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-6">
            My Resume
          </h1>
          <p className="text-xl font-medium max-w-2xl mx-auto border-l-4 border-black pl-6 text-left md:text-center md:border-l-0 md:pl-0">
            A comprehensive overview of my educational background, professional
            experience, and technical expertise.
          </p>
        </div>
      </section>

      {/* Education Section */}
      {education.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-b-4 border-black">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 text-center">
              <div className="inline-block bg-neo-accent border-2 border-black px-4 py-1 shadow-neo-sm mb-6 transform -rotate-1">
                <span className="font-bold uppercase tracking-widest text-sm">
                  Academic Background
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4">
                Education
              </h2>
              <p className="text-lg font-medium max-w-2xl mx-auto">
                My academic journey in building a strong foundation of knowledge
                and skills.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              {education.map((item) => (
                <TimelineItem key={item.id} item={item} type="education" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {experience.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 border-b-4 border-black bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 text-center">
              <div className="inline-block bg-neo-secondary border-2 border-black px-4 py-1 shadow-neo-sm mb-6 transform rotate-1">
                <span className="font-bold uppercase tracking-widest text-sm">
                  Career Path
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4">
                Experience
              </h2>
              <p className="text-lg font-medium max-w-2xl mx-auto">
                My professional journey and contributions in the technology
                industry.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              {experience.map((item) => (
                <TimelineItem key={item.id} item={item} type="experience" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 text-center">
              <div className="inline-block bg-neo-accent border-2 border-black px-4 py-1 shadow-neo-sm mb-6 transform -rotate-2">
                <span className="font-bold uppercase tracking-widest text-sm">
                  Tech Stack
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-4">
                Technical Skills
              </h2>
              <p className="text-lg font-medium max-w-2xl mx-auto">
                Technologies and tools I master to develop digital solutions.
              </p>
            </div>

            <div className="space-y-16">
              {Object.entries(groupedSkills).map(
                ([category, categorySkills]) => (
                  <div key={category} className="neo-card p-8 bg-white">
                    <h3 className="text-2xl font-black uppercase border-b-4 border-black pb-4 mb-8 inline-block">
                      {category}
                    </h3>
                    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-8 justify-items-center">
                      {categorySkills.map((skill) => (
                        <SkillIcon key={skill.id} skill={skill} />
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {education.length === 0 &&
        experience.length === 0 &&
        skills.length === 0 && (
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center neo-card p-12 bg-white">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-neo-secondary border-4 border-black mb-6 shadow-neo">
                <span className="text-4xl font-black">!</span>
              </div>
              <h3 className="text-2xl font-black uppercase mb-3">
                Resume Coming Soon
              </h3>
              <p className="font-medium max-w-md mx-auto">
                Education, experience, and skills information will be added
                soon.
              </p>
            </div>
          </section>
        )}
    </div>
  );
}
