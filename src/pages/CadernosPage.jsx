import { useMemo, useState } from 'react'
import FooterBase from '../components/FooterBase.jsx'
import Header from '../components/Header.jsx'
import PageMeta from '../components/PageMeta.jsx'
import ArticleCard from '../components/cadernos/ArticleCard.jsx'
import CadernosHeroVisual from '../components/cadernos/CadernosHeroVisual.jsx'
import ContentCover from '../components/cadernos/ContentCover.jsx'
import { contentTypes } from '../lib/articleSchema.js'
import { visibleCadernos } from '../lib/content.js'

const filters = [
  ['all', 'Todos'],
  ...Object.entries(contentTypes).map(([value, { label }]) => [value, `${label}s`]),
]

export default function CadernosPage() {
  const [filter, setFilter] = useState('all')
  const items = useMemo(
    () => filter === 'all' ? visibleCadernos : visibleCadernos.filter((item) => item.type === filter),
    [filter],
  )

  return (
    <>
      <PageMeta
        title="Cadernos Noumena — Vídeos, estudos e aprendizados"
        description="Vídeos autorais, estudos e aprendizados compartilhados em construção pela Noumena Labs."
        canonicalPath={`${import.meta.env.BASE_URL}cadernos/`}
      />
      <a className="skip-link" href="#conteudo-principal">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo-principal" className="cadernos-page" tabIndex="-1">
        <section className="cadernos-hero">
          <div className="grid-overlay" />
          <div className="container cadernos-hero-grid">
            <div>
              <p className="section-label"><span>N/LOG</span> ARQUIVO VIVO</p>
              <h1>Cadernos<br /> <span>Noumena.</span></h1>
              <p>Vídeos, estudos e aprendizados publicados com contexto — do primeiro experimento ao que mudou depois dele.</p>
            </div>
            <div className="cadernos-hero-index" aria-hidden="true">
              <CadernosHeroVisual />
            </div>
          </div>
          <div className="container cadernos-stats">
            <span>{String(visibleCadernos.length).padStart(2, '0')} REGISTROS</span>
            <span>DESIGN · TECNOLOGIA · APRENDIZAGEM</span>
          </div>
        </section>

        <section className="cadernos-feed section-pad" aria-labelledby="cadernos-feed-title">
          <div className="container">
            <div className="feed-heading">
              <div>
                <p className="section-label"><span>ÍNDICE</span> PUBLICAÇÕES</p>
                <h2 id="cadernos-feed-title">Explorar o arquivo.</h2>
              </div>
              <div className="article-filters" aria-label="Filtrar publicações">
                {filters.map(([value, label]) => (
                  <button
                    className={filter === value ? 'active' : ''}
                    type="button"
                    aria-pressed={filter === value}
                    onClick={() => setFilter(value)}
                    key={value}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {items.length > 0 ? (
              <div className="articles-grid">
                {items.map((item, index) => <ArticleCard item={item} featured={index === 0} key={item.slug} />)}
              </div>
            ) : (
              <div className="cadernos-empty">
                <ContentCover compact />
                <div>
                  <span>N/LOG · ARQUIVO ABERTO</span>
                  <h2>Nenhuma publicação neste filtro ainda.</h2>
                  <p>O arquivo começa com o que vale documentar. Novos registros serão publicados conforme os estudos avançarem.</p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <footer className="editorial-footer"><FooterBase /></footer>
    </>
  )
}
