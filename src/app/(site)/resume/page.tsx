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
    <div className="min-h-screen relative overflow-hidden bg-slate-950">
      {/* Enhanced Animated Background - Consistent with Homepage */}
      <div className="fixed inset-0 -z-10">
        {/* Primary gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950"></div>

        {/* Animated mesh gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-sky-600 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        {/* Geometric patterns */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-20 left-10 w-40 h-40 border border-blue-500/20 rotate-45"></div>
          <div className="absolute top-40 right-20 w-32 h-32 border border-cyan-500/20 rotate-12"></div>
          <div className="absolute bottom-32 left-1/4 w-24 h-24 border border-indigo-500/20 rotate-30"></div>
          <div className="absolute bottom-20 right-1/3 w-36 h-36 border border-sky-500/20 -rotate-45"></div>
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2363b3ed' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Header Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/30 backdrop-blur-sm mb-8 animate-scale-in shadow-lg shadow-blue-500/10">
            <span className="relative flex h-3 w-3 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-blue-400 to-cyan-400"></span>
            </span>
            <span className="text-sm font-semibold text-white tracking-wide">
              Professional Journey
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-6 animate-slide-in-left tracking-tight">
            My Resume
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed animate-slide-in-right animation-delay-300 font-light">
            A comprehensive overview of my educational background, professional
            experience, and technical expertise.
          </p>
        </div>
      </section>

      {/* Education Section */}
      {education.length > 0 && (
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 text-center animate-fade-in-up animation-delay-600">
              <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4">
                Education
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
                My academic journey in building a strong foundation of knowledge
                and skills.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {education.map((item, index) => (
                <div
                  key={item.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${800 + index * 200}ms` }}
                >
                  <TimelineItem item={item} type="education" />
                  {index === education.length - 1 && (
                    <div className="flex flex-col items-center mt-8">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                        <span className="text-white font-bold text-lg">✓</span>
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
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 text-center animate-fade-in-up animation-delay-800">
              <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4">
                Experience
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
                My professional journey and contributions in the technology
                industry.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {experience.map((item, index) => (
                <div
                  key={item.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${1000 + index * 200}ms` }}
                >
                  <TimelineItem item={item} type="experience" />
                  {index === experience.length - 1 && (
                    <div className="flex flex-col items-center mt-8">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                        <span className="text-white font-bold text-lg">✓</span>
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
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 text-center animate-fade-in-up animation-delay-1000">
              <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4">
                Technical Skills
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Technologies and tools I master to develop digital solutions.
              </p>
            </div>

            {Object.entries(groupedSkills).map(
              ([category, categorySkills], categoryIndex) => (
                <div
                  key={category}
                  className="mb-16 animate-fade-in-up"
                  style={{ animationDelay: `${1200 + categoryIndex * 200}ms` }}
                >
                  <h3 className="text-xl lg:text-2xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-8 capitalize text-center">
                    {category}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 justify-items-center">
                    {categorySkills.map((skill, skillIndex) => (
                      <div
                        key={skill.id}
                        className="animate-fade-in-up"
                        style={{
                          animationDelay: `${
                            1400 + categoryIndex * 200 + skillIndex * 100
                          }ms`,
                        }}
                      >
                        <SkillIcon skill={skill} />
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* Empty State */}
      {education.length === 0 &&
        experience.length === 0 &&
        skills.length === 0 && (
          <section className="pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center animate-fade-in-up animation-delay-600">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl mb-6 shadow-2xl">
                <svg
                  className="w-10 h-10 text-gray-400"
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
              <h3 className="text-xl font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-3">
                Resume Coming Soon
              </h3>
              <p className="text-gray-300 max-w-md mx-auto leading-relaxed">
                Education, experience, and skills information will be added
                soon.
              </p>
              <div className="flex justify-center space-x-2 mt-6">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <div
                  className="w-2 h-2 bg-primary rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-primary rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </section>
        )}
    </div>
  );
}
