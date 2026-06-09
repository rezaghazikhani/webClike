// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, roleRequired }) {
  const userRole = localStorage.getItem('userRole');

  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  // احراز هویت برای صفحات مشترک ادمین و نویسنده
  if (roleRequired === 'admin_or_author') {
    if (userRole === 'admin' || userRole === 'author') {
      return children;
    }
    return <Navigate to="/user" replace />;
  }

  // احراز هویت برای روت‌های قفل و اختصاصی
  if (userRole !== roleRequired) {
    if (userRole === 'admin' || userRole === 'author') {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/user" replace />;
  }

  return children;
}