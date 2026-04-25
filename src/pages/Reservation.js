import React, { useState, useRef, useEffect } from 'react';
import { useToast } from '../components/Toast';

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

const timeSlots = ['12:00 PM','12:30 PM','1:00 PM','1:30 PM','2:00 PM','6:00 PM','6:30 PM','7:00 PM','7:30 PM','8:00 PM','8:30 PM','9:00 PM'];
const guestOptions = ['1 Guest','2 Guests','3 Guests','4 Guests','5 Guests','6 Guests','7 Guests','8+ Guests'];
const occasions = ['','Birthday','Anniversary','Business Dinner','Date Night','Family Gathering','Proposal','Other'];

const today = new Date().toISOString().split('T')[0];

const genRef = () => 'BV' + Math.random().toString(36).substring(2,6).toUpperCase() + Date.now().toString().slice(-4);

export default function Reservation() {
  const showToast = useToast();
  const [step, setStep] = useState(1); // 1 = form, 2 = confirmed
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [bookingRef, setBookingRef] = useState('');
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    date: '', time: '7:00 PM', guests: '2 Guests', occasion: '', notes: ''
  });

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setErrors(errs => ({ ...errs, [e.target.name]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = 'Required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email required';
    if (!form.date) errs.date = 'Please select a date';
    if (!form.phone.trim()) errs.phone = 'Required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); showToast('⚠️ Please fix the highlighted fields.'); return; }
    setLoading(true);
    setTimeout(() => {
      const ref = genRef();
      setBookingRef(ref);
      setLoading(false);
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1400);
  };

  const handleNewBooking = () => {
    setForm({ firstName: '', lastName: '', email: '', phone: '', date: '', time: '7:00 PM', guests: '2 Guests', occasion: '', notes: '' });
    setErrors({});
    setStep(1);
  };

  return (
    <main className="reservation-page">

      {step === 2 ? (
        // ===== CONFIRMATION =====
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '2rem 1rem' }}>
          <Reveal>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
            <span className="section-label">Booking Confirmed</span>
            <h1 className="section-title" style={{ marginBottom: '0.6rem' }}>See You Soon, {form.firstName}!</h1>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              Your reservation has been received. We'll have your table ready and waiting.
            </p>

            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '18px', padding: '2rem', marginBottom: '2rem', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Booking Reference</span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--gold)', fontWeight: 700, letterSpacing: '0.1em' }}>{bookingRef}</span>
              </div>
              {[
                { icon: '👤', label: 'Name', val: `${form.firstName} ${form.lastName}` },
                { icon: '📅', label: 'Date', val: new Date(form.date + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) },
                { icon: '🕐', label: 'Time', val: form.time },
                { icon: '👥', label: 'Guests', val: form.guests },
                { icon: '✉️', label: 'Email', val: form.email },
                ...(form.occasion ? [{ icon: '🎊', label: 'Occasion', val: form.occasion }] : []),
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.9rem' }}>
                  <span style={{ fontSize: '1rem', width: '20px', textAlign: 'center' }}>{row.icon}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--muted)', minWidth: '60px' }}>{row.label}</span>
                  <span style={{ fontSize: '0.88rem', color: 'var(--espresso)', fontWeight: 500 }}>{row.val}</span>
                </div>
              ))}
            </div>

            <div style={{ background: 'var(--warm)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.1rem 1.3rem', marginBottom: '2rem', textAlign: 'left', display: 'flex', gap: '0.8rem' }}>
              <span style={{ fontSize: '1.1rem' }}>📋</span>
              <div>
                <p style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--espresso)', marginBottom: '0.25rem' }}>What to expect</p>
                <p style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.55 }}>
                  We'll hold your table for 15 minutes after your booking time. If you need to cancel or modify, please call us at <strong>+1 (555) 987-6543</strong> at least 2 hours in advance.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn-gold" onClick={handleNewBooking}>Make Another Booking</button>
              <a href="tel:+15559876543" className="btn-outline">Call Us</a>
            </div>
          </Reveal>
        </div>

      ) : (
        // ===== FORM =====
        <>
          <Reveal>
            <span className="section-label">Reserve a Table</span>
            <h1 className="section-title">Book Your Perfect Evening</h1>
            <p className="section-desc" style={{ marginBottom: '3rem' }}>
              Reservations recommended, especially on weekends. Parties of 8 or more, please call us directly.
            </p>
          </Reveal>

          <div className="reservation-inner">

            {/* Form card */}
            <Reveal delay={60}>
              <div className="res-form-card">
                <h3>Reservation Details</h3>
                <form onSubmit={handleSubmit} noValidate>

                  <div className="form-row-grid">
                    <div className="form-group">
                      <label>First Name <span style={{ color: 'var(--rust)' }}>*</span></label>
                      <input name="firstName" placeholder="Sofia" value={form.firstName} onChange={handleChange} style={errors.firstName ? { borderColor: 'var(--rust)' } : {}} />
                      {errors.firstName && <span style={{ fontSize: '0.72rem', color: 'var(--rust)' }}>{errors.firstName}</span>}
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input name="lastName" placeholder="Lentini" value={form.lastName} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="form-row-grid">
                    <div className="form-group">
                      <label>Email <span style={{ color: 'var(--rust)' }}>*</span></label>
                      <input name="email" type="email" placeholder="sofia@email.com" value={form.email} onChange={handleChange} style={errors.email ? { borderColor: 'var(--rust)' } : {}} />
                      {errors.email && <span style={{ fontSize: '0.72rem', color: 'var(--rust)' }}>{errors.email}</span>}
                    </div>
                    <div className="form-group">
                      <label>Phone <span style={{ color: 'var(--rust)' }}>*</span></label>
                      <input name="phone" type="tel" placeholder="+1 555 000 0000" value={form.phone} onChange={handleChange} style={errors.phone ? { borderColor: 'var(--rust)' } : {}} />
                      {errors.phone && <span style={{ fontSize: '0.72rem', color: 'var(--rust)' }}>{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="form-row-grid">
                    <div className="form-group">
                      <label>Date <span style={{ color: 'var(--rust)' }}>*</span></label>
                      <input name="date" type="date" value={form.date} onChange={handleChange} min={today} style={errors.date ? { borderColor: 'var(--rust)' } : {}} />
                      {errors.date && <span style={{ fontSize: '0.72rem', color: 'var(--rust)' }}>{errors.date}</span>}
                    </div>
                    <div className="form-group">
                      <label>Time</label>
                      <select name="time" value={form.time} onChange={handleChange}>
                        {timeSlots.map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="form-row-grid">
                    <div className="form-group">
                      <label>Number of Guests</label>
                      <select name="guests" value={form.guests} onChange={handleChange}>
                        {guestOptions.map(g => <option key={g}>{g}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Occasion <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>(optional)</span></label>
                      <select name="occasion" value={form.occasion} onChange={handleChange}>
                        {occasions.map(o => <option key={o} value={o}>{o || 'Select occasion'}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Special Requests <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>(optional)</span></label>
                    <textarea name="notes" placeholder="Dietary requirements, allergies, seating preferences, high chair needed..." value={form.notes} onChange={handleChange} />
                  </div>

                  <button
                    type="submit"
                    className="btn-gold"
                    disabled={loading}
                    style={{ width: '100%', justifyContent: 'center', padding: '1rem', marginTop: '0.5rem', opacity: loading ? 0.7 : 1, cursor: loading ? 'wait' : 'pointer' }}
                  >
                    {loading ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span style={{ width: '16px', height: '16px', border: '2px solid rgba(253,246,236,0.4)', borderTopColor: 'var(--cream)', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                        Confirming your reservation…
                      </span>
                    ) : 'Confirm Reservation →'}
                  </button>

                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </form>
              </div>
            </Reveal>

            {/* Info panel */}
            <Reveal delay={120}>
              <div className="res-info">
                <h3>Plan Your Visit</h3>
                <p className="section-desc" style={{ marginBottom: '2rem' }}>Everything you need to find us and make the most of your evening at Bella Vista.</p>

                <div className="res-info-items">
                  <div className="ri-item">
                    <div className="ri-icon">📍</div>
                    <div>
                      <div className="ri-title">Location</div>
                      <div className="ri-val">14 Via Roma, City Centre<br />Near Central Station, Ground Floor</div>
                    </div>
                  </div>
                  <div className="ri-item">
                    <div className="ri-icon">🕐</div>
                    <div>
                      <div className="ri-title">Opening Hours</div>
                      <div className="ri-val">Monday – Thursday: 8am – 10pm<br />Friday – Sunday: 8am – 11pm</div>
                    </div>
                  </div>
                  <div className="ri-item">
                    <div className="ri-icon">📞</div>
                    <div>
                      <div className="ri-title">Call or Email</div>
                      <div className="ri-val"><a href="tel:+15559876543" style={{ color: 'var(--gold)', textDecoration: 'none' }}>+1 (555) 987-6543</a><br /><a href="mailto:hello@bellavista.com" style={{ color: 'var(--gold)', textDecoration: 'none' }}>hello@bellavista.com</a></div>
                    </div>
                  </div>
                  <div className="ri-item">
                    <div className="ri-icon">🅿️</div>
                    <div>
                      <div className="ri-title">Parking & Access</div>
                      <div className="ri-val">Free valet after 6pm · Street parking nearby<br />Fully wheelchair accessible</div>
                    </div>
                  </div>
                  <div className="ri-item">
                    <div className="ri-icon">⚠️</div>
                    <div>
                      <div className="ri-title">Cancellation Policy</div>
                      <div className="ri-val">Free cancellation up to 2 hours before your reservation time.</div>
                    </div>
                  </div>
                </div>

                {/* Map placeholder - replace with Google Maps embed in production */}
                <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)', height: '200px', background: 'var(--warm)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '2.5rem' }}>📍</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--muted)', letterSpacing: '0.06em' }}>14 Via Roma, City Centre</span>
                  <a href="https://maps.google.com" target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', color: 'var(--gold)', textDecoration: 'none', letterSpacing: '0.06em' }}>Open in Google Maps →</a>
                </div>
              </div>
            </Reveal>

          </div>
        </>
      )}
    </main>
  );
}