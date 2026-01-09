"use client";

import { Briefcase, GraduationCap } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface TimelineItemProps {
  item: {
    id: string;
    institution?: string;
    degree?: string;
    company?: string;
    role?: string;
    startDate: string;
    endDate: string;
    description?: string;
    logoUrl?: string;
  };
  type: "education" | "experience";
}

export default function TimelineItem({ item, type }: TimelineItemProps) {
  const Icon = type === "education" ? GraduationCap : Briefcase;
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative flex items-start space-x-3 sm:space-x-6 mb-8 group">
      {/* Timeline Line */}
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 sm:w-20 sm:h-20 bg-white border-4 border-black flex items-center justify-center shadow-neo z-10 relative">
          {item.logoUrl && !imageError ? (
            <Image
              src={item.logoUrl}
              alt={
                type === "education"
                  ? item.institution || "Institution logo"
                  : item.company || "Company logo"
              }
              width={80}
              height={80}
              className="w-full h-full object-cover p-1"
              onError={() => setImageError(true)}
              unoptimized={
                item.logoUrl?.includes("vercel-storage.com") ||
                item.logoUrl?.includes("blob.vercel")
              }
            />
          ) : (
            <Icon className="h-6 w-6 sm:h-10 sm:w-10 text-black" />
          )}
        </div>
        <div className="w-1 h-full bg-black mt-[-4px] z-0"></div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-8 sm:pb-12">
        <div className="neo-card p-4 sm:p-6 lg:p-8 relative">
          {/* Decorative corner */}
          <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-4 h-4 sm:w-6 sm:h-6 bg-neo-accent border-2 border-black"></div>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 sm:mb-4 gap-2 sm:gap-4">
            <div className="flex-1">
              <h3 className="text-base sm:text-xl lg:text-2xl font-black uppercase tracking-tight mb-1 leading-tight">
                {type === "education" ? item.institution : item.company}
              </h3>
              <h4 className="text-sm sm:text-lg font-bold text-black/80 mb-1 sm:mb-2 border-b-2 border-black inline-block leading-tight">
                {type === "education" ? item.degree : item.role}
              </h4>
            </div>
            <span className="neo-badge whitespace-nowrap self-start text-xs sm:text-sm px-2 py-1">
              {item.startDate} - {item.endDate}
            </span>
          </div>

          {item.description && (
            <>
              <p className="hidden sm:block text-black font-medium leading-relaxed text-sm lg:text-base border-l-4 border-neo-secondary pl-4">
                {item.description}
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="sm:hidden mt-2 text-xs font-bold uppercase bg-neo-secondary border-2 border-black px-3 py-1 shadow-neo-sm active:translate-y-0.5 active:shadow-none transition-all"
              >
                Read More
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border-4 border-black shadow-neo-lg w-full max-w-md p-6 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-red-100 border-2 border-transparent hover:border-black transition-all"
            >
              <span className="sr-only">Close</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>

            <div className="mb-6 pr-8">
              <h3 className="text-xl font-black uppercase tracking-tight mb-2">
                {type === "education" ? item.institution : item.company}
              </h3>
              <h4 className="text-lg font-bold text-black/80 border-b-4 border-neo-secondary inline-block">
                {type === "education" ? item.degree : item.role}
              </h4>
              <div className="mt-2">
                <span className="text-sm font-bold bg-black text-white px-2 py-0.5">
                  {item.startDate} - {item.endDate}
                </span>
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              <p className="text-base font-medium leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
