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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-200 dark:border-gray-700 hover:border-primary/50">
      {/* Project Image */}
      <div className="relative h-48 sm:h-56 lg:h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden">
        {project.imageUrl ? (
          isPlaceholder ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-800">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-gray-400 dark:text-gray-500 text-2xl font-bold">
                  {project.title.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-gray-400 dark:text-gray-500 text-sm">
                No Image
              </span>
            </div>
          </div>
        )}

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium shadow-lg">
            Featured
          </div>
        )}

        {/* Overlay with links */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex space-x-3 sm:space-x-4">
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-white p-3 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 shadow-lg hover:scale-110 touch-manipulation"
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
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-white p-3 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 shadow-lg hover:scale-110 touch-manipulation"
                aria-label="View source code"
              >
                <Github className="h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed text-sm sm:text-base">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {techStack.slice(0, 4).map((tech: string, index: number) => (
            <span
              key={index}
              className="px-2 py-1 sm:px-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs sm:text-sm rounded-full border border-gray-200 dark:border-gray-600 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
            >
              {tech}
            </span>
          ))}
          {techStack.length > 4 && (
            <span className="px-2 py-1 sm:px-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs sm:text-sm rounded-full border border-gray-200 dark:border-gray-600">
              +{techStack.length - 4}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
