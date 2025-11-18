import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/ImageUpload";
import { useEffect, useState } from "react";
import type { Education } from "../hooks/useAdminData";

interface EducationModalProps {
  isOpen: boolean;
  onClose: () => void;
  education: Education | null;
  onSave: (_data: Partial<Education>) => Promise<boolean>;
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {_education ? "Edit Pendidikan" : "Tambah Pendidikan"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Institusi
            </label>
            <Input
              type="text"
              value={formData.institution}
              onChange={(e) => handleChange("institution", e.target.value)}
              placeholder="Nama universitas/sekolah"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Gelar
            </label>
            <Input
              type="text"
              value={formData.degree}
              onChange={(e) => handleChange("degree", e.target.value)}
              placeholder="Sarjana Teknik Informatika"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tanggal Mulai
              </label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tanggal Selesai
              </label>
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) => handleChange("endDate", e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Deskripsi
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Deskripsi singkat tentang pendidikan ini..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              rows={3}
            />
          </div>

          <ImageUpload
            value={formData.logoUrl}
            onChange={(url) => handleChange("logoUrl", url)}
            label="Logo Institusi"
            placeholder="Upload logo universitas/sekolah"
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Menyimpan..." : _education ? "Update" : "Simpan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
