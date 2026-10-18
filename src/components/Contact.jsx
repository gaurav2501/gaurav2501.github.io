import data from '../data/portfolio.json'
import { useReveal } from '../hooks/useReveal'

export default function Contact() {
  const { name, contact, website } = data.personal
  const { social } = data
  const year = new Date().getFullYear()
  const ref  = useReveal({ threshold: 0.15 })

  const links = [
    social.github   && { label: 'GitHub',   href: social.github },
    social.linkedin && { label: 'LinkedIn',  href: social.linkedin },
    social.twitter  && { label: 'Twitter',   href: social.twitter },
  ].filter(Boolean)

  return (
    <section id="contact" className="section">
      <div className="container">
        <div ref={ref}>
          <p className="section-label">Contact</p>
          <h2 style={{ marginBottom: 'var(--space-5)' }}>Let's talk</h2>

          {/* Contact card */}
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-6)',
            marginBottom: 'var(--space-6)',
          }}>
            <p style={{ fontSize: '1rem', maxWidth: '480px', marginBottom: 'var(--space-6)' }}>
              Whether it's an interesting problem, a collaboration, or just a conversation — my inbox is open.
            </p>

            <a
              href={`mailto:${contact.email}`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
                backgroundColor: 'var(--accent)', color: '#fff',
                fontWeight: 600, fontSize: '0.9rem',
                padding: '12px 24px', borderRadius: 'var(--radius-md)',
                transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--accent-hover)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--accent)')}
            >
              {contact.email}
              <span>↗</span>
            </a>

            {links.length > 0 && (
              <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', marginTop: 'var(--space-5)' }}>
                {links.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '0.875rem', fontWeight: 500,
                      color: 'var(--text-secondary)',
                      display: 'inline-flex', alignItems: 'center', gap: '4px',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{
            borderTop: '1px solid var(--border)', paddingTop: 'var(--space-5)',
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)',
          }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              © {year} {name}. Built with React & Vite.
            </p>
            <a
              href={website}
              style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {website.replace('https://', '')}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
