import { AdminSectionSkeleton } from "@/components/skeletons";
import { User } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Profile } from "../hooks/useAdminData";

interface ProfileSectionProps {
  profile: Profile | null;
  onSave: (_data: FormData | Partial<Profile>) => Promise<boolean>;
  isLoading?: boolean;
}

export function ProfileSection({
  profile,
  onSave,
  isLoading = false,
}: ProfileSectionProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    profile?.profileImage || null
  );

  // Update previewUrl when profile changes (after successful update)
  useEffect(() => {
    if (profile?.profileImage && !selectedFile) {
      setPreviewUrl(profile.profileImage);
    }
  }, [profile?.profileImage, selectedFile]);

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
    setIsSaving(true);

    const formData = new FormData(e.currentTarget);

    // If a new file is selected, add it to formData
    if (selectedFile) {
      formData.set("profileImage", selectedFile);
    } else {
      // Keep existing image URL if no new file selected
      formData.set("profileImage", profile?.profileImage || "");
    }

    const data = {
      id: profile?.id,
      fullName: formData.get("fullName") as string,
      title: formData.get("title") as string,
      bio: formData.get("bio") as string,
      profileImage: selectedFile
        ? undefined
        : (formData.get("profileImage") as string), // Will be handled by file upload
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      location: formData.get("location") as string,
      githubUrl: formData.get("githubUrl") as string,
      linkedinUrl: formData.get("linkedinUrl") as string,
      instagramUrl: formData.get("instagramUrl") as string,
    };

    // If we have a file, we need to handle it differently
    if (selectedFile) {
      const uploadFormData = new FormData();
      uploadFormData.append("profileImage", selectedFile);
      uploadFormData.append("fullName", data.fullName);
      uploadFormData.append("title", data.title);
      uploadFormData.append("bio", data.bio);
      uploadFormData.append("email", data.email);
      uploadFormData.append("phone", data.phone || "");
      uploadFormData.append("location", data.location || "");
      uploadFormData.append("githubUrl", data.githubUrl || "");
      uploadFormData.append("linkedinUrl", data.linkedinUrl || "");
      uploadFormData.append("instagramUrl", data.instagramUrl || "");

      const success = await onSave(uploadFormData);
      if (success) {
        // Reset file selection after successful upload
        setSelectedFile(null);
        setPreviewUrl(profile?.profileImage || null);
      }
    } else {
      await onSave(data);
    }

    setIsSaving(false);
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
                  <User className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tight">
                    Manage Profile
                  </h2>
                  <p className="text-gray-700 font-medium text-sm lg:text-base">
                    Update your personal information and contact details
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm font-bold">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 border-2 border-black rounded-full animate-pulse"></div>
                  <span className="text-black uppercase">Complete Profile</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 border-2 border-black rounded-full"></div>
                  <span className="text-black uppercase">
                    {profile?.githubUrl ||
                    profile?.linkedinUrl ||
                    profile?.instagramUrl
                      ? "Social Media"
                      : "Not Connected"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="neo-card bg-white p-8 border-4 border-black shadow-neo">
            {profile ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b-4 border-black">
                    <div className="w-10 h-10 bg-green-200 border-2 border-black flex items-center justify-center shadow-neo-sm">
                      <User className="h-5 w-5 text-black" />
                    </div>
                    <h3 className="text-xl font-black uppercase">
                      Personal Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-bold uppercase">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        defaultValue={profile.fullName}
                        required
                        className="w-full px-4 py-3 border-4 border-black shadow-neo-sm focus:shadow-neo focus:outline-none transition-all font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-bold uppercase">
                        Title/Position *
                      </label>
                      <input
                        type="text"
                        name="title"
                        defaultValue={profile.title}
                        required
                        placeholder="Full Stack Developer"
                        className="w-full px-4 py-3 border-4 border-black shadow-neo-sm focus:shadow-neo focus:outline-none transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-bold uppercase">
                      Bio *
                    </label>
                    <textarea
                      name="bio"
                      defaultValue={profile.bio}
                      required
                      rows={4}
                      placeholder="Brief description about yourself..."
                      className="w-full px-4 py-3 border-4 border-black shadow-neo-sm focus:shadow-neo focus:outline-none transition-all font-medium resize-none"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b-4 border-black">
                    <div className="w-10 h-10 bg-blue-200 border-2 border-black flex items-center justify-center shadow-neo-sm">
                      <svg
                        className="h-5 w-5 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-black uppercase">
                      Contact Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-bold uppercase">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        defaultValue={profile.email}
                        required
                        className="w-full px-4 py-3 border-4 border-black shadow-neo-sm focus:shadow-neo focus:outline-none transition-all font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-bold uppercase">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        defaultValue={profile.phone}
                        className="w-full px-4 py-3 border-4 border-black shadow-neo-sm focus:shadow-neo focus:outline-none transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-bold uppercase">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      defaultValue={profile.location}
                      placeholder="Jakarta, Indonesia"
                      className="w-full px-4 py-3 border-4 border-black shadow-neo-sm focus:shadow-neo focus:outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Profile Image */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b-4 border-black">
                    <div className="w-10 h-10 bg-purple-200 border-2 border-black flex items-center justify-center shadow-neo-sm">
                      <svg
                        className="h-5 w-5 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-black uppercase">
                      Profile Image
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {/* Current Image Preview */}
                    {previewUrl && (
                      <div className="flex items-center space-x-4 p-4 bg-gray-50 border-2 border-black border-dashed">
                        <Image
                          src={previewUrl}
                          alt="Profile preview"
                          width={80}
                          height={80}
                          className="w-20 h-20 object-cover border-4 border-black shadow-neo-sm"
                        />
                        <div>
                          <p className="text-sm font-bold uppercase">
                            Current profile image
                          </p>
                          {!selectedFile && (
                            <p className="text-xs text-gray-600 font-medium">
                              Choose a new image to replace
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* File Input */}
                    <div className="space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full px-4 py-3 border-4 border-black shadow-neo-sm focus:shadow-neo focus:outline-none transition-all font-medium file:mr-4 file:py-2 file:px-4 file:border-2 file:border-black file:text-sm file:font-bold file:bg-purple-200 file:text-black hover:file:bg-purple-300"
                      />
                      <p className="text-xs text-gray-600 font-bold">
                        Format: JPG, PNG, GIF. Maximum 5MB.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b-4 border-black">
                    <div className="w-10 h-10 bg-indigo-200 border-2 border-black flex items-center justify-center shadow-neo-sm">
                      <svg
                        className="h-5 w-5 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-black uppercase">
                      Social Media
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-bold uppercase">
                        GitHub URL
                      </label>
                      <input
                        type="url"
                        name="githubUrl"
                        defaultValue={profile.githubUrl}
                        placeholder="https://github.com/username"
                        className="w-full px-4 py-3 border-4 border-black shadow-neo-sm focus:shadow-neo focus:outline-none transition-all font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-bold uppercase">
                        LinkedIn URL
                      </label>
                      <input
                        type="url"
                        name="linkedinUrl"
                        defaultValue={profile.linkedinUrl}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full px-4 py-3 border-4 border-black shadow-neo-sm focus:shadow-neo focus:outline-none transition-all font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-bold uppercase">
                        Instagram URL
                      </label>
                      <input
                        type="url"
                        name="instagramUrl"
                        defaultValue={profile.instagramUrl}
                        placeholder="https://instagram.com/username"
                        className="w-full px-4 py-3 border-4 border-black shadow-neo-sm focus:shadow-neo focus:outline-none transition-all font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-6 border-t-4 border-black">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="neo-btn bg-green-400 px-8 py-3 text-black font-bold uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? "Saving..." : "Update Profile"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-black mx-auto mb-4"></div>
                <p className="text-gray-600 font-bold uppercase">
                  Loading profile data...
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
