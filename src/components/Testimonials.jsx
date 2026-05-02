// ============================================================
// VIEW — Testimonials
// ============================================================

import { Model } from '../model.js';
import { T } from '../tokens.js';

export default function Testimonials({ vm }) {
  const { current, index, goTo } = vm;

  return (
    <section className="section-pad" style={{
      padding: '100px 64px',
      background: T.surface,
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%,-50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: `${T.accent}07`,
        filter: 'blur(80px)',
        pointerEvents: 'none',
      }} />

      <div style={{
        fontFamily: T.fontMono,
        fontSize: 11,
        color: T.accent,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        marginBottom: 52,
      }}>What Clients Say</div>

      {/* Big quote mark */}
      <div style={{
        fontSize: 80, lineHeight: 1,
        color: T.accent, opacity: 0.25,
        fontFamily: 'Georgia, serif',
        marginBottom: 16,
        userSelect: 'none',
      }}>"</div>

      <blockquote style={{
        fontFamily: T.fontDisplay,
        fontWeight: T.weightBlack,
        fontSize: 'clamp(20px, 2.5vw, 32px)',
        color: T.white,
        lineHeight: 1.5,
        letterSpacing: '-0.015em',
        maxWidth: 700,
        margin: '0 auto 36px',
      }}>
        {current.quote}
      </blockquote>

      <div style={{
        fontFamily: T.fontDisplay,
        fontWeight: T.weightBold,
        fontSize: 15,
        color: T.white,
      }}>{current.author}</div>

      <div style={{
        fontFamily: T.fontBody,
        fontWeight: T.weightRegular,
        fontSize: 13,
        color: T.muted,
        marginTop: 5,
      }}>{current.role}</div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 40 }}>
        {Model.testimonials.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{
            width: i === index ? 32 : 8,
            height: 8,
            borderRadius: 4,
            background: i === index ? T.accent : T.border,
            border: 'none', cursor: 'pointer',
            transition: T.transition,
            padding: 0,
          }} />
        ))}
      </div>
    </section>
  );
}
