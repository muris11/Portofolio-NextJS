import {
  Briefcase,
  Code,
  GraduationCap,
  MessageSquare,
  TrendingUp,
  Users,
} from "lucide-react";
import type { DashboardStats, RecentActivity } from "../hooks/useAdminData";

interface DashboardSectionProps {
  stats: DashboardStats;
  recentActivities: RecentActivity[];
  error?: string | null;
  onClearError?: () => void;
}

export function DashboardSection({
  stats,
  recentActivities,
  error,
  onClearError,
}: DashboardSectionProps) {
  const statCards = [
    {
      key: "projects",
      label: "Projects",
      icon: Code,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      value: stats.projects,
      trend: stats.projects > 0 ? "Active" : "No data",
    },
    {
      key: "skills",
      label: "Skills",
      icon: Users,
      color: "bg-gradient-to-br from-green-500 to-green-600",
      value: stats.skills,
      trend: stats.skills > 0 ? "Active" : "No data",
    },
    {
      key: "education",
      label: "Education",
      icon: GraduationCap,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      value: stats.education,
      trend: stats.education > 0 ? "Active" : "No data",
    },
    {
      key: "experience",
      label: "Experience",
      icon: Briefcase,
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
      value: stats.experience,
      trend: stats.experience > 0 ? "Active" : "No data",
    },
    {
      key: "messages",
      label: "Messages",
      icon: MessageSquare,
      color: "bg-gradient-to-br from-pink-500 to-pink-600",
      value: stats.messages,
      trend: stats.messages > 0 ? "Active" : "No data",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your portfolio content easily
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <TrendingUp className="h-4 w-4" />
          <span>Last updated: {new Date().toLocaleDateString("id-ID")}</span>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-red-600 dark:text-red-400">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
            {onClearError && (
              <button
                onClick={onClearError}
                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
              >
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={card.key}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 hover:border-primary/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 ${card.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="text-right">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      card.trend === "Active"
                        ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                        : "text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20"
                    }`}
                  >
                    {card.trend}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {card.value}
                </p>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {card.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span>Recent Activity</span>
          </h3>
          <div className="space-y-4">
            {recentActivities.length === 0 && (
              <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                No recent activity
              </div>
            )}
            {recentActivities.map((activity, index) => {
              let icon;
              let iconColor;

              switch (activity.type) {
                case "project":
                  icon = <Code className="h-4 w-4" />;
                  iconColor = "bg-blue-100 dark:bg-blue-900/30";
                  break;
                case "message":
                  icon = <MessageSquare className="h-4 w-4" />;
                  iconColor = "bg-green-100 dark:bg-green-900/30";
                  break;
                case "profile":
                  icon = <Users className="h-4 w-4" />;
                  iconColor = "bg-purple-100 dark:bg-purple-900/30";
                  break;
                default:
                  icon = <Code className="h-4 w-4" />;
                  iconColor = "bg-gray-100 dark:bg-gray-900/30";
              }

              return (
                <div
                  key={index}
                  className={`flex items-start space-x-3 ${iconColor}`}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                    {icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl hover:shadow-md transition-all duration-200 group">
              <Code className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Add Project
              </span>
            </button>
            <button className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl hover:shadow-md transition-all duration-200 group">
              <Users className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Add Skill
              </span>
            </button>
            <button className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl hover:shadow-md transition-all duration-200 group">
              <GraduationCap className="h-6 w-6 text-purple-600 dark:text-purple-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Add Education
              </span>
            </button>
            <button className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl hover:shadow-md transition-all duration-200 group">
              <Briefcase className="h-6 w-6 text-orange-600 dark:text-orange-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Add Experience
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
