// ============================================================
// VIEW — Work / Selected Projects  (redesigned + animated)
// ============================================================

import { useRef, useEffect, useState } from 'react';
import { Model } from '../model.js';
import { T } from '../tokens.js';

const INITIAL_COUNT = 3;

// ── intersection hook ────────────────────────────────────────
function useInView(threshold = 0.1) {
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

// ── icons ────────────────────────────────────────────────────
const ArrowUpRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
  </svg>
);

// ── project card ─────────────────────────────────────────────
function ProjectCard({ project, index, featured, animIndex }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="work-card-visible"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        animationDelay: `${animIndex * 0.1}s`,
        gridColumn: featured ? 'span 2' : 'span 1',
        position: 'relative',
        borderRadius: 20,
        overflow: 'hidden',
        cursor: 'pointer',
        height: featured ? 520 : 380,
        border: `1px solid ${hovered ? `${T.accent}40` : T.border}`,
        transition: 'border-color 0.4s ease',
      }}
    >
      {/* Background image */}
      <img
        src={project.img}
        alt={project.title}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
          filter: hovered ? 'brightness(0.3)' : 'brightness(0.22)',
          transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1), filter 0.5s ease',
        }}
      />

      {/* Gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
      }} />

      {/* Red glow on hover */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at bottom left, ${T.accent}18 0%, transparent 60%)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }} />

      {/* Top row */}
      <div style={{
        position: 'absolute', top: 24, left: 28, right: 28,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: T.fontMono, fontSize: 11, color: `${T.white}60`, letterSpacing: '0.15em' }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span style={{
          fontFamily: T.fontMono, fontSize: 10,
          color: T.accent, letterSpacing: '0.15em', textTransform: 'uppercase',
          background: `${T.accent}15`, border: `1px solid ${T.accent}30`,
          borderRadius: 999, padding: '4px 12px',
        }}>
          {project.year}
        </span>
      </div>

      {/* Bottom info */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 28px' }}>
        <div style={{
          fontFamily: T.fontMono, fontSize: 10,
          color: T.accent, letterSpacing: '0.15em',
          textTransform: 'uppercase', marginBottom: 10,
        }}>
          {project.tag}
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
          <h3 style={{
            fontFamily: T.fontDisplay, fontWeight: T.weightBlack,
            fontSize: featured ? 'clamp(28px, 3vw, 42px)' : 26,
            color: T.white, letterSpacing: '-0.025em', lineHeight: 1.05, margin: 0,
          }}>
            {project.title}
          </h3>
          <div style={{
            width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
            background: hovered ? T.accent : 'rgba(255,255,255,0.08)',
            border: `1px solid ${hovered ? T.accent : 'rgba(255,255,255,0.15)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: T.white,
            transform: hovered ? 'scale(1.1) rotate(0deg)' : 'scale(1) rotate(-45deg)',
            transition: 'background 0.35s ease, border-color 0.35s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)',
          }}>
            <ArrowUpRight />
          </div>
        </div>

        {/* Slide-up detail strip */}
        <div style={{
          overflow: 'hidden',
          maxHeight: hovered ? 48 : 0,
          opacity: hovered ? 1 : 0,
          transition: 'max-height 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease',
          marginTop: hovered ? 16 : 0,
        }}>
          <div style={{ height: 1, background: `linear-gradient(90deg, ${T.accent}60, transparent)`, marginBottom: 14 }} />
          <div style={{ display: 'flex', gap: 20 }}>
            {['Strategy', 'Design', 'Development'].map(tag => (
              <span key={tag} style={{
                display: 'flex', alignItems: 'center', gap: 5,
                fontFamily: T.fontMono, fontSize: 10,
                color: `${T.white}70`, letterSpacing: '0.1em',
              }}>
                <PlusIcon /> {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── main component ───────────────────────────────────────────
export default function Work() {
  const [expanded, setExpanded]   = useState(false);
  const [animExtra, setAnimExtra] = useState(false);
  const [headerRef, headerVisible] = useInView(0.3);
  const [gridRef,   gridVisible]   = useInView(0.05);
  const expandedRef = useRef(null);

  const visibleProjects  = expanded ? Model.projects : Model.projects.slice(0, INITIAL_COUNT);
  const extraProjects    = Model.projects.slice(INITIAL_COUNT);

  function handleExpand() {
    setExpanded(true);
    // Stagger-animate the new cards
    setTimeout(() => setAnimExtra(true), 20);
  }

  function handleClose() {
    setExpanded(false);
    setAnimExtra(false);
    // Scroll back up to the grid smoothly
    expandedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <section id="work" style={{ padding: '120px 64px', background: T.surface, position: 'relative', overflow: 'hidden' }}>

      {/* Top border gradient */}
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
        background: `linear-gradient(90deg, transparent, ${T.border}, transparent)`,
      }} />

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', right: -100, top: '20%',
        width: 400, height: 400, borderRadius: '50%',
        background: T.accent, filter: 'blur(140px)',
        opacity: 0.04, pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <div ref={headerRef} style={{
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'space-between', flexWrap: 'wrap',
          gap: 24, marginBottom: 56,
        }}>
          <div className={headerVisible ? 'svc-header-visible' : 'svc-header-hidden'} style={{ animationDelay: '0s' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 32, height: 1, background: T.accent }} />
              <span style={{ fontFamily: T.fontMono, fontSize: 11, color: T.accent, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                Portfolio
              </span>
            </div>
            <h2 style={{
              fontFamily: T.fontDisplay, fontWeight: T.weightBlack,
              fontSize: 'clamp(32px, 4vw, 60px)',
              color: T.white, letterSpacing: '-0.03em', lineHeight: 1.0, margin: 0,
            }}>
              Selected<br /><span style={{ color: T.accent }}>Work.</span>
            </h2>
          </div>

          <div className={headerVisible ? 'svc-header-visible' : 'svc-header-hidden'} style={{ animationDelay: '0.15s', maxWidth: 320 }}>
            <p style={{ fontFamily: T.fontBody, fontSize: 15, color: T.muted, lineHeight: 1.8, margin: 0 }}>
              A curated selection of projects where we turned complex problems into elegant, high-impact digital products.
            </p>
          </div>
        </div>

        {/* Initial bento grid (always visible) */}
        <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {Model.projects.slice(0, INITIAL_COUNT).map((p, i) => (
            <ProjectCard
              key={p.title}
              project={p}
              index={i}
              featured={i === 0}
              animIndex={gridVisible ? i : 99}
            />
          ))}
        </div>

        {/* Expanded extra cards */}
        {expanded && (
          <div
            ref={expandedRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 20,
              marginTop: 20,
            }}
          >
            {extraProjects.map((p, i) => (
              <ProjectCard
                key={p.title}
                project={p}
                index={INITIAL_COUNT + i}
                featured={false}
                animIndex={animExtra ? i : 99}
              />
            ))}
          </div>
        )}

        {/* CTA button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 52 }}>
          {!expanded ? (
            <ToggleBtn
              onClick={handleExpand}
              icon={<GridIcon />}
              label={`View All Projects (${Model.projects.length})`}
            />
          ) : (
            <ToggleBtn
              onClick={handleClose}
              icon={<CloseIcon />}
              label="Close"
              danger
            />
          )}
        </div>
      </div>
    </section>
  );
}

// ── toggle button ────────────────────────────────────────────
function ToggleBtn({ onClick, icon, label, danger }) {
  const [hov, setHov] = useState(false);
  const borderColor = hov ? (danger ? T.accent : T.accent) : T.border;
  const color = hov ? T.accent : (danger ? T.mutedLight : T.white);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: danger && hov ? `${T.accent}10` : 'transparent',
        border: `1px solid ${borderColor}`,
        color,
        fontFamily: T.fontDisplay, fontWeight: T.weightBold,
        fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase',
        padding: '14px 32px', borderRadius: 999,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: hov ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      <span style={{
        display: 'flex',
        transform: hov && !danger ? 'rotate(90deg)' : 'rotate(0deg)',
        transition: 'transform 0.35s ease',
      }}>
        {icon}
      </span>
      {label}
    </button>
  );
}
