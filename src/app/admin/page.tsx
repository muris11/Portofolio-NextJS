"use client";
import {
  BarChart3,
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
import { useState } from "react";
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

  const {
    stats,
    projects,
    skills,
    education,
    experience,
    messages,
    profile,
    isLoading,
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

  const statsCards = [
    {
      title: "Total Projects",
      value: stats?.projects || 0,
      icon: Code as any,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      change: stats?.projects ? "Active" : "No data",
    },
    {
      title: "Skills",
      value: stats?.skills || 0,
      icon: Users as any,
      color: "text-green-600",
      bgColor: "bg-green-100",
      change: stats?.skills ? "Active" : "No data",
    },
    {
      title: "Messages",
      value: stats?.messages || 0,
      icon: Mail as any,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      change: stats?.messages ? "Active" : "No data",
    },
    {
      title: "Education",
      value: stats?.education || 0,
      icon: GraduationCap as any,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      change: stats?.education ? "Active" : "No data",
    },
  ];

  const recentActivities: Array<{
    id: number;
    action: string;
    description: string;
    time: string;
    type: string;
  }> = [
    // Data akan diisi dari database atau API calls
  ];

  const quickActions = [
    {
      title: "Add Project",
      description: "Create a new project entry",
      icon: Code,
      action: () => setActiveTab("projects"),
    },
    {
      title: "Add Skill",
      description: "Add a new skill to your profile",
      icon: Users,
      action: () => setActiveTab("skills"),
    },
    {
      title: "Update Profile",
      description: "Edit your personal information",
      icon: User,
      action: () => setActiveTab("profile"),
    },
    {
      title: "View Messages",
      description: "Check contact form submissions",
      icon: Mail,
      action: () => setActiveTab("messages"),
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Memuat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <div className="flex min-h-screen">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-[60] w-64 bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200/50 dark:border-gray-700/50 flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header with close button for mobile */}
          <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between lg:justify-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <LayoutDashboard className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Admin Panel
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Portfolio Management
                </p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-2">
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
                    setSidebarOpen(false); // Close sidebar on mobile after selection
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? "text-white" : ""}`} />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto pt-16 lg:pt-18">
          {/* Mobile header */}
          <div className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200/50 dark:border-gray-700/50 px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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
              <div className="space-y-8 animate-in fade-in-50 duration-500">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                      Dashboard Overview
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      Welcome back! Here's what's happening with your portfolio.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>All systems operational</span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {statsCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={index}
                        className="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent dark:from-gray-700/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <div
                              className={`w-12 h-12 bg-gradient-to-br ${stat.bgColor} dark:bg-opacity-20 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                            >
                              <Icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                Live
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                              {stat.title}
                            </h3>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors">
                              {stat.value}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                              <span className="inline-block w-1 h-1 bg-green-500 rounded-full"></span>
                              <span>{stat.change}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Charts and Activities */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Activity Chart */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                    <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                          <BarChart3 className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            Activity Overview
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Portfolio activity over the last 30 days
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                <Code className="h-4 w-4 text-white" />
                              </div>
                              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                Projects
                              </span>
                            </div>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                              {stats?.projects
                                ? Math.min(
                                    Math.round(
                                      (stats.projects /
                                        Math.max(
                                          stats.projects +
                                            stats.skills +
                                            stats.messages,
                                          1
                                        )) *
                                        100
                                    ),
                                    100
                                  )
                                : 0}
                              %
                            </span>
                          </div>
                          <div className="relative">
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out"
                                style={{
                                  width: `${
                                    stats?.projects
                                      ? Math.min(
                                          Math.round(
                                            (stats.projects /
                                              Math.max(
                                                stats.projects +
                                                  stats.skills +
                                                  stats.messages,
                                                1
                                              )) *
                                              100
                                          ),
                                          100
                                        )
                                      : 0
                                  }%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                                <Users className="h-4 w-4 text-white" />
                              </div>
                              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                Skills
                              </span>
                            </div>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                              {stats?.skills
                                ? Math.min(
                                    Math.round(
                                      (stats.skills /
                                        Math.max(
                                          stats.projects +
                                            stats.skills +
                                            stats.messages,
                                          1
                                        )) *
                                        100
                                    ),
                                    100
                                  )
                                : 0}
                              %
                            </span>
                          </div>
                          <div className="relative">
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-1000 ease-out"
                                style={{
                                  width: `${
                                    stats?.skills
                                      ? Math.min(
                                          Math.round(
                                            (stats.skills /
                                              Math.max(
                                                stats.projects +
                                                  stats.skills +
                                                  stats.messages,
                                                1
                                              )) *
                                              100
                                          ),
                                          100
                                        )
                                      : 0
                                  }%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                                <Mail className="h-4 w-4 text-white" />
                              </div>
                              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                Messages
                              </span>
                            </div>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                              {stats?.messages
                                ? Math.min(
                                    Math.round(
                                      (stats.messages /
                                        Math.max(
                                          stats.projects +
                                            stats.skills +
                                            stats.messages,
                                          1
                                        )) *
                                        100
                                    ),
                                    100
                                  )
                                : 0}
                              %
                            </span>
                          </div>
                          <div className="relative">
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full transition-all duration-1000 ease-out"
                                style={{
                                  width: `${
                                    stats?.messages
                                      ? Math.min(
                                          Math.round(
                                            (stats.messages /
                                              Math.max(
                                                stats.projects +
                                                  stats.skills +
                                                  stats.messages,
                                                1
                                              )) *
                                              100
                                          ),
                                          100
                                        )
                                      : 0
                                  }%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activities */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                    <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                          <svg
                            className="h-5 w-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            Recent Activities
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Latest updates and changes
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        {recentActivities.length > 0 ? (
                          recentActivities.map((activity, index) => (
                            <div
                              key={activity.id}
                              className="group flex items-start space-x-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
                              style={{ animationDelay: `${index * 50}ms` }}
                            >
                              <div
                                className={`w-3 h-3 rounded-full mt-2 shrink-0 ${
                                  activity.type === "project"
                                    ? "bg-blue-500"
                                    : activity.type === "skill"
                                    ? "bg-emerald-500"
                                    : activity.type === "message"
                                    ? "bg-purple-500"
                                    : "bg-orange-500"
                                }`}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors">
                                    {activity.action}
                                  </p>
                                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                                    {activity.time}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                  {activity.description}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8">
                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                              <svg
                                className="h-6 w-6 text-gray-400 dark:text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Belum ada aktivitas terbaru
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                  <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg
                          className="h-5 w-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          Quick Actions
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Common tasks to manage your portfolio
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {quickActions.map((action, index) => {
                        const Icon = action.icon;
                        return (
                          <button
                            key={index}
                            className="group relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl border border-gray-200/50 dark:border-gray-600/50 hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-300 transform hover:scale-[1.02] text-left"
                            onClick={action.action}
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-gray-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10">
                              <div className="flex flex-col items-center space-y-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                  <Icon className="h-6 w-6 text-white" />
                                </div>
                                <div className="text-center space-y-2">
                                  <div className="font-bold text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors">
                                    {action.title}
                                  </div>
                                  <div className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {action.description}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
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
