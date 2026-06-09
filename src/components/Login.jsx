// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getResumeData, saveResumeData } from '../data/resumeData';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const enteredEmail = email.trim().toLowerCase();
    const enteredPassword = password;

    if (!enteredEmail || !enteredPassword) {
      setErrorMessage('لطفاً ایمیل و رمز عبور را وارد کنید.');
      return;
    }

    const currentData = getResumeData();
    const usersList = currentData?.users || [];

    const userFound = usersList.find(
      (user) => user.email.toLowerCase() === enteredEmail
    );

    if (!userFound) {
      setErrorMessage('این ایمیل در سیستم ثبت نشده است. شما ابتدا باید ثبت‌نام کنید.');
      return;
    }

    if (userFound.password !== enteredPassword) {
      setErrorMessage('رمز عبور وارد شده اشتباه است. لطفاً دوباره تلاش کنید.');
      return;
    }

    const loginTime = new Date().toLocaleTimeString('fa-IR');
    const updatedUsers = usersList.map((user) => {
      if (user.id === userFound.id) {
        return {
          ...user,
          logs: [...(user.logs || []), `ورود موفق در ساعت ${loginTime}`]
        };
      }
      return user;
    });

    saveResumeData({
      ...currentData,
      users: updatedUsers
    });

    localStorage.setItem('userRole', userFound.role);
    localStorage.setItem('userName', userFound.username);
    localStorage.setItem('currentUser', JSON.stringify(userFound));

    if (userFound.role === 'admin' || userFound.role === 'author') {
      navigate('/admin');
    } else {
      navigate('/user');
    }
  };

  return (
    <div dir="rtl" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh', color: '#fff', backgroundColor: '#0a0a0c' }}>
      <div style={{ background: '#1e1e24', border: '1px solid #333', padding: '2.5rem', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontWeight: '800' }}>🔐 ورود به حساب</h2>
        
        {errorMessage && (
          <div style={{ background: 'rgba(255, 75, 75, 0.1)', border: '1px solid #ff4b4b', color: '#ff4b4b', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.85rem' }}>
            ⚠️ {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#aaa' }}>آدرس ایمیل</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #444', background: '#2a2a32', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#aaa' }}>رمز عبور</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #444', background: '#2a2a32', color: '#fff', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <button 
            type="submit" 
            style={{ width: '100%', padding: '0.75rem', background: '#fff', color: '#000', border: 'none', borderRadius: '6px', fontWeight: '700', cursor: 'pointer', fontSize: '0.95rem', marginBottom: '1rem' }}
          >
            ورود به سیستم
          </button>
        </form>

        {/* ⚡ بخش دکمه ثبت‌نام با رنگ متمایز و وضوح کامل تحت هر شرایطی */}
        <div style={{ borderTop: '1px solid #333', marginTop: '1.5rem', paddingTop: '1.2rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.85rem', color: '#aaa', margin: '0 0 0.8rem 0' }}>هنوز حساب کاربری ندارید؟</p>
          <Link 
            to="/register" 
            style={{ 
              display: 'block', 
              width: '100%', 
              padding: '0.75rem', 
              background: 'rgba(255, 255, 255, 0.05)', 
              color: '#ffcd39', 
              border: '1px solid #ffcd39', 
              borderRadius: '6px', 
              fontWeight: '700', 
              textDecoration: 'none', 
              fontSize: '0.85rem', 
              boxSizing: 'border-box',
              textAlign: 'center',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#ffcd39';
              e.target.style.color = '#000';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.05)';
              e.target.style.color = '#ffcd39';
            }}
          >
            📝 ایجاد حساب کاربری (ثبت‌نام)
          </Link>
        </div>

      </div>
    </div>
  );
}