import ProjectCard from "@/components/ProjectCard";
import SkillIcon from "@/components/SkillIcon";
import StructuredData, {
    generatePersonStructuredData,
    generateWebsiteStructuredData,
} from "@/components/StructuredData";
import { db } from "@/lib/db";
import {
    ArrowRight,
    Github,
    Instagram,
    Linkedin,
    Mail
} from "lucide-react";
import type { Metadata } from "next";
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
      take: 6,
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

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to my portfolio - Fullstack Developer specializing in modern web technologies",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rifqy.dev",
    title: "Rifqy.Dev - Fullstack Developer Portfolio",
    description:
      "Professional portfolio of Rifqy, a skilled fullstack developer. Explore modern web development projects and cutting-edge technologies.",
    siteName: "Rifqy.Dev",
    images: ["https://rifqy.dev/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rifqy.Dev - Fullstack Developer Portfolio",
    description:
      "Professional portfolio showcasing modern web development projects and skills.",
    images: ["/og-image"],
    creator: "@rifqydev",
  },
};

export const dynamic = "force-dynamic";

export default async function Home() {
  const profile = await getProfile();
  const featuredProjects = await getFeaturedProjects();
  const skills = await getSkills();

  return (
    <div className="min-h-screen bg-neo-canvas text-black overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-var(--header-height))] flex items-center px-4 sm:px-6 lg:px-8 py-12 lg:py-20 border-b-4 border-black">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-10 order-2 lg:order-1">
              <div className="space-y-6">
                {/* Main Heading */}
                <div className="space-y-4">
                  <div className="inline-block bg-neo-secondary border-2 border-black px-4 py-1 shadow-neo-sm transform -rotate-2">
                    <span className="font-bold uppercase tracking-widest text-sm">
                      Welcome to my portfolio
                    </span>
                  </div>
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tighter uppercase">
                    {profile?.fullName || "Rifqy Saputra"}
                  </h1>
                  <div className="bg-black text-white inline-block px-4 py-2 transform rotate-1">
                    <span className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-wide">
                      {profile?.title ||
                        "Fullstack Developer"}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed max-w-2xl border-l-4 border-black pl-6">
                  {profile?.bio ||
                    "A skilled fullstack developer specializing in modern web technologies."}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6">
                <Link
                  href="/contact"
                  className="neo-btn group"
                >
                  <span className="flex items-center gap-2">
                    Let&apos;s Collaborate
                    <Mail className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  </span>
                </Link>

                <Link
                  href="/projects"
                  className="neo-btn-secondary group"
                >
                  <span className="flex items-center gap-2">
                    View My Work
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 pt-4">
                {[
                  { href: profile?.githubUrl, icon: Github, label: "GitHub" },
                  { href: profile?.linkedinUrl, icon: Linkedin, label: "LinkedIn" },
                  { href: profile?.instagramUrl, icon: Instagram, label: "Instagram" },
                  { href: profile?.email ? `mailto:${profile.email}` : null, icon: Mail, label: "Email" },
                ].map((social) => (
                  social.href && (
                    <Link
                      key={social.label}
                      href={social.href}
                      className="p-3 bg-white border-4 border-black shadow-neo hover:-translate-y-1 hover:shadow-neo-lg transition-all"
                      target={social.label === "Email" ? undefined : "_blank"}
                      rel={social.label === "Email" ? undefined : "noopener noreferrer"}
                      aria-label={social.label}
                    >
                      <social.icon className="h-6 w-6 text-black" />
                    </Link>
                  )
                ))}
              </div>
            </div>

            {/* Right Content - Profile Image */}
            <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[30rem] lg:h-[30rem]">
                <div className="absolute inset-0 bg-black translate-x-4 translate-y-4"></div>
                <div className="relative w-full h-full border-4 border-black bg-white overflow-hidden">
                  {profile?.profileImage ? (
                    <Image
                      src={profile.profileImage}
                      alt={profile.fullName || "Profile"}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-neo-secondary">
                      <span className="text-9xl font-black opacity-20">
                        {profile?.fullName?.charAt(0) || "U"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 border-b-4 border-black bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block bg-neo-accent border-2 border-black px-4 py-1 shadow-neo-sm mb-6 transform rotate-2">
                <span className="font-bold uppercase tracking-widest text-sm">
                  Technical Expertise
                </span>
              </div>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-6">
                Skills & Technologies
              </h2>
              <p className="text-xl font-medium max-w-3xl mx-auto">
                Mastering modern technologies and frameworks to deliver
                exceptional digital solutions
              </p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
              {skills.map((skill) => (
                <SkillIcon key={skill.id} skill={skill} />
              ))}
            </div>

            <div className="text-center mt-16">
              <Link
                href="/resume"
                className="neo-btn inline-flex items-center gap-2"
              >
                Explore Complete Tech Stack
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 border-b-4 border-black bg-neo-canvas">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block bg-neo-secondary border-2 border-black px-4 py-1 shadow-neo-sm mb-6 transform -rotate-1">
                <span className="font-bold uppercase tracking-widest text-sm">
                  Featured Work
                </span>
              </div>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-6">
                Project Showcase
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-12">
              {featuredProjects.map((project) => (
                <div key={project.id} className="h-full">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <Link
                href="/projects"
                className="neo-btn inline-flex items-center gap-2"
              >
                Explore All Projects
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-neo-accent border-b-4 border-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-8">
            Ready to Start a Project?
          </h2>
          <p className="text-xl font-bold mb-12 max-w-2xl mx-auto">
            I am currently open to new opportunities and collaborations.
            Let&apos;s discuss how we can work together to create something
            amazing.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/contact"
              className="neo-btn bg-white hover:bg-gray-100"
            >
              <span className="flex items-center gap-2">
                Get In Touch
                <Mail className="h-5 w-5" />
              </span>
            </Link>
            <Link
              href="/projects"
              className="neo-btn bg-black text-white hover:bg-gray-900 border-white"
            >
              <span className="flex items-center gap-2">
                View My Work
                <ArrowRight className="h-5 w-5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <StructuredData
        type="Person"
        data={generatePersonStructuredData(profile)}
      />
      <StructuredData type="WebSite" data={generateWebsiteStructuredData()} />
    </div>
  );
}
