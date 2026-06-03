import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Layout() {
  const [role, setRole] = useState(localStorage.getItem('userRole'));
  const navigate = useNavigate();

  // شنود تغییرات در وضعیت لاگین برای به‌روزرسانی آنی هدر
  useEffect(() => {
    const handleAuthChange = () => {
      setRole(localStorage.getItem('userRole'));
    };
    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setRole(null);
    navigate('/');
  };

// جایگزین بخش هدر و فوتر در کامپوننت Layout.jsx کنید
return (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }} dir="rtl">
    <header style={{ backgroundColor: 'rgba(10, 10, 12, 0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-color)', padding: '1.2rem 2rem', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)', textDecoration: 'none', letterSpacing: '-0.5px' }}>
          reza.dev
        </Link>
        
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>صفحه اصلی</Link>
          <Link to="/portfolio" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>نمونه کارها</Link>
          <Link to="/blog" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>وبلاگ</Link>
          
          {role ? (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Link to={role === 'admin' ? '/admin' : '/user'} style={{ backgroundColor: 'var(--accent)', color: '#000', padding: '0.4rem 1.1rem', borderRadius: '100px', fontWeight: '600', fontSize: '0.8rem', textDecoration: 'none' }}>
                داشبورد
              </Link>
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem' }}>خروج</button>
            </div>
          ) : (
            <Link to="/login" style={{ border: '1px solid var(--border-color)', color: 'var(--text-main)', padding: '0.4rem 1.1rem', borderRadius: '100px', fontWeight: '500', fontSize: '0.8rem', textDecoration: 'none', backgroundColor: 'rgba(255,255,255,0.03)', transition: 'background 0.2s' }} onMouseEnter={e => e.target.style.backgroundColor = 'rgba(255,255,255,0.08)'} onMouseLeave={e => e.target.style.backgroundColor = 'rgba(255,255,255,0.03)'}>
              ورود
            </Link>
          )}
        </nav>
      </div>
    </header>

    <main style={{ flexGrow: 1, padding: '4rem 1rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <Outlet />
      </div>
    </main>

    <footer style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
      <p>© ۲۰۲۶ — طراحی مونوکروم تجربی</p>
    </footer>
  </div>
);
}