import { useState } from "react";
import type { Skill } from "../hooks/useAdminData";

interface SkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  skill: Skill | null;
  onSave: (_data: Partial<Skill> | FormData) => Promise<boolean>;
}

export function SkillModal({
  isOpen,
  onClose,
  skill,
  onSave,
}: SkillModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [level, setLevel] = useState(skill?.level || 50);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      id: skill?.id,
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      icon: formData.get("icon") as string,
      level: parseInt(formData.get("level") as string) || 0,
    };

    const success = await onSave(data);
    setIsLoading(false);

    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white border-4 border-black shadow-neo w-full max-w-md animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b-4 border-black bg-yellow-300">
          <h3 className="text-xl font-black text-black uppercase tracking-tight">
            {skill ? "Edit Skill" : "Add New Skill"}
          </h3>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-black uppercase">
                Skill Name *
              </label>
              <input
                type="text"
                name="name"
                defaultValue={skill?.name}
                required
                className="w-full px-4 py-3 bg-white border-4 border-black text-black font-bold focus:outline-none focus:shadow-neo transition-all placeholder:text-gray-400"
                placeholder="e.g. React, Node.js"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-black uppercase">
                Category *
              </label>
              <div className="relative">
                <select
                  name="category"
                  defaultValue={skill?.category}
                  required
                  className="w-full px-4 py-3 bg-white border-4 border-black text-black font-bold focus:outline-none focus:shadow-neo transition-all appearance-none"
                >
                  <option value="">Select Category</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="Tools">Tools</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Other">Other</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none border-l-4 border-black bg-gray-100">
                  <svg
                    className="w-4 h-4 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-black uppercase">
                Icon (React Icons Name)
              </label>
              <input
                type="text"
                name="icon"
                defaultValue={skill?.icon}
                placeholder="e.g. SiReact, SiNodedotjs"
                className="w-full px-4 py-3 bg-white border-4 border-black text-black font-bold focus:outline-none focus:shadow-neo transition-all placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-bold text-black uppercase">
                  Proficiency Level *
                </label>
                <span className="px-2 py-1 bg-black text-white text-xs font-bold">
                  {level}%
                </span>
              </div>
              <input
                type="range"
                name="level"
                min="0"
                max="100"
                value={level}
                onChange={(e) => setLevel(parseInt(e.target.value))}
                className="w-full h-4 bg-gray-200 border-2 border-black rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-neo-sm"
              />
              <div className="flex justify-between text-xs font-bold text-gray-500 uppercase">
                <span>Beginner (0)</span>
                <span>Intermediate (50)</span>
                <span>Expert (100)</span>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t-4 border-black">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-white border-2 border-black text-black font-black uppercase hover:bg-gray-100 hover:shadow-neo transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-green-400 border-2 border-black text-black font-black uppercase hover:bg-green-500 hover:shadow-neo transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>{skill ? "Update Skill" : "Save Skill"}</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
