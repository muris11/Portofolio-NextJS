import ProjectCard from "@/components/ProjectCard";
import SkillIcon from "@/components/SkillIcon";
import { db } from "@/lib/db";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function getProfile() {
  try {
    const profile = await db.profile.findFirst();
    return profile;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}

async function getFeaturedProjects() {
  try {
    const projects = await db.project.findMany({
      where: { featured: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    });
    // Convert null to undefined for optional fields
    return projects.map((project) => ({
      ...project,
      imageUrl: project.imageUrl || undefined,
      liveUrl: project.liveUrl || undefined,
      githubUrl: project.githubUrl || undefined,
    }));
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return [];
  }
}

async function getSkills() {
  try {
    const skills = await db.skill.findMany({
      orderBy: { level: "desc" },
      take: 8,
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

export default async function Home() {
  const profile = await getProfile();
  const featuredProjects = await getFeaturedProjects();
  const skills = await getSkills();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
              <div className="space-y-3 lg:space-y-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                  👋 Selamat Datang
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  {profile?.fullName || "Nama Anda"}
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 font-medium">
                  {profile?.title || "Fullstack Developer"}
                </p>
              </div>

              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-xl">
                {profile?.bio ||
                  "Saya adalah seorang developer yang passionate tentang teknologi dan inovasi. Saya menciptakan solusi digital yang tidak hanya fungsional tetapi juga memberikan pengalaman pengguna yang luar biasa."}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:scale-105 touch-manipulation"
                >
                  Hubungi Saya
                  <Mail className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>

                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 font-medium hover:border-primary hover:text-primary dark:hover:text-primary touch-manipulation"
                >
                  Lihat Proyek
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4 pt-2">
                {profile?.githubUrl && (
                  <Link
                    href={profile.githubUrl}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 touch-manipulation"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Link>
                )}
                {profile?.linkedinUrl && (
                  <Link
                    href={profile.linkedinUrl}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 touch-manipulation"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Link>
                )}
                {profile?.email && (
                  <Link
                    href={`mailto:${profile.email}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 touch-manipulation"
                    aria-label="Email"
                  >
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Link>
                )}
              </div>
            </div>

            {/* Profile Image */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80">
                {profile?.profileImage ? (
                  <Image
                    src={profile.profileImage}
                    alt={profile.fullName}
                    fill
                    className="object-cover rounded-3xl shadow-2xl ring-4 ring-white/50 dark:ring-gray-800/50"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-800 rounded-3xl flex items-center justify-center shadow-2xl ring-4 ring-white/50 dark:ring-gray-800/50">
                    <span className="text-gray-500 dark:text-gray-400 text-4xl sm:text-5xl lg:text-6xl font-bold">
                      {profile?.fullName?.charAt(0) || "U"}
                    </span>
                  </div>
                )}
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary/30 rounded-full animate-pulse delay-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                Kemampuan Saya
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
                Teknologi dan tools yang saya gunakan untuk mengembangkan solusi
                digital
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
              {skills.map((skill) => (
                <SkillIcon key={skill.id} skill={skill} />
              ))}
            </div>

            <div className="text-center mt-8 sm:mt-12">
              <Link
                href="/resume"
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium text-sm sm:text-base group"
              >
                Lihat semua kemampuan
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                Proyek Unggulan
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
                Beberapa proyek terbaik yang telah saya kerjakan
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            <div className="text-center mt-8 sm:mt-12 lg:mt-16">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:scale-105 touch-manipulation"
              >
                Lihat Semua Proyek
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
          <div className="absolute top-32 right-20 w-12 h-12 bg-white rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-8 h-8 bg-white rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
            Tertarik Bekerja Sama?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 lg:mb-10 opacity-90 max-w-2xl mx-auto px-4">
            Saya selalu terbuka untuk diskusi tentang proyek baru, ide kreatif,
            atau peluang untuk menjadi bagian dari visi Anda.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-white dark:bg-gray-900 text-primary dark:text-primary-foreground rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:scale-105 touch-manipulation"
          >
            Mari Berdiskusi
            <Mail className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
