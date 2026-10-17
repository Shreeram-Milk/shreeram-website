'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/** Content starts visible. Animations only run after an element enters the viewport. */
export function MotionRuntime() {
  const pathname = usePathname()
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (preference.matches || !('IntersectionObserver' in window)) return
    const animations = new Set<Animation>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const element = entry.target as HTMLElement
          const direction = element.dataset.motion
          const offset =
            direction === 'left'
              ? 'translateX(-32px)'
              : direction === 'right'
                ? 'translateX(32px)'
                : 'translateY(28px)'
          const animation = element.animate(
            [
              { opacity: 0, transform: offset },
              { opacity: 1, transform: 'none' },
            ],
            {
              duration: 760,
              delay: Number(element.dataset.delay || 0),
              easing: 'cubic-bezier(.2,.75,.2,1)',
              fill: 'backwards',
            },
          )
          animations.add(animation)
          animation.finished
            .then(() => animations.delete(animation))
            .catch(() => {})
          observer.unobserve(element)
        })
      },
      { threshold: 0.08 },
    )
    document
      .querySelectorAll('.reveal, [data-motion]')
      .forEach((element) => observer.observe(element))
    const preferenceChanged = () => {
      if (preference.matches) {
        animations.forEach((animation) => animation.cancel())
        observer.disconnect()
      }
    }
    preference.addEventListener('change', preferenceChanged)
    return () => {
      observer.disconnect()
      animations.forEach((animation) => animation.cancel())
      preference.removeEventListener('change', preferenceChanged)
    }
  }, [pathname])
  return null
}
