import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import styles from "./AdminLayout.module.css"; // 👈 مطمئن شو این ایمپورت درسته

export default function AdminLayout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <div className={styles.adminContainer}>
      {" "}
      {/* 👈 ظرف اصلی کل صفحه */}
      <aside className={styles.sidebar}>
        {" "}
        {/* 👈 بخش سایدبار سمت راست */}
        <div className={styles.sidebarHeader}>
          <h2 className={styles.logo}>پنل مدیریت وب‌کلیک</h2>
        </div>
        <nav className={styles.navMenu}>
          <Link to="/admin" className={styles.navLink}>
            👇 پیشخوان سیستم
          </Link>
          <Link to="/admin/articles" className={styles.navLink}>
            ✍️ مدیریت مقالات
          </Link>
          <Link to="/admin/experience" className={styles.navLink}>
            💼 مدیریت سوابق
          </Link>
          <Link to="/admin/projects" className={styles.navLink}>
            🚀 مدیریت پروژه‌ها
          </Link>
          <Link to="/admin/users" className={styles.navLink}>
            👥 مدیریت کاربران
          </Link>
        </nav>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          خروج از حساب
        </button>
      </aside>
      <main className={styles.mainContent}>
        {" "}
        {/* 👈 بخش محتوای سمت چپ */}
        <Outlet />
      </main>
    </div>
  );
}
