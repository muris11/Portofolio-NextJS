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
          <div className="animate-spin h-12 w-12 border-4 border-black border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-black font-bold uppercase tracking-wide">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neo-canvas h-full flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-[60] w-72 bg-white border-r-4 border-black flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-full lg:z-auto ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          id="admin-sidebar"
          role="complementary"
          aria-label="Admin panel sidebar"
        >
          {/* Header */}
          <div className="p-6 border-b-4 border-black bg-neo-secondary flex-none">
            <div className="flex items-center justify-between lg:justify-center">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white border-4 border-black flex items-center justify-center shadow-neo">
                  <LayoutDashboard className="h-6 w-6 text-black" />
                </div>
                <div className="hidden lg:block">
                  <h1 className="text-xl font-black uppercase tracking-tighter">
                    Admin Panel
                  </h1>
                  <p className="text-xs font-bold uppercase tracking-wide">
                    Management
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 border-2 border-black bg-white hover:bg-red-500 hover:text-white transition-colors"
                aria-label="Close navigation menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav
            className="flex-1 p-4 overflow-y-auto"
            role="navigation"
            aria-label="Admin panel navigation"
          >
            <div className="space-y-3">
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
                    className={`w-full flex items-center space-x-3 px-4 py-3 border-4 border-black transition-all duration-200 group ${
                      isActive
                        ? "bg-neo-accent shadow-neo translate-x-[-2px] translate-y-[-2px]"
                        : "bg-white hover:bg-neo-secondary hover:shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px]"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                    aria-label={`Navigate to ${item.label} section`}
                  >
                    <Icon className="h-5 w-5 text-black" />
                    <span className="font-bold uppercase tracking-wide flex-1 text-left text-black">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div
          className="flex-1 overflow-y-auto bg-neo-canvas"
          role="main"
          aria-label="Admin panel content"
        >
          {/* Mobile header */}
          <div className="lg:hidden bg-white border-b-4 border-black px-4 py-3 flex items-center justify-between sticky top-0 z-30">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 border-2 border-black bg-white shadow-neo active:shadow-none transition-all"
              aria-label="Open navigation menu"
              aria-expanded={sidebarOpen}
              aria-controls="admin-sidebar"
            >
              <Menu className="h-5 w-5 text-black" />
            </button>
            <h1 className="text-lg font-black uppercase tracking-tighter">
              {activeTab}
            </h1>
            <div className="w-9" /> {/* Spacer for centering */}
          </div>

          <div className="p-8 pb-20">
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
