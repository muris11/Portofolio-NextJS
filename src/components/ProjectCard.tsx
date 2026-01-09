"use client";

import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    techStack: string;
    liveUrl?: string;
    githubUrl?: string;
    featured?: boolean;
  };
  onClick?: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  let techStack: string[] = [];
  try {
    techStack = JSON.parse(project.techStack || "[]");
  } catch (error) {
    console.error(
      "Error parsing techStack:",
      error,
      "Raw value:",
      project.techStack
    );
    techStack = [];
  }
  const isPlaceholder = project.imageUrl?.includes("via.placeholder.com");

  return (
    <div
      className={`neo-card flex flex-col h-full group ${
        onClick ? "cursor-pointer hover:bg-gray-50 transition-colors" : ""
      }`}
      onClick={onClick}
    >
      {/* Project Image - Full Size */}
      <div className="relative h-32 sm:h-64 border-b-4 border-black overflow-hidden bg-neo-canvas">
        {project.imageUrl ? (
          isPlaceholder ? (
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              loading="lazy"
            />
          ) : (
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
            />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-neo-secondary">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-black bg-white flex items-center justify-center mx-auto mb-3 shadow-neo">
                <span className="text-black text-xl sm:text-2xl font-black">
                  {project.title.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-black text-xs sm:text-sm font-bold uppercase tracking-wide">
                Project Preview
              </span>
            </div>
          </div>
        )}

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-neo-secondary text-black px-2 py-1 sm:px-3 sm:py-1 border-2 border-black shadow-neo-sm text-[10px] sm:text-xs font-black uppercase tracking-widest z-10">
            ⭐ Featured
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-3 sm:p-6 flex flex-col flex-grow">
        <div className="space-y-2 sm:space-y-3 mb-0 sm:mb-6 flex-grow">
          <h3 className="text-sm sm:text-2xl font-black uppercase tracking-tight leading-tight sm:leading-none group-hover:underline decoration-4 underline-offset-4 line-clamp-2 sm:line-clamp-none">
            {project.title}
          </h3>
          {/* Description removed as per user request */}
          {/* <p className="hidden sm:block text-black text-sm sm:text-base font-medium leading-relaxed line-clamp-2">
            {project.description}
          </p> */}
        </div>

        {/* Tech Stack */}
        <div className="hidden sm:flex flex-wrap gap-2 mb-4 sm:mb-6">
          {techStack.slice(0, 4).map((tech: string, index: number) => (
            <span
              key={index}
              className="px-2 py-1 bg-white border-2 border-black text-black text-[10px] sm:text-xs font-bold uppercase tracking-wide shadow-[2px_2px_0px_0px_#000]"
            >
              {tech}
            </span>
          ))}
          {techStack.length > 4 && (
            <span className="px-2 py-1 bg-white border-2 border-black text-black text-[10px] sm:text-xs font-bold uppercase tracking-wide shadow-[2px_2px_0px_0px_#000]">
              +{techStack.length - 4}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="hidden sm:flex gap-3 sm:gap-4 mt-auto pt-4 border-t-4 border-black">
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 neo-btn bg-neo-accent text-xs sm:text-sm py-2 px-2 sm:px-4"
              aria-label="View live project"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Live Demo
            </Link>
          )}
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 neo-btn bg-white text-xs sm:text-sm py-2 px-2 sm:px-4"
              aria-label="View source code"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Code
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
