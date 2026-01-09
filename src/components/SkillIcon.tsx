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
    if (!level) return "bg-gray-400";
    if (level >= 80) return "bg-green-400";
    if (level >= 60) return "bg-blue-400";
    if (level >= 40) return "bg-yellow-400";
    return "bg-red-400";
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white border-4 border-black shadow-neo hover:shadow-neo-lg hover:-translate-y-1 transition-all duration-200 w-full">
      {/* Icon Placeholder */}
      <div
        className={`w-16 h-16 ${getLevelColor(
          skill.level
        )} border-4 border-black flex items-center justify-center mb-4 shadow-neo-sm group-hover:scale-110 transition-transform duration-200`}
      >
        <span className="text-black font-black text-2xl uppercase">
          {skill.name.charAt(0)}
        </span>
      </div>

      <h4 className="text-lg font-black uppercase text-center mb-1">
        {skill.name}
      </h4>

      <p className="text-xs font-bold uppercase bg-neo-secondary px-2 py-0.5 border-2 border-black mb-3">
        {skill.category}
      </p>

      {skill.level && (
        <div className="w-full">
          <div className="flex justify-end items-center mb-1 px-1">
            <span className="text-xs font-bold">{skill.level}%</span>
          </div>
          <div className="w-full bg-white border-2 border-black h-4 p-0.5">
            <div
              className="bg-black h-full transition-all duration-300"
              style={{ width: `${skill.level}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
