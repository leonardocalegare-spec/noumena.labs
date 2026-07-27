function hashValue(value) {
  return [...value].reduce((hash, character) => ((hash << 5) - hash + character.charCodeAt(0)) | 0, 0)
}

function InteractionMap() {
  return (
    <svg className="interaction-map" viewBox="0 0 800 460" focusable="false">
      <path className="interaction-axis" d="M70 235H730" />

      <g className="interaction-person">
        <circle cx="100" cy="235" r="31" />
        <circle cx="100" cy="221" r="8" />
        <path d="M82 252c5-14 31-14 36 0" />
      </g>

      <g className="interaction-interface">
        <rect x="288" y="125" width="236" height="220" rx="3" />
        <path d="M288 166h236M318 197h80M318 220h176M318 250h176M318 280h116" />
        <rect x="318" y="304" width="78" height="18" rx="1" />
        <circle cx="499" cy="145" r="4" />
        <circle cx="483" cy="145" r="4" />
      </g>

      <g className="interaction-system">
        <path d="M690 202l31 18v36l-31 18-31-18v-36z" />
        <path d="M674 227h32M674 239h24M674 251h18" />
      </g>

      <path className="interaction-route interaction-route-base" d="M131 235C195 235 215 190 288 190S343 265 404 265 458 214 524 214 604 238 659 238" />
      <path className="interaction-route interaction-route-active" pathLength="1" d="M131 235C195 235 215 190 288 190S343 265 404 265 458 214 524 214 604 238 659 238" />
      <path className="interaction-route interaction-route-return" d="M690 274C641 344 548 376 464 356" />

      <g className="interaction-node">
        <circle cx="201" cy="211" r="7" />
        <circle cx="288" cy="190" r="7" />
        <circle cx="404" cy="265" r="9" />
        <circle cx="524" cy="214" r="7" />
        <circle cx="618" cy="235" r="7" />
      </g>

      <g className="interaction-break interaction-detail">
        <path d="M462 350l10 12M472 350l-10 12" />
        <text x="484" y="362">RUPTURA / RECUPERAÇÃO</text>
      </g>

      <g className="interaction-labels">
        <text x="70" y="152">NECESSIDADE</text>
        <text x="274" y="105">MODELO</text>
        <text x="393" y="298">PROTÓTIPO</text>
        <text x="500" y="194">INTERFACE</text>
        <text x="661" y="184">TESTE</text>
      </g>

      <g className="interaction-corners interaction-detail">
        <path d="M55 80v-18h18M745 80v-18h-18M55 380v18h18M745 380v18h-18" />
      </g>
    </svg>
  )
}

export default function ContentCover({ item, compact = false }) {
  const seed = Math.abs(hashValue(item?.slug || 'cadernos-noumena'))
  const isInteractionMap = item?.cover === 'interaction-map'
  const style = {
    '--cover-x': `${22 + (seed % 55)}%`,
    '--cover-y': `${20 + (Math.floor(seed / 7) % 56)}%`,
    '--cover-tilt': `${-18 + (seed % 36)}deg`,
  }

  return (
    <div
      className={`content-cover${compact ? ' compact' : ''}${isInteractionMap ? ' content-cover--interaction' : ''}`}
      style={style}
      aria-hidden="true"
    >
      <div className="cover-grid" />
      {isInteractionMap ? (
        <InteractionMap />
      ) : (
        <>
          <div className="cover-orbit cover-orbit-a" />
          <div className="cover-orbit cover-orbit-b" />
          <div className="cover-signal">
            <span />
            <span />
            <span />
          </div>
          <div className="cover-node" />
        </>
      )}
      <div className="cover-meta">
        <span>{item?.code || 'N/LOG'}</span>
        <span>{isInteractionMap ? 'HUMAN LOOP' : item?.typeLabel?.toUpperCase() || 'ARQUIVO VIVO'}</span>
      </div>
      <div className="cover-index">
        <small>NOUMENA · LABS</small>
        <strong>{isInteractionMap ? 'UX' : String((seed % 89) + 10).padStart(2, '0')}</strong>
      </div>
    </div>
  )
}
