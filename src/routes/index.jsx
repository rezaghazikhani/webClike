// src/routes/index.jsx
import { createBrowserRouter, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import AdminLayout from '../components/AdminLayout';
import Login from '../components/Login';
import ProtectedRoute from '../components/ProtectedRoute';
import AboutSection from '../components/AboutSection';
import ExperienceTimeline from '../components/ExperienceTimeline';
import { getResumeData, saveResumeData } from '../data/resumeData';

// وارد کردن استایل‌های ماژولار
import adminStyles from '../components/AdminLayout.module.css';
import userStyles from '../components/UserLayout.module.css';
import formStyles from '../components/AdminForms.module.css';

// هوک اختصاصی برای مانیتورینگ آنلاین و زنده داده‌ها در تمام کامپوننت‌ها
function useLiveResumeData() {
  const [data, setData] = useState(getResumeData());
  useEffect(() => {
    const handleDataChange = () => setData(getResumeData());
    window.addEventListener('resumeDataChange', handleDataChange);
    return () => window.removeEventListener('resumeDataChange', handleDataChange);
  }, []);
  return data;
}

// ==========================================
// ۱. بخش عمومی وب‌سایت (صفحه اصلی خفن، پورتفولیو، وبلاگ)
// ==========================================
const Home = () => {
  const data = useLiveResumeData();
  
  const latestArticles = (data?.articles || []).slice(0, 3);
  const projects = (data?.projects || []).slice(0, 3);
  const courses = data?.courses || [];
  const experiences = data?.experience || [];

  return (
    <div dir="rtl" style={{ color: '#fff', padding: '0 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* HERO SECTION */}
      <section className="fade-in-up" style={{ textAlign: 'center', padding: '5rem 1.5rem', background: 'radial-gradient(circle at top, rgba(255,255,255,0.03) 0%, transparent 70%)', borderBottom: '1px solid var(--border-color)', marginBottom: '4rem' }}>
        <div style={{ display: 'inline-block', padding: '0.4rem 1rem', borderRadius: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem', backdropFilter: 'blur(10px)' }}>
          ⚡ پلتفرم تخصصی توسعه فرانت‌اند و زیرساخت شبکه
        </div>
        <h1 style={{ fontSize: '2.8rem', fontWeight: '900', letterSpacing: '-1px', marginBottom: '1rem', background: 'linear-gradient(180deg, #fff 0%, #888 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          توسعه وب‌سایت‌های مدرن و پایدار
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 2.5rem auto', lineHeight: '1.8' }}>
          ما ایده‌ها را به کدهای تمیز فرانت‌اند تبدیل کرده و پایداری آن‌ها را در زیرساخت‌های توزیع‌شده مانیتور و تضمین می‌کنیم.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/portfolio" style={{ padding: '0.75rem 2rem', background: '#fff', color: '#000', borderRadius: '8px', fontWeight: '700', textDecoration: 'none', fontSize: '0.9rem', transition: 'transform 0.2s' }} onMouseEnter={e => e.target.style.transform = 'scale(1.03)'} onMouseLeave={e => e.target.style.transform = 'scale(1)'}>مشاهده نمونه‌کارها</Link>
          <a href="#courses" style={{ padding: '0.75rem 2rem', background: 'rgba(255,255,255,0.03)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '8px', fontWeight: '600', textDecoration: 'none', fontSize: '0.9rem' }}>دوره‌های آموزشی</a>
        </div>
      </section>

      {/* COURSES SECTION */}
      <section id="courses" style={{ marginBottom: '5rem' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0 0 0.5rem 0' }}>🎓 دوره‌های آموزشی تخصصی</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>مهارت‌های خود را با آموزش‌های پروژه محور ارتقا دهید.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {courses.map(course => (
            <div key={course.id} className="hover-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '2rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'all 0.3s ease' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '4px', background: 'rgba(255,213,0,0.1)', color: '#ffcd39', border: '1px solid rgba(255,213,0,0.2)' }}>{course.status}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{course.duration}</span>
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', margin: '0 0 1rem 0', color: 'var(--text-main)' }}>{course.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0 0 2rem 0' }}>سطح دوره: {course.level}</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <span style={{ fontWeight: '700', color: '#fff' }}>{course.price}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'underline', cursor: 'pointer' }}>مشاهده سرفصل‌ها ←</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section style={{ marginBottom: '5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0 0 0.5rem 0' }}>🚀 پروژه‌ها و نمونه‌کارها</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>مجموعه‌ای از سیستم‌های تحت وب و ابزارهای مانیتورینگ پیاده‌سازی شده.</p>
          </div>
          <Link to="/portfolio" style={{ color: '#fff', fontSize: '0.85rem', textDecoration: 'underline' }}>مشاهده همه پروژه‌ها</Link>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {projects.map((project, index) => (
            <div key={project.id || index} className="hover-card" style={{ flex: '1 1 300px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '2rem', borderRadius: '12px', transition: 'all 0.3s ease' }}>
              <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: '4px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>{project.category}</span>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', margin: '1rem 0' }}>{project.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>{project.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section style={{ marginBottom: '5rem' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0 0 0.5rem 0' }}>💼 سوابق شغلی و تجربیات</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>مراحل پیشرفت کاری و فریم‌ورک‌های مورد استفاده در طول زمان.</p>
        </div>
        <div style={{ borderRight: '1px solid var(--border-color)', paddingRight: '1.5rem' }}>
          {experiences.map((exp, index) => (
            <div key={exp.id || index} className="hover-card" style={{ position: 'relative', marginBottom: '2rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '1.5rem 2rem', borderRadius: '12px', transition: 'all 0.3s ease' }}>
              <div style={{ position: 'absolute', right: '-29px', top: '24px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#fff', border: '4px solid var(--bg-main)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', margin: 0 }}>{exp.role}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{exp.period}</span>
              </div>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 'normal', margin: '0 0 1rem 0' }}>{exp.company}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BLOG SECTION */}
      <section style={{ marginBottom: '5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0 0 0.5rem 0' }}>✍️ آخرین مقالات وبلاگ</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>مباحث تخصصی در حوزه‌های فرانت‌اند، مانیتورینگ سرور و شبکه.</p>
          </div>
          <Link to="/blog" style={{ color: '#fff', fontSize: '0.85rem', textDecoration: 'underline' }}>مشاهده همه مقالات</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {latestArticles.map((article, i) => (
            <div key={article.id || i} className="hover-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '2rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'all 0.3s ease' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  <span>{article.category}</span>
                  <span>{article.date}</span>
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', margin: '0 0 1rem 0', lineHeight: '1.4' }}>{article.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.6', margin: '0 0 1.5rem 0' }}>{article.excerpt}</p>
              </div>
              <span style={{ fontSize: '0.8rem', color: '#fff', fontWeight: '600' }}>ادامه مطلب ←</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const Portfolio = () => {
  const data = useLiveResumeData();
  const projects = data?.projects || [];
  return (
    <div dir="rtl" style={{ padding: '2rem', color: '#fff', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '2rem' }}>پروژه‌ها و نمونه‌کارها</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {projects.map((project, idx) => (
          <div key={project.id || idx} className="hover-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '2rem', borderRadius: '12px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{project.category}</span>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', margin: '0.5rem 0' }}>{project.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.6' }}>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Blog = () => {
  const data = useLiveResumeData();
  const allArticles = data?.articles || [];
  return (
    <div dir="rtl" style={{ padding: '2rem', color: '#fff', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '2rem' }}>وبلاگ تخصصی آموزشی</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {allArticles.map((article, i) => (
          <div key={article.id || i} className="hover-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '2rem', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              <span>{article.category}</span>
              <span>{article.date}</span>
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', margin: '0 0 1rem 0' }}>{article.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{article.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const UserDashboard = () => {
  const username = localStorage.getItem('userName') || 'کاربر گرامی';
  return (
    <div className={userStyles.container} dir="rtl">
      <div className={userStyles.welcomeCard} style={{ border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)' }}>
        <h1 className={userStyles.title} style={{ color: 'var(--text-main)' }}>سلام، {username} عزیز! خوش آمدی 🥳</h1>
        <p className={userStyles.text}>اینجا پنل اختصاصی شماست. دسترسی‌ها در وضعیت عادی قرار دارند.</p>
      </div>
    </div>
  );
};

// ==========================================
// ۲. پنل اصلی ادمین (داشبورد پایش سیستم)
// ==========================================
const AdminDashboard = () => {
  const data = useLiveResumeData();
  return (
    <div className={adminStyles.dashboardCard} style={{ border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)' }}>
      <h1 className={adminStyles.title}>خوش آمدید، رضا جان! ⚡ (مدیر سیستم)</h1>
      <p className={adminStyles.subtitle}>وضعیت و پایش المان‌های وب‌سایت:</p>
      <div className={adminStyles.statsGrid}>
        <div className={adminStyles.statCard} style={{ border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-input)' }}>
          <span className={adminStyles.statLabel}>تعداد مقالات</span>
          <h3 className={adminStyles.statValue}>{data?.articles?.length || 0}</h3>
        </div>
        <div className={adminStyles.statCard} style={{ border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-input)' }}>
          <span className={adminStyles.statLabel}>کل کاربران سیستم</span>
          <h3 className={adminStyles.statValue}>{data?.users?.length || 0}</h3>
        </div>
        <div className={adminStyles.statCard} style={{ border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-input)' }}>
          <span className={adminStyles.statLabel}>پروژه‌های ثبت شده</span>
          <h3 className={adminStyles.statValue}>{data?.projects?.length || 0}</h3>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// ۳. فرم‌های مدیریت محتوا (CRUD)
// ==========================================
const ManageArticles = () => {
  const data = useLiveResumeData();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !category || !excerpt) return alert('لطفاً همه فیلدها را پر کنید.');

    if (editingId) {
      const updatedArticles = data.articles.map(art => art.id === editingId ? { ...art, title, category, excerpt } : art);
      saveResumeData({ ...data, articles: updatedArticles });
      setEditingId(null);
    } else {
      const newArticle = { id: Date.now(), title, category, excerpt, date: new Date().toLocaleDateString('fa-IR') };
      saveResumeData({ ...data, articles: [newArticle, ...data.articles] });
    }
    setTitle(''); setCategory(''); setExcerpt('');
  };

  const startEdit = (article) => {
    setEditingId(article.id); setTitle(article.title); setCategory(article.category); setExcerpt(article.excerpt);
  };

  const handleDelete = (id) => {
    if (window.confirm('آیا از حذف این مقاله مطمئن هستید؟')) {
      const filtered = data.articles.filter(art => art.id !== id);
      saveResumeData({ ...data, articles: filtered });
    }
  };

  return (
    <div dir="rtl">
      <div className={formStyles.formCard}>
        <h2 className={formStyles.formTitle}>{editingId ? '✏️ ویرایش مقاله' : '✍️ انتشار مقاله آموزشی جدید'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={formStyles.grid}>
            <div className={formStyles.formGroup}>
              <label className={formStyles.label}>عنوان مقاله</label>
              <input type="text" className={formStyles.input} value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className={formStyles.formGroup}>
              <label className={formStyles.label}>دسته بندی</label>
              <input type="text" className={formStyles.input} value={category} onChange={e => setCategory(e.target.value)} />
            </div>
          </div>
          <div className={formStyles.formGroup} style={{ marginBottom: '1.5rem' }}>
            <label className={formStyles.label}>متن یا خلاصه مقاله</label>
            <textarea className={formStyles.textarea} value={excerpt} onChange={e => setExcerpt(e.target.value)} />
          </div>
          <button type="submit" className={formStyles.submitBtn}>{editingId ? 'اعمال تغییرات' : 'انتشار مقاله'}</button>
        </form>
      </div>

      <div className={formStyles.tableWrapper}>
        <table className={formStyles.table}>
          <thead>
            <tr>
              <th className={formStyles.th}>عنوان مقاله</th>
              <th className={formStyles.th}>دسته‌بندی</th>
              <th className={formStyles.th} style={{ textAlign: 'left', paddingLeft: '2rem' }}>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {data.articles.map((art, idx) => (
              <tr key={art.id || idx} className={formStyles.tr}>
                <td className={formStyles.td}>{art.title}</td>
                <td className={formStyles.td}><span className={formStyles.badge}>{art.category}</span></td>
                <td className={formStyles.td} style={{ textAlign: 'left', paddingLeft: '2rem' }}>
                  <button onClick={() => startEdit(art)} style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', marginLeft: '1rem' }}>ویرایش</button>
                  <button onClick={() => handleDelete(art.id)} style={{ background: 'none', border: 'none', color: '#ff4b4b', cursor: 'pointer' }}>حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ManageExperience = () => {
  const data = useLiveResumeData();
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [period, setPeriod] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!role || !company || !period || !description) return alert('لطفاً همه فیلدها را پر کنید.');

    if (editingId) {
      const updatedExp = data.experience.map(exp => exp.id === editingId ? { ...exp, role, company, period, description } : exp);
      saveResumeData({ ...data, experience: updatedExp });
      setEditingId(null);
    } else {
      const newExp = { id: Date.now(), role, company, period, description };
      saveResumeData({ ...data, experience: [newExp, ...data.experience] });
    }
    setRole(''); setCompany(''); setPeriod(''); setDescription('');
  };

  const startEdit = (exp) => {
    setEditingId(exp.id); setRole(exp.role); setCompany(exp.company); setPeriod(exp.period); setDescription(exp.description);
  };

  const handleDelete = (id) => {
    if (window.confirm('آیا از حذف این سابقه مطمئن هستید؟')) {
      const filtered = data.experience.filter(exp => exp.id !== id);
      saveResumeData({ ...data, experience: filtered });
    }
  };

  return (
    <div dir="rtl">
      <div className={formStyles.formCard}>
        <h2 className={formStyles.formTitle}>{editingId ? '✏️ ویرایش سابقه' : '💼 افزودن سابقه شغلی جدید'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={formStyles.grid}>
            <div className={formStyles.formGroup}>
              <label className={formStyles.label}>عنوان شغلی</label>
              <input type="text" className={formStyles.input} value={role} onChange={e => setRole(e.target.value)} />
            </div>
            <div className={formStyles.formGroup}>
              <label className={formStyles.label}>نام شرکت</label>
              <input type="text" className={formStyles.input} value={company} onChange={e => setCompany(e.target.value)} />
            </div>
            <div className={formStyles.formGroup}>
              <label className={formStyles.label}>بازه زمانی</label>
              <input type="text" className={formStyles.input} value={period} onChange={e => setPeriod(e.target.value)} />
            </div>
          </div>
          <div className={formStyles.formGroup} style={{ marginBottom: '1.5rem' }}>
            <label className={formStyles.label}>شرح وظایف</label>
            <textarea className={formStyles.textarea} value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <button type="submit" className={formStyles.submitBtn}>{editingId ? 'اعمال تغییرات' : 'افزودن به رزومه'}</button>
        </form>
      </div>

      <div className={formStyles.tableWrapper}>
        <table className={formStyles.table}>
          <thead>
            <tr>
              <th className={formStyles.th}>سمت شغلی</th>
              <th className={formStyles.th}>محل کار</th>
              <th className={formStyles.th} style={{ textAlign: 'left', paddingLeft: '2rem' }}>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {data.experience.map((exp, idx) => (
              <tr key={exp.id || idx} className={formStyles.tr}>
                <td className={formStyles.td}>{exp.role}</td>
                <td className={formStyles.td}>{exp.company}</td>
                <td className={formStyles.td} style={{ textAlign: 'left', paddingLeft: '2rem' }}>
                  <button onClick={() => startEdit(exp)} style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', marginLeft: '1rem' }}>ویرایش</button>
                  <button onClick={() => handleDelete(exp.id)} style={{ background: 'none', border: 'none', color: '#ff4b4b', cursor: 'pointer' }}>حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ManageProjects = () => {
  const data = useLiveResumeData();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !category || !description) return alert('لطفاً همه فیلدها را پر کنید.');

    if (editingId) {
      const updatedProjects = data.projects.map(proj => proj.id === editingId ? { ...proj, title, category, description } : proj);
      saveResumeData({ ...data, projects: updatedProjects });
      setEditingId(null);
    } else {
      const newProject = { id: Date.now(), title, category, description };
      saveResumeData({ ...data, projects: [newProject, ...data.projects] });
    }
    setTitle(''); setCategory(''); setDescription('');
  };

  const startEdit = (proj) => {
    setEditingId(proj.id); setTitle(proj.title); setCategory(proj.category); setDescription(proj.description);
  };

  const handleDelete = (id) => {
    if (window.confirm('آیا از حذف این نمونه‌کار مطمئن هستید؟')) {
      const filtered = data.projects.filter(proj => proj.id !== id);
      saveResumeData({ ...data, projects: filtered });
    }
  };

  return (
    <div dir="rtl">
      <div className={formStyles.formCard}>
        <h2 className={formStyles.formTitle}>{editingId ? '✏️ ویرایش نمونه‌کار' : '🚀 ثبت پروژه و نمونه‌کار جدید'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={formStyles.grid}>
            <div className={formStyles.formGroup}>
              <label className={formStyles.label}>عنوان پروژه</label>
              <input type="text" className={formStyles.input} value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className={formStyles.formGroup}>
              <label className={formStyles.label}>تکنولوژی / حوزه</label>
              <input type="text" className={formStyles.input} value={category} onChange={e => setCategory(e.target.value)} />
            </div>
          </div>
          <div className={formStyles.formGroup} style={{ marginBottom: '1.5rem' }}>
            <label className={formStyles.label}>توضیحات کامل پروژه</label>
            <textarea className={formStyles.textarea} value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <button type="submit" className={formStyles.submitBtn}>{editingId ? 'اعمال تغییرات' : 'ثبت نمونه‌کار'}</button>
        </form>
      </div>

      <div className={formStyles.tableWrapper}>
        <table className={formStyles.table}>
          <thead>
            <tr>
              <th className={formStyles.th}>نام پروژه</th>
              <th className={formStyles.th}>حوزه فنی</th>
              <th className={formStyles.th} style={{ textAlign: 'left', paddingLeft: '2rem' }}>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {data.projects.map((proj, idx) => (
              <tr key={proj.id || idx} className={formStyles.tr}>
                <td className={formStyles.td}>{proj.title}</td>
                <td className={formStyles.td}><span className={formStyles.badge}>{proj.category}</span></td>
                <td className={formStyles.td} style={{ textAlign: 'left', paddingLeft: '2rem' }}>
                  <button onClick={() => startEdit(proj)} style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', marginLeft: '1rem' }}>ویرایش</button>
                  <button onClick={() => handleDelete(proj.id)} style={{ background: 'none', border: 'none', color: '#ff4b4b', cursor: 'pointer' }}>حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ==========================================
// ۴. بخش درخواستی: مدیریت و مانیتورینگ کاربران
// ==========================================
const ManageUsers = () => {
  const data = useLiveResumeData();
  const usersList = data?.users || [];
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div dir="rtl" style={{ color: '#fff' }}>
      <div className={formStyles.formCard} style={{ marginBottom: '2rem' }}>
        <h2 className={formStyles.formTitle}>👥 نظارت بر کاربران و سطوح دسترسی</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
          در این بخش می‌توانید مشخصات حساس ورود کاربران (ایمیل، رمز عبور، شناسه) و رویدادهای امنیتی سیستم را مانیتور کنید.
        </p>

        <div className={formStyles.tableWrapper}>
          <table className={formStyles.table}>
            <thead>
              <tr>
                <th className={formStyles.th}>نام کاربری</th>
                <th className={formStyles.th}>آدرس ایمیل</th>
                <th className={formStyles.th}>رمز عبور (متن آشکار)</th>
                <th className={formStyles.th}>نقش کاربری</th>
                <th className={formStyles.th} style={{ textAlign: 'left', paddingLeft: '2rem' }}>عملیات پایش</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((user) => (
                <tr key={user.id} className={formStyles.tr}>
                  <td className={formStyles.td} style={{ fontWeight: '600', color: 'var(--text-main)' }}>{user.username}</td>
                  <td className={formStyles.td}>{user.email}</td>
                  <td className={formStyles.td} style={{ fontFamily: 'monospace', color: '#ffcd39' }}>{user.password}</td>
                  <td className={user.role === 'admin' ? formStyles.td : formStyles.td}>
                    <span className={formStyles.badge}>{user.role === 'admin' ? 'مدیر سیستم' : 'کاربر عادی'}</span>
                  </td>
                  <td className={formStyles.td} style={{ textAlign: 'left', paddingLeft: '2rem' }}>
                    <button 
                      onClick={() => setSelectedUser(user)}
                      style={{ background: 'none', border: 'none', color: 'var(--text-main)', textDecoration: 'underline', cursor: 'pointer' }}
                    >
                      مشاهده لاگ فعالیت‌ها
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUser ? (
        <div className={formStyles.formCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', margin: 0 }}>
              🪵 گزارش رویدادهای کاربر: <span style={{ color: 'var(--text-muted)' }}>{selectedUser.username}</span>
            </h3>
            <button onClick={() => setSelectedUser(null)} style={{ background: 'none', border: 'none', color: '#ff4b4b', cursor: 'pointer' }}>بستن جدول رویداد ×</button>
          </div>

          {(!selectedUser.logs || selectedUser.logs.length === 0) ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>هیچ عملیاتی برای این کاربر ثبت نشده است.</p>
          ) : (
            <div className={formStyles.tableWrapper}>
              <table className={formStyles.table}>
                <thead>
                  <tr>
                    <th className={formStyles.th}>تاریخ و ساعت سیستم</th>
                    <th className={formStyles.th}>نوع عملیات</th>
                    <th className={formStyles.th}>آدرس IP کلاینت</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedUser.logs.map((log) => (
                    <tr key={log.id} className={formStyles.tr}>
                      <td className={formStyles.td} style={{ color: 'var(--text-main)' }}>{log.date}</td>
                      <td className={formStyles.td}>{log.action}</td>
                      <td className={formStyles.td} style={{ fontFamily: 'monospace', color: 'var(--text-muted)' }}>{log.ip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

// ==========================================
// ۵. پیکربندی نهایی شبکه مسیرها (Router)
// ==========================================
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'portfolio', element: <Portfolio /> },
      { path: 'blog', element: <Blog /> },
      { path: 'user', element: <ProtectedRoute roleRequired="user"><UserDashboard /></ProtectedRoute> }
    ],
  },
  { path: '/login', element: <Login /> },
  {
    path: '/admin',
    element: <ProtectedRoute roleRequired="admin"><AdminLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'articles', element: <ManageArticles /> },
      { path: 'experience', element: <ManageExperience /> },
      { path: 'projects', element: <ManageProjects /> },
      { path: 'users', element: <ManageUsers /> }, 
    ],
  },
]);