import { useEffect } from 'react'

/**
 * useMouseGrid
 *
 * Tracks mouse position and writes --mouse-x / --mouse-y CSS custom
 * properties on :root. The CSS uses these to render a radial "lens"
 * overlay on top of the dot grid — dots appear denser/brighter near
 * the cursor, creating a grid-squeeze follow effect.
 *
 * Only active on pointer:fine devices (mouse). No-ops on touch.
 */
export function useMouseGrid() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const root = document.documentElement

    // Start offscreen so the lens isn't visible before first move
    root.style.setProperty('--mouse-x', '-999px')
    root.style.setProperty('--mouse-y', '-999px')

    const onMove = (e) => {
      root.style.setProperty('--mouse-x', `${e.clientX}px`)
      root.style.setProperty('--mouse-y', `${e.clientY}px`)
    }

    const onLeave = () => {
      root.style.setProperty('--mouse-x', '-999px')
      root.style.setProperty('--mouse-y', '-999px')
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])
}
