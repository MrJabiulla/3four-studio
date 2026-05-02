// ============================================================
// VIEW — Stats Bar
// ============================================================

import { Model } from '../model.js';
import { T } from '../tokens.js';

export default function Stats() {
  return (
    <div className="stats-bar" style={{
      background: T.surface,
      borderTop: `1px solid ${T.border}`,
      borderBottom: `1px solid ${T.border}`,
      padding: '0 64px',
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
    }}>
      {Model.stats.map(({ value, label }, i) => (
        <div key={label} style={{
          textAlign: 'center',
          padding: '40px 32px',
          flex: 1,
          borderRight: i < Model.stats.length - 1 ? `1px solid ${T.border}` : 'none',
          position: 'relative',
        }}>
          {/* Accent top line on hover via CSS would need state; use subtle static accent dot */}
          <div style={{
            fontFamily: T.fontDisplay,
            fontWeight: T.weightBlack,
            fontSize: 'clamp(28px, 3vw, 48px)',
            color: T.white,
            lineHeight: 1,
            letterSpacing: '-0.03em',
            marginBottom: 10,
          }}>
            {(() => {
            const num = value.match(/^[\d.]+/)?.[0] ?? value;
            const suffix = value.slice(num.length);
            return <><span style={{ color: T.white }}>{num}</span><span style={{ color: T.accent }}>{suffix}</span></>;
          })()}
          </div>
          <div style={{
            fontFamily: T.fontMono,
            fontSize: 11,
            color: T.muted,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
          }}>
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
