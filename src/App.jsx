// src/App.jsx
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes/index'; // 👈 آکولاژ حذف شد تا به عنوان اکسپورت پیش‌فرض (Default) لود شود

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}