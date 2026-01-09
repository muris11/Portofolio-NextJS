import { ImageUpload } from "@/components/ImageUpload";
import { useEffect, useState } from "react";
import type { Education } from "../hooks/useAdminData";

interface EducationModalProps {
  isOpen: boolean;
  onClose: () => void;
  education: Education | null;
  onSave: (_data: Partial<Education> | FormData) => Promise<boolean>;
}

export function EducationModal({
  isOpen,
  onClose,
  education: _education,
  onSave,
}: EducationModalProps) {
  const [formData, setFormData] = useState({
    institution: "",
    degree: "",
    startDate: "",
    endDate: "",
    description: "",
    logoUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (_education) {
      setFormData({
        institution: _education.institution,
        degree: _education.degree,
        startDate: _education.startDate,
        endDate: _education.endDate,
        description: _education.description || "",
        logoUrl: _education.logoUrl || "",
      });
    } else {
      setFormData({
        institution: "",
        degree: "",
        startDate: "",
        endDate: "",
        description: "",
        logoUrl: "",
      });
    }
  }, [_education, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      ...formData,
      ...(_education && { id: _education.id }),
    };

    const success = await onSave(data);
    setIsLoading(false);

    if (success) {
      onClose();
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white border-4 border-black shadow-neo w-full max-w-md max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b-4 border-black bg-cyan-200">
          <h3 className="text-xl font-black text-black uppercase tracking-tight">
            {_education ? "Edit Education" : "Add Education"}
          </h3>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-black uppercase">
                Institution *
              </label>
              <input
                type="text"
                value={formData.institution}
                onChange={(e) => handleChange("institution", e.target.value)}
                placeholder="University/School Name"
                required
                className="w-full px-4 py-3 bg-white border-4 border-black text-black font-bold focus:outline-none focus:shadow-neo transition-all placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-black uppercase">
                Degree *
              </label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => handleChange("degree", e.target.value)}
                placeholder="e.g. Bachelor of Computer Science"
                required
                className="w-full px-4 py-3 bg-white border-4 border-black text-black font-bold focus:outline-none focus:shadow-neo transition-all placeholder:text-gray-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-black uppercase">
                  Start Date *
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white border-4 border-black text-black font-bold focus:outline-none focus:shadow-neo transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-black uppercase">
                  End Date *
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white border-4 border-black text-black font-bold focus:outline-none focus:shadow-neo transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-black uppercase">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Brief description about this education..."
                className="w-full px-4 py-3 bg-white border-4 border-black text-black font-bold focus:outline-none focus:shadow-neo transition-all placeholder:text-gray-400 min-h-[100px]"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-black uppercase">
                Institution Logo
              </label>
              <div className="border-4 border-black p-2 bg-gray-50">
                <ImageUpload
                  value={formData.logoUrl}
                  onChange={(url) => handleChange("logoUrl", url)}
                  label="Upload Logo"
                  placeholder="Click to upload logo"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t-4 border-black">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
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
                  <>{_education ? "Update Education" : "Save Education"}</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
