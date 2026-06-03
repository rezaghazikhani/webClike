import { useState, useEffect } from 'react';
import { getResumeData } from '../data/resumeData';

export default function AboutSection() {
  const [data, setData] = useState(getResumeData());

  // شنود تغییرات برای آپدیت شدن آنی این بخش
  useEffect(() => {
    const handleDataChange = () => setData(getResumeData());
    window.addEventListener('resumeDataChange', handleDataChange);
    return () => window.removeEventListener('resumeDataChange', handleDataChange);
  }, []);

  // گرفتن داده‌های مربوط به بخش درباره من به صورت کاملاً ایمن
  const info = data?.personalInfo || {};

  return (
    <section dir="rtl" style={{ padding: '2rem 0', borderBottom: '1px solid #44475a' }}>
      <h2 style={{ color: '#ff79c6', marginBottom: '1rem' }}>درباره من</h2>
      <div style={{ background: '#1e1f29', border: '1px solid #44475a', padding: '2rem', borderRadius: '12px' }}>
        <h3 style={{ color: '#50fa7b', marginTop: 0 }}>{info.name || "رضا قاضی‌خانی"}</h3>
        <h4 style={{ color: '#8be9fd', fontWeight: 'normal' }}>{info.title || "توسعه‌دهنده وب / متخصص شبکه"}</h4>
        <p style={{ color: '#f8f8f2', lineHeight: '1.8', marginTop: '1rem' }}>
          {info.bio || "اطلاعات بیوگرافی ثبت نشده است."}
        </p>
        
        {info.skills && info.skills.length > 0 && (
          <div style={{ marginTop: '1.5rem' }}>
            <h5 style={{ color: '#ffb86c', marginBottom: '0.5rem', fontSize: '1rem' }}>مهارت‌های تخصصی:</h5>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {info.skills.map((skill, index) => (
                <span key={index} style={{ backgroundColor: '#44475a', color: '#f8f8f2', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.85rem' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}