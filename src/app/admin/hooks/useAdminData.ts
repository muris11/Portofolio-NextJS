import { useEffect, useState } from "react";

export interface DashboardStats {
  projects: number;
  skills: number;
  education: number;
  experience: number;
  messages: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  techStack: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  createdAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  icon?: string;
  level?: number;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
}

export interface Profile {
  id: string;
  fullName: string;
  title: string;
  bio: string;
  profileImage?: string;
  email: string;
  phone?: string;
  location?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
}

export function useAdminData() {
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    skills: 0,
    education: 0,
    experience: 0,
    messages: 0,
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Unknown error" }));
        console.error("Failed to fetch stats:", response.status, errorData);
        // Don't show error to user for stats, just log it
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
      // Don't show error to user for stats, just log it
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/admin/projects");
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        console.error(
          `Failed to fetch projects: ${response.status} ${response.statusText}`
        );
        // Could add toast notification here
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      // Could add toast notification here
    }
  };

  const fetchSkills = async () => {
    try {
      const response = await fetch("/api/admin/skills");
      if (response.ok) {
        const data = await response.json();
        setSkills(data);
      } else {
        console.error(
          `Failed to fetch skills: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const fetchEducation = async () => {
    try {
      const response = await fetch("/api/admin/education");
      if (response.ok) {
        const data = await response.json();
        setEducation(data);
      } else {
        console.error(
          `Failed to fetch education: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error fetching education:", error);
    }
  };

  const fetchExperience = async () => {
    try {
      const response = await fetch("/api/admin/experience");
      if (response.ok) {
        const data = await response.json();
        setExperience(data);
      } else {
        console.error(
          `Failed to fetch experience: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error fetching experience:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/admin/messages");
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        console.error(
          `Failed to fetch messages: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await fetch("/api/admin/profile");
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        console.error(
          `Failed to fetch profile: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  // CRUD functions
  const handleSaveProject = async (
    projectData: Partial<Project> | FormData
  ) => {
    try {
      let response: Response;

      if (projectData instanceof FormData) {
        // Handle file upload
        const hasId = projectData.has("id");
        response = await fetch("/api/admin/projects", {
          method: hasId ? "PUT" : "POST",
          body: projectData,
        });
      } else {
        // Handle JSON data (backward compatibility)
        response = await fetch("/api/admin/projects", {
          method: projectData.id ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData),
        });
      }

      if (response.ok) {
        await fetchProjects();
        return true;
      } else {
        // Log the response details for debugging
        const errorText = await response.text();
        console.error("API Error Response:", {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
        });

        // Try to parse error message
        let errorMessage = "Failed to save project";
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error saving project:", error);
      // Re-throw the error so it can be handled by the UI
      throw error;
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus proyek ini?")) {
      try {
        const response = await fetch(`/api/admin/projects?id=${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          await fetchProjects();
          return true;
        } else {
          const errorText = await response.text();
          console.error(
            `Failed to delete project: ${response.status} ${response.statusText} - ${errorText}`
          );
          throw new Error(`Failed to delete project: ${response.statusText}`);
        }
      } catch (error) {
        console.error("Error deleting project:", error);
        throw error;
      }
    }
    return false;
  };

  const handleSaveSkill = async (skillData: Partial<Skill>) => {
    try {
      const response = await fetch("/api/admin/skills", {
        method: skillData.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(skillData),
      });

      if (response.ok) {
        await fetchSkills();
        return true;
      }
    } catch (error) {
      console.error("Error saving skill:", error);
    }
    return false;
  };

  const handleDeleteSkill = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus skill ini?")) {
      try {
        await fetch(`/api/admin/skills?id=${id}`, { method: "DELETE" });
        await fetchSkills();
        return true;
      } catch (error) {
        console.error("Error deleting skill:", error);
      }
    }
    return false;
  };

  const handleSaveEducation = async (educationData: Partial<Education>) => {
    try {
      const response = await fetch("/api/admin/education", {
        method: educationData.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(educationData),
      });

      if (response.ok) {
        await fetchEducation();
        return true;
      }
    } catch (error) {
      console.error("Error saving education:", error);
    }
    return false;
  };

  const handleDeleteEducation = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus pendidikan ini?")) {
      try {
        await fetch(`/api/admin/education?id=${id}`, { method: "DELETE" });
        await fetchEducation();
        return true;
      } catch (error) {
        console.error("Error deleting education:", error);
      }
    }
    return false;
  };

  const handleSaveExperience = async (experienceData: Partial<Experience>) => {
    try {
      const response = await fetch("/api/admin/experience", {
        method: experienceData.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(experienceData),
      });

      if (response.ok) {
        await fetchExperience();
        return true;
      }
    } catch (error) {
      console.error("Error saving experience:", error);
    }
    return false;
  };

  const handleDeleteExperience = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus pengalaman ini?")) {
      try {
        await fetch(`/api/admin/experience?id=${id}`, { method: "DELETE" });
        await fetchExperience();
        return true;
      } catch (error) {
        console.error("Error deleting experience:", error);
      }
    }
    return false;
  };

  const handleSaveProfile = async (profileData: any) => {
    try {
      let response: Response;

      if (profileData instanceof FormData) {
        // Handle file upload
        response = await fetch("/api/admin/profile", {
          method: "PUT",
          body: profileData,
        });
      } else {
        // Handle JSON data (backward compatibility)
        response = await fetch("/api/admin/profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profileData),
        });
      }

      if (response.ok) {
        await fetchProfile();
        return true;
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
    return false;
  };

  const handleDeleteMessage = async (id: string) => {
    if (confirm("Apakah Anda yakin menghapus pesan ini?")) {
      try {
        await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE" });
        await fetchMessages();
        return true;
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    }
    return false;
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        fetchStats(),
        fetchProjects(),
        fetchSkills(),
        fetchEducation(),
        fetchExperience(),
        fetchMessages(),
        fetchProfile(),
      ]);
      setIsLoading(false);
    };
    loadData();
  }, []);

  return {
    // State
    stats,
    projects,
    skills,
    education,
    experience,
    messages,
    profile,
    isLoading,

    // Actions
    refreshStats: fetchStats,
    refreshProjects: fetchProjects,
    refreshSkills: fetchSkills,
    refreshEducation: fetchEducation,
    refreshExperience: fetchExperience,
    refreshMessages: fetchMessages,
    refreshProfile: fetchProfile,

    // CRUD handlers
    handleSaveProject,
    handleDeleteProject,
    handleSaveSkill,
    handleDeleteSkill,
    handleSaveEducation,
    handleDeleteEducation,
    handleSaveExperience,
    handleDeleteExperience,
    handleSaveProfile,
    handleDeleteMessage,
  };
}
