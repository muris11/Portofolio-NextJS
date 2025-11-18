import { Upload, X } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";

interface ImageUploadProps {
  value?: string;
  onChange: (_url: string) => void;
  label?: string;
  placeholder?: string;
}

export function ImageUpload({
  value,
  onChange,
  label = "Logo",
  placeholder = "Upload logo",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update preview when value prop changes
  React.useEffect(() => {
    setPreview(value || null);
  }, [value]);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    await processFile(file);

    // Clear file input
    event.target.value = "";
  };

  const processFile = async (file: File) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Hanya file gambar yang diperbolehkan");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file maksimal 5MB");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Add timeout for fetch request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          error: "Upload failed",
        }));
        throw new Error(errorData.error || "Upload failed");
      }

      const data = await response.json();
      setPreview(data.url);
      onChange(data.url);
    } catch (error) {
      console.error("Upload error:", error);
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          alert("Upload timeout. File terlalu besar atau koneksi lambat.");
        } else {
          alert(`Gagal upload gambar: ${error.message}`);
        }
      } else {
        alert("Gagal upload gambar. Silakan coba lagi.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isUploading) return;

    // Delay to prevent browser blocking
    setTimeout(() => {
      if (fileInputRef.current) {
        try {
          fileInputRef.current.click();
        } catch (error) {
          console.error("Error opening file picker:", error);
          alert("Gagal membuka file picker. Silakan gunakan drag & drop.");
        }
      }
    }, 0);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (isUploading) return;

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      await processFile(files[0]);
    }
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setPreview(null);
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}

      {/* Drag & Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-4 transition-all
          ${
            isDragging
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
              : "border-gray-600 hover:border-gray-500"
          }
          ${isUploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        <div className="flex items-center space-x-4">
          {/* Preview */}
          {preview && (
            <div className="relative flex-shrink-0">
              <Image
                src={preview}
                alt="Logo preview"
                width={64}
                height={64}
                className="w-16 h-16 object-contain rounded-lg border border-gray-600"
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 text-xs"
                title="Remove logo"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Upload Button */}
          <div className="flex-1">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleFileSelect}
              className="hidden"
              disabled={isUploading}
              aria-label="Upload image file"
            />
            <button
              type="button"
              onClick={handleButtonClick}
              disabled={isUploading}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              aria-label={placeholder}
            >
              <Upload className="w-4 h-4" />
              <span>{isUploading ? "Uploading..." : placeholder}</span>
            </button>
            {/* Hint for better UX */}
            <p className="text-xs text-gray-600 dark:text-gray-500 mt-1 text-center">
              💡 Tip: Drag & drop lebih cepat!
            </p>
          </div>
        </div>

        {/* Helper text */}
        <p className="text-xs text-gray-500 mt-2 text-center">
          {isDragging ? (
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              Drop gambar di sini
            </span>
          ) : (
            <span>
              Drag & drop atau klik untuk upload. Max 5MB (JPG, PNG, GIF, WebP)
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
