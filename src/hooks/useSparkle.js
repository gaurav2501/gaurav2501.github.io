/**
 * useSparkle
 * Returns a `sparkle(event)` function. Call it in any onClick handler.
 * Spawns 8 small particles that burst outward from the click point,
 * then remove themselves from the DOM once the animation ends.
 *
 * No external dependencies — pure DOM manipulation.
 */
export function useSparkle() {
  function sparkle(e) {
    // Desktop/mouse only — skip on touch devices
    if (!window.matchMedia('(pointer: fine)').matches) return

    const COUNT   = 8
    const COLORS  = ['#d97757', '#e8a887', '#f0c4a8', '#ffffff', '#d97757']
    const x = e.clientX
    const y = e.clientY

    for (let i = 0; i < COUNT; i++) {
      const dot = document.createElement('span')

      // Random spread angle and distance
      const angle    = (360 / COUNT) * i + Math.random() * 20 - 10
      const distance = 28 + Math.random() * 20          // px travel
      const size     = 4 + Math.random() * 4            // dot size px
      const color    = COLORS[Math.floor(Math.random() * COLORS.length)]
      const duration = 480 + Math.random() * 160        // ms

      const rad = (angle * Math.PI) / 180
      const tx  = Math.cos(rad) * distance
      const ty  = Math.sin(rad) * distance

      Object.assign(dot.style, {
        position:        'fixed',
        left:            `${x}px`,
        top:             `${y}px`,
        width:           `${size}px`,
        height:          `${size}px`,
        borderRadius:    '50%',
        backgroundColor: color,
        pointerEvents:   'none',
        zIndex:          9999,
        transform:       'translate(-50%, -50%) scale(1)',
        opacity:         '1',
        transition:      `transform ${duration}ms cubic-bezier(0.25,0.46,0.45,0.94),
                          opacity   ${duration}ms ease-out`,
      })

      document.body.appendChild(dot)

      // Trigger the animation on next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          dot.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`
          dot.style.opacity   = '0'
        })
      })

      // Remove from DOM once done
      dot.addEventListener('transitionend', () => dot.remove(), { once: true })
    }
  }

  return sparkle
}
