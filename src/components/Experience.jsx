import data from '../data/portfolio.json'
import { useReveal } from '../hooks/useReveal'

function formatDate(dateStr) {
  if (!dateStr) return null
  const [year, month] = dateStr.split('-')
  const d = new Date(year, parseInt(month) - 1)
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export default function Experience() {
  const { experience, education } = data
  const headRef = useReveal()
  const listRef = useReveal({ group: true, threshold: 0.1 })
  const eduRef  = useReveal({ threshold: 0.2 })

  return (
    <section id="experience" className="section">
      <div className="container">
        <div ref={headRef}>
          <p className="section-label">Experience</p>
          <h2 style={{ marginBottom: 'var(--space-7)' }}>Where I've worked</h2>
        </div>

        {/* Timeline */}
        <div ref={listRef} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {experience.map((job, idx) => {
            const start = formatDate(job.startDate)
            const end = job.current ? 'Present' : formatDate(job.endDate)
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: 'var(--space-4)',
                  position: 'relative',
                }}
              >
                {/* Timeline spine + dot */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{
                    width: '10px', height: '10px',
                    borderRadius: '50%',
                    backgroundColor: job.current ? 'var(--accent)' : 'var(--border-strong)',
                    border: '2px solid var(--bg-base)',
                    marginTop: '18px',
                    flexShrink: 0,
                    zIndex: 1,
                  }} />
                  {idx < experience.length - 1 && (
                    <div style={{
                      width: '2px', flex: 1,
                      backgroundColor: 'var(--border)',
                      marginTop: '4px',
                    }} />
                  )}
                </div>

                {/* Card tile */}
                <div style={{
                  flex: 1,
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-5)',
                  display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
                  marginBottom: idx < experience.length - 1 ? 'var(--space-2)' : 0,
                }}>
                  {/* Header */}
                  <div>
                    <div style={{
                      display: 'flex', alignItems: 'baseline',
                      justifyContent: 'space-between', gap: 'var(--space-3)', flexWrap: 'wrap',
                    }}>
                      <h3 style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{job.role}</h3>
                      {start && (
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500, whiteSpace: 'nowrap' }}>
                          {start} — {end}
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginTop: '3px' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: job.current ? 'var(--accent)' : 'var(--text-secondary)' }}>
                        {job.company}
                      </span>
                      <span style={{ color: 'var(--border-strong)', fontSize: '0.75rem' }}>·</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{job.location}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  {job.highlights?.length > 0 && (
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                      {job.highlights.map((h, i) => (
                        <li key={i} style={{
                          fontSize: '0.9rem', color: 'var(--text-secondary)',
                          display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)',
                        }}>
                          <span style={{ color: 'var(--accent)', marginTop: '2px', flexShrink: 0 }}>›</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Education */}
        <div ref={eduRef} style={{ marginTop: 'var(--space-7)' }}>
          <p className="section-label" style={{ marginBottom: 'var(--space-4)' }}>Education</p>
          <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
            {/* Dot */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <div style={{
                width: '10px', height: '10px', borderRadius: '50%', marginTop: '18px',
                backgroundColor: 'var(--border-strong)', border: '2px solid var(--bg-base)',
              }} />
            </div>
            {education.map((edu, idx) => (
              <div key={idx} style={{
                flex: 1,
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-5)',
              }}>
                <h3 style={{ fontWeight: 600 }}>{edu.degree}</h3>
                <p style={{ fontSize: '0.875rem', marginTop: '3px', color: 'var(--text-secondary)' }}>
                  {edu.field}
                  {edu.institution ? ` · ${edu.institution}` : ''}
                  {edu.graduationYear ? ` · ${edu.graduationYear}` : ''}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
