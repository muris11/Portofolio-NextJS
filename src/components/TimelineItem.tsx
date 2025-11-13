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
    <div className="relative flex items-start space-x-4">
      {/* Timeline Line */}
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary-foreground" />
        </div>
        <div className="w-0.5 h-full bg-gray-300 dark:bg-gray-600 mt-2"></div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {type === "education" ? item.institution : item.company}
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
              {item.startDate} - {item.endDate}
            </span>
          </div>

          <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">
            {type === "education" ? item.degree : item.role}
          </h4>

          {item.description && (
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
