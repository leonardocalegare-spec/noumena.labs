import { lazy, Suspense, useEffect, useLayoutEffect, useState } from 'react'
import Icon from '../components/Icon.jsx'
import { BrandMark, Logo } from '../components/Brand.jsx'
import Header from '../components/Header.jsx'
import ProjectSlider from '../components/ProjectSlider.jsx'
import ProjectGuide from '../components/ProjectGuide.jsx'
import ServicesCarousel from '../components/ServicesCarousel.jsx'
import {
  contactLinks,
  faqItems,
  generalProjectLink,
  otherChallengesService,
  projects,
  servicePackages,
  services,
} from '../data/site.js'

const CadernosPreviewSection = lazy(() => import('../components/cadernos/CadernosPreviewSection.jsx'))

function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="orb orb-one" />
      <div className="orb orb-two" />
      <div className="signal-field">
        <span />
        <span />
      </div>
      <div className="core-rings">
        <span className="ring ring-one" />
        <span className="ring ring-two" />
        <span className="ring ring-three" />
        <span className="core">
          <BrandMark className="hero-mark" />
        </span>
        <i className="satellite satellite-one" />
        <i className="satellite satellite-two" />
        <i className="satellite satellite-three" />
      </div>
      <div className="code-card card-top">
        <span className="code-dot" /> SISTEMA <b>ATIVO</b>
      </div>
    </div>
  )
}

