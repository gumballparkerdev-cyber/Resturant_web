import React from 'react';
import { Link } from 'react-router-dom';

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">

        <div className="footer-brand">
          <h4>Bella<span>Vista</span></h4>
          <p>A modern café & restaurant bringing warmth, authentic flavour, and community together since 2012. Every dish crafted with passion, every guest treated like family.</p>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--gold)', letterSpacing: '0.05em' }}>★★★★★</span>
            <span style={{ fontSize: '0.74rem', color: 'rgba(253,246,236,0.38)', marginLeft: '0.5rem' }}>4.9 · 1,240 Google reviews</span>
          </div>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="soc-btn" aria-label="Facebook">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="soc-btn" aria-label="Instagram">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="soc-btn" aria-label="Twitter / X">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="soc-btn" aria-label="YouTube">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="var(--dark)"/></svg>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h5>Menu</h5>
          <ul>
            <li><Link to="/menu">Breakfast</Link></li>
            <li><Link to="/menu">Lunch</Link></li>
            <li><Link to="/menu">Dinner</Link></li>
            <li><Link to="/menu">Drinks & Wine</Link></li>
            <li><Link to="/menu">Desserts</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Explore</h5>
          <ul>
            <li><Link to="/about">Our Story</Link></li>
            <li><Link to="/about">Meet the Chefs</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/reviews">Guest Reviews</Link></li>
            <li><Link to="/reservation">Reserve a Table</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h5>Find Us</h5>
          <ul>
            <li><a href="https://maps.google.com" target="_blank" rel="noreferrer">14 Via Roma, City Centre</a></li>
            <li><a href="tel:+15559876543">+1 (555) 987-6543</a></li>
            <li><a href="mailto:hello@bellavista.com">hello@bellavista.com</a></li>
            <li><a href="#">Mon – Thu: 8am – 10pm</a></li>
            <li><a href="#">Fri – Sun: 8am – 11pm</a></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <span>© {year} BellaVista Café & Restaurant. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <a href="#" style={{ color: 'rgba(253,246,236,0.22)', fontSize: '0.75rem', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ color: 'rgba(253,246,236,0.22)', fontSize: '0.75rem', textDecoration: 'none' }}>Terms of Use</a>
          <a href="#" style={{ color: 'rgba(253,246,236,0.22)', fontSize: '0.75rem', textDecoration: 'none' }}>Accessibility</a>
        </div>
      </div>
    </footer>
  );
}
