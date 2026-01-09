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
        <label className="block text-sm font-bold uppercase text-black">
          {label}
        </label>
      )}

      {/* Drag & Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-4 border-dashed p-6 transition-all bg-white
          ${
            isDragging
              ? "border-neo-accent bg-neo-secondary/20"
              : "border-black hover:border-gray-700"
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
                width={80}
                height={80}
                className="w-20 h-20 object-contain border-4 border-black bg-white"
              />
              <button
                type="button"
                onClick={handleRemove}
                className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white border-2 border-black p-1 shadow-neo-sm active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
                title="Remove logo"
              >
                <X className="w-4 h-4" />
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
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-black hover:bg-gray-800 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold uppercase border-4 border-transparent hover:border-black/20 transition-all"
              aria-label={placeholder}
            >
              <Upload className="w-5 h-5" />
              <span>{isUploading ? "Uploading..." : placeholder}</span>
            </button>
            {/* Hint for better UX */}
            <p className="text-xs font-bold text-black mt-2 text-center uppercase">
              💡 Tip: Drag & drop lebih cepat!
            </p>
          </div>
        </div>

        {/* Helper text */}
        <p className="text-xs font-medium text-gray-600 mt-3 text-center">
          {isDragging ? (
            <span className="text-neo-accent font-bold">
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
