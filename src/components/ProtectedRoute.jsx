import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, roleRequired }) {
  const currentRole = localStorage.getItem('userRole');

  if (!currentRole) {
    return <Navigate to="/login" replace />;
  }

  if (roleRequired && currentRole !== roleRequired) {
    // اگر ادمین خواست به روت یوزر برود یا برعکس، برگردد به روت مناسب خودش
    return <Navigate to={currentRole === 'admin' ? '/admin' : '/user'} replace />;
  }

  return children;
}