import { useState } from "react";
import type { Project } from "../hooks/useAdminData";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  onSave: (data: Partial<Project> | FormData) => Promise<boolean>;
}

export function ProjectModal({
  isOpen,
  onClose,
  project,
  onSave,
}: ProjectModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    project?.imageUrl || null
  );
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);

      // If a new file is selected, add it to formData
      if (selectedFile) {
        formData.set("imageFile", selectedFile);
        formData.delete("imageUrl"); // Remove the URL field since we're using file upload
      }

      const data = {
        id: project?.id,
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        imageUrl: selectedFile
          ? undefined
          : (formData.get("imageUrl") as string), // Will be handled by file upload
        techStack: JSON.stringify(
          (formData.get("techStack") as string)
            .split(",")
            .map((tech) => tech.trim())
            .filter((tech) => tech.length > 0)
        ),
        liveUrl: formData.get("liveUrl") as string,
        githubUrl: formData.get("githubUrl") as string,
        featured: formData.get("featured") === "on",
      };

      // If we have a file, we need to handle it differently
      if (selectedFile) {
        const uploadFormData = new FormData();
        uploadFormData.append("imageFile", selectedFile);
        uploadFormData.append("title", data.title);
        uploadFormData.append("description", data.description);
        uploadFormData.append("techStack", data.techStack);
        uploadFormData.append("liveUrl", data.liveUrl || "");
        uploadFormData.append("githubUrl", data.githubUrl || "");
        uploadFormData.append("featured", data.featured.toString());

        if (project?.id) {
          uploadFormData.append("id", project.id);
        }

        const success = await onSave(uploadFormData);
        setIsLoading(false);

        if (success) {
          onClose();
        }
        return;
      } else {
        const success = await onSave(data);
        setIsLoading(false);

        if (success) {
          onClose();
        }
      }
    } catch (error) {
      setIsLoading(false);
      setError(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat menyimpan proyek"
      );
      console.error("Project save error:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3
            id="modal-title"
            className="text-lg font-semibold text-gray-900 dark:text-white mb-4"
          >
            {project ? "Edit Proyek" : "Tambah Proyek Baru"}
          </h3>

          {error && (
            <div
              className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-md"
              role="alert"
              aria-live="polite"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Judul Proyek *
              </label>
              <input
                type="text"
                name="title"
                defaultValue={project?.title}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Deskripsi *
              </label>
              <textarea
                name="description"
                defaultValue={project?.description}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Teknologi (pisahkan dengan koma) *
              </label>
              <input
                type="text"
                name="techStack"
                defaultValue={
                  project
                    ? (() => {
                        try {
                          return JSON.parse(project.techStack).join(", ");
                        } catch {
                          return project.techStack;
                        }
                      })()
                    : ""
                }
                required
                placeholder="React, Next.js, TypeScript"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Gambar Proyek
                </label>
                <div className="space-y-4">
                  {/* Current Image Preview */}
                  {previewUrl && (
                    <div className="flex items-center space-x-4">
                      <img
                        src={previewUrl}
                        alt="Project preview"
                        className="w-20 h-20 rounded-lg object-cover border-2 border-gray-200 dark:border-gray-600"
                      />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Gambar saat ini
                        </p>
                        {!selectedFile && (
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            Pilih gambar baru untuk mengganti
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* File Input */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Format: JPG, PNG, GIF. Maksimal 5MB.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Live URL
                </label>
                <input
                  type="url"
                  name="liveUrl"
                  defaultValue={project?.liveUrl}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  GitHub URL
                </label>
                <input
                  type="url"
                  name="githubUrl"
                  defaultValue={project?.githubUrl}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Featured Project Checkbox */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="featured"
                id="featured"
                defaultChecked={project?.featured || false}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600 rounded"
              />
              <label
                htmlFor="featured"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Jadikan Featured Project
              </label>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                (Akan ditampilkan di halaman utama)
              </span>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 disabled:opacity-50"
              >
                {isLoading ? "Menyimpan..." : project ? "Update" : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
