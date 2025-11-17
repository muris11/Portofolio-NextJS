"use client";
import {
  Briefcase,
  Code,
  GraduationCap,
  LayoutDashboard,
  Mail,
  Menu,
  User,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { DashboardSection } from "./components/DashboardSection";
import { EducationSection } from "./components/EducationSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { MessagesSection } from "./components/MessagesSection";
import { ProfileSection } from "./components/ProfileSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { SkillsSection } from "./components/SkillsSection";
import { useAdminData } from "./hooks/useAdminData";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (
        hash &&
        [
          "overview",
          "projects",
          "skills",
          "education",
          "experience",
          "messages",
          "profile",
        ].includes(hash)
      ) {
        setActiveTab(hash);
      }
    };

    // Check initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const {
    stats,
    projects,
    skills,
    education,
    experience,
    messages,
    profile,
    recentActivities,
    isLoading,
    error,
    clearError,
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
  } = useAdminData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <div className="flex h-[calc(100vh-8rem)]">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed top-16 lg:top-18 left-0 z-[60] w-72 h-[calc(100vh-6rem)] lg:h-[calc(100vh-8.5rem)] bg-white dark:bg-gray-900 shadow-2xl border-r border-gray-200 dark:border-gray-800 flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          id="admin-sidebar"
          role="complementary"
          aria-label="Admin panel sidebar"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between lg:justify-center">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <LayoutDashboard className="h-7 w-7 text-white" />
                </div>
                <div className="hidden lg:block">
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    Admin Panel
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Portfolio Management
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close navigation menu"
              >
                <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav
            className="flex-1 p-4 overflow-y-auto"
            role="navigation"
            aria-label="Admin panel navigation"
          >
            <div className="space-y-2">
              {[
                { id: "overview", label: "Overview", icon: LayoutDashboard },
                { id: "projects", label: "Projects", icon: Code },
                { id: "skills", label: "Skills", icon: Users },
                { id: "education", label: "Education", icon: GraduationCap },
                { id: "experience", label: "Experience", icon: Briefcase },
                { id: "messages", label: "Messages", icon: Mail },
                { id: "profile", label: "Profile", icon: User },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                    aria-label={`Navigate to ${item.label} section`}
                  >
                    <div
                      className={`p-1 rounded-lg transition-colors ${
                        isActive
                          ? "bg-white/20"
                          : "bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          isActive
                            ? "text-white"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      />
                    </div>
                    <span className="font-medium text-left flex-1">
                      {item.label}
                    </span>
                    {isActive && (
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div
          className="flex-1 overflow-auto"
          role="main"
          aria-label="Admin panel content"
        >
          {/* Mobile header */}
          <div className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200/50 dark:border-gray-700/50 px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Open navigation menu"
              aria-expanded={sidebarOpen}
              aria-controls="admin-sidebar"
            >
              <Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h1>
            <div className="w-9" /> {/* Spacer for centering */}
          </div>

          <div className="p-8">
            {/* Content based on active tab */}
            {activeTab === "overview" && (
              <DashboardSection
                stats={stats}
                recentActivities={recentActivities}
                error={error}
                onClearError={clearError}
              />
            )}

            {activeTab === "projects" && (
              <ProjectsSection
                projects={projects}
                onSave={handleSaveProject}
                onDelete={handleDeleteProject}
                isLoading={isLoading}
              />
            )}

            {activeTab === "skills" && (
              <SkillsSection
                skills={skills}
                onSave={handleSaveSkill}
                onDelete={handleDeleteSkill}
              />
            )}

            {activeTab === "education" && (
              <EducationSection
                education={education}
                onSave={handleSaveEducation}
                onDelete={handleDeleteEducation}
              />
            )}

            {activeTab === "experience" && (
              <ExperienceSection
                experience={experience}
                onSave={handleSaveExperience}
                onDelete={handleDeleteExperience}
              />
            )}

            {activeTab === "messages" && (
              <MessagesSection
                messages={messages}
                onDelete={handleDeleteMessage}
              />
            )}

            {activeTab === "profile" && (
              <ProfileSection profile={profile} onSave={handleSaveProfile} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
