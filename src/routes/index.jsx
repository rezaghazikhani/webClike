import { createBrowserRouter, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import AdminLayout from '../components/AdminLayout';
import AboutSection from '../components/AboutSection';
import ExperienceTimeline from '../components/ExperienceTimeline';
import ProjectCard from '../components/ProjectCard';
import ArticleCard from '../components/ArticleCard';
import { resumeData } from '../data/resumeData';
import adminStyles from '../components/AdminLayout.module.css'; // ایمپورت صحیح استایل‌های ماژولار ادمین

// ==========================================
// ۱. کامپوننت‌های بخش عمومی سایت (Public Views)
// ==========================================
const Home = () => {
  const latestArticles = (resumeData?.articles || []).slice(0, 3);
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#fff' }}>
      <div style={{ textAlign: 'center', padding: '3rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>به سایت تیمی ما خوش آمدید</h1>
        <p style={{ color: '#aaa' }}>ما راهکارهای مدرن وب و مدیریت زیرساخت‌های شبکه را توسعه می‌دهیم.</p>
      </div>
      <AboutSection />
      <ExperienceTimeline />
      <section dir="rtl" style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.5rem' }}>آخرین مقالات آموزشی</h3>
          <Link to="/blog" style={{ color: '#0070f3', textDecoration: 'none' }}>مشاهده همه مقالات ←</Link>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {latestArticles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      </section>
    </div>
  );
};

const Portfolio = () => {
  const projects = resumeData?.projects || [];
  return (
    <div dir="rtl" style={{ padding: '2rem', color: '#fff' }}>
      <h2>پروژه‌ها و نمونه‌کارها</h2>
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
        {projects.map((project, index) => <ProjectCard key={index} {...project} />)}
      </div>
    </div>
  );
};

const Blog = () => {
  const allArticles = resumeData?.articles || [];
  return (
    <div dir="rtl" style={{ padding: '2rem', color: '#fff' }}>
      <h2>وبلاگ تخصصی</h2>
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
        {allArticles.map((article) => <ArticleCard key={article.id} {...article} />)}
      </div>
    </div>
  );
};

// ==========================================
// ۲. کامپوننت‌های بخش پنل مدیریت (با تم خفن دراکولا 🧛‍♂️)
// ==========================================
const AdminDashboard = () => (
  <div className={adminStyles.dashboardCard}>
    <h1 className={adminStyles.title}>خوش آمدید، رضا جان! ⚡</h1>
    <p className={adminStyles.subtitle}>
      به مرکز فرماندهی و پنل مدیریت وب‌سایت خود خوش آمدید. تمامی اجزا با ماژول اختصاصی Dracula برای پایداری و استایل دقیق بارگذاری شده‌اند.
    </p>
    
    <div className={adminStyles.statsGrid}>
      <div className={adminStyles.statCard}>
        <span className={adminStyles.statLabel}>تعداد مقالات منتشر شده</span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
          <h3 className={adminStyles.statValue}>۵</h3>
          <span style={{ color: '#50fa7b', fontSize: '0.75rem' }}>آماده ویرایش</span>
        </div>
      </div>
      <div className={adminStyles.statCard}>
        <span className={adminStyles.statLabel}>سوابق شغلی فعال</span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
          <h3 className={adminStyles.statValue}>۴</h3>
          <span style={{ color: '#8be9fd', fontSize: '0.75rem' }}>موقعیت کاری</span>
        </div>
      </div>
      <div className={adminStyles.statCard}>
        <span className={adminStyles.statLabel}>پروژه‌های ثبت شده</span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
          <h3 className={adminStyles.statValue}>۲</h3>
          <span style={{ color: '#ffb86c', fontSize: '0.75rem' }}>نمونه کار</span>
        </div>
      </div>
    </div>
  </div>
);

const ManageArticlesPlaceholder = () => (
  <div className={adminStyles.placeholderCard}>
    <h2 className={adminStyles.pageTitle}>مدیریت مقالات و نوشته‌ها</h2>
    <p className={adminStyles.subtitle}>آرشیو و ابزارهای ساخت پست‌های آموزشی جدید در وبلاگ.</p>
    <div className={adminStyles.dashedBox}>
      در قدم بعدی فرم‌های پیشرفته ثبت مقالات داینامیک را در این بخش پیاده‌سازی می‌کنیم...
    </div>
  </div>
);

// کامپوننت اصلاح شده که علت ارور قبلی بود
const ManageExperiencePlaceholder = () => (
  <div className={adminStyles.placeholderCard}>
    <h2 className={adminStyles.pageTitle} style={{ color: '#50fa7b' }}>مدیریت سوابق و تجربیات شغلی</h2>
    <p className={adminStyles.subtitle}>ویرایش و افزودن شرکت‌ها و خط زمانی رزومه کاری شما.</p>
    <div className={adminStyles.dashedBox}>
      در گام‌های آینده فرم‌های داینامیک ثبت تجربه را به این بخش اضافه می‌کنیم...
    </div>
  </div>
);

// ==========================================
// ۳. پیکربندی روتر پروژه
// ==========================================
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'portfolio', element: <Portfolio /> },
      { path: 'blog', element: <Blog /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'articles', element: <ManageArticlesPlaceholder /> },
      { path: 'experience', element: <ManageExperiencePlaceholder /> },
    ],
  },
]);