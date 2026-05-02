// ============================================================
// SHARED VIEW COMPONENTS
// Pure presentational, no state
// ============================================================

import { T } from '../tokens.js';

export function SectionHeader({ eyebrow, title, center }) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left' }}>
      <div style={{
        fontFamily: T.fontMono,
        fontSize: 11,
        fontWeight: T.weightRegular,
        color: T.accent,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        marginBottom: 18,
      }}>
        {eyebrow}
      </div>
      <h2 style={{
        fontFamily: T.fontDisplay,
        fontWeight: T.weightBlack,
        fontSize: 'clamp(28px, 3.5vw, 54px)',
        color: T.white,
        letterSpacing: '-0.025em',
        lineHeight: 1.05,
      }}>
        {title}
      </h2>
    </div>
  );
}

export function RedLine({ vertical, size = 4 }) {
  return (
    <div style={vertical
      ? { position: 'absolute', left: 0, top: 0, bottom: 0, width: size, background: T.accent }
      : { position: 'absolute', top: 0, left: 0, right: 0, height: size, background: T.accent }
    } />
  );
}

export function Badge({ children }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      background: `${T.accent}18`,
      border: `1px solid ${T.accent}50`,
      borderRadius: 30,
      padding: '6px 16px',
    }}>
      <span style={{
        width: 7, height: 7, borderRadius: '50%',
        background: T.accent,
        display: 'inline-block',
        boxShadow: `0 0 8px ${T.accent}`,
      }} />
      <span style={{
        fontFamily: T.fontMono,
        fontSize: 11,
        color: T.accent,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
      }}>
        {children}
      </span>
    </div>
  );
}

export function PrimaryButton({ children, onClick }) {
  const handleEnter = e => {
    e.currentTarget.style.background    = T.accentD;
    e.currentTarget.style.transform     = 'translateY(-2px)';
    e.currentTarget.style.boxShadow     = `0 10px 32px ${T.accent}55`;
  };
  const handleLeave = e => {
    e.currentTarget.style.background    = T.accent;
    e.currentTarget.style.transform     = 'translateY(0)';
    e.currentTarget.style.boxShadow     = 'none';
  };
  return (
    <button onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        background: T.accent, color: '#fff', border: 'none', cursor: 'pointer',
        padding: '15px 38px',
        fontFamily: T.fontDisplay,
        fontWeight: T.weightBold,
        fontSize: 14,
        letterSpacing: '0.07em',
        textTransform: 'uppercase',
        borderRadius: T.radius,
        transition: T.transition,
      }}
    >{children}</button>
  );
}

export function OutlineButton({ children, onClick }) {
  const handleEnter = e => {
    e.currentTarget.style.borderColor = T.accent;
    e.currentTarget.style.color       = T.accent;
  };
  const handleLeave = e => {
    e.currentTarget.style.borderColor = T.border;
    e.currentTarget.style.color       = T.white;
  };
  return (
    <button onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        background: 'transparent', color: T.white,
        border: `1px solid ${T.border}`,
        cursor: 'pointer',
        padding: '15px 38px',
        fontFamily: T.fontDisplay,
        fontWeight: T.weightMedium,
        fontSize: 14,
        letterSpacing: '0.07em',
        textTransform: 'uppercase',
        borderRadius: T.radius,
        transition: T.transition,
      }}
    >{children}</button>
  );
}
