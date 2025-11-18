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

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      event.target.value = "";
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      event.target.value = "";
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const data = await response.json();
      setPreview(data.url);
      onChange(data.url);
      
      // Clear file input after successful upload
      event.target.value = "";
    } catch (error) {
      console.error("Upload error:", error);
      alert(
        `Failed to upload image: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      // Clear file input on error
      event.target.value = "";
    } finally {
      setIsUploading(false);
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isUploading) return;
    
    // Use requestAnimationFrame to avoid blocking the main thread
    requestAnimationFrame(() => {
      fileInputRef.current?.click();
    });
  };

  const handleRemove = () => {
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

      <div className="flex items-center space-x-4">
        {/* Preview */}
        {preview && (
          <div className="relative">
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
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isUploading}
            onClick={(e) => {
              // Reset value on click to allow re-selecting the same file
              e.currentTarget.value = '';
            }}
          />
          <button
            type="button"
            onClick={handleButtonClick}
            disabled={isUploading}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
          >
            <Upload className="w-4 h-4" />
            <span>{isUploading ? "Uploading..." : placeholder}</span>
          </button>
        </div>
      </div>

      {/* Helper text */}
      <p className="text-xs text-gray-500">
        Max file size: 5MB. Supported formats: JPG, PNG, GIF, WebP
      </p>
    </div>
  );
}
