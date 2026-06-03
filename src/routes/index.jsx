import { createBrowserRouter } from 'react-router-dom';

// فرض می‌کنیم این کامپوننت‌ها را در قدم‌های بعدی می‌سازیم
// فعلاً به صورت موقت همین‌جا تعریفشان می‌کنیم تا ارور نگیریم
const HomePlaceholder = () => <div className="p-8">صفحه اصلی سایت عمومی (پورتفولیو و معرفی گروه)</div>;
const PortfolioPlaceholder = () => <div className="p-8">صفحه نمونه کارها</div>;
const AdminDashboardPlaceholder = () => <div className="p-8">پنل کاربری ادمین (خوش آمدید رضا)</div>;
const ManageExperiencePlaceholder = () => <div className="p-8">بخش مدیریت سوابق شغلی</div>;

export const router = createBrowserRouter([
  // مسیرهای بخش عمومی سایت (Public Routes)
  {
    path: '/',
    element: <HomePlaceholder />,
  },
  {
    path: '/portfolio',
    element: <PortfolioPlaceholder />,
  },
  
  // مسیرهای بخش پنل کاربری و ادمین (Admin Routes)
  {
    path: '/admin',
    children: [
      {
        index: true,
        element: <AdminDashboardPlaceholder />,
      },
      {
        path: 'experience',
        element: <ManageExperiencePlaceholder />,
      },
    ],
  },
]);