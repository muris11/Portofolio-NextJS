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
      bg: "bg-blue-200",
      value: stats.projects,
      trend: stats.projects > 0 ? "Active" : "No data",
    },
    {
      key: "skills",
      label: "Skills",
      icon: Users,
      bg: "bg-green-200",
      value: stats.skills,
      trend: stats.skills > 0 ? "Active" : "No data",
    },
    {
      key: "education",
      label: "Education",
      icon: GraduationCap,
      bg: "bg-purple-200",
      value: stats.education,
      trend: stats.education > 0 ? "Active" : "No data",
    },
    {
      key: "experience",
      label: "Experience",
      icon: Briefcase,
      bg: "bg-orange-200",
      value: stats.experience,
      trend: stats.experience > 0 ? "Active" : "No data",
    },
    {
      key: "messages",
      label: "Messages",
      icon: MessageSquare,
      bg: "bg-pink-200",
      value: stats.messages,
      trend: stats.messages > 0 ? "Active" : "No data",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b-4 border-black pb-6">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tight">
            Dashboard Overview
          </h2>
          <p className="text-gray-600 font-medium mt-1">
            Manage your Rifqy.Dev content easily
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm font-bold bg-white border-2 border-black px-3 py-1 shadow-neo-sm">
          <TrendingUp className="h-4 w-4" />
          <span>Last updated: {new Date().toLocaleDateString("id-ID")}</span>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border-4 border-black p-4 shadow-neo-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-red-600 font-bold">!</div>
              <p className="text-sm font-bold text-red-800">{error}</p>
            </div>
            {onClearError && (
              <button
                onClick={onClearError}
                className="text-red-600 hover:text-red-800 font-bold uppercase text-xs"
              >
                Dismiss
              </button>
            )}
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.key}
              className={`neo-card p-6 ${card.bg} border-4 border-black shadow-neo hover:-translate-y-1 hover:shadow-neo-lg transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center shadow-neo-sm">
                  <Icon className="h-6 w-6 text-black" />
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold uppercase px-2 py-1 bg-white border-2 border-black shadow-neo-sm">
                    {card.trend}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-4xl font-black text-black mb-1">
                  {card.value}
                </p>
                <p className="text-sm font-bold uppercase text-gray-700">
                  {card.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="neo-card bg-white p-6 border-4 border-black shadow-neo">
          <h3 className="text-xl font-black uppercase mb-6 flex items-center space-x-3 border-b-4 border-black pb-2">
            <div className="w-3 h-3 bg-neo-accent border-2 border-black animate-pulse"></div>
            <span>Recent Activity</span>
          </h3>
          <div className="space-y-4">
            {recentActivities.length === 0 && (
              <div className="text-center text-gray-500 font-medium py-8 border-2 border-dashed border-gray-300">
                No recent activity
              </div>
            )}
            {recentActivities.map((activity, index) => {
              let icon;
              let bgClass;

              switch (activity.type) {
                case "project":
                  icon = <Code className="h-4 w-4" />;
                  bgClass = "bg-blue-200";
                  break;
                case "message":
                  icon = <MessageSquare className="h-4 w-4" />;
                  bgClass = "bg-green-200";
                  break;
                case "profile":
                  icon = <Users className="h-4 w-4" />;
                  bgClass = "bg-purple-200";
                  break;
                default:
                  icon = <Code className="h-4 w-4" />;
                  bgClass = "bg-gray-200";
              }

              return (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-3 border-2 border-black shadow-neo-sm hover:translate-x-1 transition-transform bg-white"
                >
                  <div
                    className={`w-8 h-8 ${bgClass} border-2 border-black flex items-center justify-center shrink-0`}
                  >
                    {icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-black uppercase">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-600 font-medium">
                      {activity.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="neo-card bg-white p-6 border-4 border-black shadow-neo">
          <h3 className="text-xl font-black uppercase mb-6 border-b-4 border-black pb-2">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-blue-200 border-4 border-black shadow-neo hover:-translate-y-1 hover:shadow-neo-lg transition-all group flex flex-col items-center justify-center text-center h-32">
              <Code className="h-8 w-8 text-black mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold uppercase">Add Project</span>
            </button>
            <button className="p-4 bg-green-200 border-4 border-black shadow-neo hover:-translate-y-1 hover:shadow-neo-lg transition-all group flex flex-col items-center justify-center text-center h-32">
              <Users className="h-8 w-8 text-black mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold uppercase">Add Skill</span>
            </button>
            <button className="p-4 bg-purple-200 border-4 border-black shadow-neo hover:-translate-y-1 hover:shadow-neo-lg transition-all group flex flex-col items-center justify-center text-center h-32">
              <GraduationCap className="h-8 w-8 text-black mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold uppercase">Add Education</span>
            </button>
            <button className="p-4 bg-orange-200 border-4 border-black shadow-neo hover:-translate-y-1 hover:shadow-neo-lg transition-all group flex flex-col items-center justify-center text-center h-32">
              <Briefcase className="h-8 w-8 text-black mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold uppercase">
                Add Experience
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
