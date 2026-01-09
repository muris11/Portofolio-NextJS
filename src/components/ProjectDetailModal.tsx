"use client";

import { ExternalLink, Github, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  techStack: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

interface ProjectDetailModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDetailModal({
  project,
  isOpen,
  onClose,
}: ProjectDetailModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  let techStack: string[] = [];
  try {
    techStack = JSON.parse(project.techStack || "[]");
  } catch (error) {
    console.error("Error parsing techStack:", error);
    techStack = [];
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white border-4 border-black shadow-neo animate-in zoom-in-95 duration-200 flex flex-col lg:flex-row">
        {/* Close Button - Floating */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white border-2 border-black shadow-neo hover:bg-red-500 hover:text-white transition-all hover:rotate-90 duration-300"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Image Section */}
        <div className="lg:w-3/5 border-b-4 lg:border-b-0 lg:border-r-4 border-black bg-neo-canvas relative min-h-[300px] lg:min-h-[600px]">
          {project.imageUrl ? (
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-contain p-4"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-neo-secondary min-h-[300px]">
              <span className="text-9xl font-black opacity-20">
                {project.title.charAt(0)}
              </span>
            </div>
          )}
          {project.featured && (
            <div className="absolute top-6 left-6 bg-neo-secondary text-black px-4 py-2 border-2 border-black shadow-neo text-sm font-black uppercase tracking-widest z-10">
              ⭐ Featured
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col bg-white">
          <div className="mb-8">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
              {project.title}
            </h2>
            
            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white border-2 border-black text-black text-xs font-bold uppercase tracking-wide shadow-[2px_2px_0px_0px_#000]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3">
                About Project
              </h3>
              <div className="prose prose-lg max-w-none">
                <p className="text-black font-medium leading-relaxed whitespace-pre-wrap">
                  {project.description}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-auto pt-8 border-t-4 border-black">
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn bg-neo-accent text-center justify-center py-4 text-lg"
              >
                <ExternalLink className="h-6 w-6 mr-2" />
                View Live Project
              </Link>
            )}
            {project.githubUrl && (
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn bg-white text-center justify-center py-4 text-lg"
              >
                <Github className="h-6 w-6 mr-2" />
                View Source Code
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
