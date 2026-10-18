import { useEffect, useRef } from 'react'

/**
 * Scroll-reveal hook using IntersectionObserver.
 *
 * Flow:
 *  1. On mount, set data-reveal="pending" (hidden via CSS).
 *  2. Once the element intersects the viewport, set data-reveal="visible".
 *  3. The CSS transition plays once, then the observer disconnects.
 *
 * Using "pending" (not empty string) ensures the CSS rule is explicit
 * and won't race with the observer's initial synchronous callback.
 */
export function useReveal({ group = false, threshold = 0.12 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const attr = group ? 'data-reveal-group' : 'data-reveal'

    // Mark as pending (hidden) before the observer fires
    el.setAttribute(attr, 'pending')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Small rAF delay ensures the "pending" style has been applied
            // before we switch to "visible", guaranteeing the transition plays
            requestAnimationFrame(() => {
              el.setAttribute(attr, 'visible')
            })
            observer.disconnect()
          }
        })
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [group, threshold])

  return ref
}
