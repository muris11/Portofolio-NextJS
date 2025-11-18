import { Button } from "@/components/ui/button";
import { GraduationCap, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { Education } from "../hooks/useAdminData";
import { EducationModal } from "./EducationModal";

interface EducationSectionProps {
  education: Education[];
  onSave: (_data: Partial<Education>) => Promise<boolean>;
  onDelete: (_id: string) => Promise<boolean>;
}

export function EducationSection({
  education,
  onSave,
  onDelete,
}: EducationSectionProps) {
  const [showModal, setShowModal] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(
    null
  );

  const handleAdd = () => {
    setEditingEducation(null);
    setShowModal(true);
  };

  const handleEdit = (edu: Education) => {
    setEditingEducation(edu);
    setShowModal(true);
  };

  const handleSave = async (data: Partial<Education>) => {
    const success = await onSave(data);
    if (success) {
      setShowModal(false);
      setEditingEducation(null);
    }
    return success;
  };

  const handleDelete = async (id: string) => {
    return await onDelete(id);
  };

  return (
    <div className="space-y-4 animate-in fade-in-50 duration-500">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 p-6 bg-gradient-to-br from-cyan-50 via-white to-teal-50 dark:from-cyan-950/20 dark:via-gray-900 dark:to-teal-950/20 rounded-2xl border border-cyan-100/50 dark:border-cyan-900/20">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                Manage Education
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base">
                Manage your educational background and academic degrees
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600 dark:text-gray-400">
                {education.length} Education
              </span>
            </div>
          </div>
        </div>

        <Button
          onClick={handleAdd}
          className="group relative overflow-hidden bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <Plus className="h-5 w-5 mr-2 relative z-10" />
          <span className="relative z-10 font-medium">Add Education</span>
        </Button>
      </div>

      {/* Education Grid/List */}
      {education.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-12 text-center">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-cyan-100 to-teal-100 dark:from-cyan-900/30 dark:to-teal-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <GraduationCap className="h-12 w-12 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              <Plus className="h-4 w-4 text-yellow-800" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            No education data yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Start adding your educational background. Show your degrees and
            academic achievements!
          </p>
          <Button
            onClick={handleAdd}
            className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="h-5 w-5 mr-2" />
            <span className="font-medium">Add First Education</span>
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
                      Institution
                    </th>
                    <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Degree
                    </th>
                    <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Period
                    </th>
                    <th className="px-6 py-5 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {education.map((edu, index) => (
                    <tr
                      key={edu.id}
                      className="hover:bg-cyan-50/50 dark:hover:bg-cyan-900/10 transition-all duration-200 group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                            {edu.logoUrl ? (
                              <Image
                                src={edu.logoUrl}
                                alt={`${edu.institution} logo`}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover rounded-xl"
                                unoptimized={
                                  edu.logoUrl?.includes("vercel-storage.com") ||
                                  edu.logoUrl?.includes("blob.vercel")
                                }
                              />
                            ) : (
                              <GraduationCap className="h-6 w-6 text-white" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-bold text-gray-900 dark:text-white truncate group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                              {edu.institution}
                            </div>
                            {edu.description && (
                              <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                {edu.description.length > 80
                                  ? `${edu.description.substring(0, 80)}...`
                                  : edu.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {edu.degree}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {edu.startDate} - {edu.endDate}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleEdit(edu)}
                            className="p-2 text-cyan-600 hover:text-cyan-800 dark:text-cyan-400 dark:hover:text-cyan-300 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-all duration-200 group-hover:scale-110"
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
                            onClick={() => handleDelete(edu.id)}
                            className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 group-hover:scale-110"
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {education.map((edu, index) => (
              <div
                key={edu.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                      {edu.logoUrl ? (
                        <Image
                          src={edu.logoUrl}
                          alt={`${edu.institution} logo`}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover rounded-xl"
                          unoptimized={
                            edu.logoUrl?.includes("vercel-storage.com") ||
                            edu.logoUrl?.includes("blob.vercel")
                          }
                        />
                      ) : (
                        <GraduationCap className="h-6 w-6 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                        {edu.institution}
                      </h3>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300">
                        {edu.degree}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(edu)}
                      className="p-2 text-cyan-600 hover:text-cyan-800 dark:text-cyan-400 dark:hover:text-cyan-300 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-all duration-200"
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
                      onClick={() => handleDelete(edu.id)}
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

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Period
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  {edu.description && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                      {edu.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <EducationModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingEducation(null);
        }}
        education={editingEducation}
        onSave={handleSave}
      />
    </div>
  );
}
