import { resumeData } from '../data/resumeData';
import TimelineItem from './TimelineItem';

export default function ExperienceTimeline() {
  const { experiences } = resumeData;

  return (
    <section className="py-10 bg-gray-900/20 rounded-2xl border border-gray-800/50 p-6 md:p-10 my-8" dir="rtl">
      <h3 className="text-xl font-bold text-white mb-8 border-r-4 border-blue-500 pr-3">
        سوابق شغلی و حرفه‌ای
      </h3>
      
      {/* ظرف اصلی خط زمانی */}
      <div className="max-w-3xl mr-2">
        {experiences.map((exp, index) => (
          <TimelineItem key={index} {...exp} />
        ))}
      </div>
    </section>
  );
}