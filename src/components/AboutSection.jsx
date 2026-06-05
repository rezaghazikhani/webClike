import { useState, useEffect } from 'react';
import { getResumeData } from '../data/resumeData';

export default function AboutSection() {
  const [data, setData] = useState(getResumeData());

  useEffect(() => {
    const handleDataChange = () => setData(getResumeData());
    window.addEventListener('resumeDataChange', handleDataChange);
    return () => window.removeEventListener('resumeDataChange', handleDataChange);
  }, []);

  const info = data?.personalInfo || {};

  return (
    <section dir="rtl" style={{ padding: '2rem 0', borderBottom: '1px solid var(--border-color)' }}>
      <h2 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.3rem', fontWeight: '700' }}>درباره من</h2>
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '2rem', borderRadius: '12px' }}>
        <h3 style={{ color: 'var(--text-main)', marginTop: 0, fontSize: '1.1rem' }}>{info.name || "رضا قاضی‌خانی"}</h3>
        <h4 style={{ color: 'var(--text-muted)', fontWeight: 'normal', fontSize: '0.85rem', marginTop: '0.25rem' }}>{info.title || "توسعه‌دهنده فرانت‌اند و متخصص شبکه"}</h4>
        <p style={{ color: 'var(--text-main)', lineHeight: '1.8', marginTop: '1.2rem', fontSize: '0.9rem' }}>
          {info.bio || "توسعه‌دهنده علاقه‌مند به دنیای فرانت‌اند و پایش سیستم‌های شبکه و لینوکس."}
        </p>
        
        {info.skills && info.skills.length > 0 && (
          <div style={{ marginTop: '1.5rem' }}>
            <h5 style={{ color: 'var(--text-muted)', marginBottom: '0.75rem', fontSize: '0.8rem', fontWeight: '600' }}>مهارت‌ها:</h5>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {info.skills.map((skill, index) => (
                <span key={index} style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', color: 'var(--text-main)', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.8rem' }}>
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