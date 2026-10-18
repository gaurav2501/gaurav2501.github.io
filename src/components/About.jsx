import data from '../data/portfolio.json'
import { useReveal } from '../hooks/useReveal'

export default function About() {
  const { bio } = data.personal
  const { experience } = data

  const headRef  = useReveal()
  const statsRef = useReveal({ group: true, threshold: 0.2 })

  const totalYears = 8
  const companies  = experience.length

  const stats = [
    { value: `${totalYears}+`, label: 'Years of experience' },
    { value: companies,        label: 'Companies worked at' },
    { value: '5',              label: 'Engineers led' },
  ]

  return (
    <section id="about" className="section">
      <div className="container">
        <div ref={headRef}>
          <p className="section-label">About</p>
          <h2 style={{ marginBottom: 'var(--space-5)' }}>A bit about me</h2>

          {/* Bio card */}
          <div style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-5) var(--space-6)',
            marginBottom: 'var(--space-6)',
          }}>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, textAlign: 'justify' }}>{bio}</p>
          </div>
        </div>

        {/* Stats row */}
        <div
          ref={statsRef}
          className="stats-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 'var(--space-4)',
          }}
        >
          {stats.map(stat => (
            <div key={stat.label} style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-5)',
            }}>
              <div style={{
                fontSize: '1.8rem', fontWeight: 700,
                color: 'var(--accent)', letterSpacing: '-0.03em',
                lineHeight: 1, marginBottom: 'var(--space-2)',
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
