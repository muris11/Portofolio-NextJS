import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Project } from "../hooks/useAdminData";
import { validateUrl } from "../utils/validation";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  onSave: (_data: Partial<Project> | FormData) => Promise<boolean>;
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
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {}
  );

  // Focus management
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<Element | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previouslyFocusedElement.current = document.activeElement;

      // Focus the modal
      if (modalRef.current) {
        modalRef.current.focus();
      }

      // Prevent body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Restore focus to previously focused element
      if (previouslyFocusedElement.current instanceof HTMLElement) {
        previouslyFocusedElement.current.focus();
      }
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    // Focus trap
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab") {
        const modal = modalRef.current;
        if (!modal) return;

        const focusableElements = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

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
          : "An error occurred while saving the project"
      );
      console.error("Project save error:", error);
    }
  };

  // Validation functions
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "title":
        if (!value.trim()) return "Title is required";
        if (value.trim().length < 3)
          return "Title must be at least 3 characters";
        if (value.trim().length > 100)
          return "Title must be less than 100 characters";
        return "";
      case "description":
        if (!value.trim()) return "Description is required";
        if (value.trim().length < 10)
          return "Description must be at least 10 characters";
        if (value.trim().length > 1000)
          return "Description must be less than 1000 characters";
        return "";
      case "techStack":
        if (!value.trim()) return "At least one technology is required";
        return "";
      case "liveUrl":
      case "githubUrl":
        if (value && !validateUrl(value)) return "Please enter a valid URL";
        return "";
      default:
        return "";
    }
  };

  const handleFieldBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setValidationErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (touchedFields[name]) {
      const error = validateField(name, value);
      setValidationErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white border-4 border-black shadow-neo w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        <div
          className="p-6 border-b-4 border-black bg-purple-200"
          ref={modalRef}
          tabIndex={-1}
        >
          <h3
            id="modal-title"
            className="text-xl font-black text-black uppercase tracking-tight"
          >
            {project ? "Edit Project" : "Add New Project"}
          </h3>
        </div>

        <div className="p-6">
          {error && (
            <div
              className="mb-4 p-3 text-sm font-bold text-red-700 bg-red-100 border-2 border-red-500"
              role="alert"
              aria-live="polite"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-black uppercase">
                Project Title *
              </label>
              <input
                type="text"
                name="title"
                defaultValue={project?.title}
                required
                onBlur={handleFieldBlur}
                onChange={handleFieldChange}
                className="w-full px-4 py-3 bg-white border-4 border-black text-black font-bold focus:outline-none focus:shadow-neo transition-all placeholder:text-gray-400"
              />
              {validationErrors.title && (
                <p className="mt-1 text-xs font-bold text-red-600">
                  {validationErrors.title}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-black uppercase">
                Description *
              </label>
              <textarea
                name="description"
                defaultValue={project?.description}
                required
                rows={3}
                onBlur={handleFieldBlur}
                onChange={handleFieldChange}
                className="w-full px-4 py-3 bg-white border-4 border-black text-black font-bold focus:outline-none focus:shadow-neo transition-all placeholder:text-gray-400 min-h-[100px]"
              />
              {validationErrors.description && (
                <p className="mt-1 text-xs font-bold text-red-600">
                  {validationErrors.description}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-black uppercase">
                Technologies (comma separated) *
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
                onBlur={handleFieldBlur}
                onChange={handleFieldChange}
                className="w-full px-4 py-3 bg-white border-4 border-black text-black font-bold focus:outline-none focus:shadow-neo transition-all placeholder:text-gray-400"
              />
              {validationErrors.techStack && (
                <p className="mt-1 text-xs font-bold text-red-600">
                  {validationErrors.techStack}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-black uppercase">
                  Project Image
                </label>
                <div className="border-4 border-black p-4 bg-gray-50 space-y-4">
                  {/* Current Image Preview */}
                  {previewUrl && (
                    <div className="flex items-center space-x-4">
                      <Image
                        src={previewUrl}
                        alt="Project preview"
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover border-2 border-black"
                      />
                      <div>
                        <p className="text-sm font-bold text-black">
                          Current Image
                        </p>
                        {!selectedFile && (
                          <p className="text-xs font-medium text-gray-500">
                            Select new image to replace
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
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-2 file:border-black file:text-sm file:font-bold file:bg-white file:text-black hover:file:bg-gray-100"
                  />
                  <p className="text-xs font-medium text-gray-500">
                    Format: JPG, PNG, GIF. Max 5MB.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-black uppercase">
                  Live URL
                </label>
                <input
                  type="url"
                  name="liveUrl"
                  defaultValue={project?.liveUrl}
                  onBlur={handleFieldBlur}
                  onChange={handleFieldChange}
                  className="w-full px-4 py-3 bg-white border-4 border-black text-black font-bold focus:outline-none focus:shadow-neo transition-all placeholder:text-gray-400"
                />
                {validationErrors.liveUrl && (
                  <p className="mt-1 text-xs font-bold text-red-600">
                    {validationErrors.liveUrl}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-black uppercase">
                  GitHub URL
                </label>
                <input
                  type="url"
                  name="githubUrl"
                  defaultValue={project?.githubUrl}
                  onBlur={handleFieldBlur}
                  onChange={handleFieldChange}
                  className="w-full px-4 py-3 bg-white border-4 border-black text-black font-bold focus:outline-none focus:shadow-neo transition-all placeholder:text-gray-400"
                />
                {validationErrors.githubUrl && (
                  <p className="mt-1 text-xs font-bold text-red-600">
                    {validationErrors.githubUrl}
                  </p>
                )}
              </div>
            </div>

            {/* Featured Project Checkbox */}
            <div className="flex items-center space-x-3 p-4 border-4 border-black bg-yellow-100">
              <input
                type="checkbox"
                name="featured"
                id="featured"
                defaultChecked={project?.featured || false}
                className="h-5 w-5 text-black border-2 border-black rounded-none focus:ring-0"
              />
              <div>
                <label
                  htmlFor="featured"
                  className="text-sm font-black text-black uppercase block"
                >
                  Make Featured Project
                </label>
                <span className="text-xs font-medium text-gray-600">
                  (Will be displayed on the main page)
                </span>
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
                className="px-6 py-3 bg-green-400 border-2 border-black text-black font-black uppercase hover:bg-green-500 hover:shadow-neo transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Saving..." : project ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
