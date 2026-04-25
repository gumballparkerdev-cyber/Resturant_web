import React, { useRef, useEffect } from 'react';
import { reviews } from '../data';

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

const ratingBars = [
  { stars: 5, pct: 87 },
  { stars: 4, pct: 10 },
  { stars: 3, pct: 2 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 0 },
];

export default function Reviews() {
  return (
    <main className="reviews-page">
      <Reveal>
        <span className="section-label">Guest Experiences</span>
        <h1 className="section-title light">What Our Guests Say</h1>
        <p className="section-desc" style={{ color: 'rgba(253,246,236,0.55)', marginBottom: '2.5rem' }}>
          Over 1,200 verified reviews from Google, TripAdvisor & Yelp.
        </p>
      </Reveal>

      <Reveal delay={80}>
        <div className="rating-summary">
          <div style={{ textAlign: 'center' }}>
            <div className="rating-big">4.9</div>
            <span className="rating-stars-big">★★★★★</span>
            <div className="rating-count">1,240 reviews</div>
          </div>
          <div className="rating-bars">
            {ratingBars.map(row => (
              <div className="rating-bar-row" key={row.stars}>
                <span style={{ minWidth: '40px' }}>{row.stars} ★</span>
                <div className="rating-bar-track">
                  <div className="rating-bar-fill" style={{ width: `${row.pct}%` }} />
                </div>
                <span style={{ minWidth: '35px', textAlign: 'right' }}>{row.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="reviews-grid-main">
        {reviews.map((r, i) => (
          <Reveal key={r.id} delay={i * 60}>
            <div className="review-card">
              <div className="review-stars">{'★'.repeat(r.rating)}</div>
              <p className="review-text">"{r.text}"</p>
              <div className="reviewer">
                <div className="reviewer-av">
                  <img src={r.avatar} alt={r.name} />
                </div>
                <div>
                  <div className="reviewer-name">{r.name}</div>
                  <div className="reviewer-meta">{r.date}</div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </main>
  );
}