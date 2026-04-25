import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { count, setIsOpen } = useCart();
  const { dark, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMobileOpen(false);

  return (
    <nav className="navbar-custom" style={scrolled ? { boxShadow: '0 4px 24px rgba(44,26,14,0.10)' } : {}}>
      <Link to="/" className="nav-logo" onClick={closeMenu}>
        Bella<span>Vista</span>
      </Link>

      <ul className={`nav-links-list${mobileOpen ? ' mobile-open' : ''}`}>
        <li><NavLink to="/" end onClick={closeMenu}>Home</NavLink></li>
        <li><NavLink to="/menu" onClick={closeMenu}>Menu</NavLink></li>
        <li><NavLink to="/about" onClick={closeMenu}>About</NavLink></li>
        <li><NavLink to="/gallery" onClick={closeMenu}>Gallery</NavLink></li>
        <li><NavLink to="/reviews" onClick={closeMenu}>Reviews</NavLink></li>
        <li><NavLink to="/reservation" onClick={closeMenu}>Reserve</NavLink></li>
      </ul>

      <div className="nav-actions">
        <button className="dark-toggle" onClick={toggle} title={dark ? 'Light mode' : 'Dark mode'}>
          {dark ? '☀️' : '🌙'}
        </button>
        <button className="cart-btn" onClick={() => { setIsOpen(true); closeMenu(); }}>
          🛒 Cart
          {count > 0 && <span className="cart-badge">{count}</span>}
        </button>
        <button className="hamburger" onClick={() => setMobileOpen(m => !m)}>
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  );
}