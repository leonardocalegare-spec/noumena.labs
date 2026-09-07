import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import ServiceOffer, { ServicePrice } from './ServiceOffer.jsx'
import {
  getLastServicePageStart,
  getServicesPerPage,
  getVisibleServiceRange,
  normalizeServicePage,
} from '../utils/serviceCarousel.js'

const getInitialPerPage = () => (typeof window === 'undefined' ? 3 : getServicesPerPage(window.innerWidth))
const serviceNotes = {
  sites: 'Conteúdo fornecido pelo cliente · domínio e hospedagem separados',
  atendimento: 'Configuração em ferramentas existentes · acessos autorizados',
  controles: 'Dados e ferramentas disponíveis · limites confirmados antes do início',
  suporte: 'Atendimento agendado · escopo definido antes da execução',
}
const serviceAudiences = {
  sites: 'autônomos, lojas e prestadores de serviço',
  atendimento: 'negócios que precisam organizar Google e WhatsApp',
  controles: 'empresas que ainda controlam tarefas manualmente',
  suporte: 'pequenos escritórios e profissionais autônomos',
}

const priceModel = (price) => {
  if (price.type === 'monthly') return 'manutenção'
  if (price.type === 'from') return 'projeto'
  return 'pagamento único'
}

export default function ServicesCarousel({ services, otherService, packages = [] }) {
  const items = services
  const [perPage, setPerPage] = useState(getInitialPerPage)
  const [start, setStart] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [hasInteracted, setHasInteracted] = useState(false)
  const containerRef = useRef(null)
  const detailHeadingRef = useRef(null)
  const returnCategoryRef = useRef(null)
  const shouldFocusRef = useRef(false)
  const pointerStart = useRef(null)
  const didSwipe = useRef(false)
  const lastStart = getLastServicePageStart(items.length, perPage)
  const range = getVisibleServiceRange(start, perPage, items.length)
  const visibleItems = items.slice(start, start + perPage)

  useEffect(() => {
    if (!shouldFocusRef.current) return
    const target = selectedCategory
      ? detailHeadingRef.current
      : containerRef.current?.querySelector(`[data-category-id="${returnCategoryRef.current}"]`)
    if (!target) return
    shouldFocusRef.current = false
    target.focus({ preventScroll: true })
    const scrollTarget = selectedCategory ? target : containerRef.current
    scrollTarget.scrollIntoView({ block: 'start', behavior: 'instant' })
  }, [selectedCategory, start, perPage])

  const openCategory = (category) => {
    returnCategoryRef.current = category.id
    shouldFocusRef.current = true
    setSelectedCategory(category)
  }

  const closeCategory = () => {
    const index = items.findIndex(({ id }) => id === returnCategoryRef.current)
    setStart(normalizeServicePage(index, perPage, items.length))
    shouldFocusRef.current = true
    setSelectedCategory(null)
  }

  useEffect(() => {
    let frame
    const update = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const nextPerPage = getServicesPerPage(window.innerWidth)
        setPerPage(nextPerPage)
        setStart((current) => normalizeServicePage(current, nextPerPage, items.length))
      })
    }

    window.addEventListener('resize', update)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', update)
    }
  }, [items.length])

  const move = (nextDirection) => {
    setHasInteracted(true)
    setStart((current) =>
      nextDirection === 'next' ? Math.min(current + perPage, lastStart) : Math.max(current - perPage, 0),
    )
  }

  const startSwipe = (event) => {
    didSwipe.current = false
    if (window.innerWidth > 720) return
    if (event.target.closest('a, button:not(.category-open), summary')) return
    pointerStart.current = { x: event.clientX, y: event.clientY }
  }

  const finishSwipe = (event) => {
    if (!pointerStart.current) return
    const deltaX = event.clientX - pointerStart.current.x
    const deltaY = event.clientY - pointerStart.current.y
    pointerStart.current = null
    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) <= Math.abs(deltaY)) return

    didSwipe.current = true
    if (deltaX < 0 && start < lastStart) move('next')
    if (deltaX > 0 && start > 0) move('previous')
  }

  return (
    <div className="services-carousel" ref={containerRef}>
      {selectedCategory ? (
        <section className="service-category-detail" aria-labelledby="service-category-title">
          <button className="service-back" type="button" onClick={closeCategory}>
            <Icon name="arrow" className="icon-previous" size={17} /> Voltar às categorias
          </button>
          <div className="service-category-heading">
            <p className="section-label">{selectedCategory.eyebrow}</p>
            <h3 id="service-category-title" ref={detailHeadingRef} tabIndex="-1">
              {selectedCategory.title}
            </h3>
            <p>{selectedCategory.description}</p>
          </div>
          <div className="service-offers-grid">
            {selectedCategory.offers.map((offer) => (
              <ServiceOffer key={offer.id} offer={offer} />
            ))}
          </div>
        </section>
      ) : (
        <>
          <div className="services-carousel-controls">
            <button
              type="button"
              aria-label="Ver categorias anteriores"
              data-services-previous
              disabled={start === 0}
              onClick={() => move('previous')}
            >
              <Icon name="arrow" size={18} className="icon-previous" />
            </button>
            <p className="services-carousel-count" aria-hidden="true">
              {range.to} de {items.length} categorias
            </p>
            <button
              type="button"
              aria-label="Ver próximas categorias"
              data-services-next
              disabled={start === lastStart}
              onClick={() => move('next')}
            >
              <Icon name="arrow" size={18} />
            </button>
          </div>

          <p className="sr-only" aria-live="polite" aria-atomic="true" data-services-announcement>
            {hasInteracted ? `Categorias ${range.from} a ${range.to} de ${items.length}` : ''}
          </p>

          <div
            className="services-carousel-viewport"
            onClickCapture={(event) => {
              if (!didSwipe.current) return
              didSwipe.current = false
              if (event.detail === 0) return
              event.preventDefault()
              event.stopPropagation()
            }}
            onPointerDown={startSwipe}
            onPointerUp={finishSwipe}
            onPointerCancel={() => {
              pointerStart.current = null
            }}
          >
            <div className="services-carousel-page" key={`${perPage}-${start}`}>
              {visibleItems.map((service) => (
                <article
                  className={`service-card ${service.variant}${service.isFuture ? ' future-card' : ''}`}
                  key={service.code}
                >
                  <div className="card-header">
                    <span>{service.code}</span>
                    <span>{service.eyebrow}</span>
                  </div>
                  <div className="service-card-intro">
                    <div className="service-symbol" aria-hidden="true">
                      <Icon name={service.icon} size={29} />
                    </div>
                    <div className="service-card-copy">
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                      <p className="service-card-audience">
                        <strong>Indicado para:</strong> {serviceAudiences[service.id]}
                      </p>
                    </div>
                  </div>
                  <ul className="service-preview">
                    {service.offers.map((offer, offerIndex) => (
                      <li className={offerIndex === 0 ? 'is-featured' : ''} key={offer.id}>
                        <span>{offer.title}</span>
                        <ServicePrice price={offer.price} />
                        <small>{priceModel(offer.price)}</small>
                      </li>
                    ))}
                  </ul>
                  <p className="service-card-note">{serviceNotes[service.id]}</p>
                  <button
                    type="button"
                    className="category-open"
                    data-category-id={service.id}
                    aria-label={`Ver serviços de ${service.title}`}
                    onClick={() => openCategory(service)}
                  >
                    Ver entregas e preços <Icon name="arrow" size={17} />
                  </button>
                </article>
              ))}
            </div>
          </div>

          <div className="services-carousel-progress" aria-hidden="true">
            <span style={{ '--services-progress': range.to / items.length }} />
          </div>
        </>
      )}

      <p className="service-pricing-note">
        Os valores correspondem ao escopo base. Confira as condições e os custos externos antes de contratar.
      </p>
      {packages.length > 0 && (
        <section className="service-packages" aria-labelledby="service-packages-title">
          <h3 id="service-packages-title">Prefere uma entrega combinada?</h3>
          <div className="service-packages-grid">
            {packages.map((offer) => (
              <ServiceOffer key={offer.id} offer={offer} isPackage />
            ))}
          </div>
        </section>
      )}
      <aside className="service-custom" aria-labelledby="service-custom-title">
        <div>
          <p className="service-custom-kicker">SOLUÇÃO PERSONALIZADA</p>
          <h3 id="service-custom-title">Não encontrou o que precisa?</h3>
          <p>{otherService.description}</p>
          <ServicePrice price={otherService.price} />
        </div>
        <a className="text-link" href={otherService.href} target="_blank" rel="noreferrer">
          {otherService.cta} <Icon name="arrow" size={17} />
        </a>
      </aside>
    </div>
  )
}
