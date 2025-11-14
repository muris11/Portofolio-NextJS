import SkillIcon from "@/components/SkillIcon";
import { db } from "@/lib/db";
import { ArrowRight, ExternalLink, Github, Linkedin, Mail } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to my portfolio - Fullstack Developer specializing in modern web technologies",
};

export const dynamic = "force-dynamic";

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
    <div className="min-h-screen relative overflow-hidden bg-slate-950">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 -z-10">
        {/* Primary gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950"></div>

        {/* Animated mesh gradient */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-sky-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-6000"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${15 + Math.random() * 15}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Geometric patterns */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-20 left-10 w-40 h-40 border border-blue-500/20 rotate-45 animate-spin-slow"></div>
          <div className="absolute top-40 right-20 w-32 h-32 border border-cyan-500/20 rotate-12 animate-spin-reverse"></div>
          <div className="absolute bottom-32 left-1/4 w-24 h-24 border border-indigo-500/20 rotate-30 animate-spin-slow animation-delay-3000"></div>
          <div className="absolute bottom-20 right-1/3 w-36 h-36 border border-sky-500/20 -rotate-45 animate-spin-reverse animation-delay-5000"></div>
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2363b3ed' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden py-20 lg:py-0">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-10 order-2 lg:order-1">
              <div className="space-y-8">
                {/* Main Heading */}
                <div className="space-y-4 mt-12">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight">
                    <span className="block bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent animate-slide-in-left drop-shadow-2xl">
                      {profile?.fullName || "Your Name"}
                    </span>
                    <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent animate-slide-in-right animation-delay-300 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mt-3 font-semibold">
                      {profile?.title || "Fullstack Developer"}
                    </span>
                  </h1>
                </div>

                {/* Description */}
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl animate-fade-in-up animation-delay-500 font-light">
                  {profile?.bio ||
                    "Crafting digital experiences that blend innovation with elegance. Transforming ideas into reality through code, design, and strategic thinking."}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-700">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl hover:from-blue-500 hover:to-cyan-500 transition-all duration-500 font-semibold text-base shadow-2xl shadow-blue-600/30 hover:shadow-blue-500/40 hover:scale-[1.02] transform-gpu overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Let's Collaborate
                    <Mail className="h-5 w-5 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 to-cyan-600 blur-xl opacity-50"></div>
                </Link>

                <Link
                  href="/projects"
                  className="group inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-500 font-semibold text-base backdrop-blur-sm hover:scale-[1.02] transform-gpu hover:shadow-xl hover:shadow-white/10"
                >
                  <span className="flex items-center gap-2">
                    View My Work
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-500" />
                  </span>
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 pt-4 animate-fade-in-up animation-delay-900">
                {profile?.githubUrl && (
                  <Link
                    href={profile.githubUrl}
                    className="group relative p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-110 transform-gpu backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/20"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <Github className="h-6 w-6 text-gray-300 group-hover:text-white transition-colors duration-300" />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
                  </Link>
                )}
                {profile?.linkedinUrl && (
                  <Link
                    href={profile.linkedinUrl}
                    className="group relative p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-110 transform-gpu backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/20"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-6 w-6 text-gray-300 group-hover:text-white transition-colors duration-300" />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
                  </Link>
                )}
                {profile?.email && (
                  <Link
                    href={`mailto:${profile.email}`}
                    className="group relative p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-110 transform-gpu backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/20"
                    aria-label="Email"
                  >
                    <Mail className="h-6 w-6 text-gray-300 group-hover:text-white transition-colors duration-300" />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
                  </Link>
                )}
              </div>
            </div>

            {/* Right Content - Profile Image */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="relative flex justify-center lg:justify-end">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>

                <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[30rem] lg:h-[30rem] animate-scale-in animation-delay-300">
                  {profile?.profileImage ? (
                    <div className="relative w-full h-full group">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      <Image
                        src={profile.profileImage}
                        alt={profile.fullName || "Profile"}
                        fill
                        className="object-cover rounded-3xl shadow-2xl ring-4 ring-white/20 group-hover:ring-white/40 transition-all duration-700 group-hover:scale-[1.02] transform-gpu"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-3xl"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-600/20 via-cyan-600/20 to-indigo-600/20 rounded-3xl flex items-center justify-center shadow-2xl ring-4 ring-white/20 backdrop-blur-sm border border-white/10">
                      <span className="text-white text-8xl sm:text-9xl lg:text-[10rem] font-bold opacity-90">
                        {profile?.fullName?.charAt(0) || "U"}
                      </span>
                    </div>
                  )}

                  {/* Floating elements */}
                  <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full animate-float shadow-2xl shadow-blue-500/50"></div>
                  <div className="absolute -bottom-8 -left-8 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full animate-float animation-delay-2000 shadow-2xl shadow-cyan-500/50"></div>
                  <div className="absolute top-1/2 -right-10 w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full animate-ping shadow-xl shadow-indigo-500/50"></div>
                  <div className="absolute top-1/4 -left-10 w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full animate-pulse shadow-xl shadow-blue-500/50"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden lg:block">
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center p-2">
              <div className="w-1.5 h-3 bg-white/60 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="relative py-24 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent"></div>

          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <div className="absolute top-20 left-10 w-24 h-24 border border-blue-500/30 rotate-30 animate-spin-slow"></div>
            <div className="absolute top-40 right-20 w-20 h-20 border border-cyan-500/30 -rotate-15 animate-spin-reverse"></div>
            <div className="absolute bottom-32 left-1/4 w-28 h-28 border border-indigo-500/30 rotate-45 animate-spin-slow animation-delay-2000"></div>
            <div className="absolute bottom-20 right-1/3 w-22 h-22 border border-sky-500/30 -rotate-30 animate-spin-reverse animation-delay-3000"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Section Header */}
            <div className="text-center mb-20 lg:mb-24">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/30 backdrop-blur-sm mb-8 animate-scale-in shadow-lg shadow-blue-500/10">
                <span className="relative flex h-3 w-3 mr-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-blue-400 to-cyan-400"></span>
                </span>
                <span className="text-sm font-semibold text-white tracking-wide">
                  Technical Expertise
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-8 animate-slide-in-left tracking-tight">
                Skills & Technologies
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-slide-in-right animation-delay-300 font-light">
                Mastering modern technologies and frameworks to deliver
                exceptional digital solutions
              </p>
            </div>

            {/* Skills Grid */}
            <div className="relative">
              {/* Central Feature */}
              <div className="flex justify-center mb-12 lg:mb-16">
                <div className="relative group animate-bounce-in animation-delay-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative bg-white/5 hover:bg-white/10 rounded-3xl p-10 lg:p-12 border border-white/10 hover:border-white/30 transition-all duration-700 hover:scale-105 transform-gpu backdrop-blur-sm group-hover:shadow-2xl group-hover:shadow-blue-500/20">
                    <div className="text-center space-y-5">
                      <div className="w-20 h-20 lg:w-24 lg:h-24 mx-auto bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl flex items-center justify-center shadow-xl shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-500 group-hover:scale-110">
                        <span className="text-4xl lg:text-5xl">⚡</span>
                      </div>
                      <h3 className="text-white font-bold text-xl lg:text-2xl">
                        Full Stack
                      </h3>
                      <p className="text-gray-400 text-sm lg:text-base font-light">
                        End-to-end development
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                {skills.map((skill, index) => (
                  <div
                    key={skill.id}
                    className="group relative animate-scale-in"
                    style={{
                      animationDelay: `${index * 100 + 800}ms`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                    <div className="relative bg-white/5 hover:bg-white/10 rounded-3xl p-6 lg:p-8 border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105 transform-gpu backdrop-blur-sm group-hover:shadow-2xl group-hover:shadow-blue-500/10">
                      <div className="flex flex-col items-center space-y-5">
                        <div className="relative">
                          <SkillIcon skill={skill} />
                          <div className="absolute inset-0 rounded-full border-2 border-blue-500/40 scale-0 group-hover:scale-125 transition-transform duration-700"></div>
                        </div>

                        <div className="text-center w-full space-y-3">
                          <h3 className="text-white font-semibold text-sm lg:text-base group-hover:text-blue-300 transition-colors duration-300">
                            {skill.name}
                          </h3>
                          {skill.level && (
                            <div className="space-y-2">
                              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full transition-all duration-1000 ease-out group-hover:from-blue-500 group-hover:to-cyan-500 shadow-lg shadow-blue-500/30"
                                  style={{ width: `${skill.level}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-400 font-medium">
                                {skill.level}%
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-16 lg:mt-20 animate-fade-in-up animation-delay-1500">
              <Link
                href="/resume"
                className="group relative inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl hover:from-blue-500 hover:to-cyan-500 transition-all duration-500 font-semibold text-lg shadow-2xl shadow-blue-600/30 hover:shadow-blue-500/40 hover:scale-105 transform-gpu overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Explore Complete Tech Stack
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-500" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 to-cyan-600 blur-xl opacity-50"></div>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="relative py-24 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/30 to-transparent"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Section Header */}
            <div className="text-center mb-20 lg:mb-24">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/30 backdrop-blur-sm mb-8 animate-scale-in shadow-lg shadow-blue-500/10">
                <span className="relative flex h-3 w-3 mr-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-gradient-to-r from-blue-400 to-cyan-400"></span>
                </span>
                <span className="text-sm font-semibold text-white tracking-wide">
                  Featured Work
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-8 animate-slide-in-left tracking-tight">
                Project Showcase
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-slide-in-right animation-delay-300 font-light">
                Innovative solutions crafted with cutting-edge technology
              </p>
            </div>

            {/* Projects - 2 Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {featuredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${index * 200 + 500}ms` }}
                >
                  <div className="relative bg-white/5 hover:bg-white/10 rounded-3xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-700 hover:scale-[1.02] transform-gpu backdrop-blur-sm group-hover:shadow-2xl group-hover:shadow-blue-500/20">
                    {/* Project Image */}
                    <div className="relative h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                      {project.imageUrl ? (
                        <Image
                          src={project.imageUrl}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600/10 via-cyan-600/10 to-indigo-600/10">
                          <div className="text-center">
                            <div className="w-12 h-12 bg-white/5 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-lg border border-white/10">
                              <span className="text-blue-400 text-xl font-bold">
                                {project.title.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <span className="text-gray-400 text-xs font-medium">
                              Project Preview
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Featured badge */}
                      {project.featured && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm border border-white/20">
                          ⭐ Featured
                        </div>
                      )}

                      {/* Overlay with links */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out flex items-center justify-center">
                        <div className="flex space-x-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out delay-100">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white/5 backdrop-blur-xl text-white p-3 rounded-2xl hover:bg-white/10 hover:scale-110 transition-all duration-300 ease-out shadow-xl hover:shadow-2xl border border-white/10 hover:border-blue-400/50"
                              aria-label="View live project"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white/5 backdrop-blur-xl text-white p-3 rounded-2xl hover:bg-white/10 hover:scale-110 transition-all duration-300 ease-out shadow-xl hover:shadow-2xl border border-white/10 hover:border-blue-400/50"
                              aria-label="View source code"
                            >
                              <Github className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6 space-y-4">
                      <div className="space-y-3">
                        <h3 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent leading-tight line-clamp-2">
                          {project.title}
                        </h3>

                        <p className="text-sm lg:text-base text-gray-300 leading-relaxed line-clamp-3">
                          {project.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2">
                          {(() => {
                            let techStack: string[] = [];
                            try {
                              techStack = JSON.parse(project.techStack || "[]");
                            } catch (error) {
                              console.error("Error parsing techStack:", error);
                              techStack = [];
                            }
                            return techStack
                              .slice(0, 4)
                              .map((tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full text-xs font-medium text-gray-300 hover:text-white transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-white/20"
                                >
                                  {tech}
                                </span>
                              ));
                          })()}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 font-medium text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 hover:scale-105 transform-gpu"
                          >
                            Live Demo
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-white/30 text-white rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 font-medium text-sm backdrop-blur-sm hover:scale-105 transform-gpu"
                          >
                            Code
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full animate-float shadow-lg shadow-blue-500/50 opacity-60"></div>
                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-cyan-500 to-indigo-500 rounded-full animate-float animation-delay-1000 shadow-lg shadow-cyan-500/50 opacity-60"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All CTA */}
            <div className="text-center mt-20 lg:mt-24 animate-fade-in-up animation-delay-1000">
              <Link
                href="/projects"
                className="group relative inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl hover:from-blue-500 hover:to-cyan-500 transition-all duration-500 font-semibold text-lg shadow-2xl shadow-blue-600/30 hover:shadow-blue-500/40 hover:scale-105 transform-gpu overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Explore All Projects
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-500" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 to-cyan-600 blur-xl opacity-50"></div>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative py-24 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-slate-950 to-cyan-950"></div>

        {/* Animated Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 via-transparent to-cyan-600/10 animate-pulse"></div>
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${10 + Math.random() * 10}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Geometric Patterns */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-20 left-20 w-32 h-32 border border-blue-500/30 rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-cyan-500/30 -rotate-30 animate-spin-reverse"></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 border border-indigo-500/30 rotate-60 animate-spin-slow animation-delay-3000"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Header */}
          <div className="mb-16 lg:mb-20 animate-fade-in-up">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 border border-white/30 backdrop-blur-sm mb-10 animate-bounce-in shadow-lg shadow-white/10">
              <span className="relative flex h-3 w-3 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
              </span>
              <span className="text-sm font-semibold text-white tracking-wide">
                Ready to Build Something Amazing
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-10 leading-tight animate-slide-in-left tracking-tight">
              Let's Create the Future Together
            </h2>
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-16 leading-relaxed max-w-4xl mx-auto animate-slide-in-right animation-delay-300 font-light">
              From innovative web applications to scalable platforms,
              transforming ideas into digital reality
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16 animate-fade-in-up animation-delay-500">
            {/* Primary CTA */}
            <div className="lg:col-span-2">
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center w-full px-10 py-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl hover:from-blue-500 hover:to-cyan-500 transition-all duration-500 font-semibold text-xl shadow-2xl shadow-blue-600/30 hover:shadow-blue-500/40 hover:scale-105 transform-gpu overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Start Your Project Today
                  <Mail className="h-7 w-7 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 to-cyan-600 blur-xl opacity-50"></div>
              </Link>
            </div>

            {/* Secondary CTA */}
            <div>
              <Link
                href="/projects"
                className="group inline-flex items-center justify-center w-full px-8 py-6 border-2 border-white/30 text-white rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-500 font-semibold text-lg backdrop-blur-sm hover:scale-105 transform-gpu"
              >
                <span className="flex items-center gap-3">
                  View Portfolio
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-500" />
                </span>
              </Link>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="animate-fade-in-up animation-delay-700">
            <p className="text-base text-gray-400 mb-10 font-medium">
              Trusted by innovative companies worldwide
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="group flex flex-col items-center p-6 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105 transform-gpu backdrop-blur-sm">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-blue-500/20">
                  <span className="text-3xl">🚀</span>
                </div>
                <span className="text-white font-semibold text-sm">
                  Startups
                </span>
              </div>

              <div className="group flex flex-col items-center p-6 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105 transform-gpu backdrop-blur-sm">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-600/20 to-indigo-600/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-cyan-500/20">
                  <span className="text-3xl">🏢</span>
                </div>
                <span className="text-white font-semibold text-sm">
                  Enterprises
                </span>
              </div>

              <div className="group flex flex-col items-center p-6 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105 transform-gpu backdrop-blur-sm">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-600/20 to-blue-600/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-indigo-500/20">
                  <span className="text-3xl">💡</span>
                </div>
                <span className="text-white font-semibold text-sm">
                  Innovators
                </span>
              </div>

              <div className="group flex flex-col items-center p-6 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105 transform-gpu backdrop-blur-sm">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600/20 to-sky-600/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-blue-500/20">
                  <span className="text-3xl">🌟</span>
                </div>
                <span className="text-white font-semibold text-sm">
                  Visionaries
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8 animate-fade-in-up animation-delay-900">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3">
                50+
              </div>
              <div className="text-gray-400 text-sm font-medium">
                Projects Completed
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent mb-3">
                3+
              </div>
              <div className="text-gray-400 text-sm font-medium">
                Years Experience
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent mb-3">
                100%
              </div>
              <div className="text-gray-400 text-sm font-medium">
                Client Satisfaction
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent mb-3">
                24/7
              </div>
              <div className="text-gray-400 text-sm font-medium">
                Support Available
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
