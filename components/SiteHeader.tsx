'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { MAIN_NAV, SITE_NAME } from '@/lib/site'

export function SiteHeader() {
  const pathname = usePathname()
  const [menuPath, setMenuPath] = useState<string | null>(null)
  const open = menuPath === pathname
  const [scrolled, setScrolled] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const menu = useRef<HTMLElement>(null)
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16)
    const resize = () => {
      if (innerWidth >= 960) setMenuPath(null)
    }
    const closeOnHistoryNavigation = () => setMenuPath(null)
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', resize)
    window.addEventListener('popstate', closeOnHistoryNavigation)
    update()
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', resize)
      window.removeEventListener('popstate', closeOnHistoryNavigation)
    }
  }, [])
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusFrame = requestAnimationFrame(() =>
      menu.current?.querySelector('a')?.focus(),
    )
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuPath(null)
        toggle.current?.focus()
      }
      if (event.key === 'Tab') {
        const links = [
          ...(menu.current?.querySelectorAll<HTMLAnchorElement>('a') || []),
        ]
        if (!links.length) return
        if (event.shiftKey && document.activeElement === links[0]) {
          event.preventDefault()
          toggle.current?.focus()
        } else if (!event.shiftKey && document.activeElement === links.at(-1)) {
          event.preventDefault()
          toggle.current?.focus()
        } else if (document.activeElement === toggle.current) {
          event.preventDefault()
          ;(event.shiftKey ? links.at(-1) : links[0])?.focus()
        }
      }
    }
    document.addEventListener('keydown', keydown)
    return () => {
      cancelAnimationFrame(focusFrame)
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', keydown)
    }
  }, [open])
  return (
    <header
      className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' menu-open' : ''}`}
    >
      <div className="wrap header-row">
        <Link
          href="/"
          className="brand"
          aria-label={`${SITE_NAME} home`}
          onClick={() => setMenuPath(null)}
        >
          <Image
            className="brand-mark"
            src="/logo.png"
            alt=""
            width={48}
            height={48}
            preload
          />
          <span className="brand-name">
            ShreeRam
            <span>
              Milks <small>FRESH EVERY DAY</small>
            </span>
          </span>
        </Link>
        <button
          ref={toggle}
          type="button"
          className="menu-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-controls="main-navigation"
          aria-expanded={open}
          onClick={() => setMenuPath(open ? null : pathname)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          ref={menu}
          id="main-navigation"
          aria-label="Main"
          className="main-nav"
        >
          <span className="mobile-menu-label">
            A little freshness, every day.
          </span>
          {MAIN_NAV.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? 'page' : undefined}
              style={{ '--link-index': index } as React.CSSProperties}
              className={link.href === '/download' ? 'nav-cta' : undefined}
              onClick={() => setMenuPath(null)}
            >
              {link.label}
              {link.href === '/download' ? (
                <span aria-hidden="true"> ↗</span>
              ) : null}
            </Link>
          ))}
          <span className="mobile-menu-note">
            From our dairy. To your family.
          </span>
        </nav>
      </div>
      <button
        className="menu-scrim"
        aria-label="Close menu"
        tabIndex={-1}
        onClick={() => {
          setMenuPath(null)
          toggle.current?.focus()
        }}
      />
    </header>
  )
}
