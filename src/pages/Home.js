import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/Toast';
import { menuItems, galleryImages, reviews, heroImages } from '../data';
import { useReveal } from '../Usereveal';

function RevealSection({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function Home() {
  const { addItem, setIsOpen } = useCart();
  const showToast = useToast();

  const handleAdd = (item) => {
    addItem(item);
    showToast(`✓ ${item.name} added to cart`);
  };

  const featuredMenu = menuItems.slice(0, 4);
  const featuredReviews = reviews.slice(0, 3);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero-section">
        <div className="hero-left">
          <RevealSection>
            <div className="hero-tag">
              <span className="pulse-dot" />
              Open Today · 8am – 11pm
            </div>
            <h1 className="hero-h1">
              Where Every<br /><em>Bite</em> Tells a<br />Story
            </h1>
            <p className="hero-sub">
              A modern café experience crafted with seasonal ingredients, artisan roasts, and warm Italian tradition in the heart of the city.
            </p>
            <div className="hero-btns">
              <Link to="/menu" className="btn-gold">Explore Menu →</Link>
              <Link to="/reservation" className="btn-outline">Book a Table</Link>
            </div>
            <div className="hero-stats">
              <div>
                <span className="stat-num">12+</span>
                <span className="stat-label">Years of taste</span>
              </div>
              <div>
                <span className="stat-num">4.9★</span>
                <span className="stat-label">Google rating</span>
              </div>
              <div>
                <span className="stat-num">80+</span>
                <span className="stat-label">Menu items</span>
              </div>
            </div>
          </RevealSection>
        </div>

        <div className="hero-right">
          <div className="hero-img-grid">
            {heroImages.map((src, i) => (
              <img key={i} src={src} alt="Bella Vista" loading="lazy" />
            ))}
          </div>
          <div className="hero-card">
            <div className="hc-left">
              <div className="hc-title">Bella Vista Restaurant</div>
              <div className="hc-stars">★★★★★</div>
              <div className="hc-sub">4.9 · 1,240 reviews on Google</div>
            </div>
            <span className="open-badge">Open Now</span>
          </div>
        </div>
      </section>

      {/* ===== MENU PREVIEW ===== */}
      <section className="home-menu-preview">
        <RevealSection>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <div>
              <span className="section-label">Our Offerings</span>
              <h2 className="section-title light">Crafted with Passion</h2>
              <p className="section-desc">Every dish prepared fresh daily with locally sourced ingredients.</p>
            </div>
            <Link to="/menu" className="btn-gold">Full Menu →</Link>
          </div>
        </RevealSection>
        <div className="menu-grid">
          {featuredMenu.map((item, i) => (
            <RevealSection key={item.id} delay={i * 80}>
              <div className="menu-card">
                <div className="menu-card-img">
                  <img src={item.img} alt={item.name} loading="lazy" />
                  {item.badge && <span className="menu-badge">{item.badge}</span>}
                </div>
                <div className="menu-card-body">
                  <div className="menu-name">{item.name}</div>
                  <div className="menu-desc">{item.desc}</div>
                  <div className="menu-footer">
                    <span className="menu-price">${item.price.toFixed(2)}</span>
                    <button className="add-btn" onClick={() => handleAdd(item)} title="Add to cart">+</button>
                  </div>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ===== GALLERY STRIP ===== */}
      <section className="home-gallery-preview">
        <RevealSection>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '0' }}>
            <div>
              <span className="section-label">Visual Menu</span>
              <h2 className="section-title">A Feast for the Eyes</h2>
            </div>
            <Link to="/gallery" className="btn-outline">View Gallery →</Link>
          </div>
        </RevealSection>
        <RevealSection delay={100}>
          <div className="home-gallery-strip" style={{ marginTop: '2rem' }}>
            {galleryImages.slice(0, 5).map(img => (
              <div key={img.id} className={`g-item${img.tall ? ' tall' : ''}`}>
                <img src={img.src} alt={img.label} loading="lazy" />
                <div className="g-overlay"><span className="g-label">{img.label}</span></div>
              </div>
            ))}
          </div>
        </RevealSection>
      </section>

      {/* ===== REVIEWS PREVIEW ===== */}
      <section className="home-reviews-preview">
        <RevealSection>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div>
              <span className="section-label">What Guests Say</span>
              <h2 className="section-title light">Loved by the Community</h2>
            </div>
            <Link to="/reviews" className="btn-gold">All Reviews →</Link>
          </div>
        </RevealSection>
        <div className="reviews-grid-main">
          {featuredReviews.map((r, i) => (
            <RevealSection key={r.id} delay={i * 80}>
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
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ===== RESERVATION CTA ===== */}
      <section className="home-reservation-preview">
        <RevealSection>
          <div className="cta-banner">
            <div>
              <h3>Ready for an Unforgettable Evening?</h3>
              <p>Reserve your table now — weekends fill fast. Groups of 6+ welcome.</p>
            </div>
            <Link to="/reservation" className="btn-dark">Reserve a Table →</Link>
          </div>
        </RevealSection>
      </section>
    </>
  );
}