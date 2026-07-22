import Icon from './components/Icon.jsx'
import { BrandMark, Logo } from './components/Brand.jsx'
import Header from './components/Header.jsx'
import ProjectSlider from './components/ProjectSlider.jsx'
import { contactLinks, faqItems, generalProjectLink, processSteps, projects, services } from './data/site.js'

function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="orb orb-one" />
      <div className="orb orb-two" />
      <div className="core-rings">
        <span className="ring ring-one" /><span className="ring ring-two" /><span className="ring ring-three" />
        <span className="core"><BrandMark className="hero-mark" /></span>
        <i className="satellite satellite-one" /><i className="satellite satellite-two" /><i className="satellite satellite-three" />
      </div>
      <div className="code-card card-top"><span className="code-dot" /> system.status <b>ONLINE</b></div>
      <div className="code-card card-bottom"><span>idea</span>.initialize()</div>
    </div>
  )
}

function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo-principal">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo-principal" tabIndex="-1">
        <section className="hero" id="inicio">
          <div className="grid-overlay" />
          <div className="container hero-layout">
            <div className="hero-copy">
              <p className="eyebrow"><span className="status-dot" /> Desenvolvimento web + consultoria em TI</p>
              <h1>A <span>tecnologia certa</span> para o próximo passo do seu negócio.</h1>
              <p className="hero-text">Criamos landing pages que apresentam sua oferta com clareza e ajudamos pequenas empresas a tomar decisões melhores em tecnologia.</p>
              <div className="hero-actions">
                <a className="button" href="#contato">Conversar sobre meu projeto <Icon name="arrow" /></a>
                <a className="text-link" href="#solucoes">Conhecer as soluções <span>↓</span></a>
              </div>
              <div className="hero-meta"><span>BRASIL</span><i /><span>DESIGN</span><i /><span>TECNOLOGIA</span><i /><span>ESTRATÉGIA</span></div>
            </div>
            <HeroVisual />
          </div>
        </section>

        <section className="manifesto section-pad">
          <div className="container manifesto-grid">
            <p className="section-label"><span>01</span> ANTES DE CONSTRUIR</p>
            <div>
              <p className="manifesto-lead">Seu negócio não precisa de mais tecnologia. Precisa da tecnologia certa.</p>
              <p className="manifesto-copy">Uma página bonita que não explica sua oferta não gera oportunidades. Uma ferramenta que não resolve o problema só aumenta a complexidade. Por isso, começamos entendendo o seu contexto antes de recomendar ou construir qualquer solução.</p>
            </div>
          </div>
        </section>

        <section className="solutions section-pad" id="solucoes">
          <div className="container">
            <div className="section-heading">
              <div><p className="section-label"><span>02</span> COMO PODEMOS AJUDAR</p><h2>Soluções para avançar<br />com mais clareza.</h2></div>
              <p>Começamos com duas formas diretas de fortalecer sua presença, reduzir incertezas e colocar o próximo passo em movimento.</p>
            </div>
            <div className="service-grid">
              {services.map((service) => (
                <article className={`service-card ${service.accent}`} key={service.code}>
                  <div className="card-header"><span>{service.code}</span><span>{service.eyebrow}</span></div>
                  <div className="service-symbol">{service.code === '01' ? '</>' : '⌘'}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul>{service.features.map((feature) => <li key={feature}><Icon name="check" size={17} /> {feature}</li>)}</ul>
                  <a href={service.href} target="_blank" rel="noreferrer">{service.cta} <Icon name="external" size={18} /></a>
                </article>
              ))}
              <article className="service-card future-card">
                <div className="card-header"><span>∞</span><span>OUTROS DESAFIOS</span></div>
                <div className="future-content"><Icon name="spark" size={30} /><h3>Seu projeto não cabe<br />em uma categoria?</h3><p>Também estamos abertos a automações, produtos digitais, sistemas e novas experiências envolvendo tecnologia.</p></div>
                <a href={generalProjectLink} target="_blank" rel="noreferrer">Apresentar meu desafio <Icon name="external" size={18} /></a>
              </article>
            </div>
          </div>
        </section>

        <section className="projects section-pad" id="projetos">
          <div className="container">
            <div className="section-heading project-heading">
              <div><p className="section-label"><span>03</span> PROJETO EM DESTAQUE</p><h2>Da necessidade<br />à solução funcional.</h2></div>
              <p>Um recorte de como estratégia, experiência e implementação técnica se encontram em um projeto real.</p>
            </div>
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <ProjectSlider slides={project.slides} title={project.title} />
                <div className="project-copy">
                  <div className="card-header"><span>{project.code}</span><span>{project.category}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ul>{project.details.map((detail) => <li key={detail}><Icon name="check" size={17} /> {detail}</li>)}</ul>
                  <a className="project-live-link" href={project.liveUrl} target="_blank" rel="noreferrer">Ver projeto publicado <Icon name="external" size={18} /></a>
                  <a href={generalProjectLink} target="_blank" rel="noreferrer">Quero construir algo assim <Icon name="external" size={18} /></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="process section-pad" id="processo">
          <div className="container process-layout">
            <div className="process-intro">
              <p className="section-label"><span>04</span> COMO TRABALHAMOS</p>
              <h2>Clareza do primeiro<br />contato à entrega.</h2>
              <p>Você acompanha as decisões, entende o que está sendo construído e sabe qual é o próximo passo em cada etapa.</p>
            </div>
            <div className="steps">
              {processSteps.map(([number, title, description]) => (
                <article className="step" key={number}>
                  <span>{number}</span><div><h3>{title}</h3><p>{description}</p></div><b>↗</b>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="faq section-pad" id="faq">
          <div className="container faq-layout">
            <div className="faq-intro">
              <p className="section-label"><span>05</span> PERGUNTAS FREQUENTES</p>
              <h2>Antes de iniciar,<br />vale saber.</h2>
              <p>Respostas diretas para reduzir dúvidas e facilitar o primeiro passo.</p>
            </div>
            <div className="faq-list">
              {faqItems.map((item, index) => (
                <details key={item.question} open={index === 0}>
                  <summary><span>{String(index + 1).padStart(2, '0')}</span>{item.question}<Icon name="plus" size={19} /></summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="contact section-pad" id="contato">
          <div className="container contact-card">
            <div className="contact-glow" />
            <p className="eyebrow"><span className="status-dot" /> Vamos conversar</p>
            <h2>Qual é o próximo passo<br />do seu negócio?</h2>
            <p>Conte o que você deseja construir, melhorar ou entender. Vamos analisar o cenário e identificar um caminho possível.</p>
            <div className="contact-links">
              {contactLinks.map((link) => <a className="button" href={link.href} target="_blank" rel="noreferrer" key={link.label}>Conversar no {link.label} <Icon name="external" size={18} /></a>)}
              <span>CONTATO DIRETO COM LEONARDO · +55 11 91821-8635</span>
            </div>
          </div>
        </section>
      </main>

      <footer id="sobre">
        <div className="container founder-footer">
          <div className="founder-visual" aria-hidden="true">
            <BrandMark className="founder-mark" />
            <span>HUMAN_BEHIND_THE_LAB</span>
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

export default App
