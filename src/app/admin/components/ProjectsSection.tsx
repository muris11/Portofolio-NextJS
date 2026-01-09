import { AdminSectionSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import { Code, Plus } from "lucide-react";
import { useState } from "react";
import type { Project } from "../hooks/useAdminData";
import { ProjectModal } from "./ProjectModal";

interface ProjectsSectionProps {
  projects: Project[];
  onSave: (_data: Partial<Project> | FormData) => Promise<boolean>;
  onDelete: (_id: string) => Promise<boolean>;
  isLoading?: boolean;
}

export function ProjectsSection({
  projects,
  onSave,
  onDelete,
  isLoading = false,
}: ProjectsSectionProps) {
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleAdd = () => {
    setEditingProject(null);
    setShowModal(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setShowModal(true);
  };

  const handleSave = async (data: Partial<Project> | FormData) => {
    const success = await onSave(data);
    if (success) {
      setShowModal(false);
      setEditingProject(null);
    }
    return success;
  };

  const handleDelete = async (id: string) => {
    return await onDelete(id);
  };

  // Helper function to parse and render tech stack
  const renderTechStack = (techStack: string) => {
    try {
      const techs = JSON.parse(techStack);
      if (!Array.isArray(techs)) {
        return (
          <span className="text-xs font-bold text-gray-600">{techStack}</span>
        );
      }

      const displayedTechs = techs.slice(0, 3);
      const remainingCount = techs.length - 3;

      return (
        <>
          {displayedTechs.map((tech: string, index: number) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 border-2 border-black text-xs font-bold bg-blue-200 text-black shadow-neo-sm"
            >
              {tech}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="text-xs font-bold text-gray-600 ml-1">
              +{remainingCount} more
            </span>
          )}
        </>
      );
    } catch {
      // If JSON parsing fails, display as plain text
      return (
        <span className="text-xs font-bold text-gray-600">{techStack}</span>
      );
    }
  };

  // Helper function to truncate description safely
  const truncateDescription = (
    description?: string,
    maxLength: number = 50
  ) => {
    if (!description) return "";
    return description.length > maxLength
      ? `${description.substring(0, maxLength)}...`
      : description;
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      {isLoading ? (
        <AdminSectionSkeleton />
      ) : (
        <>
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 p-6 bg-blue-200 border-4 border-black shadow-neo">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center shadow-neo-sm">
                  <Code className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tight">
                    Manage Projects
                  </h2>
                  <p className="text-gray-700 font-medium text-sm lg:text-base">
                    Add, edit, and delete your Rifqy.Dev projects
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm font-bold">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 border-2 border-black rounded-full animate-pulse"></div>
                  <span className="text-black uppercase">
                    {projects.length} Projects
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 border-2 border-black rounded-full"></div>
                  <span className="text-black uppercase">
                    {projects.filter((p) => p.featured).length} Featured
                  </span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleAdd}
              className="neo-btn bg-white text-black flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              <span className="font-bold uppercase">Add Project</span>
            </Button>
          </div>

          {/* Projects Grid/List */}
          {projects.length === 0 ? (
            <div className="neo-card bg-white p-12 text-center border-4 border-black shadow-neo">
              <div className="relative">
                <div className="w-24 h-24 bg-blue-200 border-4 border-black flex items-center justify-center mx-auto mb-6 shadow-neo transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <Code className="h-12 w-12 text-black" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 border-2 border-black flex items-center justify-center animate-bounce shadow-neo-sm">
                  <Plus className="h-4 w-4 text-black" />
                </div>
              </div>
              <h3 className="text-xl font-black uppercase mb-3">
                No projects yet
              </h3>
              <p className="text-gray-600 font-medium mb-8 max-w-md mx-auto">
                Start building your Rifqy.Dev by adding your first project.
                Showcase your best work!
              </p>
              <Button
                onClick={handleAdd}
                className="neo-btn bg-blue-400 text-black flex items-center gap-2 mx-auto"
              >
                <Plus className="h-5 w-5" />
                <span className="font-bold uppercase">Add First Project</span>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Desktop Table View */}
              <div className="hidden lg:block bg-white border-4 border-black shadow-neo overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 border-b-4 border-black">
                      <tr>
                        <th className="px-6 py-5 text-left text-xs font-black text-black uppercase tracking-wider border-r-2 border-black">
                          Project
                        </th>
                        <th className="px-6 py-5 text-left text-xs font-black text-black uppercase tracking-wider border-r-2 border-black">
                          Technologies
                        </th>
                        <th className="px-6 py-5 text-left text-xs font-black text-black uppercase tracking-wider border-r-2 border-black">
                          Status
                        </th>
                        <th className="px-6 py-5 text-left text-xs font-black text-black uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-black">
                      {projects.map((project) => (
                        <tr
                          key={project.id}
                          className="hover:bg-blue-50 transition-colors duration-200"
                        >
                          <td className="px-6 py-5 border-r-2 border-black">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-blue-200 border-2 border-black flex items-center justify-center shadow-neo-sm">
                                <Code className="h-6 w-6 text-black" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-sm font-black text-black uppercase truncate">
                                  {project.title}
                                </div>
                                <div className="text-sm text-gray-600 font-medium line-clamp-2">
                                  {truncateDescription(project.description)}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5 border-r-2 border-black">
                            <div className="flex flex-wrap gap-2">
                              {renderTechStack(project.techStack)}
                            </div>
                          </td>
                          <td className="px-6 py-5 border-r-2 border-black">
                            <span
                              className={`inline-flex items-center px-3 py-1 border-2 border-black text-xs font-bold uppercase shadow-neo-sm ${
                                project.featured
                                  ? "bg-green-200 text-black"
                                  : "bg-gray-200 text-black"
                              }`}
                            >
                              <div
                                className={`w-2 h-2 border border-black mr-2 ${
                                  project.featured
                                    ? "bg-green-500"
                                    : "bg-gray-400"
                                }`}
                              ></div>
                              {project.featured ? "Featured" : "Regular"}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => handleEdit(project)}
                                className="p-2 bg-blue-200 border-2 border-black text-black hover:bg-blue-300 shadow-neo-sm hover:shadow-neo transition-all"
                                title="Edit"
                              >
                                <svg
                                  className="h-5 w-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDelete(project.id)}
                                className="p-2 bg-red-200 border-2 border-black text-black hover:bg-red-300 shadow-neo-sm hover:shadow-neo transition-all"
                                title="Delete"
                              >
                                <svg
                                  className="h-5 w-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="neo-card bg-white p-6 border-4 border-black shadow-neo"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-200 border-2 border-black flex items-center justify-center shadow-neo-sm">
                          <Code className="h-6 w-6 text-black" />
                        </div>
                        <div>
                          <h3 className="font-black text-black text-lg uppercase">
                            {project.title}
                          </h3>
                          <span
                            className={`inline-flex items-center px-2 py-1 border-2 border-black text-xs font-bold uppercase shadow-neo-sm mt-1 ${
                              project.featured
                                ? "bg-green-200 text-black"
                                : "bg-gray-200 text-black"
                            }`}
                          >
                            {project.featured ? "Featured" : "Regular"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(project)}
                          className="p-2 bg-blue-200 border-2 border-black text-black hover:bg-blue-300 shadow-neo-sm transition-all"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="p-2 bg-red-200 border-2 border-black text-black hover:bg-red-300 shadow-neo-sm transition-all"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {renderTechStack(project.techStack)}
                    </div>
                    <div className="text-sm text-gray-600 font-medium line-clamp-2">
                      {truncateDescription(project.description)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
      {showModal && (
        <ProjectModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          project={editingProject}
        />
      )}
    </div>
  );
}
