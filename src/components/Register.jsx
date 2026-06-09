// src/components/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getResumeData, saveResumeData } from '../data/resumeData';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // تمیز کردن و اعتبارسنجی فیلدها
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedUsername || !trimmedEmail || !password || !confirmPassword) {
      setErrorMessage('لطفاً تمامی فیلدها را تکمیل کنید.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('رمز عبور و تکرار آن با هم مطابقت ندارند.');
      return;
    }

    // ۱. دریافت داده‌های فعلی سیستم
    const currentData = getResumeData();
    const usersList = currentData?.users || [];

    // ۲. بررسی تکراری نبودن نام کاربری یا ایمیل
    const isDuplicate = usersList.some(
      (user) => user.email.toLowerCase() === trimmedEmail || user.username.toLowerCase() === trimmedUsername.toLowerCase()
    );

    if (isDuplicate) {
      setErrorMessage('این نام کاربری یا آدرس ایمیل قبلاً در سیستم ثبت شده است.');
      return;
    }

    // ۳. ساخت آبجکت کاربر جدید (با نقش پیش‌فرض user)
    const newUser = {
      id: Date.now(),
      username: trimmedUsername,
      email: trimmedEmail,
      password: password, // در پروژه‌های واقعی باید هش شود
      role: 'user', // پیش‌فرض کاربر عادی
      logs: [`ثبت‌نام موفقیت‌آمیز در تاریخ ${new Date().toLocaleDateString('fa-IR')}`]
    };

    // ۴. ذخیره در دیتابیس لوکال‌استوریج
    saveResumeData({
      ...currentData,
      users: [...usersList, newUser]
    });

    setSuccessMessage('ثبت‌نام شما با موفقیت انجام شد! در حال انتقال به صفحه ورود...');
    
    // انتقال هوشمند به صفحه ورود پس از ۲ ثانیه
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div dir="rtl" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '85vh', color: '#fff' }}>
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '2.5rem', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontWeight: '800' }}>👤 عضویت در وب‌کلیک</h2>
        
        {errorMessage && (
          <div style={{ background: 'rgba(255, 75, 75, 0.1)', border: '1px solid #ff4b4b', color: '#ff4b4b', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.85rem' }}>
            ⚠️ {errorMessage}
          </div>
        )}

        {successMessage && (
          <div style={{ background: 'rgba(40, 167, 69, 0.1)', border: '1px solid #28a745', color: '#28a745', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.85rem' }}>
            ✅ {successMessage}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>نام کاربری</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="مثال: reza_dev"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>آدرس ایمیل</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>رمز عبور</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>تکرار رمز عبور</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <button 
            type="submit" 
            style={{ width: '100%', padding: '0.75rem', background: '#fff', color: '#000', border: 'none', borderRadius: '6px', fontWeight: '700', cursor: 'pointer', fontSize: '0.95rem', marginBottom: '1rem' }}
          >
            ثبت‌نام و ایجاد حساب
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
          قبلاً ثبت‌نام کرده‌اید؟ <Link to="/login" style={{ color: '#fff', textDecoration: 'underline' }}>وارد شوید</Link>
        </p>
      </div>
    </div>
  );
}