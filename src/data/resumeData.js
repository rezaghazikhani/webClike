// src/data/resumeData.js

const initialData = {
  personalInfo: {
    name: "رضا قاضی‌خانی",
    title: "توسعه‌دهنده فرانت‌اند و متخصص شبکه",
    bio: "علاقه‌مند به دنیای وب و مدیریت زیرساخت‌های توزیع‌شده با چندین سال تجربه کاربری تخصصی.",
    skills: ["React", "JavaScript", "Vite", "شبکه و امنیت", "Cisco", "VMware"]
  },
  // بخش جدید: دوره‌های آموزشی تخصصی شما
  courses: [
    { id: 1, title: "دوره جامع پیاده‌سازی زیرساخت و شبکه", duration: "۴۰ ساعت", level: "متوسط تا پیشرفته", status: "در حال برگزاری", price: "رایگان" },
    { id: 2, title: "آموزش گام‌به‌گام React.js و Vite", duration: "۲۵ ساعت", level: "مقدماتی تا پیشرفته", status: "تکمیل شده", price: "رایگان" }
  ],
  articles: [
    { id: 1, title: "آشنایی با ساختار شبکه و معماری آن", category: "شبکه", date: "۱۴۰۵/۰۲/۱۵", excerpt: "در این مقاله به بررسی پایه‌ای مفاهیم شبکه و نحوه پیاده‌سازی زیرساخت‌های پایدار می‌پردازیم." }
  ],
  projects: [
    { id: 1, title: "سامانه مانیتورینگ شبکه توزیع‌شده", category: "زیرساخت", description: "طراحی و پیاده‌سازی پلتفرم نظارتی برای کنترل پایداری سرورها با واکنش آنی." }
  ],
  experience: [
    { id: 1, role: "برنامه‌نویس ارشد فرانت‌اند", company: "تیم توسعه وب‌کلیک", period: "۱۴۰۳ - اکنون", description: "پیاده‌سازی رابط‌های کاربری مدرن و هماهنگ‌سازی ماژول‌های اختصاصی سیستم‌های مدیریت محتوا." }
  ],
  users: [
    { id: 101, username: "ali_dev", email: "ali@example.com", password: "User@Pass123", role: "user", logs: [] }
  ]
};

export const getResumeData = () => {
  const data = localStorage.getItem('appResumeData');
  if (!data) {
    localStorage.setItem('appResumeData', JSON.stringify(initialData));
    return initialData;
  }
  return JSON.parse(data);
};

export const saveResumeData = (newData) => {
  localStorage.setItem('appResumeData', JSON.stringify(newData));
  window.dispatchEvent(new Event('resumeDataChange'));
};

export const resumeData = getResumeData();