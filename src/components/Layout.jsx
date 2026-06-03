import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col font-sans">
      {/* منوی بالای صفحه */}
      <Navbar />

      {/* تزریق محتوای هر صفحه به صورت داینامیک */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* فوتر ساده سایت */}
      <footer className="bg-gray-900 border-t border-gray-800 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} رضا قاضی‌خانی و گروه توسعه. تمامی حقوق محفوظ است.
      </footer>
    </div>
  );
}