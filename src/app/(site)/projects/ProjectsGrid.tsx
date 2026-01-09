"use client";

import ProjectCard from "@/components/ProjectCard";
import ProjectDetailModal from "@/components/ProjectDetailModal";
import { useState } from "react";

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

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 200); // Clear after animation
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8">
        {projects.map((project) => (
          <div key={project.id} className="h-full">
            <ProjectCard
              project={project}
              onClick={() => handleProjectClick(project)}
            />
          </div>
        ))}
      </div>

      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
