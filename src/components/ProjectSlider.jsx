import { useRef, useState } from 'react'
import Icon from './Icon.jsx'
import { wrapCarouselIndex } from '../lib/carousel.js'

export default function ProjectSlider({ slides = [], title }) {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState('next')
  const dragStart = useRef(null)

  if (slides.length === 0) {
    return (
      <div className="project-slider project-slider-empty" role="status">
        <p>As evidências visuais deste projeto serão publicadas em breve.</p>
      </div>
    )
  }

  const current = slides[active]
  const show = (index) => {
    const next = wrapCarouselIndex(index, slides.length)
    if (next === active) return
    setDirection(next > active || (active === slides.length - 1 && next === 0) ? 'next' : 'previous')
    setActive(next)
  }

  const move = (amount) => show(active + amount)

  const onPointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    dragStart.current = event.clientX
  }

  const onPointerUp = (event) => {
    if (dragStart.current === null) return
    const distance = event.clientX - dragStart.current
    dragStart.current = null
    if (Math.abs(distance) < 36) return
    move(distance > 0 ? -1 : 1)
  }

  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
      move(event.key === 'ArrowLeft' ? -1 : 1)
    }
  }

  return (
    <div className="project-slider" tabIndex="0" onKeyDown={onKeyDown} onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => { dragStart.current = null }} aria-roledescription="carrossel" aria-label={`Galeria visual do projeto ${title}. Arraste para trocar as evidências.`}>
      <div className={`project-slide slide-${direction}`} key={current.image}>
        <img src={current.image} alt={`${title}: ${current.description}`} width={current.width} height={current.height} loading="lazy" decoding="async" />
        <div className="slide-caption" aria-live="polite" aria-atomic="true">
          <span>{String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
          <div><strong>{current.label}</strong><p>{current.description}</p></div>
        </div>
      </div>
      <div className="slider-controls">
        <button className="slider-arrow slider-prev" type="button" onClick={() => move(-1)} aria-label="Evidência visual anterior"><Icon name="arrow" size={18} /></button>
        <div className="slider-dots" aria-label="Selecionar evidência visual">
          {slides.map((slide, index) => <button className={index === active ? 'active' : ''} type="button" onClick={() => show(index)} aria-label={`Exibir ${slide.label}`} aria-current={index === active ? 'true' : undefined} key={slide.image} />)}
        </div>
        <button className="slider-arrow" type="button" onClick={() => move(1)} aria-label="Próxima evidência visual"><Icon name="arrow" size={18} /></button>
      </div>
    </div>
  )
}
