import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import Icon from './Icon.jsx'
import { Logo } from './Brand.jsx'

const navItems = [
  ['solucoes', 'Soluções'],
  ['projetos', 'Projeto'],
  ['processo', 'Processo'],
  ['cadernos', 'Cadernos'],
  ['sobre', 'Sobre'],
]

export default function Header() {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState('')
  const menuButtonRef = useRef(null)
  const navRef = useRef(null)
  const isHome = location.pathname === '/'
  const baseUrl = import.meta.env.BASE_URL
  const currentActiveId = isHome
    ? activeId
    : location.pathname.startsWith('/cadernos') ? 'cadernos' : ''

  const itemHref = (id) => {
    if (id === 'cadernos') return `${baseUrl}cadernos/`
    return isHome ? `#${id}` : `${baseUrl}#${id}`
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isHome) return undefined

    const sections = navItems
      .filter(([id]) => id !== 'cadernos')
      .map(([id]) => document.getElementById(id))
      .filter(Boolean)
    let frame = null

    const updateActiveSection = () => {
      if (frame !== null) return
      frame = window.requestAnimationFrame(() => {
        frame = null
        const readingLine = window.innerHeight * 0.32
        const current = sections.find((section) => {
          const bounds = section.getBoundingClientRect()
          return bounds.top <= readingLine && bounds.bottom > readingLine
        })
        setActiveId(current?.id || '')
      })
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)
    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
      if (frame !== null) window.cancelAnimationFrame(frame)
    }
  }, [isHome])

  useEffect(() => {
    if (!open) return undefined

    const focusable = [...navRef.current.querySelectorAll('a'), menuButtonRef.current]
    const focusTimer = window.setTimeout(() => navRef.current?.querySelector('a')?.focus(), 50)
    document.body.classList.add('menu-open')

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButtonRef.current?.focus()
        return
      }

      if (event.key !== 'Tab') return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.classList.remove('menu-open')
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}${open ? ' menu-active' : ''}`}>
      <div className="header-inner">
        <Logo href={isHome ? '#inicio' : baseUrl} />
        <nav ref={navRef} id="primary-navigation" className={open ? 'nav open' : 'nav'} aria-label="Navegação principal">
          {navItems.map(([id, label]) => (
            <a className={currentActiveId === id ? 'active' : ''} key={id} href={itemHref(id)} onClick={close} aria-current={currentActiveId === id ? (id === 'cadernos' ? 'page' : 'location') : undefined}>
              {label}
            </a>
          ))}
          <a className="button button-small nav-cta" href={isHome ? '#contato' : `${baseUrl}#contato`} onClick={close}>Conversar sobre meu projeto <Icon name="arrow" size={17} /></a>
        </nav>
        <button ref={menuButtonRef} className="menu-button" type="button" onClick={() => setOpen((current) => !current)} aria-controls="primary-navigation" aria-expanded={open} aria-label={open ? 'Fechar menu' : 'Abrir menu'}>
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>
    </header>
  )
}
