import { useState, useEffect } from 'react';
import { getResumeData } from '../data/resumeData';

export default function ExperienceTimeline() {
  const [data, setData] = useState(getResumeData());

  useEffect(() => {
    const handleDataChange = () => setData(getResumeData());
    window.addEventListener('resumeDataChange', handleDataChange);
    return () => window.removeEventListener('resumeDataChange', handleDataChange);
  }, []);

  const experiences = data?.experience || [];

  return (
    <section dir="rtl" style={{ padding: '2rem 0', borderBottom: '1px solid var(--border-color)' }}>
      <h2 style={{ color: 'var(--text-main)', marginBottom: '2rem', fontSize: '1.3rem', fontWeight: '700' }}>سوابق شغلی</h2>
      
      {experiences.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>هیچ سابقه شغلی ثبت نشده است.</p>
      ) : (
        <div style={{ borderRight: '1px solid var(--border-color)', marginRight: '0.5rem', paddingRight: '1.5rem' }}>
          {experiences.map((exp, index) => (
            <div key={exp.id || index} style={{ position: 'relative', marginBottom: '2.5rem' }}>
              <div style={{
                position: 'absolute',
                right: '-28px',
                top: '6px',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: 'var(--text-main)',
                border: '4px solid var(--bg-main)'
              }} />
              
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', padding: '1.5rem', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h3 style={{ color: 'var(--text-main)', margin: 0, fontSize: '1rem', fontWeight: '700' }}>{exp.role}</h3>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{exp.period}</span>
                </div>
                <h4 style={{ color: 'var(--text-muted)', marginTop: 0, marginBottom: '0.75rem', fontSize: '0.85rem', fontWeight: 'normal' }}>{exp.company}</h4>
                <p style={{ color: 'var(--text-main)', margin: 0, fontSize: '0.85rem', lineHeight: '1.6' }}>
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}