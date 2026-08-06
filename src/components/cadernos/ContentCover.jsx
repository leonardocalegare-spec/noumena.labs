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

function SupportDiagnostic() {
  return (
    <svg className="support-diagnostic" viewBox="0 0 800 460" focusable="false">
      <path className="support-guide" d="M72 230H728M224 96v268M560 96v268" />

      <g className="support-power">
        <rect x="78" y="169" width="112" height="122" rx="3" />
        <path d="M134 190l-22 45h21l-9 37 32-51h-22l16-31z" />
        <circle cx="102" cy="274" r="4" />
        <circle cx="118" cy="274" r="4" />
      </g>

      <g className="support-system">
        <rect x="270" y="130" width="244" height="200" rx="4" />
        <path className="support-board" d="M292 156h200v148H292zM312 176h58v52h-58zM390 176h82M390 196h68M390 216h76M312 250h160M312 270h82M312 288h116" />
        <g className="support-chip">
          <rect x="326" y="187" width="30" height="30" rx="2" />
          <path d="M321 193h-8M321 202h-8M321 211h-8M361 193h8M361 202h8M361 211h8M332 182v-8M341 182v-8M350 182v-8M332 222v8M341 222v8M350 222v8" />
        </g>
      </g>

      <g className="support-terminal">
        <rect x="604" y="165" width="126" height="130" rx="3" />
        <path d="M604 194h126M622 217l14 11-14 11M647 239h25M622 260h64" />
        <circle cx="622" cy="180" r="3" />
        <circle cx="634" cy="180" r="3" />
      </g>

      <path className="support-route support-route-base" d="M190 230C224 230 232 202 270 202H326M356 202H514C552 202 564 230 604 230H704" />
      <path className="support-route support-route-active" pathLength="1" d="M190 230C224 230 232 202 270 202H326M356 202H514C552 202 564 230 604 230H704" />

      <g className="support-nodes">
        <circle cx="224" cy="216" r="6" />
        <circle cx="270" cy="202" r="6" />
        <circle cx="341" cy="202" r="8" />
        <circle cx="514" cy="202" r="6" />
        <circle cx="560" cy="216" r="6" />
        <circle cx="704" cy="230" r="8" />
      </g>

      <g className="support-check support-detail">
        <circle cx="704" cy="230" r="24" />
        <path d="M693 230l8 8 15-18" />
      </g>

      <g className="support-labels">
        <text x="78" y="145">ENERGIA</text>
        <text x="270" y="106">INICIALIZAÇÃO / SISTEMA</text>
        <text x="604" y="141">DIAGNÓSTICO</text>
        <text className="support-detail" x="78" y="326">CAMADA 01</text>
        <text className="support-detail" x="270" y="356">CAMADAS 02—04</text>
        <text className="support-detail" x="604" y="326">VALIDAÇÃO</text>
      </g>

      <g className="support-corners support-detail">
        <path d="M54 84V64h20M746 84V64h-20M54 376v20h20M746 376v20h-20" />
      </g>
    </svg>
  )
}

export default function ContentCover({ item, compact = false }) {
  const seed = Math.abs(hashValue(item?.slug || 'cadernos-noumena'))
  const isInteractionMap = item?.cover === 'interaction-map'
  const isSupportDiagnostic = item?.cover === 'support-diagnostic'
  const style = {
    '--cover-x': `${22 + (seed % 55)}%`,
    '--cover-y': `${20 + (Math.floor(seed / 7) % 56)}%`,
    '--cover-tilt': `${-18 + (seed % 36)}deg`,
  }

  return (
    <div
      className={`content-cover${compact ? ' compact' : ''}${isInteractionMap ? ' content-cover--interaction' : ''}${isSupportDiagnostic ? ' content-cover--support' : ''}`}
      style={style}
      aria-hidden="true"
    >
      <div className="cover-grid" />
      {isInteractionMap ? (
        <InteractionMap />
      ) : isSupportDiagnostic ? (
        <SupportDiagnostic />
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
        <span>{isInteractionMap ? 'HUMAN LOOP' : isSupportDiagnostic ? 'FLUXO TÉCNICO' : item?.typeLabel?.toUpperCase() || 'ARQUIVO VIVO'}</span>
      </div>
      <div className="cover-index">
        <small>NOUMENA · LABS</small>
        <strong>{isInteractionMap ? 'UX' : isSupportDiagnostic ? 'TI' : String((seed % 89) + 10).padStart(2, '0')}</strong>
      </div>
    </div>
  )
}
