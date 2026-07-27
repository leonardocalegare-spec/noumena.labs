import Icon from '../Icon.jsx'
import ArticleCard from './ArticleCard.jsx'
import ContentCover from './ContentCover.jsx'

export default function CadernosPreview({ items }) {
  const cadernosUrl = `${import.meta.env.BASE_URL}cadernos/`

  return (
    <section className="cadernos-preview section-pad" id="cadernos">
      <div className="container">
        <div className="section-heading" data-reveal>
          <div>
            <p className="section-label"><span>N/LOG</span> CADERNOS NOUMENA</p>
            <h2>Mais do que mostrar projetos,<br /> explicamos como são construídos.</h2>
          </div>
          <p>Os Cadernos Noumena reúnem estudos, dicas, experimentos e decisões de projeto — um registro contínuo do conhecimento desenvolvido na prática.</p>
        </div>

        {items.length > 0 ? (
          <div className="preview-grid" data-reveal>
            {items.map((item, index) => <ArticleCard item={item} featured={index === 0} key={item.slug} />)}
          </div>
        ) : (
          <div className="preview-empty" data-reveal>
            <ContentCover compact />
            <div>
              <span className="article-kicker">N/LOG · EM PREPARAÇÃO</span>
              <h3>O primeiro Caderno está em preparação.</h3>
              <p>Este espaço reunirá estudos, dicas, experimentos e decisões de projeto quando o primeiro conteúdo estiver pronto.</p>
              <a className="text-link" href={cadernosUrl}>Conhecer os Cadernos <Icon name="arrow" size={17} /></a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
