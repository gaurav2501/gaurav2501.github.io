import data from '../data/portfolio.json'
import { useReveal } from '../hooks/useReveal'

export default function Projects() {
  const { projects } = data
  const headRef  = useReveal()
  const cardsRef = useReveal({ group: true, threshold: 0.1 })

  return (
    <section id="projects" className="section">
      <div className="container">
        <div ref={headRef}>
          <p className="section-label">Projects</p>
          <h2 style={{ marginBottom: 'var(--space-7)' }}>Things I've built</h2>
        </div>

        <div
          ref={cardsRef}
          className="projects-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 'var(--space-5)',
          }}
        >
          {projects.map((project, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-6)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(217,119,87,0.08)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
                <h3 style={{ fontWeight: 600, fontSize: '1rem', lineHeight: 1.3 }}>{project.name}</h3>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: project.type === 'professional' ? 'var(--accent)' : 'var(--text-muted)',
                    backgroundColor: project.type === 'professional' ? 'var(--accent-subtle)' : 'var(--bg-subtle)',
                    border: `1px solid ${project.type === 'professional' ? '#f5c4b2' : 'var(--border)'}`,
                    borderRadius: '99px',
                    padding: '2px 8px',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  {project.type}
                </span>
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.875rem', lineHeight: 1.7, flexGrow: 1 }}>
                {project.description}
              </p>

              {/* Tech tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)' }}>
                {project.tech.map(t => (
                  <span key={t} className="tag" style={{ fontSize: '0.72rem' }}>{t}</span>
                ))}
              </div>

              {/* Link */}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--accent)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    marginTop: 'auto',
                  }}
                >
                  View project
                  <span style={{ fontSize: '0.9em' }}>↗</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
