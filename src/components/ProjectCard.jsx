import { ExternalLink, FolderGit2 } from 'lucide-react';

export default function ProjectCard({ title, year, tags, description, link }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-500/50 transition-all duration-300 group hover:-translate-y-1">
      <div>
        {/* هدر کارت */}
        <div className="flex justify-between items-start mb-4">
          <div className="bg-blue-600/10 p-2.5 rounded-xl text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <FolderGit2 className="h-5 w-5" />
          </div>
          <span className="text-xs font-sans text-gray-500 bg-gray-950 px-2.5 py-1 rounded-full border border-gray-800">
            {year}
          </span>
        </div>

        {/* عنوان و توضیحات */}
        <h4 className="text-xl font-bold text-white mb-2 font-mono group-hover:text-blue-400 transition-colors">
          {title}
        </h4>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 text-justify">
          {description}
        </p>
      </div>

      {/* تگ‌ها و لینک خروجی */}
      <div className="border-t border-gray-800/60 pt-4 mt-2 flex justify-between items-center">
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, index) => (
            <span key={index} className="text-[11px] font-medium text-gray-400 bg-gray-950 px-2 py-0.5 rounded border border-gray-800/80">
              {tag}
            </span>
          ))}
        </div>
        
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-400 hover:text-white flex items-center gap-1 text-xs transition-colors"
        >
          <span>مشاهده</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}