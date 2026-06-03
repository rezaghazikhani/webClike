import React from 'react';

export default function ProjectCard({ title, category, description, tags }) {
  const projectTags = tags || [];

  return (
    <div 
      dir="rtl" 
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        padding: '1.5rem',
        width: '100%',
        maxWidth: '340px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'border-color 0.2s',
        boxSizing: 'border-box'
      }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#44444a'}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
    >
      <div>
        <div style={{ marginBottom: '1rem' }}>
          <span style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.03)', 
            color: 'var(--text-main)', 
            border: '1px solid var(--border-color)',
            padding: '0.2rem 0.6rem', 
            borderRadius: '4px', 
            fontSize: '0.75rem'
          }}>
            {category || 'پروژه'}
          </span>
        </div>

        <h3 style={{ color: 'var(--text-main)', margin: '0 0 0.75rem 0', fontSize: '1.05rem', fontWeight: '700' }}>
          {title}
        </h3>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.6', margin: '0 0 1.5rem 0' }}>
          {description}
        </p>
      </div>

      {projectTags.length > 0 && (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: 'auto' }}>
          {projectTags.map((tag, index) => (
            <span key={index} style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', color: 'var(--text-muted)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem' }}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}