import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Icon from '../components/Icon.jsx'
import { BrandMark, Logo } from '../components/Brand.jsx'
import Header from '../components/Header.jsx'
import ProjectSlider from '../components/ProjectSlider.jsx'
import { contactLinks, faqItems, generalProjectLink, processSteps, projects, services } from '../data/site.js'

const CadernosPreviewSection = lazy(() => import('../components/cadernos/CadernosPreviewSection.jsx'))

function HeroVisual({ visualRef, onPointerMove, onPointerLeave }) {
  return (
    <div ref={visualRef} className="hero-visual" aria-hidden="true" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      <div className="orb orb-one" />
      <div className="orb orb-two" />
      <div className="signal-field"><span /><span /></div>
      <div className="core-rings">
        <span className="ring ring-one" /><span className="ring ring-two" /><span className="ring ring-three" />
        <span className="core"><BrandMark className="hero-mark" /></span>
        <i className="satellite satellite-one" /><i className="satellite satellite-two" /><i className="satellite satellite-three" />
      </div>
      <div className="code-card card-top"><span className="code-dot" /> SISTEMA <b>ATIVO</b></div>
    </div>
  )
}

function HomePage() {
  const [activeStep, setActiveStep] = useState(0)
  const [showMobileContact, setShowMobileContact] = useState(true)
  const heroVisualRef = useRef(null)
  const pointerFrameRef = useRef(null)
  const pointerStateRef = useRef(null)

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

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.16 })

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
    const hero = document.querySelector('#inicio')
    if (!hero || !('IntersectionObserver' in window)) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      setShowMobileContact(entry.isIntersecting)
    }, { threshold: 0.1 })

    observer.observe(hero)
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

  useEffect(() => () => {
    if (pointerFrameRef.current !== null) {
      window.cancelAnimationFrame(pointerFrameRef.current)
    }
  }, [])

  const setPointerPosition = (element, event) => {
    if (event.pointerType && event.pointerType !== 'mouse') return
    pointerStateRef.current = { element, clientX: event.clientX, clientY: event.clientY }
    if (pointerFrameRef.current !== null) return

    pointerFrameRef.current = window.requestAnimationFrame(() => {
      const pointer = pointerStateRef.current
      pointerFrameRef.current = null
      if (!pointer) return

      const bounds = pointer.element.getBoundingClientRect()
      const x = (pointer.clientX - bounds.left) / bounds.width - 0.5
      const y = (pointer.clientY - bounds.top) / bounds.height - 0.5
      pointer.element.style.setProperty('--pointer-x', `${x * 5}px`)
      pointer.element.style.setProperty('--pointer-y', `${y * 5}px`)
      pointer.element.style.setProperty('--pointer-x-orb', `${x * -11}px`)
      pointer.element.style.setProperty('--pointer-y-orb', `${y * -11}px`)
      pointer.element.style.setProperty('--pointer-x-orb-alt', `${x * 8}px`)
      pointer.element.style.setProperty('--pointer-y-orb-alt', `${y * 8}px`)
      pointer.element.style.setProperty('--glow-x', `${(x + 0.5) * 100}%`)
      pointer.element.style.setProperty('--glow-y', `${(y + 0.5) * 100}%`)
    })
  }

  const resetPointerPosition = (element) => {
    pointerStateRef.current = null
    if (pointerFrameRef.current !== null) {
      window.cancelAnimationFrame(pointerFrameRef.current)
      pointerFrameRef.current = null
    }
    element.style.removeProperty('--pointer-x')
    element.style.removeProperty('--pointer-y')
    element.style.removeProperty('--pointer-x-orb')
    element.style.removeProperty('--pointer-y-orb')
    element.style.removeProperty('--pointer-x-orb-alt')
    element.style.removeProperty('--pointer-y-orb-alt')
    element.style.removeProperty('--glow-x')
    element.style.removeProperty('--glow-y')
  }

  return (
    <>
      <a className="skip-link" href="#conteudo-principal">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo-principal" tabIndex="-1">
        <section className="hero" id="inicio">
          <div className="grid-overlay" />
          <div className="container hero-layout">
            <div className="hero-copy" data-reveal>
              <p className="eyebrow"><span className="status-dot" /><span>Desenvolvimento web · consultoria em TI</span></p>
              <h1>Transformamos necessidades do seu negócio em <span>soluções digitais</span> claras e funcionais.</h1>
              <p className="hero-text">Antes de recomendar uma página, ferramenta ou sistema, entendemos o problema, o objetivo e o que precisa mudar na prática.</p>
              <div className="hero-actions">
                <a className="button" href="#contato">Conversar sobre meu projeto <Icon name="arrow" /></a>
                <a className="text-link" href="#solucoes">Entender como podemos ajudar <Icon name="down" size={17} /></a>
              </div>
              <div className="hero-meta"><span>BRASIL</span><i /><span>DESIGN</span><i /><span>TECNOLOGIA</span><i /><span>ESTRATÉGIA</span></div>
            </div>
            <HeroVisual visualRef={heroVisualRef} onPointerMove={(event) => setPointerPosition(event.currentTarget, event)} onPointerLeave={(event) => resetPointerPosition(event.currentTarget)} />
          </div>
        </section>

        <section className="manifesto section-pad">
          <div className="container manifesto-grid" data-reveal>
            <p className="section-label"><span>01</span> ANTES DE CONSTRUIR</p>
            <div>
              <p className="manifesto-lead">Antes de escolher a tecnologia, precisamos entender o que ela deve melhorar.</p>
              <p className="manifesto-copy">Uma página pode ter um bom visual e ainda não explicar por que um cliente deveria entrar em contato. Uma ferramenta pode automatizar uma tarefa e continuar deixando o processo confuso. Por isso, primeiro entendemos o objetivo, as pessoas envolvidas e o resultado esperado. Só então definimos o que vale orientar, melhorar ou construir.</p>
            </div>
          </div>
        </section>

        <section className="solutions section-pad" id="solucoes">
          <div className="container">
            <div className="section-heading" data-reveal>
              <div><p className="section-label"><span>02</span> COMO PODEMOS AJUDAR</p><h2>Dois caminhos para<br /> necessidades diferentes.</h2></div>
              <p>Se você precisa apresentar melhor uma oferta, criamos uma landing page clara. Se precisa decidir como usar tecnologia, analisamos o cenário e organizamos prioridades. Outros desafios também podem ser avaliados.</p>
            </div>
            <div className="service-grid">
              {services.map((service) => (
                <article className={`service-card ${service.variant}`} data-reveal style={{ '--reveal-delay': `${Number(service.code) * 70}ms` }} key={service.code}>
                  <div className="card-header"><span>{service.code}</span><span>{service.eyebrow}</span></div>
                  <div className="service-symbol"><Icon name={service.icon} size={29} /></div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul>{service.features.map((feature) => <li key={feature}><Icon name="check" size={17} /> {feature}</li>)}</ul>
                  <a href={service.href} target="_blank" rel="noreferrer">{service.cta} <Icon name="external" size={18} /></a>
                </article>
              ))}
              <article className="service-card future-card" data-reveal style={{ '--reveal-delay': '210ms' }}>
                <div className="card-header"><span>∞</span><span>OUTROS DESAFIOS</span></div>
                <div className="future-content"><Icon name="spark" size={30} /><h3>Seu projeto não cabe<br /> em uma categoria?</h3><p>Também desenvolvemos automações, produtos digitais e sistemas quando existe um problema real para resolver.</p></div>
                <a href={generalProjectLink} target="_blank" rel="noreferrer">Apresentar meu desafio <Icon name="external" size={18} /></a>
              </article>
            </div>
          </div>
        </section>

        <section className="projects section-pad" id="projetos">
          <div className="container">
            <div className="section-heading project-heading" data-reveal>
              <div><p className="section-label"><span>03</span> PROJETO EM DESTAQUE</p><h2>Um problema real,<br /> da análise à entrega.</h2></div>
              <p>Neste projeto, uma coleta extensa de dados empresariais foi transformada em uma jornada digital guiada, responsiva e mais fácil de acompanhar.</p>
            </div>
            {projects.map((project) => (
              <article className="project-card" data-reveal key={project.title}>
                <ProjectSlider slides={project.slides} title={project.title} />
                <div className="project-copy">
                  <div className="card-header"><span>{project.code}</span><span>{project.category}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <dl className="case-story">
                    {project.story.map(({ label, value }) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
                  </dl>
                  <ul>{project.details.map((detail) => <li key={detail}><Icon name="check" size={17} /> {detail}</li>)}</ul>
                  <a className="project-live-link" href={project.liveUrl} target="_blank" rel="noreferrer">Ver projeto publicado <Icon name="external" size={18} /></a>
                  <a href={generalProjectLink} target="_blank" rel="noreferrer">Quero construir algo assim <Icon name="external" size={18} /></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <Suspense fallback={<div className="cadernos-preview-loading" aria-hidden="true" />}>
          <CadernosPreviewSection />
        </Suspense>

        <section className="process section-pad" id="processo">
          <div className="container process-layout">
            <div className="process-intro" data-reveal>
              <p className="section-label"><span>04</span> COMO TRABALHAMOS</p>
              <h2>Você entende o caminho<br /> antes e durante a construção.</h2>
              <p>Primeiro organizamos a necessidade. Depois, definimos prioridades, construímos com validações e entregamos uma solução preparada para continuar evoluindo.</p>
            </div>
            <div className="steps" data-reveal>
              {processSteps.map((step) => (
                <button className={`step${activeStep === Number(step.number) - 1 ? ' active' : ''}`} type="button" onClick={() => setActiveStep(Number(step.number) - 1)} onFocus={() => setActiveStep(Number(step.number) - 1)} aria-pressed={activeStep === Number(step.number) - 1} key={step.number}>
                  <span>{step.number}</span><div><h3>{step.title}</h3><p>{step.description}</p></div><span className="step-icon"><Icon name="trend" size={19} /></span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="faq section-pad" id="faq">
          <div className="container faq-layout">
            <div className="faq-intro" data-reveal>
              <p className="section-label"><span>05</span> PERGUNTAS FREQUENTES</p>
              <h2>O que você precisa saber<br /> antes de começar.</h2>
              <p>Você não precisa chegar com um escopo pronto. As respostas abaixo explicam como funciona o primeiro contato e quais projetos podemos avaliar.</p>
            </div>
            <div className="faq-list" data-reveal>
              {faqItems.map((item, index) => (
                <details key={item.question} open={index === 0}>
                  <summary><span>{String(index + 1).padStart(2, '0')}</span>{item.question}<Icon name="plus" size={19} /></summary>
                  <div className="faq-answer"><p>{item.answer}</p></div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="contact section-pad" id="contato">
          <div className="container contact-card" data-reveal onPointerMove={(event) => setPointerPosition(event.currentTarget, event)} onPointerLeave={(event) => resetPointerPosition(event.currentTarget)}>
            <div className="contact-glow" />
            <p className="eyebrow"><span className="status-dot" /> Vamos conversar</p>
            <h2>Conte o que precisa mudar<br /> no seu negócio.</h2>
            <p>Você pode começar explicando o cenário, a dificuldade e o resultado que espera alcançar. A partir disso, analisamos a necessidade e identificamos um caminho possível.</p>
            <div className="contact-links">
              {contactLinks.map((link) => <a className="button" href={link.href} target="_blank" rel="noreferrer" key={link.label}>Conversar no {link.label} <Icon name="external" size={18} /></a>)}
              <span>CONTATO DIRETO COM LEONARDO · +55 11 91821-8635</span>
            </div>
          </div>
        </section>
      </main>

      {showMobileContact && (
        <a className="mobile-contact" href={contactLinks[0].href} target="_blank" rel="noreferrer" aria-label="Conversar com Leonardo pelo WhatsApp">
          <span>WhatsApp</span><Icon name="external" size={17} />
        </a>
      )}

      <footer id="sobre">
        <div className="container founder-footer" data-reveal>
          <div className="founder-visual" aria-hidden="true">
            <BrandMark className="founder-mark" />
            <span>POR TRÁS DO LAB</span>
          </div>
          <div className="founder-copy">
            <p className="section-label"><span>06</span> SOBRE O FUNDADOR</p>
            <h2>Prazer, eu sou o Leonardo.</h2>
            <p>Sou estudante de Ciência da Computação e fundador da Noumena Labs. Gosto de transformar problemas ainda confusos em soluções digitais claras, úteis e bem construídas.</p>
            <p>Estou sempre estudando, experimentando novas tecnologias e criando aplicações que aproximam boas ideias de necessidades reais.</p>
            <p className="founder-philosophy">A Noumena nasce desse movimento: compreender a essência do problema antes de decidir o que construir.</p>
            <div className="founder-signature"><span>Leonardo Henrique Calegare</span><small>FUNDADOR DA NOUMENA LABS · CIÊNCIA DA COMPUTAÇÃO</small></div>
          </div>
        </div>
        <div className="footer-base">
          <div className="container footer-inner">
            <Logo />
            <p>Clareza para decidir. Tecnologia para avançar.</p>
            <div><span>© {new Date().getFullYear()} Noumena Labs</span><a href="#inicio">VOLTAR AO TOPO ↑</a></div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default HomePage
