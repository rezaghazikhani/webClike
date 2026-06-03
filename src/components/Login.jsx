import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      if (email === 'admin' && password === 'admin') {
        localStorage.setItem('userRole', 'admin');
        navigate('/admin');
        window.dispatchEvent(new Event('authChange')); // مطلع کردن هدر
      } else if (email !== '' && password !== '') {
        // هر یوزرنیم و پسورد دیگری به عنوان کاربر عادی وارد می‌شود
        localStorage.setItem('userRole', 'user');
        localStorage.setItem('userName', email);
        navigate('/user');
        window.dispatchEvent(new Event('authChange')); // مطلع کردن هدر
      } else {
        setError('لطفاً فیلدها را به درستی پر کنید.');
      }
    } else {
      if (!email || !password || !name) {
        setError('لطفاً تمامی فیلدها را پر کنید.');
        return;
      }
      alert('ثبت‌نام موفقیت‌آمیز بود! اکنون می‌توانید وارد شوید.');
      setIsLogin(true);
    }
  };

  return (
    <div className={styles.authContainer} dir="rtl">
      <div className={styles.authCard}>
        <h2 className={styles.authTitle}>{isLogin ? 'ورود به حساب' : 'عضویت در سایت'}</h2>
        <p className={styles.authSubtitle}>
          {isLogin ? 'مشخصات خود را وارد کنید (وارد کردن admin / admin برای ورود به پنل مدیریت)' : 'فرم زیر را پر کنید.'}
        </p>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className={styles.formGroup}>
              <label className={styles.label}>نام و نام خانوادگی</label>
              <input
                type="text"
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="رضا قاضی‌خانی"
              />
            </div>
          )}

          <div className={styles.formGroup}>
            <label className={styles.label}>ایمیل یا نام کاربری</label>
            <input
              type="text"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="نام کاربری شما..."
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>رمز عبور</label>
            <input
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            {isLogin ? 'ورود به حساب' : 'ثبت نام'}
          </button>
        </form>

        <p className={styles.toggleText}>
          {isLogin ? 'حساب کاربری ندارید؟' : 'قبلاً ثبت‌نام کرده‌اید؟'}
          <button
            type="button"
            className={styles.toggleLink}
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
          >
            {isLogin ? 'ساخت حساب جدید' : 'ورود به حساب'}
          </button>
        </p>
      </div>
    </div>
  );
}