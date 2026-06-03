import { NavLink } from 'react-router-dom';
import { Code2, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'صفحه اصلی', path: '/' },
    { name: 'نمونه کارها', path: '/portfolio' },
    { name: 'وبلاگ', path: '/blog' }, // 🆕 منوی جدید
    { name: 'پنل ادمین', path: '/admin' },
  ];

  // استایل پیوندهای فعال و غیرفعال با Tailwind
  const linkStyle = ({ isActive }) => 
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive 
        ? 'bg-blue-600 text-white' 
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  return (
    <nav className="bg-gray-900 border-b border-gray-800 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* لوگو و نام گروه */}
          <div className="flex items-center gap-2">
            <Code2 className="h-6 w-6 text-blue-500" />
            <span className="font-bold text-lg tracking-wide">DevTeam</span>
          </div>

          {/* منوی دسکتاپ */}
          <div className="hidden md:flex items-center gap-4" dir="rtl">
            {navItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={linkStyle}>
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* دکمه منوی موبایل */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-gray-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* منوی ریسپانسیو موبایل */}
      {isOpen && (
        <div className="md:hidden bg-gray-950 px-2 pt-2 pb-3 space-y-1 sm:px-3" dir="rtl">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}