function HomePage() {
  const [showMobileContact, setShowMobileContact] = useState(false)

  useLayoutEffect(() => {
    const root = document.documentElement
    const elements = document.querySelectorAll('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return undefined
    }

    elements.forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight * 0.92) {
        element.classList.add('is-visible')
      }
    })
    root.classList.add('reveal-ready')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.16 },
    )

    const observeRevealElement = (element) => {
      if (element.classList.contains('is-visible')) return
      if (element.getBoundingClientRect().top < window.innerHeight * 0.92) {
        element.classList.add('is-visible')
        return
      }
      observer.observe(element)
    }

    elements.forEach(observeRevealElement)

    const mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return
          if (node.matches('[data-reveal]')) observeRevealElement(node)
          node.querySelectorAll('[data-reveal]').forEach(observeRevealElement)
        })
      })
    })

    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
      root.classList.remove('reveal-ready')
    }
  }, [])

  useEffect(() => {
    const heroAction = document.querySelector('.hero-actions .button')
    const projectGuide = document.querySelector('#guia-projeto')
    const solutions = document.querySelector('#solucoes')
    const founder = document.querySelector('#sobre')
    if (!heroAction || !projectGuide || !solutions || !founder || !('IntersectionObserver' in window)) return undefined

    const isVisible = (element) => {
      const bounds = element.getBoundingClientRect()
      return bounds.bottom > 0 && bounds.top < window.innerHeight
    }
    let heroActionVisible = isVisible(heroAction)
    let projectGuideVisible = isVisible(projectGuide)
    let solutionsVisible = isVisible(solutions)
    let founderVisible = isVisible(founder)
    const updateMobileContact = () =>
      setShowMobileContact(!heroActionVisible && !projectGuideVisible && !solutionsVisible && !founderVisible)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === heroAction) heroActionVisible = entry.isIntersecting
          if (entry.target === projectGuide) projectGuideVisible = entry.isIntersecting
          if (entry.target === solutions) solutionsVisible = entry.isIntersecting
          if (entry.target === founder) founderVisible = entry.isIntersecting
        })
        updateMobileContact()
      },
      { threshold: 0.1 },
    )

    updateMobileContact()
    observer.observe(heroAction)
    observer.observe(projectGuide)
    observer.observe(solutions)
    observer.observe(founder)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const targetId = window.location.hash.slice(1)
    if (!targetId) return undefined

    const target = document.getElementById(targetId)
    if (!target) return undefined

    const frame = window.requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  return (
    <>
      <a className="skip-link" href="#conteudo-principal">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo-principal" tabIndex="-1">
        <section className="hero" id="inicio">
          <div className="grid-overlay" />
          <div className="container hero-layout">
            <div className="hero-copy" data-reveal>
              <h1>
                Seu negócio pode vender melhor, trabalhar com mais organização e tomar decisões com <span>clareza</span>
                .
              </h1>
              <p className="hero-text">
                Crio páginas e catálogos, organizo seu atendimento e desenvolvo controles para facilitar a rotina do seu
                negócio. Veja os serviços, os preços e o que cada entrega inclui.
              </p>
              <div className="hero-actions">
                <a className="button" href={generalProjectLink} target="_blank" rel="noreferrer">
                  Conversar sobre meu projeto <Icon name="arrow" />
                </a>
                <a className="text-link" href="#solucoes">
                  Entender como podemos ajudar <Icon name="down" size={17} />
                </a>
              </div>
              <div className="hero-meta">
                <span>BRASIL</span>
                <i />
                <span>DESIGN</span>
                <i />
                <span>TECNOLOGIA</span>
                <i />
                <span>ESTRATÉGIA</span>
              </div>
            </div>
            <HeroVisual />
          </div>
        </section>

        <ProjectGuide />

        <section className="solutions section-pad" id="solucoes" aria-labelledby="solutions-title">
          <div className="container">
            <div className="section-heading" data-reveal>
              <div>
                <p className="section-label">
                  <span>01</span> COMO POSSO AJUDAR
                </p>
                <h2 id="solutions-title">Veja como posso ajudar o seu negócio.</h2>
              </div>
            </div>
            <ServicesCarousel services={services} otherService={otherChallengesService} packages={servicePackages} />
          </div>
        </section>

        <section className="projects section-pad" id="projetos">
          <div className="container">
            <div className="section-heading project-heading" data-reveal>
              <div>
                <p className="section-label">
                  <span>02</span> PROJETO EM DESTAQUE
                </p>
              </div>
            </div>
            {projects.map((project) => {
              const [challenge, ...execution] = project.story

              return (
                <article className="project-card" data-reveal key={project.title}>
                  <ProjectSlider slides={project.slides} title={project.title} />
                  <div className="project-copy">
                    <div className="card-header">
                      <span>{project.code}</span>
                      <span>{project.category}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <dl className="case-story case-sequence">
                      <div>
                        <dt>{challenge.label}</dt>
                        <dd>{challenge.value}</dd>
                      </div>
                      <div className="case-change">
                        <dt>O que foi construído</dt>
                        <dd>{project.description}</dd>
                      </div>
                      {execution.map(({ label, value }) => (
                        <div key={label}>
                          <dt>{label}</dt>
                          <dd>{value}</dd>
                        </div>
                      ))}
                    </dl>
                    <ul>
                      {project.details.map((detail) => (
                        <li key={detail}>
                          <Icon name="check" size={17} /> {detail}
                        </li>
                      ))}
                    </ul>
                    <a className="project-live-link" href={project.liveUrl} target="_blank" rel="noreferrer">
                      Ver projeto publicado <Icon name="external" size={18} />
                    </a>
                    <a href={generalProjectLink} target="_blank" rel="noreferrer">
                      Quero construir algo assim <Icon name="external" size={18} />
                    </a>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="faq section-pad" id="faq">
          <div className="container faq-layout">
            <div className="faq-intro" data-reveal>
              <p className="section-label">
                <span>03</span> PERGUNTAS FREQUENTES
              </p>
              <h2>
                O que você precisa saber
                <br /> antes de começar.
              </h2>
            </div>
            <div className="faq-list" data-reveal>
              {faqItems.map((item, index) => (
                <details key={item.question} open={index === 0}>
                  <summary>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {item.question}
                    <Icon name="plus" size={19} />
                  </summary>
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <Suspense fallback={<div className="cadernos-preview-loading" aria-hidden="true" />}>
          <CadernosPreviewSection />
        </Suspense>
      </main>

      {showMobileContact && (
        <a
          className="mobile-contact"
          href={contactLinks[0].href}
          target="_blank"
          rel="noreferrer"
          aria-label="Conversar com Leonardo pelo WhatsApp"
        >
          <span>WhatsApp</span>
          <Icon name="whatsapp" size={17} />
        </a>
      )}

      <footer id="sobre">
        <div className="container brand-contact" data-reveal>
          <div className="brand-contact-emblem" aria-hidden="true">
            <span className="brand-contact-ring brand-contact-ring-outer" />
            <span className="brand-contact-ring brand-contact-ring-inner" />
            <BrandMark className="brand-contact-mark" />
          </div>
          <div className="brand-contact-links">
            <a
              className="button button-small brand-contact-link"
              href="https://www.instagram.com/noumenalabs/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram <Icon name="instagram" size={17} />
            </a>
            <a
              className="button button-small brand-contact-link"
              href="https://www.linkedin.com/company/noumena-labs-tecnologia/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn Noumena Labs <Icon name="linkedin" size={17} />
            </a>
            <a
              className="button button-small brand-contact-link"
              href="https://www.linkedin.com/in/leocalegare"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <Icon name="linkedin" size={17} />
            </a>
            <a
              className="button button-small brand-contact-link"
              href={generalProjectLink}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp <Icon name="whatsapp" size={17} />
            </a>
          </div>
        </div>
        <div className="footer-base">
          <div className="container footer-inner">
            <Logo />
            <p>Clareza para decidir. Tecnologia para avançar.</p>
            <div>
              <span>© {new Date().getFullYear()} Noumena Labs</span>
              <a href="#inicio">VOLTAR AO TOPO ↑</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default HomePage
