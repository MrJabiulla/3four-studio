// ============================================================
// VIEW-MODELS — state, logic, derived data
// Pure hooks, zero JSX
// ============================================================

import { useState, useEffect, useCallback } from 'react';

// ── Nav ViewModel ────────────────────────────
export function useNavViewModel() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const toggleMenu = useCallback(() => setMenuOpen(v => !v), []);
  const closeMenu  = useCallback(() => setMenuOpen(false), []);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    closeMenu();
  }, [closeMenu]);

  return { scrolled, menuOpen, toggleMenu, closeMenu, scrollTo };
}

// ── Contact ViewModel ────────────────────────
export function useContactViewModel() {
  const [form,        setForm]        = useState({ name: '', email: '', message: '' });
  const [status,      setStatus]      = useState('idle'); // idle | sending | sent
  const [activeField, setActiveField] = useState(null);

  const handleChange = useCallback((e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value })), []);

  const handleSubmit = useCallback(() => {
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    // Replace with real API call:
    // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) })
    setTimeout(() => setStatus('sent'), 1500);
  }, [form]);

  const isValid    = !!(form.name && form.email && form.message);
  const isSending  = status === 'sending';
  const isSent     = status === 'sent';

  return { form, status, isValid, isSending, isSent, activeField, setActiveField, handleChange, handleSubmit };
}

// ── Testimonial ViewModel ────────────────────
export function useTestimonialViewModel(items) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % items.length), 4500);
    return () => clearInterval(timer);
  }, [items.length]);

  const goTo    = useCallback(i => setIndex(i), []);
  const current = items[index];

  return { current, index, goTo, total: items.length };
}

// ── Service Card ViewModel ───────────────────
export function useHoverViewModel() {
  const [hovered, setHovered] = useState(false);
  const onEnter = useCallback(() => setHovered(true),  []);
  const onLeave = useCallback(() => setHovered(false), []);
  return { hovered, onEnter, onLeave };
}
