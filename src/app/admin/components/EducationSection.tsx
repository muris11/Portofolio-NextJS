import { AdminSectionSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import { GraduationCap, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { Education } from "../hooks/useAdminData";
import { EducationModal } from "./EducationModal";

interface EducationSectionProps {
  education: Education[];
  onSave: (_data: Partial<Education> | FormData) => Promise<boolean>;
  onDelete: (_id: string) => Promise<boolean>;
  isLoading?: boolean;
}

export function EducationSection({
  education,
  onSave,
  onDelete,
  isLoading = false,
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

  const handleSave = async (data: Partial<Education> | FormData) => {
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
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      {isLoading ? (
        <AdminSectionSkeleton />
      ) : (
        <>
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 p-6 bg-cyan-200 border-4 border-black shadow-neo">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center shadow-neo-sm">
                  <GraduationCap className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tight">
                    Manage Education
                  </h2>
                  <p className="text-gray-700 font-medium text-sm lg:text-base">
                    Manage your educational background and academic degrees
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm font-bold">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 border-2 border-black rounded-full animate-pulse"></div>
                  <span className="text-black uppercase">
                    {education.length} Education
                  </span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleAdd}
              className="neo-btn bg-white text-black flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              <span className="font-bold uppercase">Add Education</span>
            </Button>
          </div>

          {/* Education Grid/List */}
          {education.length === 0 ? (
            <div className="neo-card bg-white p-12 text-center border-4 border-black shadow-neo">
              <div className="relative">
                <div className="w-24 h-24 bg-cyan-200 border-4 border-black flex items-center justify-center mx-auto mb-6 shadow-neo transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <GraduationCap className="h-12 w-12 text-black" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 border-2 border-black flex items-center justify-center animate-bounce shadow-neo-sm">
                  <Plus className="h-4 w-4 text-black" />
                </div>
              </div>
              <h3 className="text-xl font-black uppercase mb-3">
                No education data yet
              </h3>
              <p className="text-gray-600 font-medium mb-8 max-w-md mx-auto">
                Start adding your educational background. Show your degrees and
                academic achievements!
              </p>
              <Button
                onClick={handleAdd}
                className="neo-btn bg-cyan-400 text-black flex items-center gap-2 mx-auto"
              >
                <Plus className="h-5 w-5" />
                <span className="font-bold uppercase">Add First Education</span>
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
                          Institution
                        </th>
                        <th className="px-6 py-5 text-left text-xs font-black text-black uppercase tracking-wider border-r-2 border-black">
                          Degree
                        </th>
                        <th className="px-6 py-5 text-left text-xs font-black text-black uppercase tracking-wider border-r-2 border-black">
                          Period
                        </th>
                        <th className="px-6 py-5 text-left text-xs font-black text-black uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-black">
                      {education.map((edu) => (
                        <tr
                          key={edu.id}
                          className="hover:bg-cyan-50 transition-colors duration-200"
                        >
                          <td className="px-6 py-5 border-r-2 border-black">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center shadow-neo-sm overflow-hidden">
                                {edu.logoUrl ? (
                                  <Image
                                    src={edu.logoUrl}
                                    alt={`${edu.institution} logo`}
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-cover"
                                    unoptimized={
                                      edu.logoUrl?.includes("vercel-storage.com") ||
                                      edu.logoUrl?.includes("blob.vercel")
                                    }
                                  />
                                ) : (
                                  <GraduationCap className="h-6 w-6 text-black" />
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-sm font-black text-black uppercase">
                                  {edu.institution}
                                </div>
                                {edu.description && (
                                  <div className="text-sm text-gray-600 font-medium line-clamp-2">
                                    {edu.description.length > 80
                                      ? `${edu.description.substring(0, 80)}...`
                                      : edu.description}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5 border-r-2 border-black">
                            <span className="inline-flex items-center px-2 py-1 border-2 border-black text-xs font-bold bg-cyan-200 text-black shadow-neo-sm uppercase">
                              {edu.degree}
                            </span>
                          </td>
                          <td className="px-6 py-5 border-r-2 border-black">
                            <div className="text-sm font-bold text-black">
                              {edu.startDate} - {edu.endDate}
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => handleEdit(edu)}
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
                                onClick={() => handleDelete(edu.id)}
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
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className="neo-card bg-white p-6 border-4 border-black shadow-neo"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center shadow-neo-sm overflow-hidden">
                          {edu.logoUrl ? (
                            <Image
                              src={edu.logoUrl}
                              alt={`${edu.institution} logo`}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                              unoptimized={
                                edu.logoUrl?.includes("vercel-storage.com") ||
                                edu.logoUrl?.includes("blob.vercel")
                              }
                            />
                          ) : (
                            <GraduationCap className="h-6 w-6 text-black" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-black text-black text-lg uppercase">
                            {edu.institution}
                          </h3>
                          <span className="inline-flex items-center px-2 py-1 border-2 border-black text-xs font-bold bg-cyan-200 text-black shadow-neo-sm mt-1 uppercase">
                            {edu.degree}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(edu)}
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
                          onClick={() => handleDelete(edu.id)}
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

                    <div className="space-y-3 mt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 font-bold uppercase">
                          Period
                        </span>
                        <span className="font-bold text-black">
                          {edu.startDate} - {edu.endDate}
                        </span>
                      </div>
                      {edu.description && (
                        <p className="text-gray-600 text-sm font-medium line-clamp-3">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
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
