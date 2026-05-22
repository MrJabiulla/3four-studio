// ============================================================
// VIEW — Nav
// ============================================================

import { Model } from '../model.js';
import { T } from '../tokens.js';

export default function Nav({ vm }) {
  const { scrolled, menuOpen, toggleMenu, scrollTo } = vm;

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 52px', height: 70,
        background: scrolled ? 'rgba(13,13,13,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? `1px solid ${T.border}` : 'none',
        transition: T.transition,
      }}>

        {/* ── Logo ── */}
        <div onClick={() => scrollTo('hero')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
          <img
            src={Model.logo}
            alt="3Four Studio"
            style={{
              height: 40, width: 40,
              objectFit: 'cover',
              borderRadius: 8,
            }}
          />
          <span style={{
            fontFamily: T.fontDisplay,
            fontWeight: T.weightBlack,
            fontSize: 18,
            color: T.white,
            letterSpacing: '-0.01em',
          }}>
            3Four Studio
          </span>
        </div>

        {/* ── Desktop Nav ── */}
        <div className="desktop-nav" style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
          {Model.navLinks.map(link => (
            <button key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              onMouseEnter={e => e.target.style.color = T.white}
              onMouseLeave={e => e.target.style.color = T.muted}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: T.fontBody,
                fontWeight: T.weightMedium,
                fontSize: 13,
                color: T.muted,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                transition: T.transition,
              }}
            >{link}</button>
          ))}

          <button
            onClick={() => scrollTo('contact')}
            onMouseEnter={e => { e.target.style.background = T.accentD; e.target.style.boxShadow = `0 6px 24px ${T.accent}44`; }}
            onMouseLeave={e => { e.target.style.background = T.accent; e.target.style.boxShadow = 'none'; }}
            style={{
              background: T.accent, color: '#fff', border: 'none', cursor: 'pointer',
              padding: '10px 26px',
              fontFamily: T.fontDisplay,
              fontWeight: T.weightBold,
              fontSize: 12,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              borderRadius: T.radius,
              transition: T.transition,
            }}
          >Get in Touch</button>
        </div>

        {/* ── Hamburger ── */}
        <button onClick={toggleMenu} className="hamburger"
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', flexDirection: 'column', gap: 5, padding: 4 }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{ display: 'block', width: 24, height: 1.5, background: T.white }} />
          ))}
        </button>
      </nav>

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, top: 70,
          background: T.bg,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 36, zIndex: 99,
        }}>
          {Model.navLinks.map(link => (
            <button key={link}
              onClick={() => scrollTo(link.toLowerCase())}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: T.fontDisplay,
                fontWeight: T.weightBlack,
                fontSize: 36,
                color: T.white,
                letterSpacing: '-0.01em',
              }}
            >{link}</button>
          ))}
        </div>
      )}
    </>
  );
}
