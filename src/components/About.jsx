// ============================================================
// VIEW — About  (redesigned + animated)
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
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ── capability card icons ────────────────────────────────────
const capIcons = {
  Engineering: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  Design: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
    </svg>
  ),
  Mobile: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  ),
  Strategy: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/>
      <line x1="12" y1="2" x2="12" y2="8"/><line x1="12" y1="16" x2="12" y2="22"/>
      <line x1="2" y1="12" x2="8" y2="12"/><line x1="16" y1="12" x2="22" y2="12"/>
    </svg>
  ),
};

// ── capability card ──────────────────────────────────────────
function CapCard({ label, sub, delay, visible }) {
  const [hov, setHov] = useState(false);
  const Icon = capIcons[label] || capIcons.Strategy;

  return (
    <div
      className={`about-card-hover ${visible ? 'about-right-visible' : 'about-right-hidden'}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        animationDelay: `${delay}s`,
        padding: '28px 24px',
        background: hov ? T.surfaceHov : T.surface,
        border: `1px solid ${hov ? `${T.accent}35` : T.border}`,
        borderRadius: 16,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: hov ? `0 20px 40px rgba(0,0,0,0.35), 0 0 0 1px ${T.accent}15` : '0 4px 12px rgba(0,0,0,0.15)',
        cursor: 'default',
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${T.accent}, ${T.accent}00)`,
        transform: hov ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
      }} />

      {/* Corner glow */}
      <div style={{
        position: 'absolute', right: -40, top: -40,
        width: 120, height: 120, borderRadius: '50%',
        background: T.accent, filter: 'blur(40px)',
        opacity: hov ? 0.1 : 0,
        transition: 'opacity 0.4s ease',
        pointerEvents: 'none',
      }} />

      {/* Icon */}
      <div style={{
        width: 44, height: 44, borderRadius: 12, marginBottom: 20,
        background: hov ? `${T.accent}18` : `${T.white}06`,
        border: `1px solid ${hov ? `${T.accent}35` : `${T.white}08`}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: hov ? T.accent : T.mutedLight,
        transform: hov ? 'scale(1.1) rotate(-5deg)' : 'scale(1) rotate(0)',
        transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
      }}>
        <Icon />
      </div>

      <div style={{
        fontFamily: T.fontDisplay, fontWeight: T.weightBlack,
        fontSize: 16, color: T.white, marginBottom: 8, letterSpacing: '-0.01em',
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: T.fontMono, fontSize: 11,
        color: hov ? T.mutedLight : T.muted,
        letterSpacing: '0.07em', lineHeight: 1.7,
        transition: 'color 0.3s ease',
      }}>
        {sub}
      </div>
    </div>
  );
}

// ── main component ───────────────────────────────────────────
export default function About() {
  const [leftRef,  leftVisible]  = useInView(0.2);
  const [rightRef, rightVisible] = useInView(0.1);

  return (
    <section id="about" style={{ background: T.bg, position: 'relative', overflow: 'hidden' }}>

      {/* Top border */}
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
        background: `linear-gradient(90deg, transparent, ${T.border}, transparent)`,
      }} />

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', left: -150, top: '40%',
        width: 500, height: 500, borderRadius: '50%',
        background: T.accent, filter: 'blur(160px)',
        opacity: 0.04, pointerEvents: 'none',
      }} />

      {/* ── Main split ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 80,
        alignItems: 'start',
        padding: '120px 64px 80px',
        maxWidth: 1200,
        margin: '0 auto',
      }}
        className="about-grid"
      >
        {/* LEFT */}
        <div ref={leftRef}>

          {/* Eyebrow */}
          <div
            className={leftVisible ? 'about-left-visible' : 'about-left-hidden'}
            style={{ animationDelay: '0s', display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 24 }}
          >
            <div style={{ width: 32, height: 1, background: T.accent }} />
            <span style={{ fontFamily: T.fontMono, fontSize: 11, color: T.accent, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              About Us
            </span>
          </div>

          {/* Headline */}
          <div
            className={leftVisible ? 'about-left-visible' : 'about-left-hidden'}
            style={{ animationDelay: '0.1s' }}
          >
            <h2 style={{
              fontFamily: T.fontDisplay, fontWeight: T.weightBlack,
              fontSize: 'clamp(32px, 4vw, 58px)',
              color: T.white, letterSpacing: '-0.03em', lineHeight: 1.0,
              marginBottom: 32,
            }}>
              We Are<br /><span style={{ color: T.accent }}>3Foure Studio</span>
            </h2>
          </div>

          {/* Body copy */}
          {[
            'Founded in Dhaka, 3Foure Studio is a team of engineers, designers, and product thinkers who believe great software is equal parts craft and strategy.',
            'We partner with startups and growth-stage companies to design, build, and ship digital products that are fast, beautiful, and built to last.',
          ].map((text, i) => (
            <p
              key={i}
              className={leftVisible ? 'about-left-visible' : 'about-left-hidden'}
              style={{
                animationDelay: `${0.2 + i * 0.1}s`,
                fontFamily: T.fontBody, fontWeight: T.weightRegular,
                fontSize: 16, color: T.muted, lineHeight: 1.85,
                marginBottom: 20,
              }}
            >
              {text}
            </p>
          ))}

          {/* Highlight box */}
          <div
            className={leftVisible ? 'about-left-visible' : 'about-left-hidden'}
            style={{
              animationDelay: '0.4s',
              borderLeft: `3px solid ${T.accent}`,
              paddingLeft: 20, marginTop: 32, marginBottom: 36,
            }}
          >
            <p style={{
              fontFamily: T.fontBody, fontSize: 15,
              color: T.mutedLight, lineHeight: 1.8, margin: 0,
              fontStyle: 'italic',
            }}>
              "We don't just build software — we build the products our clients are proud to put their name on."
            </p>
          </div>

          {/* Skill tags */}
          <div
            className={leftVisible ? 'about-left-visible' : 'about-left-hidden'}
            style={{ animationDelay: '0.5s', display: 'flex', gap: 8, flexWrap: 'wrap' }}
          >
            {Model.skills.map((tag, i) => (
              <span key={tag} style={{
                fontFamily: T.fontMono, fontSize: 11,
                color: T.accent,
                border: `1px solid ${T.accent}35`,
                borderRadius: 999, padding: '5px 14px',
                letterSpacing: '0.08em',
                background: `${T.accent}08`,
                animationDelay: `${0.5 + i * 0.05}s`,
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT — capability cards */}
        <div ref={rightRef} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, paddingTop: 8 }}>
          {Model.aboutCards.map(({ label, sub }, i) => (
            <CapCard
              key={label}
              label={label}
              sub={sub}
              delay={0.1 + i * 0.1}
              visible={rightVisible}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
