import {
  Briefcase,
  Code,
  GraduationCap,
  MessageSquare,
  TrendingUp,
  Users,
} from "lucide-react";
import type { DashboardStats } from "../hooks/useAdminData";

interface DashboardSectionProps {
  stats: DashboardStats;
}

export function DashboardSection({ stats }: DashboardSectionProps) {
  const statCards = [
    {
      key: "projects",
      label: "Proyek",
      icon: Code,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      trend: "+12%",
    },
    {
      key: "skills",
      label: "Kemampuan",
      icon: Users,
      color: "bg-gradient-to-br from-green-500 to-green-600",
      trend: "+8%",
    },
    {
      key: "education",
      label: "Pendidikan",
      icon: GraduationCap,
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      trend: "+5%",
    },
    {
      key: "experience",
      label: "Pengalaman",
      icon: Briefcase,
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
      trend: "+15%",
    },
    {
      key: "messages",
      label: "Pesan",
      icon: MessageSquare,
      color: "bg-gradient-to-br from-red-500 to-red-600",
      trend: "+25%",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Kelola konten portfolio Anda dengan mudah
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <TrendingUp className="h-4 w-4" />
          <span>
            Terakhir diperbarui: {new Date().toLocaleDateString("id-ID")}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          const value = stats[card.key as keyof DashboardStats];
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
                  <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                    {card.trend}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {value}
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
            <span>Aktivitas Terkini</span>
          </h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center shrink-0">
                <Code className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Proyek baru ditambahkan
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  E-Commerce Platform - 2 jam yang lalu
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center shrink-0">
                <MessageSquare className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Pesan baru diterima
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  3 pesan belum dibaca
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center shrink-0">
                <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Skill baru ditambahkan
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  React Native - 1 hari yang lalu
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Aksi Cepat
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl hover:shadow-md transition-all duration-200 group">
              <Code className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Tambah Proyek
              </span>
            </button>
            <button className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl hover:shadow-md transition-all duration-200 group">
              <Users className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Tambah Skill
              </span>
            </button>
            <button className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl hover:shadow-md transition-all duration-200 group">
              <GraduationCap className="h-6 w-6 text-purple-600 dark:text-purple-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Tambah Pendidikan
              </span>
            </button>
            <button className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl hover:shadow-md transition-all duration-200 group">
              <Briefcase className="h-6 w-6 text-orange-600 dark:text-orange-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Tambah Pengalaman
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
