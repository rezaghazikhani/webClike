import { ArrowLeft, Calendar, Clock } from 'lucide-react';

export default function ArticleCard({ title, date, category, summary, readTime }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-500/40 transition-all duration-300 group">
      <div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-medium text-blue-400 bg-blue-950/40 px-2.5 py-1 rounded-md border border-blue-900/50">
            {category}
          </span>
          <div className="flex items-center gap-1 text-xs text-gray-500 font-sans">
            <Calendar className="h-3.5 w-3.5" />
            <span>{date}</span>
          </div>
        </div>

        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors leading-snug">
          {title}
        </h4>
        <p className="text-gray-400 text-sm leading-relaxed mb-6 text-justify">
          {summary}
        </p>
      </div>

      <div className="border-t border-gray-800/60 pt-4 flex justify-between items-center text-xs">
        <div className="flex items-center gap-1 text-gray-500 font-sans">
          <Clock className="h-3.5 w-3.5" />
          <span>زمان مطالعه: {readTime}</span>
        </div>
        
        <button className="text-blue-500 hover:text-blue-400 font-medium flex items-center gap-1 transition-colors">
          <span>مطالعه مقاله</span>
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
        </button>
      </div>
    </div>
  );
}