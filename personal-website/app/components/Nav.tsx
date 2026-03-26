'use client'
import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Projects', href: '#projects' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#hero')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3 bg-bg/90 backdrop-blur border-b border-border' : 'py-6'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <a href="#hero" className="font-mono text-accent text-sm font-bold tracking-widest hover:accent-glow transition-all">
          &gt; YN_
        </a>
        <ul className="flex gap-8">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={() => setActive(href)}
                className={`font-mono text-xs tracking-widest uppercase transition-all duration-200 ${
                  active === href
                    ? 'text-accent'
                    : 'text-subtle hover:text-text'
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
