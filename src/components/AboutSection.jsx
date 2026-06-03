import { resumeData } from '../data/resumeData';
import SkillCard from './SkillCard';
import { Mail, MapPin, Phone, User } from 'lucide-react';

export default function AboutSection() {
  const { personalInfo, skills } = resumeData;

  return (
    <section className="py-12 bg-gray-900/50 rounded-2xl border border-gray-800 p-6 md:p-10 my-8" dir="rtl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* ستون اول: اطلاعات فردی */}
        <div className="lg:col-span-1 space-y-6 bg-gray-950/40 p-6 rounded-xl border border-gray-800/60">
          <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
            <div className="bg-blue-600/10 p-3 rounded-lg text-blue-500">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{personalInfo.name}</h2>
              <p className="text-sm text-gray-400">{personalInfo.title}</p>
            </div>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed text-justify">
            {personalInfo.bio}
          </p>

          <div className="space-y-3 pt-2 text-sm text-gray-300">
            <div className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>{personalInfo.location}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-gray-500" />
              <span className="font-mono">{personalInfo.email}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="font-mono">{personalInfo.phone}</span>
            </div>
          </div>
        </div>

        {/* ستون دوم: مهارت‌های فنی */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-white mb-6 border-r-4 border-blue-500 pr-3">
            مهارت‌های تخصصی و تجربی
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <SkillCard key={index} {...skill} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}