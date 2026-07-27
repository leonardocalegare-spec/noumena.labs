import { Children } from 'react'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router'
import remarkGfm from 'remark-gfm'
import FooterBase from '../components/FooterBase.jsx'
import Header from '../components/Header.jsx'
import Icon from '../components/Icon.jsx'
import PageMeta from '../components/PageMeta.jsx'
import ArticleCard from '../components/cadernos/ArticleCard.jsx'
import ArticleOutline from '../components/cadernos/ArticleOutline.jsx'
import ContentCover from '../components/cadernos/ContentCover.jsx'
import VideoPlayer from '../components/cadernos/VideoPlayer.jsx'
import { createHeadingId, formatPublicationDate } from '../lib/articleSchema.js'
import { getRelatedCadernos, getVisibleCaderno } from '../lib/content.js'
import NotFoundPage from './NotFoundPage.jsx'

function childText(children) {
  return Children.toArray(children)
    .map((child) => typeof child === 'string' ? child : child?.props?.children ? childText(child.props.children) : '')
    .join('')
}

export default function CadernoPage() {
  const { slug } = useParams()
  const item = getVisibleCaderno(slug)
  if (!item) return <NotFoundPage />

  const related = getRelatedCadernos(item)
  const canonicalPath = `${import.meta.env.BASE_URL}cadernos/${item.slug}/`
  const duration = item.type === 'video' && item.video?.duration
    ? item.video.duration
    : `${item.readingMinutes} min de leitura`

  const markdownComponents = {
    h2: ({ children }) => <h2 id={createHeadingId(childText(children))}>{children}</h2>,
    h3: ({ children }) => <h3 id={createHeadingId(childText(children))}>{children}</h3>,
    a: ({ href, children }) => {
      const external = /^https?:\/\//.test(href || '')
      return <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>{children}</a>
    },
  }

  return (
    <>
      <PageMeta title={`${item.title} — Cadernos Noumena`} description={item.summary} canonicalPath={canonicalPath} type="article" />
      <a className="skip-link" href="#conteudo-principal">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo-principal" className="article-page" tabIndex="-1">
        <header className="article-hero">
          <div className="grid-overlay" />
          <div className="container article-hero-inner">
            <nav className="article-breadcrumb" aria-label="Navegação estrutural">
              <a href={import.meta.env.BASE_URL}>Início</a>
              <span>/</span>
              <a href={`${import.meta.env.BASE_URL}cadernos/`}>Cadernos</a>
              <span>/</span>
              <span aria-current="page">{item.typeLabel}</span>
            </nav>
            {item.status === 'draft' && <div className="draft-notice">RASCUNHO LOCAL · NÃO SERÁ PUBLICADO</div>}
            <div className="article-hero-meta">
              <span>{item.code}</span>
              <span>{item.typeLabel.toUpperCase()}</span>
              <span>{formatPublicationDate(item.publishedAt)}</span>
              <span>{duration}</span>
            </div>
            <h1>{item.title}</h1>
            <p>{item.summary}</p>
            <div className="article-topics">{item.topics.map((topic) => <span key={topic}>#{topic}</span>)}</div>
          </div>
        </header>

        <section className="article-media container">
          {item.type === 'video' ? <VideoPlayer item={item} /> : <ContentCover item={item} />}
        </section>

        <div className="container article-layout">
          <ArticleOutline headings={item.headings} />
          <article className="article-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{item.body}</ReactMarkdown>
          </article>
          <aside className="article-identity">
            <span>AUTOR</span>
            <strong>Leonardo Henrique Calegare</strong>
            <p>Fundador da Noumena Labs e estudante de Ciência da Computação.</p>
            {item.video?.id && (
              <a href={`https://www.youtube.com/watch?v=${item.video.id}`} target="_blank" rel="noreferrer">
                Assistir no YouTube <Icon name="external" size={16} />
              </a>
            )}
          </aside>
        </div>

        {related.length > 0 && (
          <section className="related-cadernos section-pad" aria-labelledby="related-title">
            <div className="container">
              <div className="section-heading">
                <div>
                  <p className="section-label"><span>SEGUIR</span> CONTINUAR EXPLORANDO</p>
                  <h2 id="related-title">Outros registros.</h2>
                </div>
              </div>
              <div className="articles-grid related-grid">
                {related.map((relatedItem) => <ArticleCard item={relatedItem} key={relatedItem.slug} />)}
              </div>
            </div>
          </section>
        )}
      </main>
      <footer className="editorial-footer"><FooterBase /></footer>
    </>
  )
}
