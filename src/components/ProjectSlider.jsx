import { useState } from 'react'
import Icon from './Icon.jsx'
import { wrapCarouselIndex } from '../lib/carousel.js'

export default function ProjectSlider({ slides = [], title }) {
  const [active, setActive] = useState(0)

  if (slides.length === 0) {
    return (
      <div className="project-slider project-slider-empty" role="status">
        <p>As evidências visuais deste projeto serão publicadas em breve.</p>
      </div>
    )
  }

  const current = slides[active]
  const show = (index) => setActive(wrapCarouselIndex(index, slides.length))

  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
      show(active + (event.key === 'ArrowLeft' ? -1 : 1))
    }
  }

  return (
    <div className="project-slider" tabIndex="0" onKeyDown={onKeyDown} aria-roledescription="carrossel" aria-label={`Galeria visual do projeto ${title}`}>
      <div className="project-slide" key={current.image}>
        <img src={current.image} alt={`${title}: ${current.description}`} width={current.width} height={current.height} loading="lazy" decoding="async" />
        <div className="slide-caption" aria-live="polite" aria-atomic="true">
          <span>{String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
          <div><strong>{current.label}</strong><p>{current.description}</p></div>
        </div>
      </div>
      <div className="slider-controls">
        <button className="slider-arrow slider-prev" type="button" onClick={() => show(active - 1)} aria-label="Evidência visual anterior"><Icon name="arrow" size={18} /></button>
        <div className="slider-dots" aria-label="Selecionar evidência visual">
          {slides.map((slide, index) => <button className={index === active ? 'active' : ''} type="button" onClick={() => show(index)} aria-label={`Exibir ${slide.label}`} aria-current={index === active ? 'true' : undefined} key={slide.image} />)}
        </div>
        <button className="slider-arrow" type="button" onClick={() => show(active + 1)} aria-label="Próxima evidência visual"><Icon name="arrow" size={18} /></button>
      </div>
    </div>
  )
}
