import Icon from '../Icon.jsx'
import { formatPublicationDate } from '../../lib/articleSchema.js'
import ContentCover from './ContentCover.jsx'

export default function ArticleCard({ item, featured = false }) {
  const href = `${import.meta.env.BASE_URL}cadernos/${item.slug}/`
  const duration = item.type === 'video' && item.video?.duration
    ? item.video.duration
    : `${item.readingMinutes} min`

  return (
    <article className={`article-card${featured ? ' featured' : ''}`}>
      <a className="article-cover-link" href={href} aria-label={`Abrir ${item.title}`}>
        <ContentCover item={item} compact={!featured} />
        {item.type === 'video' && (
          <span className="cover-play">
            <Icon name="play" size={20} />
          </span>
        )}
      </a>
      <div className="article-card-copy">
        <div className="article-kicker">
          <span>{item.code}</span>
          <span>{item.status === 'draft' ? 'RASCUNHO LOCAL' : item.typeLabel.toUpperCase()}</span>
        </div>
        <h2><a href={href}>{item.title}</a></h2>
        <p>{item.summary}</p>
        <div className="article-card-meta">
          <span>{formatPublicationDate(item.publishedAt)}</span>
          <span><Icon name="clock" size={15} /> {duration}</span>
        </div>
        <a className="text-link article-read-link" href={href}>
          {item.type === 'video' ? 'Assistir e ler' : 'Abrir registro'} <Icon name="arrow" size={17} />
        </a>
      </div>
    </article>
  )
}
