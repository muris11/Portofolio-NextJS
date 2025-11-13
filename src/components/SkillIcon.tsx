interface SkillIconProps {
  skill: {
    id: string;
    name: string;
    category: string;
    icon?: string;
    level?: number;
  };
}

export default function SkillIcon({ skill }: SkillIconProps) {
  const getLevelColor = (level?: number) => {
    if (!level) return "bg-gray-200 dark:bg-gray-700";
    if (level >= 4) return "bg-green-500";
    if (level >= 3) return "bg-blue-500";
    if (level >= 2) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      {/* Icon Placeholder */}
      <div
        className={`w-16 h-16 ${getLevelColor(
          skill.level
        )} rounded-lg flex items-center justify-center mb-3`}
      >
        <span className="text-white font-bold text-xl">
          {skill.name.charAt(0).toUpperCase()}
        </span>
      </div>

      <h4 className="text-sm font-medium text-gray-900 dark:text-white text-center mb-1">
        {skill.name}
      </h4>

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        {skill.category}
      </p>

      {skill.level && (
        <div className="flex mt-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full mx-0.5 ${
                i < (skill.level || 0)
                  ? "bg-yellow-400"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
