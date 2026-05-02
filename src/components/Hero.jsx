// ============================================================
// VIEW — Hero
// ============================================================

import { Model } from '../model.js';
import { T } from '../tokens.js';
import { Badge, PrimaryButton, OutlineButton } from './Shared.jsx';

export default function Hero({ onCTAClick }) {
  return (
    <section id="hero" style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* Background image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${Model.heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.18)',
      }} />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(130deg, ${T.bg} 0%, transparent 55%, ${T.bg}99 100%)`,
      }} />

      {/* Red left accent bar */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0,
        width: 4, background: T.accent,
      }} />

      {/* Red ambient glow */}
      <div style={{
        position: 'absolute', right: -200, bottom: -200,
        width: 700, height: 700, borderRadius: '50%',
        background: `${T.accent}10`,
        filter: 'blur(100px)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div className="hero-pad" style={{ position: 'relative', padding: '130px 64px 80px', maxWidth: 980 }}>

        <div style={{ marginBottom: 36 }}>
          <Badge>Dhaka-Based Software Studio</Badge>
        </div>

        <h1 style={{
          fontFamily: T.fontDisplay,
          fontWeight: T.weightBlack,
          fontSize: 'clamp(44px, 7vw, 96px)',
          lineHeight: 0.95,
          color: T.white,
          letterSpacing: '-0.03em',
          marginBottom: 32,
        }}>
          We Build Digital<br />
          <span style={{ color: T.accent }}>Products</span> That<br />
          Matter.
        </h1>

        <p style={{
          fontFamily: T.fontBody,
          fontWeight: T.weightRegular,
          fontSize: 'clamp(15px, 1.6vw, 18px)',
          color: T.muted,
          lineHeight: 1.8,
          maxWidth: 520,
          marginBottom: 52,
        }}>{Model.heroSub}</p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <PrimaryButton onClick={() => onCTAClick('work')}>View Our Work</PrimaryButton>
          <OutlineButton onClick={() => onCTAClick('contact')}>Start a Project</OutlineButton>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: -40,
          left: 64,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <div style={{
            width: 1, height: 48,
            background: `linear-gradient(to bottom, ${T.accent}, transparent)`,
          }} />
          <span style={{
            fontFamily: T.fontMono,
            fontSize: 10,
            color: T.muted,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}>Scroll</span>
        </div>
      </div>
    </section>
  );
}
