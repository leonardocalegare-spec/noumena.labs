import { useState } from 'react'
import Icon from '../Icon.jsx'
import ContentCover from './ContentCover.jsx'

export default function VideoPlayer({ item }) {
  const [active, setActive] = useState(false)
  const videoId = item.video?.id
  const youtubeUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : ''

  if (!videoId) {
    return (
      <div className="video-shell video-placeholder">
        <ContentCover item={item} />
        <div className="video-placeholder-copy">
          <span>{item.code} · RASCUNHO</span>
          <p>Adicione a URL do YouTube antes de publicar este vídeo.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`video-shell${active ? ' is-active' : ''}`}>
      <div className="video-shell-bar">
        <span>{item.code}</span>
        <span>YOUTUBE · {item.video.duration || 'VÍDEO'}</span>
      </div>

      {active ? (
        <div className="video-frame">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&cc_lang_pref=pt&cc_load_policy=1`}
            title={`Vídeo: ${item.title}`}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ) : (
        <button className="video-poster" type="button" onClick={() => setActive(true)} aria-label={`Reproduzir ${item.title}`}>
          <ContentCover item={item} />
          <span className="video-play"><Icon name="play" size={28} /> Assistir no site</span>
          <small>O player do YouTube será carregado após o clique.</small>
        </button>
      )}

      <div className="video-shell-footer">
        <span>PLAYER INTEGRADO · PRIVACIDADE APRIMORADA</span>
        <a href={youtubeUrl} target="_blank" rel="noreferrer">Abrir no YouTube <Icon name="external" size={16} /></a>
      </div>
    </div>
  )
}
