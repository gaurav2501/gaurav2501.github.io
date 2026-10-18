import { useState, useEffect } from 'react'

/**
 * Manages light/dark theme.
 * - Default is dark unless user has previously chosen light.
 * - Reads localStorage on init; falls back to dark.
 * - Writes 'data-theme' attribute on <html>.
 * - Persists choice to localStorage.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    const stored = localStorage.getItem('theme')
    if (stored === 'dark' || stored === 'light') return stored
    // Default: dark (ignore system preference — portfolio default is dark)
    return 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggle = () => setTheme(t => (t === 'light' ? 'dark' : 'light'))

  return { theme, toggle }
}
