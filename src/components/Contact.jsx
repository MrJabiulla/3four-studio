// ============================================================
// VIEW — Contact  (redesigned + animated)
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

// ── icons ────────────────────────────────────────────────────
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <polyline points="2,4 12,13 22,4"/>
  </svg>
);
const PinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7z"/><circle cx="12" cy="9" r="2.5"/>
  </svg>
);
const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

// ── social icon buttons ──────────────────────────────────────
const socialIcons = {
  GitHub: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  ),
  LinkedIn: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  Dribbble: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>
    </svg>
  ),
};

// ── info row ─────────────────────────────────────────────────
function InfoRow({ icon, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{
        width: 38, height: 38, borderRadius: 10, flexShrink: 0,
        background: `${T.accent}12`, border: `1px solid ${T.accent}25`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: T.accent,
      }}>
        {icon}
      </div>
      <div style={{ fontFamily: T.fontBody, fontSize: 14, color: T.mutedLight, lineHeight: 1.6 }}>
        {children}
      </div>
    </div>
  );
}

// ── copy email button ────────────────────────────────────────
function CopyEmailBtn() {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard?.writeText(Model.contactEmail).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <button
      onClick={copy}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        background: 'transparent',
        border: `1px solid ${copied ? `${T.accent}50` : T.border}`,
        borderRadius: 8, padding: '7px 13px',
        fontFamily: T.fontMono, fontSize: 11,
        color: copied ? T.accent : T.muted,
        cursor: 'pointer', letterSpacing: '0.05em',
        transition: 'all 0.25s ease',
        marginTop: 8,
      }}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      {copied ? 'Copied!' : 'Copy email'}
    </button>
  );
}

