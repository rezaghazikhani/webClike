import { Briefcase, Calendar, MapPin } from 'lucide-react';

export default function TimelineItem({ company, role, duration, location, description }) {
  return (
    <div className="relative pr-8 pb-10 last:pb-0 border-r border-gray-800 last:border-r-0">
      
      {/* دایره آیکون دار روی خط زمانی */}
      <div className="absolute -right-3.5 top-0.5 bg-blue-600 text-white p-1.5 rounded-full z-10 border-4 border-gray-950">
        <Briefcase className="h-3.5 w-3.5" />
      </div>

      {/* کارت محتوای سابقه شغلی */}
      <div className="bg-gray-900/40 p-5 rounded-xl border border-gray-800 hover:border-blue-500/40 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h4 className="text-lg font-bold text-white">{role}</h4>
            <span className="text-sm text-blue-400 font-medium">{company}</span>
          </div>
          
          <div className="flex flex-col items-start sm:items-end text-xs text-gray-400 gap-1 font-sans">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-gray-500" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-gray-500" />
              <span>{location}</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-400 text-sm leading-relaxed text-justify">
          {description}
        </p>
      </div>
    </div>
  );
}