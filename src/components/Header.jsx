import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import { Logo } from './Brand.jsx'

const navItems = [
  ['solucoes', 'Soluções'],
  ['projetos', 'Projeto'],
  ['processo', 'Processo'],
  ['sobre', 'Sobre'],
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuButtonRef = useRef(null)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
        <Logo />
        <nav ref={navRef} id="primary-navigation" className={open ? 'nav open' : 'nav'} aria-label="Navegação principal">
          {navItems.map(([id, label]) => <a key={id} href={`#${id}`} onClick={close}>{label}</a>)}
          <a className="button button-small nav-cta" href="#contato" onClick={close}>Conversar sobre meu projeto <Icon name="arrow" size={17} /></a>
        </nav>
        <button ref={menuButtonRef} className="menu-button" type="button" onClick={() => setOpen((current) => !current)} aria-controls="primary-navigation" aria-expanded={open} aria-label={open ? 'Fechar menu' : 'Abrir menu'}>
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>
    </header>
  )
}
