// src/routes/index.jsx
import { createBrowserRouter, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import AdminLayout from '../components/AdminLayout';
import Login from '../components/Login';
import Register from '../components/Register';
import ProtectedRoute from '../components/ProtectedRoute';
import { getResumeData, saveResumeData } from '../data/resumeData';

// وارد کردن استایل‌های ماژولار
import adminStyles from '../components/AdminLayout.module.css';
import userStyles from '../components/UserLayout.module.css';
import formStyles from '../components/AdminForms.module.css';

// هوک اختصاصی برای مانیتورینگ آنلاین و زنده داده‌ها در کامپوننت‌ها
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
// ۱. بخش عمومی وب‌سایت (صفحه اصلی و بخش‌ها)
// ==========================================
const Home = () => {
  const data = useLiveResumeData();
  const latestArticles = (data?.articles || []).slice(0, 3);
  const projects = (data?.projects || []).slice(0, 3);
  const courses = data?.courses || [];

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
          ما ایده‌ها را به کدهای تمیز فرانت‌اند تبدیل کرده و پایداری آن‌ها را در زیرساخت‌های توزیع‌شده مانیتور می‌کنیم.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/portfolio" style={{ padding: '0.75rem 2rem', background: '#fff', color: '#000', borderRadius: '8px', fontWeight: '700', textDecoration: 'none', fontSize: '0.9rem' }}>مشاهده نمونه‌کارها</Link>
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
            <div key={course.id} className="hover-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '2rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '4px', background: 'rgba(255,213,0,0.1)', color: '#ffcd39', border: '1px solid rgba(255,213,0,0.2)' }}>{course.status}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{course.duration}</span>
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', margin: '0 0 1rem 0' }}>{course.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0 0 2rem 0' }}>سطح: {course.level}</p>
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
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0' }}>🚀 پروژه‌ها و نمونه‌کارها</h2>
          <Link to="/portfolio" style={{ color: '#fff', fontSize: '0.85rem' }}>مشاهده همه</Link>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {projects.map((project, index) => (
            <div key={project.id || index} className="hover-card" style={{ flex: '1 1 300px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '2rem', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{project.category}</span>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', margin: '1rem 0' }}>{project.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.6' }}>{project.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const Portfolio = () => {
  const data = useLiveResumeData();
  return (
    <div dir="rtl" style={{ padding: '2rem', color: '#fff', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '2rem' }}>پروژه‌ها و نمونه‌کارها</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {(data?.projects || []).map((project, idx) => (
          <div key={project.id || idx} className="hover-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '2rem', borderRadius: '12px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{project.category}</span>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', margin: '0.5rem 0' }}>{project.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Blog = () => {
  const data = useLiveResumeData();
  return (
    <div dir="rtl" style={{ padding: '2rem', color: '#fff', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '2rem' }}>وبلاگ تخصصی آموزشی</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {(data?.articles || []).map((article, i) => (
          <div key={article.id || i} className="hover-card" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '2rem', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', margin: '0 0 1rem 0' }}>{article.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{article.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// ۲. پنل کاربری ویژه کاربران عادی (User)
// ==========================================
const UserDashboard = () => {
  const username = localStorage.getItem('userName') || 'کاربر گرامی';
  return (
    <div className={userStyles.container} dir="rtl">
      <div className={userStyles.welcomeCard} style={{ border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)' }}>
        <h1 className={userStyles.title}>سلام، {username} عزیز! خوش آمدی 🥳</h1>
        <p className={userStyles.text}>اینجا پنل اختصاصی شماست. دسترسی‌ها در وضعیت کاربر عادی قرار دارند.</p>
      </div>
    </div>
  );
};

// ==========================================
// ۳. پیشخوان اصلی پنل مدیریت (Admin Dashboard)
// ==========================================
const AdminDashboard = () => {
  const data = useLiveResumeData();
  const currentRole = localStorage.getItem('userRole');
  return (
    <div className={adminStyles.dashboardCard} style={{ border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)' }}>
      <h1 className={adminStyles.title}>خوش آمدید! ⚡ ({currentRole === 'admin' ? 'مدیر کل سیستم' : 'نویسنده محتوا'})</h1>
      <p className={adminStyles.subtitle}>وضعیت المان‌های وب‌سایت در یک نگاه:</p>
      <div className={adminStyles.statsGrid}>
        <div className={adminStyles.statCard} style={{ border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-input)' }}>
          <span className={adminStyles.statLabel}>تعداد مقالات</span>
          <h3 className={adminStyles.statValue}>{data?.articles?.length || 0}</h3>
        </div>
        <div className={adminStyles.statCard} style={{ border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-input)' }}>
          <span className={adminStyles.statLabel}>دوره‌های آموزشی</span>
          <h3 className={adminStyles.statValue}>{data?.courses?.length || 0}</h3>
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
// ۴. فرم‌های مدیریت محتوا (مقاله‌ها، دوره‌ها، تجربه‌ها، پروژه‌ها)
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
      const updated = data.articles.map(art => art.id === editingId ? { ...art, title, category, excerpt } : art);
      saveResumeData({ ...data, articles: updated });
      setEditingId(null);
    } else {
      const newArticle = { id: Date.now(), title, category, excerpt, date: new Date().toLocaleDateString('fa-IR') };
      saveResumeData({ ...data, articles: [newArticle, ...data.articles] });
    }
    setTitle(''); setCategory(''); setExcerpt('');
  };

  const handleDelete = (id) => {
    if (window.confirm('آیا از حذف این مقاله مطمئن هستید؟')) {
      saveResumeData({ ...data, articles: data.articles.filter(art => art.id !== id) });
    }
  };

  return (
    <div dir="rtl">
      <div className={formStyles.formCard}>
        <h2 className={formStyles.formTitle}>{editingId ? '✏️ ویرایش مقاله' : '✍️ انتشار مقاله جدید'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={formStyles.grid}>
            <div className={formStyles.formGroup}><label className={formStyles.label}>عنوان</label><input type="text" className={formStyles.input} value={title} onChange={e => setTitle(e.target.value)} /></div>
            <div className={formStyles.formGroup}><label className={formStyles.label}>دسته‌بندی</label><input type="text" className={formStyles.input} value={category} onChange={e => setCategory(e.target.value)} /></div>
          </div>
          <div className={formStyles.formGroup} style={{ marginBottom: '1.5rem' }}><label className={formStyles.label}>خلاصه متن</label><textarea className={formStyles.textarea} value={excerpt} onChange={e => setExcerpt(e.target.value)} /></div>
          <button type="submit" className={formStyles.submitBtn}>{editingId ? 'اعمال تغییرات' : 'انتشار مقاله'}</button>
        </form>
      </div>
      <div className={formStyles.tableWrapper}>
        <table className={formStyles.table}>
          <thead><tr><th className={formStyles.th}>عنوان مقاله</th><th className={formStyles.th}>دسته‌بندی</th><th className={formStyles.th} style={{ textAlign: 'left', paddingLeft: '2rem' }}>عملیات</th></tr></thead>
          <tbody>
            {data.articles.map(art => (
              <tr key={art.id} className={formStyles.tr}>
                <td className={formStyles.td}>{art.title}</td>
                <td className={formStyles.td}><span className={formStyles.badge}>{art.category}</span></td>
                <td className={formStyles.td} style={{ textAlign: 'left', paddingLeft: '2rem' }}>
                  <button onClick={() => { setEditingId(art.id); setTitle(art.title); setCategory(art.category); setExcerpt(art.excerpt); }} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', marginLeft: '1rem' }}>ویرایش</button>
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

const ManageCourses = () => {
  const data = useLiveResumeData();
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [level, setLevel] = useState('');
  const [status, setStatus] = useState('در حال برگزاری');
  const [price, setPrice] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !duration || !level || !price) return alert('لطفاً همه فیلدها را پر کنید.');
    const courseData = { title, duration, level, status, price };

    if (editingId) {
      const updated = (data.courses || []).map(c => c.id === editingId ? { ...c, ...courseData } : c);
      saveResumeData({ ...data, courses: updated });
      setEditingId(null);
    } else {
      const newCourse = { id: Date.now(), ...courseData };
      saveResumeData({ ...data, courses: [newCourse, ...(data.courses || [])] });
    }
    setTitle(''); setDuration(''); setLevel(''); setStatus('در حال برگزاری'); setPrice('');
  };

  return (
    <div dir="rtl">
      <div className={formStyles.formCard}>
        <h2 className={formStyles.formTitle}>{editingId ? '✏️ ویرایش دوره آموزشی' : '🎓 ثبت دوره جدید'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={formStyles.grid}>
            <div className={formStyles.formGroup}><label className={formStyles.label}>عنوان دوره</label><input type="text" className={formStyles.input} value={title} onChange={e => setTitle(e.target.value)} /></div>
            <div className={formStyles.formGroup}><label className={formStyles.label}>مدت زمان</label><input type="text" className={formStyles.input} value={duration} onChange={e => setDuration(e.target.value)} /></div>
            <div className={formStyles.formGroup}><label className={formStyles.label}>سطح دوره</label><input type="text" className={formStyles.input} value={level} onChange={e => setLevel(e.target.value)} /></div>
          </div>
          <div className={formStyles.grid} style={{ marginTop: '1rem' }}>
            <div className={formStyles.formGroup}>
              <label className={formStyles.label}>وضعیت</label>
              <select className={formStyles.input} value={status} onChange={e => setStatus(e.target.value)} style={{ background: 'var(--bg-input)', color: '#fff' }}>
                <option value="در حال برگزاری">در حال برگزاری</option>
                <option value="تکمیل شده">تکمیل شده</option>
                <option value="به‌زودی">به‌زودی</option>
              </select>
            </div>
            <div className={formStyles.formGroup}><label className={formStyles.label}>شهریه</label><input type="text" className={formStyles.input} value={price} onChange={e => setPrice(e.target.value)} /></div>
          </div>
          <button type="submit" className={formStyles.submitBtn} style={{ marginTop: '1.5rem' }}>{editingId ? 'اعمال تغییرات دوره' : 'ثبت دوره'}</button>
        </form>
      </div>
      <div className={formStyles.tableWrapper}>
        <table className={formStyles.table}>
          <thead><tr><th className={formStyles.th}>عنوان دوره</th><th className={formStyles.th}>وضعیت</th><th className={formStyles.th}>قیمت</th><th className={formStyles.th} style={{ textLeft: 'left', paddingLeft: '2rem' }}>عملیات</th></tr></thead>
          <tbody>
            {(data.courses || []).map(course => (
              <tr key={course.id} className={formStyles.tr}>
                <td className={formStyles.td}>{course.title}</td>
                <td className={formStyles.td}><span className={formStyles.badge}>{course.status}</span></td>
                <td className={formStyles.td}>{course.price}</td>
                <td className={formStyles.td} style={{ textAlign: 'left', paddingLeft: '2rem' }}>
                  <button onClick={() => { setEditingId(course.id); setTitle(course.title); setDuration(course.duration); setLevel(course.level); setStatus(course.status); setPrice(course.price); }} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', marginLeft: '1rem' }}>ویرایش</button>
                  <button onClick={() => { if (window.confirm('حذف شود؟')) saveResumeData({ ...data, courses: data.courses.filter(c => c.id !== course.id) }); }} style={{ background: 'none', border: 'none', color: '#ff4b4b', cursor: 'pointer' }}>حذف</button>
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
    if (!role || !company || !period || !description) return alert('همه فیلدها را پر کنید.');
    if (editingId) {
      const updated = data.experience.map(exp => exp.id === editingId ? { ...exp, role, company, period, description } : exp);
      saveResumeData({ ...data, experience: updated });
      setEditingId(null);
    } else {
      const newExp = { id: Date.now(), role, company, period, description };
      saveResumeData({ ...data, experience: [newExp, ...data.experience] });
    }
    setRole(''); setCompany(''); setPeriod(''); setDescription('');
  };

  return (
    <div dir="rtl">
      <div className={formStyles.formCard}>
        <h2 className={formStyles.formTitle}>{editingId ? '✏️ ویرایش سابقه' : '💼 افزودن سابقه شغلی'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={formStyles.grid}>
            <div className={formStyles.formGroup}><label className={formStyles.label}>سمت</label><input type="text" className={formStyles.input} value={role} onChange={e => setRole(e.target.value)} /></div>
            <div className={formStyles.formGroup}><label className={formStyles.label}>شرکت</label><input type="text" className={formStyles.input} value={company} onChange={e => setCompany(e.target.value)} /></div>
            <div className={formStyles.formGroup}><label className={formStyles.label}>بازه زمانی</label><input type="text" className={formStyles.input} value={period} onChange={e => setPeriod(e.target.value)} /></div>
          </div>
          <div className={formStyles.formGroup} style={{ marginBottom: '1.5rem' }}><label className={formStyles.label}>توضیحات</label><textarea className={formStyles.textarea} value={description} onChange={e => setDescription(e.target.value)} /></div>
          <button type="submit" className={formStyles.submitBtn}>ذخیره سابقه</button>
        </form>
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
    if (!title || !category || !description) return alert('همه فیلدها را پر کنید.');
    if (editingId) {
      const updated = data.projects.map(p => p.id === editingId ? { ...p, title, category, description } : p);
      saveResumeData({ ...data, projects: updated });
      setEditingId(null);
    } else {
      const newProj = { id: Date.now(), title, category, description };
      saveResumeData({ ...data, projects: [newProj, ...data.projects] });
    }
    setTitle(''); setCategory(''); setDescription('');
  };

  return (
    <div dir="rtl">
      <div className={formStyles.formCard}>
        <h2 className={formStyles.formTitle}>{editingId ? '✏️ ویرایش پروژه' : '🚀 ثبت نمونه‌کار جدید'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={formStyles.grid}>
            <div className={formStyles.formGroup}><label className={formStyles.label}>نام پروژه</label><input type="text" className={formStyles.input} value={title} onChange={e => setTitle(e.target.value)} /></div>
            <div className={formStyles.formGroup}><label className={formStyles.label}>تکنولوژی</label><input type="text" className={formStyles.input} value={category} onChange={e => setCategory(e.target.value)} /></div>
          </div>
          <div className={formStyles.formGroup} style={{ marginBottom: '1.5rem' }}><label className={formStyles.label}>توضیحات پروژه</label><textarea className={formStyles.textarea} value={description} onChange={e => setDescription(e.target.value)} /></div>
          <button type="submit" className={formStyles.submitBtn}>ثبت پروژه</button>
        </form>
      </div>
    </div>
  );
};

// ==========================================
// ۵. بخش مدیریت کاربران و مانیتورینگ رویدادها
// ==========================================
const ManageUsers = () => {
  const data = useLiveResumeData();
  const usersList = data?.users || [];
  const [selectedUser, setSelectedUser] = useState(null);

  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('user');

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newUsername || !newEmail || !newPassword) return alert('لطفاً همه فیلدها را پر کنید.');

    const isDuplicate = usersList.some(u => u.username.toLowerCase() === newUsername.toLowerCase() || u.email.toLowerCase() === newEmail.toLowerCase());
    if (isDuplicate) return alert('کاربر یا ایمیل تکراری است.');

    const newUser = { id: Date.now(), username: newUsername, email: newEmail, password: newPassword, role: newRole, logs: [] };
    saveResumeData({ ...data, users: [...usersList, newUser] });
    setNewUsername(''); setNewEmail(''); setNewPassword(''); setNewRole('user');
    alert('کاربر با موفقیت ایجاد شد.');
  };

  const handleDeleteUser = (id, username) => {
    if (username === localStorage.getItem('userName')) {
      return alert('امکان حذف اکانت فعال خودتان وجود ندارد!');
    }
    if (window.confirm(`آیا از حذف کامل کاربر "${username}" مطمئن هستید؟`)) {
      saveResumeData({ ...data, users: usersList.filter(u => u.id !== id) });
      if (selectedUser?.id === id) setSelectedUser(null);
    }
  };

  return (
    <div dir="rtl" style={{ color: '#fff' }}>
      <div className={formStyles.formCard} style={{ marginBottom: '2.5rem' }}>
        <h2 className={formStyles.formTitle}>👤 ایجاد حساب کاربری جدید</h2>
        <form onSubmit={handleCreateUser}>
          <div className={formStyles.grid}>
            <div className={formStyles.formGroup}><label className={formStyles.label}>نام کاربری</label><input type="text" className={formStyles.input} value={newUsername} onChange={e => setNewUsername(e.target.value)} /></div>
            <div className={formStyles.formGroup}><label className={formStyles.label}>ایمیل</label><input type="email" className={formStyles.input} value={newEmail} onChange={e => setNewEmail(e.target.value)} /></div>
          </div>
          <div className={formStyles.grid} style={{ marginTop: '1rem' }}>
            <div className={formStyles.formGroup}><label className={formStyles.label}>رمز عبور</label><input type="text" className={formStyles.input} value={newPassword} onChange={e => setNewPassword(e.target.value)} /></div>
            <div className={formStyles.formGroup}>
              <label className={formStyles.label}>سطح دسترسی (نقش)</label>
              <select className={formStyles.input} value={newRole} onChange={e => setNewRole(e.target.value)} style={{ background: 'var(--bg-input)', color: '#fff' }}>
                <option value="user">کاربر عادی (User)</option>
                <option value="author">نویسنده محتوا (Author)</option>
                <option value="admin">مدیر کل (Admin)</option>
              </select>
            </div>
          </div>
          <button type="submit" className={formStyles.submitBtn} style={{ marginTop: '1.5rem' }}>➕ ساخت و فعال‌سازی کاربر</button>
        </form>
      </div>

      <div className={formStyles.formCard}>
        <h2 className={formStyles.formTitle}>👥 لیست و پایش کاربران سیستم</h2>
        <div className={formStyles.tableWrapper}>
          <table className={formStyles.table}>
            <thead>
              <tr><th>نام کاربری</th><th>ایمیل</th><th>رمز عبور</th><th>نقش</th><th style={{ textAlign: 'left', paddingLeft: '2rem' }}>عملیات</th></tr>
            </thead>
            <tbody>
              {usersList.map(user => (
                <tr key={user.id} className={formStyles.tr}>
                  <td className={formStyles.td} style={{ fontWeight: '600' }}>{user.username}</td>
                  <td className={formStyles.td}>{user.email}</td>
                  <td className={formStyles.td} style={{ fontFamily: 'monospace', color: '#ffcd39' }}>{user.password}</td>
                  <td className={formStyles.td}>
                    <span className={formStyles.badge}>
                      {user.role === 'admin' ? 'مدیر کل' : user.role === 'author' ? 'نویسنده' : 'کاربر عادی'}
                    </span>
                  </td>
                  <td className={formStyles.td} style={{ textAlign: 'left', paddingLeft: '2rem' }}>
                    <button onClick={() => setSelectedUser(user)} style={{ background: 'none', border: 'none', color: '#fff', textDecoration: 'underline', cursor: 'pointer', marginLeft: '1rem' }}>رویدادها</button>
                    <button onClick={() => handleDeleteUser(user.id, user.username)} style={{ background: 'none', border: 'none', color: '#ff4b4b', cursor: 'pointer', fontWeight: 'bold' }}>حذف</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUser && (
        <div className={formStyles.formCard} style={{ marginTop: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h3>🪵 گزارش رویدادهای کاربر: {selectedUser.username}</h3>
            <button onClick={() => setSelectedUser(null)} style={{ background: 'none', border: 'none', color: '#ff4b4b', cursor: 'pointer' }}>× بستن جدول</button>
          </div>
          <div className={formStyles.tableWrapper}>
            <table className={formStyles.table}>
              <thead><tr><th>زمان سیستم</th><th>عملیات</th><th>IP کلاینت</th></tr></thead>
              <tbody>
                {(selectedUser.logs || []).map((log, index) => (
                  <tr key={index} className={formStyles.tr}><td>{log.date || 'نامشخص'}</td><td>{log}</td><td style={{ fontFamily: 'monospace' }}>127.0.0.1</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// ۶. پیکربندی نهایی درخت مسیرهای هوشمند پروژه (Router)
// ==========================================
const router = createBrowserRouter([
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
  { path: '/register', element: <Register /> },
  {
    path: '/admin',
    element: <ProtectedRoute roleRequired="admin_or_author"><AdminLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'articles', element: <ManageArticles /> },
      { path: 'courses', element: <ManageCourses /> },
      { path: 'experience', element: <ProtectedRoute roleRequired="admin"><ManageExperience /></ProtectedRoute> },
      { path: 'projects', element: <ProtectedRoute roleRequired="admin"><ManageProjects /></ProtectedRoute> },
      { path: 'users', element: <ProtectedRoute roleRequired="admin"><ManageUsers /></ProtectedRoute> }, 
    ],
  },
]);

export default router;