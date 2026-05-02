// ============================================================
// VIEW — Services  (scroll-animated, redesigned)
// ============================================================

import { useRef, useEffect, useState } from 'react';
import { Model } from '../model.js';
import { T } from '../tokens.js';

// ── intersection hook ────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ── service icons ────────────────────────────────────────────
const icons = {
  '01': () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  '02': () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  ),
  '03': () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
    </svg>
  ),
  '04': () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  '05': () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    </svg>
  ),
  '06': () => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/>
      <line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
    </svg>
  ),
};

// ── arrow icon ───────────────────────────────────────────────
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

// ── service card ─────────────────────────────────────────────
function ServiceCard({ service, index, visible }) {
  const [hovered, setHovered] = useState(false);
  const Icon = icons[service.num];

  return (
    <div
      className={visible ? 'svc-card-visible' : 'svc-card-hidden'}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        animationDelay: `${index * 0.1}s`,
        position: 'relative',
        padding: '40px 36px 36px',
        background: hovered ? T.surfaceHov : T.surface,
        border: `1px solid ${hovered ? `${T.accent}30` : T.border}`,
        borderRadius: 16,
        cursor: 'default',
        overflow: 'hidden',
        transition: 'background 0.3s ease, border-color 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? `0 24px 48px rgba(0,0,0,0.4), 0 0 0 1px ${T.accent}20` : '0 4px 16px rgba(0,0,0,0.2)',
      }}
    >
      {/* Corner glow on hover */}
      <div style={{
        position: 'absolute', right: -60, top: -60,
        width: 180, height: 180, borderRadius: '50%',
        background: T.accent,
        filter: 'blur(60px)',
        opacity: hovered ? 0.08 : 0,
        transition: 'opacity 0.4s ease',
        pointerEvents: 'none',
      }} />

      {/* Large faded number */}
      <div style={{
        position: 'absolute', top: 20, right: 24,
        fontFamily: T.fontDisplay,
        fontWeight: T.weightBlack,
        fontSize: 64,
        color: hovered ? `${T.accent}20` : `${T.white}06`,
        lineHeight: 1,
        transition: 'color 0.3s ease',
        userSelect: 'none',
        letterSpacing: '-0.05em',
      }}>
        {service.num}
      </div>

      {/* Icon container */}
      <div style={{
        width: 52, height: 52, borderRadius: 14,
        background: hovered ? `${T.accent}18` : `${T.white}06`,
        border: `1px solid ${hovered ? `${T.accent}40` : `${T.white}08`}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: hovered ? T.accent : T.mutedLight,
        marginBottom: 28,
        transition: 'background 0.3s ease, border-color 0.3s ease, color 0.3s ease, transform 0.3s ease',
        transform: hovered ? 'scale(1.1) rotate(-4deg)' : 'scale(1) rotate(0deg)',
      }}>
        <Icon />
      </div>

      {/* Service number label */}
      <div style={{
        fontFamily: T.fontMono,
        fontSize: 10,
        color: T.accent,
        letterSpacing: '0.2em',
        marginBottom: 12,
        textTransform: 'uppercase',
      }}>
        {service.num}
      </div>

      <h3 style={{
        fontFamily: T.fontDisplay,
        fontWeight: T.weightBlack,
        fontSize: 20,
        color: T.white,
        marginBottom: 14,
        letterSpacing: '-0.01em',
        lineHeight: 1.2,
      }}>
        {service.title}
      </h3>

      <p style={{
        fontFamily: T.fontBody,
        fontWeight: T.weightRegular,
        fontSize: 14,
        color: T.muted,
        lineHeight: 1.8,
        marginBottom: 28,
      }}>
        {service.desc}
      </p>

      {/* Learn more row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        color: hovered ? T.accent : T.muted,
        fontFamily: T.fontMono,
        fontSize: 11,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        transition: 'color 0.3s ease, gap 0.3s ease',
        gap: hovered ? 10 : 6,
      }}>
        <span>Learn more</span>
        <span style={{
          transform: hovered ? 'translateX(4px)' : 'translateX(0)',
          transition: 'transform 0.3s ease',
          display: 'flex',
        }}>
          <ArrowRight />
        </span>
      </div>

      {/* Bottom accent line */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 2,
        background: `linear-gradient(90deg, ${T.accent}, ${T.accent}00)`,
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
      }} />
    </div>
  );
}

// ── section header with inview ────────────────────────────────
function AnimatedHeader() {
  const [ref, visible] = useInView(0.3);
  return (
    <div ref={ref} style={{ marginBottom: 68 }}>
      <div
        className={visible ? 'svc-header-visible' : 'svc-header-hidden'}
        style={{ animationDelay: '0s' }}
      >
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 12,
          marginBottom: 20,
        }}>
          <div style={{ width: 32, height: 1, background: T.accent }} />
          <span style={{
            fontFamily: T.fontMono, fontSize: 11,
            color: T.accent, letterSpacing: '0.2em', textTransform: 'uppercase',
          }}>
            What We Do
          </span>
        </div>
        <h2 style={{
          fontFamily: T.fontDisplay,
          fontWeight: T.weightBlack,
          fontSize: 'clamp(32px, 4vw, 60px)',
          color: T.white,
          letterSpacing: '-0.03em',
          lineHeight: 1.0,
          maxWidth: 560,
        }}>
          Crafted services for<br />
          <span style={{ color: T.accent }}>digital ambition.</span>
        </h2>
      </div>
    </div>
  );
}

// ── main component ───────────────────────────────────────────
export default function Services() {
  const [gridRef, gridVisible] = useInView(0.05);

  return (
    <section id="services" style={{ padding: '120px 64px', background: T.bg, position: 'relative', overflow: 'hidden' }}>

      {/* Subtle top border gradient */}
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%',
        height: 1,
        background: `linear-gradient(90deg, transparent, ${T.border}, transparent)`,
      }} />

      {/* Background glow */}
      <div style={{
        position: 'absolute', left: -200, top: '30%',
        width: 500, height: 500, borderRadius: '50%',
        background: T.accent, filter: 'blur(150px)',
        opacity: 0.03, pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <AnimatedHeader />

        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 20,
          }}
        >
          {Model.services.map((s, i) => (
            <ServiceCard key={s.num} service={s} index={i} visible={gridVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
