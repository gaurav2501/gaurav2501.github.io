import data from '../data/portfolio.json'
import { useReveal } from '../hooks/useReveal'

const groups = [
  { label: 'Languages',        key: 'languages' },
  { label: 'Frameworks',       key: 'frameworks' },
  { label: 'Databases',        key: 'databases' },
  { label: 'Cloud',            key: 'cloud' },
  { label: 'DevOps',           key: 'devops' },
  { label: 'Protocols & APIs', key: 'protocols' },
  { label: 'Tools',            key: 'tools' },
]

export default function Skills() {
  const { skills } = data
  const headRef = useReveal()
  const listRef = useReveal({ group: true, threshold: 0.1 })

  return (
    <section id="skills" className="section">
      <div className="container">
        <div ref={headRef}>
          <p className="section-label">Skills</p>
          <h2 style={{ marginBottom: 'var(--space-6)' }}>What I work with</h2>
        </div>

        {/* Card wrapping all skill rows */}
        <div
          ref={listRef}
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
          }}
        >
          {groups.map((group, gi) => {
            const items = skills[group.key]
            if (!items || items.length === 0) return null
            return (
              <div
                key={group.key}
                className="skills-row"
                style={{
                  display: 'flex',
                  gap: 'var(--space-5)',
                  alignItems: 'flex-start',
                  padding: 'var(--space-4) var(--space-5)',
                  borderBottom: gi < groups.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                <div
                  className="skills-label"
                  style={{
                    minWidth: '140px', fontSize: '0.78rem',
                    fontWeight: 600, color: 'var(--text-muted)',
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                    paddingTop: '4px', flexShrink: 0,
                  }}
                >
                  {group.label}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                  {items.map(item => (
                    <span key={item} className="tag">{item}</span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
