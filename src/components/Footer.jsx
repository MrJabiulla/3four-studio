// ============================================================
// VIEW — Footer
// ============================================================

import { Model } from '../model.js';
import { T } from '../tokens.js';

export default function Footer() {
  return (
    <footer style={{
      borderTop: `1px solid ${T.border}`,
      background: T.bg,
    }}>
      <div className="footer-inner" style={{
        padding: '32px 64px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 20,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src={Model.logo} alt="3Four Studio" style={{ height: 32, width: 32, borderRadius: 6, objectFit: 'cover' }} />
          <span style={{
            fontFamily: T.fontDisplay,
            fontWeight: T.weightBlack,
            fontSize: 15,
            color: T.white,
            letterSpacing: '-0.01em',
          }}>3Four Studio</span>
        </div>

        {/* Copyright */}
        <div style={{
          fontFamily: T.fontMono,
          fontSize: 11,
          color: T.muted,
          letterSpacing: '0.08em',
        }}>
          © {Model.footerYear} · {Model.footerLocation}
        </div>

        {/* Socials */}
        <div style={{ display: 'flex', gap: 26 }}>
          {Model.socials.map(s => (
            <span key={s}
              onMouseEnter={e => e.target.style.color = T.accent}
              onMouseLeave={e => e.target.style.color = T.muted}
              style={{
                fontFamily: T.fontBody,
                fontWeight: T.weightMedium,
                fontSize: 13,
                color: T.muted,
                cursor: 'pointer',
                transition: T.transition,
              }}
            >{s}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
