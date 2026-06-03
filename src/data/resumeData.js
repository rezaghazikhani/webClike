// داده‌های اولیه و دمو رزومه (در صورتی که هنوز داده‌ای در مرورگر ذخیره نشده باشد)
const initialData = {
  personalInfo: {
    name: "رضا قاضی‌خانی",
    title: "توسعه‌دهنده فرانت‌اند و متخصص شبکه",
    bio: "علاقه‌مند به دنیای وب و مدیریت زیرساخت‌های توزیع‌شده با چندین سال تجربه کاربری تخصصی.",
    skills: ["React", "JavaScript", "Vite", "شبکه و امنیت", "Cisco", "VMware"]
  },
  articles: [
    { id: 1, title: "آشنایی با ساختار شبکه و معماری آن", category: "شبکه", date: "۱۴۰۵/۰۲/۱۵", excerpt: "در این مقاله به بررسی پایه‌ای مفاهیم شبکه و نحوه پیاده‌سازی زیرساخت‌های پایدار می‌پردازیم." }
  ],
  projects: [
    { id: 1, title: "سامانه مانیتورینگ شبکه توزیع‌شده", category: "زیرساخت", description: "طراحی و پیاده‌سازی پلتفرم نظارتی برای کنترل پایداری سرورها با واکنش آنی." }
  ],
  experience: [
    { id: 1, role: "برنامه‌نویس ارشد فرانت‌اند", company: "تیم توسعه وب‌کلیک", period: "۱۴۰۳ - اکنون", description: "پیاده‌سازی رابط‌های کاربری مدرن و هماهنگ‌سازی ماژول‌های اختصاصی سیستم‌های مدیریت محتوا." }
  ]
};

// تابع کمکی برای خواندن داده‌ها از localStorage
export const getResumeData = () => {
  const data = localStorage.getItem('appResumeData');
  if (!data) {
    localStorage.setItem('appResumeData', JSON.stringify(initialData));
    return initialData;
  }
  return JSON.parse(data);
};

// تابع کمکی برای ذخیره داده‌های جدید ثبت شده توسط ادمین
export const saveResumeData = (newData) => {
  localStorage.setItem('appResumeData', JSON.stringify(newData));
  // ایجاد یک رویداد سراسری در مرورگر برای باخبر کردن تمام صفحات به صورت آنی
  window.dispatchEvent(new Event('resumeDataChange'));
};

// اکسپورت تک‌باره متغیر برای حل خطای Duplicated export در Vite/Oxc
export const resumeData = getResumeData();