import React, { useState, useRef, useEffect } from 'react';
import { menuItems, menuCategories } from '../data';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/Toast';

function RevealItem({ children, delay = 0 }) {
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

export default function Menu() {
  const [activeTab, setActiveTab] = useState('all');
  const { addItem } = useCart();
  const showToast = useToast();

  const filtered = activeTab === 'all' ? menuItems : menuItems.filter(i => i.cat === activeTab);

  const handleAdd = (item) => {
    addItem(item);
    showToast(`✓ ${item.name} added to cart`);
  };

  return (
    <main className="menu-page">
      <RevealItem>
        <span className="section-label">Our Offerings</span>
        <h1 className="section-title light">The Full Menu</h1>
        <p className="section-desc">Every dish prepared fresh daily with locally sourced, seasonal ingredients and Italian tradition.</p>
      </RevealItem>

      <div className="menu-tabs">
        {menuCategories.map(cat => (
          <button
            key={cat.key}
            className={`menu-tab${activeTab === cat.key ? ' active' : ''}`}
            onClick={() => setActiveTab(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {filtered.map((item, i) => (
          <RevealItem key={item.id} delay={i * 60}>
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
                  <button className="add-btn" onClick={() => handleAdd(item)} title={`Add ${item.name} to cart`}>+</button>
                </div>
              </div>
            </div>
          </RevealItem>
        ))}
      </div>
    </main>
  );
}