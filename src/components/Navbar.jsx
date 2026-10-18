import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import data from '../data/portfolio.json'
import { useTheme } from '../hooks/useTheme'
import { useSparkle } from '../hooks/useSparkle'

const links = [
  { label: 'About',          href: '#about' },
  { label: 'Skills',         href: '#skills' },
  { label: 'Experience',     href: '#experience' },
  { label: 'Projects',       href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact',        href: '#contact' },
]

function ThemeToggle({ theme, toggle }) {
  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        background: 'none',
        border: '1px solid var(--border)',
        borderRadius: '99px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '34px',
        height: '34px',
        color: 'var(--text-secondary)',
        transition: 'border-color 0.15s ease, color 0.15s ease, background-color 0.15s ease',
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent)'
        e.currentTarget.style.color = 'var(--accent)'
        e.currentTarget.style.backgroundColor = 'var(--accent-subtle)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.color = 'var(--text-secondary)'
        e.currentTarget.style.backgroundColor = 'transparent'
      }}
    >
      {theme === 'dark' ? <Sun size={15} strokeWidth={2} /> : <Moon size={15} strokeWidth={2} />}
    </button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleLinkClick = () => setMenuOpen(false)
  const sparkle = useSparkle()
  const pill = scrolled || menuOpen

  return (
    <>
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        pointerEvents: 'none', display: 'flex', justifyContent: 'center',
        padding: pill ? '12px 24px' : '0',
        transition: 'padding 0.4s cubic-bezier(0.22,1,0.36,1)',
      }}>
        <header style={{
          pointerEvents: 'all',
          width: '100%',
          maxWidth: pill ? '720px' : 'var(--max-w)',
          borderRadius: pill ? '999px' : '0px',
          backgroundColor: pill
            ? theme === 'dark' ? 'rgba(26,25,23,0.95)' : 'rgba(250,249,247,0.95)'
            : 'transparent',
          backdropFilter: pill ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: pill ? 'blur(16px)' : 'none',
          border: pill ? '1px solid var(--border)' : '1px solid transparent',
          boxShadow: pill ? '0 2px 20px rgba(0,0,0,0.08)' : 'none',
          transition: [
            'max-width 0.4s cubic-bezier(0.22,1,0.36,1)',
            'border-radius 0.4s cubic-bezier(0.22,1,0.36,1)',
            'background-color 0.3s ease',
            'border-color 0.3s ease',
            'box-shadow 0.3s ease',
          ].join(', '),
        }}>
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            height: '52px', padding: '0 20px',
          }}>
            {/* Logo */}
            <a href="#" style={{
              fontWeight: 700, fontSize: '1rem',
              color: 'var(--text-primary)', letterSpacing: '-0.03em', textDecoration: 'none',
            }}>
              {data.personal.name.split(' ')[0]}
              <span style={{ color: 'var(--accent)' }}>.</span>
            </a>

            {/* Desktop nav — hidden on mobile */}
            <nav className="desktop-nav" style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
              {links.map(link => (
                <a key={link.href} href={link.href}
                  onClick={e => sparkle(e)}
                  style={{
                    fontSize: '0.875rem', fontWeight: 500,
                    color: 'var(--text-secondary)', textDecoration: 'none',
                    transition: 'color 0.15s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  {link.label}
                </a>
              ))}
              <ThemeToggle theme={theme} toggle={toggle} />
            </nav>

            {/* Mobile right: theme toggle + hamburger */}
            <div className="mobile-controls" style={{
              display: 'none', alignItems: 'center', gap: '8px',
            }}>
              <ThemeToggle theme={theme} toggle={toggle} />
              <button
                onClick={() => setMenuOpen(o => !o)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', flexDirection: 'column',
                  justifyContent: 'center', alignItems: 'center',
                  gap: '5px', padding: '6px', width: '36px', height: '36px',
                }}
              >
                <span style={{
                  display: 'block', width: '20px', height: '2px',
                  backgroundColor: 'var(--text-primary)', borderRadius: '2px',
                  transition: 'transform 0.25s ease',
                  transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
                  transformOrigin: 'center',
                }} />
                <span style={{
                  display: 'block', width: '20px', height: '2px',
                  backgroundColor: 'var(--text-primary)', borderRadius: '2px',
                  transition: 'opacity 0.2s ease',
                  opacity: menuOpen ? 0 : 1,
                }} />
                <span style={{
                  display: 'block', width: '20px', height: '2px',
                  backgroundColor: 'var(--text-primary)', borderRadius: '2px',
                  transition: 'transform 0.25s ease',
                  transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
                  transformOrigin: 'center',
                }} />
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Full-screen mobile overlay */}
      <div
        aria-hidden={!menuOpen}
        className="mobile-overlay"
        style={{
          position: 'fixed', inset: 0, zIndex: 190,
          backgroundColor: 'var(--bg-base)',
          display: 'flex', flexDirection: 'column',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.25s ease',
        }}
      >
        <div style={{ height: '76px', flexShrink: 0 }} />

        <nav style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          justifyContent: 'center', padding: '0 32px', gap: '4px',
        }}>
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={e => { sparkle(e); handleLinkClick() }}
              style={{
                fontSize: '1.75rem', fontWeight: 600,
                color: 'var(--text-primary)', textDecoration: 'none',
                letterSpacing: '-0.02em', padding: '10px 0',
                borderBottom: '1px solid var(--border)',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateX(0)' : 'translateX(-20px)',
                transition: `opacity 0.35s ease ${0.05 + 0.06 * i}s, transform 0.35s cubic-bezier(0.22,1,0.36,1) ${0.05 + 0.06 * i}s`,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-primary)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div style={{
          padding: '24px 32px', borderTop: '1px solid var(--border)',
          flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {data.personal.contact.email}
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav     { display: none !important; }
          .mobile-controls { display: flex !important; }
        }
        @media (min-width: 641px) {
          .mobile-overlay  { display: none !important; }
        }
      `}</style>
    </>
  )
}
