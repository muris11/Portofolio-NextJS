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
}

export default function ProjectCard({ project }: ProjectCardProps) {
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
    <div className="bg-white/5 hover:bg-white/10 rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-700 ease-out overflow-hidden group border border-white/10 hover:border-white/30 hover:-translate-y-2 hover:scale-[1.02] backdrop-blur-sm">
      {/* Project Image - Full Size */}
      <div className="relative h-64 sm:h-72 lg:h-80 xl:h-96 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
        {project.imageUrl ? (
          isPlaceholder ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              loading="lazy"
            />
          ) : (
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
            />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-primary/20 to-primary/10">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/5 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg border border-white/10">
                <span className="text-primary text-2xl font-bold">
                  {project.title.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-gray-400 text-sm font-medium">
                Project Preview
              </span>
            </div>
          </div>
        )}

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-primary to-primary/80 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm border border-white/20">
            ⭐ Featured
          </div>
        )}

        {/* Overlay with links */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out flex items-center justify-center">
          <div className="flex space-x-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out delay-100">
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 backdrop-blur-xl text-white p-3.5 rounded-2xl hover:bg-white/10 hover:scale-110 transition-all duration-300 ease-out shadow-xl hover:shadow-2xl border border-white/10 hover:border-primary/50"
                aria-label="View live project"
              >
                <ExternalLink className="h-5 w-5" />
              </Link>
            )}
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 backdrop-blur-xl text-white p-3.5 rounded-2xl hover:bg-white/10 hover:scale-110 transition-all duration-300 ease-out shadow-xl hover:shadow-2xl border border-white/10 hover:border-primary/50"
                aria-label="View source code"
              >
                <Github className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-5 sm:p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent group-hover:text-primary transition-colors duration-300 ease-out leading-tight">
            {project.title}
          </h3>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 pt-2">
          {techStack.slice(0, 4).map((tech: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-gray-300 text-xs sm:text-sm rounded-xl border border-white/10 hover:border-white/20 hover:text-white transition-all duration-300 ease-out font-medium"
            >
              {tech}
            </span>
          ))}
          {techStack.length > 4 && (
            <span className="px-3 py-1.5 bg-white/5 backdrop-blur-sm text-gray-300 text-xs sm:text-sm rounded-xl border border-white/10 font-medium">
              +{techStack.length - 4} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
