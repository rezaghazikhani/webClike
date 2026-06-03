import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import styles from './AdminLayout.module.css'; // ایمپورت استایل ماژولار

export default function AdminLayout() {
  return (
    <div className={styles.container} dir="rtl">
      <AdminSidebar />
      <main className={styles.mainContent}>
        <div className={styles.wrapper}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}