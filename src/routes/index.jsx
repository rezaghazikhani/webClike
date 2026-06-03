import { createBrowserRouter, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import AdminLayout from '../components/AdminLayout';
import Login from '../components/Login';
import ProtectedRoute from '../components/ProtectedRoute';
import AboutSection from '../components/AboutSection';
import ExperienceTimeline from '../components/ExperienceTimeline';
import ProjectCard from '../components/ProjectCard';
import ArticleCard from '../components/ArticleCard';
import { getResumeData, saveResumeData } from '../data/resumeData';
import adminStyles from '../components/AdminLayout.module.css';
import userStyles from '../components/UserLayout.module.css';
import formStyles from '../components/AdminForms.module.css';

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
// بخش عمومی سایت (Public Views)
// ==========================================
const Home = () => {
  const data = useLiveResumeData();
  const latestArticles = (data?.articles || []).slice(0, 3);
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', color: '#fff' }}>
      <div style={{ textAlign: 'center', padding: '3rem 1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '12px', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '1rem', fontWeight: '700' }}>به سایت تیمی ما خوش آمدید</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>ما راهکارهای مدرن وب و مدیریت زیرساخت‌های شبکه را توسعه می‌دهیم.</p>
      </div>
      <AboutSection />
      <ExperienceTimeline />
      <section dir="rtl" style={{ marginTop: '4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '700' }}>آخرین مقالات آموزشی</h3>
          <Link to="/blog" style={{ color: 'var(--text-main)', fontSize: '0.85rem', textDecoration: 'underline' }}>مشاهده همه مقالات ←</Link>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {latestArticles.map((article, i) => (
            <ArticleCard key={article.id || i} {...article} />
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
    <div dir="rtl" style={{ padding: '2rem', color: '#fff' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '2rem' }}>پروژه‌ها و نمونه‌کارها</h2>
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        {projects.map((project, index) => <ProjectCard key={project.id || index} {...project} />)}
      </div>
    </div>
  );
};

const Blog = () => {
  const data = useLiveResumeData();
  const allArticles = data?.articles || [];
  return (
    <div dir="rtl" style={{ padding: '2rem', color: '#fff' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '2rem' }}>وبلاگ تخصصی آموزشی</h2>
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        {allArticles.map((article, i) => <ArticleCard key={article.id || i} {...article} />)}
      </div>
    </div>
  );
};

// ==========================================
// پنل کاربر عادی
// ==========================================
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
// پنل ادمین و فرم‌های مدیریت با دکمه حذف و ادیت پویا
// ==========================================
const AdminDashboard = () => {
  const data = useLiveResumeData();
  return (
    <div className={adminStyles.dashboardCard} style={{ border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)' }}>
      <h1 className={adminStyles.title}>خوش آمدید، رضا جان! ⚡ (مدیر سیستم)</h1>
      <p className={adminStyles.subtitle}>آمار و ارقام لحظه‌ای اجزای وب‌سایت شما:</p>
      <div className={adminStyles.statsGrid}>
        <div className={adminStyles.statCard} style={{ border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-input)' }}>
          <span className={adminStyles.statLabel}>تعداد مقالات منتشر شده</span>
          <h3 className={adminStyles.statValue}>{data?.articles?.length || 0}</h3>
        </div>
        <div className={adminStyles.statCard} style={{ border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-input)' }}>
          <span className={adminStyles.statLabel}>سوابق شغلی ثبت شده</span>
          <h3 className={adminStyles.statValue}>{data?.experience?.length || 0}</h3>
        </div>
        <div className={adminStyles.statCard} style={{ border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-input)' }}>
          <span className={adminStyles.statLabel}>پروژه‌های ثبت شده</span>
          <h3 className={adminStyles.statValue}>{data?.projects?.length || 0}</h3>
        </div>
      </div>
    </div>
  );
};

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
      const updatedArticles = data.articles.map(art => 
        art.id === editingId ? { ...art, title, category, excerpt } : art
      );
      saveResumeData({ ...data, articles: updatedArticles });
      setEditingId(null);
      alert('مقاله با موفقیت ویرایش شد.');
    } else {
      const newArticle = {
        id: Date.now(),
        title,
        category,
        excerpt,
        date: new Date().toLocaleDateString('fa-IR')
      };
      saveResumeData({ ...data, articles: [newArticle, ...data.articles] });
      alert('مقاله جدید منتشر شد.');
    }
    setTitle(''); setCategory(''); setExcerpt('');
  };

  const startEdit = (article) => {
    setEditingId(article.id);
    setTitle(article.title);
    setCategory(article.category);
    setExcerpt(article.excerpt);
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
            <label className={formStyles.label}>خلاصه یا متن مقاله</label>
            <textarea className={formStyles.textarea} value={excerpt} onChange={e => setExcerpt(e.target.value)} />
          </div>
          <button type="submit" className={formStyles.submitBtn}>{editingId ? 'اعمال تغییرات' : 'انتشار مقاله'}</button>
          {editingId && <button type="button" onClick={() => { setEditingId(null); setTitle(''); setCategory(''); setExcerpt(''); }} style={{ marginRight: '0.5rem', background: 'none', border: 'none', color: '#ff4b4b', cursor: 'pointer', fontSize: '0.85rem' }}>انصراف</button>}
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
                  <button onClick={() => startEdit(art)} style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', marginLeft: '1rem', fontSize: '0.8rem' }}>ویرایش</button>
                  <button onClick={() => handleDelete(art.id)} style={{ background: 'none', border: 'none', color: '#ff4b4b', cursor: 'pointer', fontSize: '0.8rem' }}>حذف</button>
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
      const updatedExp = data.experience.map(exp => 
        exp.id === editingId ? { ...exp, role, company, period, description } : exp
      );
      saveResumeData({ ...data, experience: updatedExp });
      setEditingId(null);
      alert('سابقه کاری ویرایش شد.');
    } else {
      const newExp = { id: Date.now(), role, company, period, description };
      saveResumeData({ ...data, experience: [newExp, ...data.experience] });
      alert('سابقه جدید اضافه شد.');
    }
    setRole(''); setCompany(''); setPeriod(''); setDescription('');
  };

  const startEdit = (exp) => {
    setEditingId(exp.id);
    setRole(exp.role);
    setCompany(exp.company);
    setPeriod(exp.period);
    setDescription(exp.description);
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
        <h2 className={formStyles.formTitle}>{editingId ? '✏️ ویرایش سابقه شغلی' : '💼 افزودن سابقه شغلی جدید'}</h2>
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
          {editingId && <button type="button" onClick={() => { setEditingId(null); setRole(''); setCompany(''); setPeriod(''); setDescription(''); }} style={{ marginRight: '0.5rem', background: 'none', border: 'none', color: '#ff4b4b', cursor: 'pointer' }}>انصراف</button>}
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
                  <button onClick={() => startEdit(exp)} style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', marginLeft: '1rem', fontSize: '0.8rem' }}>ویرایش</button>
                  <button onClick={() => handleDelete(exp.id)} style={{ background: 'none', border: 'none', color: '#ff4b4b', cursor: 'pointer', fontSize: '0.8rem' }}>حذف</button>
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
      const updatedProjects = data.projects.map(proj => 
        proj.id === editingId ? { ...proj, title, category, description } : proj
      );
      saveResumeData({ ...data, projects: updatedProjects });
      setEditingId(null);
      alert('نمونه‌کار ویرایش شد.');
    } else {
      const newProject = { id: Date.now(), title, category, description };
      saveResumeData({ ...data, projects: [newProject, ...data.projects] });
      alert('نمونه‌کار جدید ثبت شد.');
    }
    setTitle(''); setCategory(''); setDescription('');
  };

  const startEdit = (proj) => {
    setEditingId(proj.id);
    setTitle(proj.title);
    setCategory(proj.category);
    setDescription(proj.description);
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
          {editingId && <button type="button" onClick={() => { setEditingId(null); setTitle(''); setCategory(''); setDescription(''); }} style={{ marginRight: '0.5rem', background: 'none', border: 'none', color: '#ff4b4b', cursor: 'pointer' }}>انصراف</button>}
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
                  <button onClick={() => startEdit(proj)} style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', marginLeft: '1rem', fontSize: '0.8rem' }}>ویرایش</button>
                  <button onClick={() => handleDelete(proj.id)} style={{ background: 'none', border: 'none', color: '#ff4b4b', cursor: 'pointer', fontSize: '0.8rem' }}>حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'portfolio', element: <Portfolio /> },
      { path: 'blog', element: <Blog /> },
      {
        path: 'user',
        element: (
          <ProtectedRoute roleRequired="user">
            <UserDashboard />
          </ProtectedRoute>
        )
      }
    ],
  },
  { path: '/login', element: <Login /> },
  {
    path: '/admin',
    element: (
      <ProtectedRoute roleRequired="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'articles', element: <ManageArticles /> },
      { path: 'experience', element: <ManageExperience /> },
      { path: 'projects', element: <ManageProjects /> },
    ],
  },
]);