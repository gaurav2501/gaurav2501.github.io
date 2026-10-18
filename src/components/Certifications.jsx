import { BadgeCheck } from 'lucide-react'
import data from '../data/portfolio.json'
import { useReveal } from '../hooks/useReveal'

const issuerMap = {
  'Anthropic': {
    label: 'Anthropic',
    color: '#d97757',
    bg: '#fdf0eb',
    border: '#f5c4b2',
    iconColor: '#d97757',
  },
  'Udemy': {
    label: 'Udemy',
    color: '#6b4fbb',
    bg: '#f3f0fb',
    border: '#d5cdf0',
    iconColor: '#6b4fbb',
  },
  'LinkedIn Learning': {
    label: 'LinkedIn',
    color: '#0a66c2',
    bg: '#eef4fb',
    border: '#b6d0ee',
    iconColor: '#0a66c2',
  },
}

const fallback = {
  label: 'Certificate',
  color: 'var(--text-muted)',
  bg: 'var(--bg-subtle)',
  border: 'var(--border)',
  iconColor: 'var(--text-muted)',
}

function IssuerBadge({ issuer }) {
  const s = issuerMap[issuer] ?? { ...fallback, label: issuer }
  return (
    <span style={{
      fontSize: '0.7rem',
      fontWeight: 600,
      letterSpacing: '0.06em',
      color: s.color,
      backgroundColor: s.bg,
      border: `1px solid ${s.border}`,
      borderRadius: '99px',
      padding: '2px 8px',
      whiteSpace: 'nowrap',
      flexShrink: 0,
    }}>
      {s.label}
    </span>
  )
}

export default function Certifications() {
  const { certifications } = data
  const headRef = useReveal()
  const listRef = useReveal({ group: true, threshold: 0.1 })

  return (
    <section id="certifications" className="section">
      <div className="container">
        <div ref={headRef}>
          <p className="section-label">Certifications</p>
          <h2 style={{ marginBottom: 'var(--space-7)' }}>Courses & credentials</h2>
        </div>

        <div ref={listRef} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {certifications.map((cert, idx) => {
            const s = issuerMap[cert.issuer] ?? fallback
            return (
              <a
                key={idx}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-4)',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-4) var(--space-5)',
                  color: 'inherit',
                  textDecoration: 'none',
                  transition: 'border-color 0.15s ease, background-color 0.15s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent)'
                  e.currentTarget.style.backgroundColor = 'var(--accent-subtle)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.backgroundColor = 'var(--bg-surface)'
                }}
              >
                {/* Badge icon */}
                <div style={{
                  flexShrink: 0,
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: s.bg,
                  border: `1px solid ${s.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <BadgeCheck size={18} strokeWidth={2} color={s.iconColor} />
                </div>

                {/* Name + platform */}
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div
                    className="cert-name"
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {cert.name}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {cert.platform}
                  </div>
                </div>

                {/* Issuer pill + arrow */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexShrink: 0 }}>
                  <IssuerBadge issuer={cert.issuer} />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>↗</span>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