// ── success state ────────────────────────────────────────────
function SuccessState() {
  return (
    <div className="contact-success" style={{
      textAlign: 'center', padding: '64px 40px',
      border: `1px solid ${T.accent}30`,
      borderRadius: 20, background: `${T.accent}06`,
    }}>
      <div style={{
        width: 68, height: 68, borderRadius: '50%',
        background: `${T.accent}18`, border: `2px solid ${T.accent}50`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 24px',
      }}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={T.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline
            points="20 6 9 17 4 12"
            style={{ strokeDasharray: 40, strokeDashoffset: 0, animation: 'checkDraw 0.5s ease 0.2s both' }}
          />
        </svg>
      </div>
      <div style={{
        fontFamily: T.fontDisplay, fontWeight: T.weightBlack,
        fontSize: 28, color: T.white, letterSpacing: '-0.02em', marginBottom: 10,
      }}>
        Message Sent!
      </div>
      <div style={{ fontFamily: T.fontBody, fontSize: 15, color: T.muted, lineHeight: 1.7 }}>
        Thanks for reaching out. We'll get back to you within 24 hours.
      </div>
    </div>
  );
}

// ── form field wrapper ───────────────────────────────────────
function Field({ label, children }) {
  return (
    <div>
      <label style={{
        display: 'block', fontFamily: T.fontMono, fontSize: 13,
        color: T.mutedLight, letterSpacing: '0.08em', textTransform: 'uppercase',
        marginBottom: 8,
      }}>
        {label}
      </label>
      <div className="contact-field">{children}</div>
    </div>
  );
}

// ── main component ───────────────────────────────────────────
export default function Contact({ vm }) {
  const { form, isValid, isSending, isSent, activeField, setActiveField, handleChange, handleSubmit } = vm;
  const [sectionRef, sectionVisible] = useInView(0.1);
  const [btnHov, setBtnHov] = useState(false);

  return (
    <section id="contact" style={{ padding: '120px 64px', background: T.bg, position: 'relative', overflow: 'hidden' }}>

      {/* Top border */}
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
        background: `linear-gradient(90deg, transparent, ${T.border}, transparent)`,
      }} />

      {/* Glow */}
      <div style={{
        position: 'absolute', right: -100, bottom: -100,
        width: 500, height: 500, borderRadius: '50%',
        background: T.accent, filter: 'blur(160px)',
        opacity: 0.05, pointerEvents: 'none',
      }} />

      <div ref={sectionRef} style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.3fr',
          gap: 80,
          alignItems: 'start',
        }}
          className="contact-grid"
        >

          {/* ── LEFT: info panel ── */}
          <div
            className={sectionVisible ? 'contact-left-visible' : 'contact-left-hidden'}
            style={{ animationDelay: '0s' }}
          >
            {/* Eyebrow */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 32, height: 1, background: T.accent }} />
              <span style={{ fontFamily: T.fontMono, fontSize: 11, color: T.accent, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                Get In Touch
              </span>
            </div>

            <h2 style={{
              fontFamily: T.fontDisplay, fontWeight: T.weightBlack,
              fontSize: 'clamp(32px, 4vw, 56px)',
              color: T.white, letterSpacing: '-0.03em', lineHeight: 1.0,
              marginBottom: 24,
            }}>
              Let's Build<br /><span style={{ color: T.accent }}>Something.</span>
            </h2>

            <p style={{
              fontFamily: T.fontBody, fontSize: 15, color: T.muted,
              lineHeight: 1.8, marginBottom: 48, maxWidth: 340,
            }}>
              Got an idea, a project, or just want to say hi? Drop us a message and we'll get back to you within 24 hours.
            </p>

            {/* Info rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>
              <InfoRow icon={<MailIcon />}>
                <div style={{ color: T.white, marginBottom: 2 }}>{Model.contactEmail}</div>
                <CopyEmailBtn />
              </InfoRow>
              <InfoRow icon={<PinIcon />}>
                <div style={{ color: T.white }}>{Model.footerLocation}</div>
                <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>Available for remote worldwide</div>
              </InfoRow>
            </div>

            {/* Availability badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: `${T.accent}10`, border: `1px solid ${T.accent}25`,
              borderRadius: 999, padding: '8px 18px', marginBottom: 36,
            }}>
              <div style={{
                width: 7, height: 7, borderRadius: '50%', background: T.accent,
                animation: 'pulseDot 2s ease-in-out infinite',
              }} />
              <span style={{ fontFamily: T.fontMono, fontSize: 10, color: T.accent, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Currently accepting projects
              </span>
            </div>

            {/* Social links */}
            <div>
              <div style={{ fontFamily: T.fontMono, fontSize: 13, color: T.mutedLight, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>
                Follow Us
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                {Model.socials.map(name => {
                  const Icon = socialIcons[name];
                  return (
                    <SocialBtn key={name} label={name} icon={Icon ? <Icon /> : null} />
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── RIGHT: form ── */}
          <div
            className={sectionVisible ? 'contact-right-visible' : 'contact-right-hidden'}
            style={{
              animationDelay: '0.15s',
              background: T.surface,
              border: `1px solid ${T.border}`,
              borderRadius: 20,
              padding: '48px 44px',
            }}
          >
            {isSent ? <SuccessState /> : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <Field label="Your Name">
                    <input
                      name="name" placeholder="John Doe"
                      value={form.name} onChange={handleChange}
                      onFocus={() => setActiveField('name')}
                      onBlur={() => setActiveField(null)}
                    />
                  </Field>
                  <Field label="Email Address">
                    <input
                      name="email" type="email" placeholder="john@company.com"
                      value={form.email} onChange={handleChange}
                      onFocus={() => setActiveField('email')}
                      onBlur={() => setActiveField(null)}
                    />
                  </Field>
                </div>

                <Field label="Project Type">
                  <input
                    name="project" placeholder="Web App, Mobile, Brand…"
                    value={form.project || ''}
                    onChange={handleChange}
                    onFocus={() => setActiveField('project')}
                    onBlur={() => setActiveField(null)}
                  />
                </Field>

                <Field label="Tell Us About Your Project">
                  <textarea
                    name="message" rows={5}
                    placeholder="Describe your idea, goals, timeline…"
                    value={form.message} onChange={handleChange}
                    onFocus={() => setActiveField('message')}
                    onBlur={() => setActiveField(null)}
                  />
                </Field>

                {/* Budget chips */}
                <BudgetChips form={form} handleChange={handleChange} />

                <button
                  onClick={handleSubmit}
                  disabled={!isValid || isSending}
                  onMouseEnter={() => setBtnHov(true)}
                  onMouseLeave={() => setBtnHov(false)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    background: isValid ? (btnHov ? T.accentD : T.accent) : T.border,
                    color: '#fff', border: 'none',
                    cursor: isValid ? 'pointer' : 'not-allowed',
                    padding: '16px 36px',
                    fontFamily: T.fontDisplay, fontWeight: T.weightBold,
                    fontSize: 14, letterSpacing: '0.08em', textTransform: 'uppercase',
                    borderRadius: 10, width: '100%',
                    boxShadow: isValid && btnHov ? `0 12px 36px ${T.accent}44` : 'none',
                    transform: isValid && btnHov ? 'translateY(-2px)' : 'translateY(0)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {isSending ? (
                    <>
                      <span style={{
                        width: 16, height: 16, borderRadius: '50%',
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderTopColor: '#fff',
                        animation: 'spin 0.7s linear infinite',
                        display: 'inline-block',
                      }} />
                      Sending…
                    </>
                  ) : (
                    <>Send Message <ArrowIcon /></>
                  )}
                </button>

                <p style={{ fontFamily: T.fontMono, fontSize: 12, color: T.muted, textAlign: 'center', letterSpacing: '0.05em' }}>
                  We reply within 24 hours · No spam, ever.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── social button ────────────────────────────────────────────
function SocialBtn({ label, icon }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: hov ? `${T.accent}12` : 'transparent',
        border: `1px solid ${hov ? `${T.accent}40` : T.border}`,
        borderRadius: 9, padding: '9px 14px',
        color: hov ? T.accent : T.mutedLight,
        fontFamily: T.fontMono, fontSize: 11,
        letterSpacing: '0.08em', cursor: 'pointer',
        transition: 'all 0.25s ease',
        transform: hov ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      {icon}
      {label}
    </button>
  );
}

// ── budget chips ─────────────────────────────────────────────
const budgets = ['< $5k', '$5–15k', '$15–50k', '$50k+'];

function BudgetChips({ form, handleChange }) {
  const [selected, setSelected] = useState('');
  function pick(b) {
    setSelected(b);
    handleChange({ target: { name: 'budget', value: b } });
  }
  return (
    <div>
      <div style={{ fontFamily: T.fontMono, fontSize: 13, color: T.mutedLight, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
        Budget Range
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {budgets.map(b => (
          <button
            key={b}
            type="button"
            onClick={() => pick(b)}
            style={{
              fontFamily: T.fontMono, fontSize: 13, letterSpacing: '0.05em',
              padding: '9px 18px', borderRadius: 8, cursor: 'pointer',
              border: `1px solid ${selected === b ? T.accent : T.border}`,
              background: selected === b ? `${T.accent}15` : 'transparent',
              color: selected === b ? T.accent : T.muted,
              transition: 'all 0.2s ease',
            }}
          >
            {b}
          </button>
        ))}
      </div>
    </div>
  );
}
