import React, { useRef, useEffect, useState } from 'react';
import { galleryImages } from '../data';

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <main className="gallery-page">
      <Reveal>
        <span className="section-label">Visual Menu</span>
        <h1 className="section-title">A Feast for the Eyes</h1>
        <p className="section-desc">Every corner of Bella Vista, every dish that leaves our kitchen — captured for you.</p>
      </Reveal>

      <Reveal delay={100}>
        <div className="gallery-grid-main">
          {galleryImages.map(img => (
            <div
              key={img.id}
              className={`g-item${img.wide ? ' wide' : ''}${img.tall ? ' tall' : ''}`}
              onClick={() => setLightbox(img)}
              style={{ cursor: 'zoom-in' }}
            >
              <img src={img.src} alt={img.label} loading="lazy" />
              <div className="g-overlay">
                <span className="g-label">{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)',
            zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '2rem', cursor: 'zoom-out'
          }}
        >
          <img
            src={lightbox.src.replace('w=600', 'w=1200').replace('w=900', 'w=1400')}
            alt={lightbox.label}
            style={{ maxWidth: '90vw', maxHeight: '85vh', borderRadius: '12px', objectFit: 'contain' }}
            onClick={e => e.stopPropagation()}
          />
          <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', color: '#fff', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {lightbox.label}
          </div>
          <button
            onClick={() => setLightbox(null)}
            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}
          >✕</button>
        </div>
      )}
    </main>
  );
}