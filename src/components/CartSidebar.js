import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from './Toast';

export default function CartSidebar() {
  const { items, removeItem, updateQty, total, count, isOpen, setIsOpen, clearCart } = useCart();
  const showToast = useToast();

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setIsOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const service = total * 0.1;
  const grandTotal = total + service;

  return (
    <>
      <div className={`cart-overlay${isOpen ? ' open' : ''}`} onClick={() => setIsOpen(false)} />
      <div className={`cart-sidebar${isOpen ? ' open' : ''}`} role="dialog" aria-label="Your order">

        <div className="cart-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
            <h3 style={{ margin: 0 }}>Your Order</h3>
            {count > 0 && (
              <span style={{ background: 'var(--gold)', color: 'var(--dark)', fontSize: '0.7rem', fontWeight: 700, width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{count}</span>
            )}
          </div>
          <button className="cart-close" onClick={() => setIsOpen(false)}>✕</button>
        </div>

        <div className="cart-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🛒</span>
              <p style={{ fontWeight: 500, color: 'var(--espresso)', marginBottom: '0.4rem', fontSize: '0.95rem' }}>Your cart is empty</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.5 }}>Browse the menu and add your favourite dishes.</p>
            </div>
          ) : (
            <>
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-emoji">{item.emoji}</div>
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-price">${(item.price * item.qty).toFixed(2)}</div>
                    <div className="cart-item-qty">
                      <button className="qty-btn" onClick={() => { if (item.qty === 1) { removeItem(item.id); showToast('Removed ' + item.name); } else { updateQty(item.id, -1); } }}>−</button>
                      <span className="qty-num">{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                    </div>
                  </div>
                  <button className="cart-remove" onClick={() => { removeItem(item.id); showToast('Removed ' + item.name); }}>✕</button>
                </div>
              ))}
              <button onClick={() => { clearCart(); showToast('Order cleared'); }} style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: '0.75rem', cursor: 'pointer', marginTop: '0.5rem', padding: '0.3rem 0', textDecoration: 'underline', fontFamily: 'var(--font-sans)' }}>
                Clear all items
              </button>
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal"><span>Subtotal ({count} item{count !== 1 ? 's' : ''})</span><span>${total.toFixed(2)}</span></div>
            <div className="cart-subtotal"><span>Service charge (10%)</span><span>${service.toFixed(2)}</span></div>
            <div className="cart-total"><span>Estimated Total</span><span>${grandTotal.toFixed(2)}</span></div>
            <div style={{ background: 'var(--warm)', border: '1px solid var(--border)', borderRadius: '10px', padding: '0.85rem 1rem', marginBottom: '1rem', display: 'flex', gap: '0.7rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>ℹ️</span>
              <div>
                <p style={{ fontSize: '0.78rem', color: 'var(--espresso)', fontWeight: 500, marginBottom: '0.2rem' }}>Pay at the counter</p>
                <p style={{ fontSize: '0.74rem', color: 'var(--muted)', lineHeight: 1.5 }}>We accept cash, card & contactless. Your order will be confirmed by our team when you arrive.</p>
              </div>
            </div>
            <button className="checkout-btn" onClick={() => { clearCart(); setIsOpen(false); showToast('✅ Order received! Please pay at the counter.'); }}>
              Confirm Order — ${grandTotal.toFixed(2)}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
