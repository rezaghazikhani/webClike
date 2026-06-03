export default function SkillCard({ name, level, percentage }) {
  return (
    <div className="bg-gray-950 p-4 rounded-xl border border-gray-800">
      <div className="flex justify-between items-center mb-2" dir="rtl">
        <span className="text-white font-medium">{name}</span>
        <span className="text-xs text-blue-400 bg-blue-950/50 px-2.5 py-1 rounded-full border border-blue-900/50">
          {level}
        </span>
      </div>
      {/* نوار میزان پیشرفت */}
      <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
        <div 
          className="bg-blue-500 h-full rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}