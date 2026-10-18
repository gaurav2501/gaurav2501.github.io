import { useEffect, useRef, useState } from 'react'
import data from '../data/portfolio.json'

function ProfilePhoto({ src, name }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError]   = useState(false)

  return (
    <div style={{ position: 'relative', flexShrink: 0, alignSelf: 'flex-start' }}>
      {/* Outer decorative ring */}
      <div style={{
        position: 'absolute',
        inset: '-6px',
        borderRadius: '50%',
        border: '3px solid var(--accent)',
        opacity: 0.4,
        pointerEvents: 'none',
        zIndex: 2,
      }} />

      {/* Inner frame */}
      <div style={{
        width: '160px',
        height: '160px',
        borderRadius: '50%',
        border: '4px solid var(--border-strong)',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-subtle)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Shimmer while loading */}
        {!loaded && !error && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 1,
            background: 'linear-gradient(90deg, var(--bg-subtle) 25%, var(--bg-surface) 50%, var(--bg-subtle) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.4s infinite',
          }} />
        )}

        {/* Initials fallback */}
        {error && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.2rem', fontWeight: 700,
            color: 'var(--accent)', letterSpacing: '-0.04em',
          }}>
            {name.split(' ').map(n => n[0]).join('')}
          </div>
        )}

        <img
          src={src}
          alt={name}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center top',
            display: 'block',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.4s ease',
            position: 'relative', zIndex: 0,
          }}
        />
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  )
}

export default function Hero() {
  const { name, title, tagline, contact, location, photo } = data.personal
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.setAttribute('data-reveal', 'pending')
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => el.setAttribute('data-reveal', 'visible'))
    })
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <section
      style={{
        paddingTop: 'calc(var(--space-10) + 52px)',
        paddingBottom: 'var(--space-10)',
      }}
    >
      <div className="container" ref={ref}>
        {/*
          Two-column layout: text left, photo right.
          Stacks to single column on mobile.
        */}
        <div
          className="hero-inner"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 'var(--space-7)',
          }}
        >
          {/* ── Left: text content ── */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Location pill */}
            <div style={{ marginBottom: 'var(--space-5)' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.78rem',
                fontWeight: 500,
                color: 'var(--text-muted)',
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border)',
                borderRadius: '99px',
                padding: '4px 12px',
              }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#4caf82',
                  display: 'inline-block',
                }} />
                {location.city}, {location.country}
              </span>
            </div>

            {/* Name */}
            <h1 style={{ marginBottom: 'var(--space-3)' }}>
              {name}
            </h1>

            {/* Title */}
            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: 'var(--accent)',
              fontWeight: 500,
              marginBottom: 'var(--space-5)',
              letterSpacing: '-0.01em',
            }}>
              {title}
            </p>

            {/* Tagline */}
            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              maxWidth: '460px',
              lineHeight: 1.7,
              marginBottom: 'var(--space-7)',
            }}>
              {tagline}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
              <a
                href="#experience"
                style={{
                  display: 'inline-block',
                  backgroundColor: 'var(--accent)',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  padding: '10px 22px',
                  borderRadius: 'var(--radius-md)',
                  transition: 'background-color 0.15s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--accent-hover)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--accent)')}
              >
                View Experience
              </a>
              <a
                href={`mailto:${contact.email}`}
                style={{
                  display: 'inline-block',
                  backgroundColor: 'var(--bg-surface)',
                  color: 'var(--text-primary)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  padding: '10px 22px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-strong)',
                  transition: 'border-color 0.15s ease, color 0.15s ease, background-color 0.15s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent)'
                  e.currentTarget.style.color = 'var(--accent)'
                  e.currentTarget.style.backgroundColor = 'var(--accent-subtle)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-strong)'
                  e.currentTarget.style.color = 'var(--text-primary)'
                  e.currentTarget.style.backgroundColor = 'var(--bg-surface)'
                }}
              >
                Get in touch
              </a>
            </div>
          </div>

          {/* ── Right: profile photo ── */}
          <ProfilePhoto src={photo.src} name={name} />
        </div>
      </div>

      {/* Mobile: stack photo above text */}
      <style>{`
        @media (max-width: 640px) {
          .hero-inner {
            flex-direction: column-reverse !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </section>
  )
}
