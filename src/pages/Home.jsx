import { Briefcase, GraduationCap, ShieldCheck, Cpu } from 'lucide-react';

export default function Home() {
  // داده‌های سوابق کاری شما (کامپوننت‌محور و پویا)
  const experiences = [
    { role: 'طراح سایت و متخصص IT', company: 'هلدینگ مادمدیسا', duration: '۱ سال' },
    { role: 'فریلنسر (طراحی سایت، فرانت‌اَند، وردپرس)', company: 'پروژه‌های مستقل', duration: '۵ سال و ۲ ماه (۱۴۰۰ تا کنون)' },
    { role: 'کارآموز طراحی سایت حرفه‌ای', company: 'پویان آی‌تی (همدان)', duration: '۱ سال و ۳ ماه (۱۴۰۳ - ۱۴۰۵)' },
    { role: 'پشتیبان فنی و شبکه', company: 'هادی تک', duration: '۱ سال و ۲ ماه (۱۴۰۲ - ۱۴۰۳)' },
  ];

  // دسته‌بندی مهارت‌های فنی شما برای نمایش شکیل
  const skillCategories = [
    {
      title: 'توسعه وب (Web Dev)',
      skills: ['HTML & CSS (پیشرفته)', 'WordPress (قالب و افزونه نویسی)', 'React (متوسط)', 'JavaScript (متوسط)', 'PHP (متوسط)', 'Next.js (مقدماتی)']
    },
    {
      title: 'شبکه و زیرساخت (IT & DevOps)',
      skills: ['VMware ESX (پیشرفته)', 'Network+ (متوسط)', 'Linux (متوسط)', 'GIT / GitHub (متوسط)', 'Azure DevOps / TFS (متوسط)']
    }
  ];

  return (
    <div className="space-y-16 py-8" dir="rtl">
      
      {/* ۱. بخش Hero (معرفی اولیه) */}
      <section className="text-center max-w-3xl mx-auto space-y-6 py-12">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
          رضا قاضی‌خانی
        </h1>
        <p className="text-xl text-blue-400 font-medium">
          توسعه‌دهنده فرانت‌اند و متخصص زیرساخت IT
        </p>
        <p className="text-gray-400 leading-relaxed text-base">
          با بیش از ۵ سال سابقه فعالیت در حوزه طراحی وب، توسعه سیستم‌های وردپرسی، فرانت‌اند مدرن و راه‌اندازی بسترها و شبکه‌های سروری (مجازی‌سازی). آماده همکاری تیمی و اجرای پروژه‌های مقیاس‌پذیر.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* ۲. بخش سوابق شغلی */}
        <section className="bg-gray-900 border border-gray-800 p-6 rounded-2xl space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
            <Briefcase className="text-blue-500 h-6 w-6" />
            <h2 className="text-xl font-bold text-white">سوابق شغلی</h2>
          </div>
          <div className="relative border-r-2 border-gray-800 pr-4 space-y-6 mr-2">
            {experiences.map((exp, index) => (
              <div key={index} className="relative">
                {/* نقطه روی خط زمان */}
                <span className="absolute -right-[23px] top-1 bg-blue-600 h-3 w-3 rounded-full ring-4 ring-gray-950"></span>
                <h3 className="text-white font-semibold text-base">{exp.role}</h3>
                <p className="text-gray-400 text-sm mt-0.5">{exp.company}</p>
                <span className="inline-block bg-gray-800 text-gray-400 text-xs px-2 py-0.5 rounded-md mt-1">
                  {exp.duration}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ۳. بخش مهارت‌های فنی */}
        <section className="space-y-6">
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <div className="flex items-center gap-2 border-b border-gray-800 pb-3 mb-4">
              <Cpu className="text-emerald-500 h-6 w-6" />
              <h2 className="text-xl font-bold text-white">مهارت‌های تخصصی</h2>
            </div>
            
            <div className="space-y-6">
              {skillCategories.map((cat, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-400">{cat.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, j) => (
                      <span key={j} className="bg-gray-950 border border-gray-800 text-gray-300 text-xs px-3 py-1.5 rounded-lg">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}