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
    if (!level) return "from-gray-400 to-gray-500";
    if (level >= 80) return "from-green-400 to-green-500";
    if (level >= 60) return "from-blue-400 to-blue-500";
    if (level >= 40) return "from-yellow-400 to-yellow-500";
    return "from-red-400 to-red-500";
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl hover:shadow-primary/10 hover:border-primary/20 transition-all duration-500 group hover:-translate-y-1">
      {/* Icon Placeholder */}
      <div
        className={`w-16 h-16 bg-gradient-to-br ${getLevelColor(
          skill.level
        )} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
      >
        <span className="text-white font-bold text-xl">
          {skill.name.charAt(0).toUpperCase()}
        </span>
      </div>

      <h4 className="text-sm font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent text-center mb-2">
        {skill.name}
      </h4>

      <p className="text-xs text-gray-400 text-center mb-3 capitalize">
        {skill.category}
      </p>

      {skill.level && (
        <div className="w-full">
          <div className="flex justify-center items-center mb-1">
            <span className="text-xs text-gray-400">{skill.level}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${skill.level}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
