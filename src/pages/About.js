import React, { useRef, useEffect } from 'react';
import { chefs } from '../data';

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

const features = [
  { icon: '🌿', title: 'Farm to Table', desc: 'Fresh, seasonal & locally sourced from trusted nearby farms.' },
  { icon: '👨‍🍳', title: 'Expert Chefs', desc: 'Trained in classic Italian cuisine across Michelin-starred kitchens.' },
  { icon: '☕', title: 'Artisan Coffee', desc: 'Single-origin beans, roasted fresh and brewed with precision.' },
  { icon: '🎶', title: 'Live Music', desc: 'Every Friday & Saturday night — jazz, acoustic, soul.' },
];

export default function About() {
  return (
    <main className="about-page">
      {/* Hero */}
      <div className="about-hero">
        <div className="about-hero-bg">
          <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&q=80" alt="Restaurant interior" />
        </div>
        <div className="about-hero-content">
          <Reveal>
            <span className="section-label">Our Story</span>
            <h1 className="section-title">More Than a Meal,<br />It's an Experience</h1>
            <p className="section-desc">Founded in 2012, Bella Vista was born from a passion for authentic flavours and genuine hospitality.</p>
          </Reveal>
        </div>
      </div>

      {/* Story Section */}
      <div className="about-story">
        <Reveal>
          <div className="about-img-wrap">
            <img
              className="about-img-main"
              src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&q=80"
              alt="Chef cooking"
            />
            <div className="about-award">
              <div className="award-icon">🏆</div>
              <span className="award-val">Best Café</span>
              <div className="award-txt">City Choice 2024</div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <span className="section-label">Who We Are</span>
          <h2 className="section-title">Rooted in Tradition,<br />Driven by Craft</h2>
          <p className="section-desc" style={{ marginBottom: '1rem' }}>
            We believe every visit should feel like coming home — warm, unhurried, and deeply satisfying. Our kitchen blends classic Italian technique with modern sensibility, celebrating the very best seasonal produce.
          </p>
          <p className="section-desc">
            From our handmade pasta to our single-origin espresso, every detail is considered. That's why our guests keep coming back.
          </p>

          <div className="about-features-grid">
            {features.map((f, i) => (
              <div className="feat-card" key={i}>
                <div className="feat-icon">{f.icon}</div>
                <div className="feat-title">{f.title}</div>
                <div className="feat-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Chefs */}
      <div className="chef-section">
        <Reveal>
          <span className="section-label">The Team</span>
          <h2 className="section-title">Meet the Chefs</h2>
          <p className="section-desc">The talented people who make every dish extraordinary.</p>
        </Reveal>
        <div className="chefs-grid">
          {chefs.map((chef, i) => (
            <Reveal key={chef.id} delay={i * 80}>
              <div className="chef-card">
                <div className="chef-img">
                  <img src={chef.img} alt={chef.name} loading="lazy" />
                </div>
                <div className="chef-info">
                  <div className="chef-name">{chef.name}</div>
                  <div className="chef-role">{chef.role}</div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.5rem', lineHeight: 1.5 }}>{chef.bio}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}