import { AdminSectionSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import { Code, Plus } from "lucide-react";
import { useState } from "react";
import type { Project } from "../hooks/useAdminData";
import { ProjectModal } from "./ProjectModal";

interface ProjectsSectionProps {
  projects: Project[];
  onSave: (data: Partial<Project> | FormData) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
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
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {techStack}
          </span>
        );
      }

      const displayedTechs = techs.slice(0, 3);
      const remainingCount = techs.length - 3;

      return (
        <>
          {displayedTechs.map((tech: string, index: number) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              {tech}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
              +{remainingCount} more
            </span>
          )}
        </>
      );
    } catch (error) {
      // If JSON parsing fails, display as plain text
      return (
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {techStack}
        </span>
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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/20 dark:via-gray-900 dark:to-purple-950/20 rounded-2xl border border-blue-100/50 dark:border-blue-900/20">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Code className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Manage Projects
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base">
                    Add, edit, and delete your portfolio projects
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-600 dark:text-gray-400">
                    {projects.length} Projects
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">
                    {projects.filter((p) => p.featured).length} Featured
                  </span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleAdd}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <Plus className="h-5 w-5 mr-2 relative z-10" />
              <span className="relative z-10 font-medium">Add Project</span>
            </Button>
          </div>

          {/* Projects Grid/List */}
          {projects.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-12 text-center">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <Code className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                  <Plus className="h-4 w-4 text-yellow-800" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                No projects yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                Start building your portfolio by adding your first project.
                Showcase your best work!
              </p>
              <Button
                onClick={handleAdd}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Plus className="h-5 w-5 mr-2" />
                <span className="font-medium">Add First Project</span>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Desktop Table View */}
              <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                      <tr>
                        <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          Project
                        </th>
                        <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          Teknologi
                        </th>
                        <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {projects.map((project, index) => (
                        <tr
                          key={project.id}
                          className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all duration-200 group"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <td className="px-6 py-5">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <Code className="h-6 w-6 text-white" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-sm font-bold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                  {project.title}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                  {truncateDescription(project.description)}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex flex-wrap gap-2">
                              {renderTechStack(project.techStack)}
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                project.featured
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 shadow-lg shadow-green-500/20"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
                              }`}
                            >
                              <div
                                className={`w-2 h-2 rounded-full mr-2 ${
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
                                className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 transform hover:scale-110"
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
                                className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 transform hover:scale-110"
                                title="Hapus"
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
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Code className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                            {project.title}
                          </h3>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              project.featured
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
                            }`}
                          >
                            {project.featured ? "Featured" : "Regular"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(project)}
                          className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
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
                          className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
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
                    <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
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
