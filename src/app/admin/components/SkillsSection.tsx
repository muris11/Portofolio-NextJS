import { AdminSectionSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";
import { useState } from "react";
import type { Skill } from "../hooks/useAdminData";
import { SkillModal } from "./SkillModal";

interface SkillsSectionProps {
  skills: Skill[];
  onSave: (_data: Partial<Skill> | FormData) => Promise<boolean>;
  onDelete: (_id: string) => Promise<boolean>;
  isLoading?: boolean;
}

export function SkillsSection({
  skills,
  onSave,
  onDelete,
  isLoading = false,
}: SkillsSectionProps) {
  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const handleAdd = () => {
    setEditingSkill(null);
    setShowModal(true);
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setShowModal(true);
  };

  const handleSave = async (data: Partial<Skill> | FormData) => {
    const success = await onSave(data);
    if (success) {
      setShowModal(false);
      setEditingSkill(null);
    }
    return success;
  };

  const handleDelete = async (id: string) => {
    return await onDelete(id);
  };

  // Helper to get color based on level
  const getProficiencyColor = (level: number) => {
    if (level >= 90) return "bg-green-400";
    if (level >= 75) return "bg-blue-400";
    if (level >= 50) return "bg-yellow-400";
    return "bg-gray-400";
  };

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      {isLoading ? (
        <AdminSectionSkeleton />
      ) : (
        <>
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 p-6 bg-green-200 border-4 border-black shadow-neo">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center shadow-neo-sm">
                  <Users className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tight">
                    Manage Skills
                  </h2>
                  <p className="text-gray-700 font-medium text-sm lg:text-base">
                    Add and update your technical skills and level
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm font-bold">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 border-2 border-black rounded-full animate-pulse"></div>
                  <span className="text-black uppercase">
                    {skills.length} Skills
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 border-2 border-black rounded-full"></div>
                  <span className="text-black uppercase">
                    {skills.filter((s) => (s.level || 0) >= 90).length} Expert
                  </span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleAdd}
              className="neo-btn bg-white text-black flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              <span className="font-bold uppercase">Add Skill</span>
            </Button>
          </div>

          {/* Skills Grid/List */}
          {skills.length === 0 ? (
            <div className="neo-card bg-white p-12 text-center border-4 border-black shadow-neo">
              <div className="relative">
                <div className="w-24 h-24 bg-green-200 border-4 border-black flex items-center justify-center mx-auto mb-6 shadow-neo transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <Users className="h-12 w-12 text-black" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 border-2 border-black flex items-center justify-center animate-bounce shadow-neo-sm">
                  <Plus className="h-4 w-4 text-black" />
                </div>
              </div>
              <h3 className="text-xl font-black uppercase mb-3">
                No skills yet
              </h3>
              <p className="text-gray-600 font-medium mb-8 max-w-md mx-auto">
                Start building your profile by adding your technical skills.
              </p>
              <Button
                onClick={handleAdd}
                className="neo-btn bg-green-400 text-black flex items-center gap-2 mx-auto"
              >
                <Plus className="h-5 w-5" />
                <span className="font-bold uppercase">Add First Skill</span>
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
                          Skill Name
                        </th>
                        <th className="px-6 py-5 text-left text-xs font-black text-black uppercase tracking-wider border-r-2 border-black">
                          Category
                        </th>
                        <th className="px-6 py-5 text-left text-xs font-black text-black uppercase tracking-wider border-r-2 border-black">
                          Proficiency
                        </th>
                        <th className="px-6 py-5 text-left text-xs font-black text-black uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-black">
                      {skills.map((skill) => (
                        <tr
                          key={skill.id}
                          className="hover:bg-green-50 transition-colors duration-200"
                        >
                          <td className="px-6 py-5 border-r-2 border-black">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-green-200 border-2 border-black flex items-center justify-center shadow-neo-sm">
                                <span className="font-black text-lg">
                                  {skill.name.charAt(0)}
                                </span>
                              </div>
                              <div className="text-sm font-black text-black uppercase">
                                {skill.name}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5 border-r-2 border-black">
                            <span className="inline-flex items-center px-2 py-1 border-2 border-black text-xs font-bold bg-blue-200 text-black shadow-neo-sm uppercase">
                              {skill.category}
                            </span>
                          </td>
                          <td className="px-6 py-5 border-r-2 border-black">
                            <div className="w-full max-w-xs">
                              <div className="flex justify-between mb-1">
                                <span className="text-xs font-bold text-black">
                                  {skill.level}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 h-4 border-2 border-black">
                                <div
                                  className={`h-full ${getProficiencyColor(
                                    (skill.level || 0)
                                  )} border-r-2 border-black transition-all duration-500`}
                                  style={{ width: `${skill.level}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => handleEdit(skill)}
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
                                onClick={() => handleDelete(skill.id)}
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
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="neo-card bg-white p-6 border-4 border-black shadow-neo"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-green-200 border-2 border-black flex items-center justify-center shadow-neo-sm">
                          <span className="font-black text-xl">
                            {skill.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-black text-black text-lg uppercase">
                            {skill.name}
                          </h3>
                          <span className="inline-flex items-center px-2 py-1 border-2 border-black text-xs font-bold bg-blue-200 text-black shadow-neo-sm mt-1 uppercase">
                            {skill.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(skill)}
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
                          onClick={() => handleDelete(skill.id)}
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
                    <div className="mt-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-bold text-black uppercase">
                          Proficiency
                        </span>
                        <span className="text-xs font-bold text-black">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 h-4 border-2 border-black">
                        <div
                          className={`h-full ${getProficiencyColor(
                            (skill.level || 0)
                          )} border-r-2 border-black`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
      {showModal && (
        <SkillModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          skill={editingSkill}
        />
      )}
    </div>
  );
}
