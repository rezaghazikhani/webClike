import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  FolderGit,
  Home,
  LogOut,
} from "lucide-react";
import styles from "./AdminSidebar.module.css";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const menuItems = [
    { name: "داشبورد اصلی", path: "/admin", icon: LayoutDashboard, end: true },
    { name: "مدیریت مقالات", path: "/admin/articles", icon: FileText },
    { name: "مدیریت سوابق", path: "/admin/experience", icon: Briefcase },
    { name: "مدیریت نمونه‌کارها", path: "/admin/projects", icon: FolderGit }, // آیتم جدید منو
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.dispatchEvent(new Event("authChange"));
  };

  return (
    <aside className={styles.sidebar} dir="rtl">
      <div className={styles.topSection}>
        <div className={styles.header}>
          <div className={styles.pulseDot}></div>
          <span className={styles.brandText}>پنل مدیریت رضا</span>
        </div>

        <nav className={styles.nav}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.activeLink : ""}`
                }
              >
                <Icon size={16} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className={styles.bottomSection}>
        <NavLink to="/" className={styles.footerLink}>
          <Home size={16} />
          <span>مشاهده سایت عمومی</span>
        </NavLink>
        <button onClick={handleLogout} className={styles.logoutButton}>
          <LogOut size={16} />
          <span>خروج از حساب</span>
        </button>
      </div>
    </aside>
  );
}
