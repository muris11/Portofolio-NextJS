import { Calendar, GraduationCap } from "lucide-react";

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
  };
  type: "education" | "experience";
}

export default function TimelineItem({ item, type }: TimelineItemProps) {
  const Icon = type === "education" ? GraduationCap : Calendar;

  return (
    <div className="relative flex items-start space-x-6 mb-8">
      {/* Timeline Line */}
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 bg-gradient-to-r from-primary to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
          <Icon className="h-7 w-7 text-white" />
        </div>
        <div className="w-0.5 h-full bg-gradient-to-b from-primary/50 to-transparent mt-4"></div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 lg:p-8 shadow-2xl hover:shadow-primary/10 hover:border-primary/20 transition-all duration-500 group">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-1">
                {type === "education" ? item.institution : item.company}
              </h3>
              <h4 className="text-base font-semibold text-gray-300 mb-2">
                {type === "education" ? item.degree : item.role}
              </h4>
            </div>
            <span className="text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-white/10 font-medium whitespace-nowrap">
              {item.startDate} - {item.endDate}
            </span>
          </div>

          {item.description && (
            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
