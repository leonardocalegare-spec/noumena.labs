const stages = [
  ['INTENÇÃO', '01'],
  ['INTERAÇÃO', '02'],
  ['RESPOSTA', '03'],
]

export default function CadernosHeroVisual() {
  return (
    <div className="noumena-dialogue" aria-hidden="true">
      <div className="noumena-dialogue-grid" />
      <div className="noumena-dialogue-meta">
        <span>N/SYS · 001</span>
        <span>DIÁLOGO ATIVO</span>
      </div>

      <svg className="noumena-dialogue-map" viewBox="0 0 720 440" focusable="false">
        <rect className="dialogue-frame" x="36" y="42" width="648" height="348" rx="2" />
        <path className="dialogue-guide" d="M74 238H646" />
        <path className="dialogue-orbit dialogue-orbit-outer" d="M217 238a143 143 0 1 1 286 0 143 143 0 1 1-286 0" />
        <path className="dialogue-orbit dialogue-orbit-inner" d="M278 238a82 82 0 1 1 164 0 82 82 0 1 1-164 0" />

        <g className="dialogue-interface">
          <rect x="310" y="166" width="100" height="144" rx="2" />
          <path d="M330 194h60M330 216h34M330 258h60M330 280h44" />
          <circle cx="384" cy="216" r="4" />
          <circle cx="384" cy="280" r="4" />
        </g>

        <path className="dialogue-route dialogue-route-a" d="M92 238C160 238 188 205 242 205S304 238 360 238" />
        <path className="dialogue-route dialogue-route-b" d="M360 238C416 238 448 271 502 271S560 238 628 238" />
        <path className="dialogue-route dialogue-route-loop" d="M628 238C595 122 500 90 421 126" />

        <g className="dialogue-node dialogue-node-user">
          <circle className="dialogue-node-ring" cx="92" cy="238" r="14" />
          <circle className="dialogue-node-core" cx="92" cy="238" r="4" />
        </g>
        <g className="dialogue-node dialogue-node-interface">
          <circle className="dialogue-node-ring" cx="360" cy="238" r="18" />
          <circle className="dialogue-node-core" cx="360" cy="238" r="5" />
        </g>
        <g className="dialogue-node dialogue-node-system">
          <circle className="dialogue-node-ring" cx="628" cy="238" r="14" />
          <circle className="dialogue-node-core" cx="628" cy="238" r="4" />
        </g>

        <g className="dialogue-monogram">
          <path d="M476 164v60l52-60v60" />
        </g>

        <circle className="dialogue-packet dialogue-packet-a" cx="92" cy="238" r="4" />
        <circle className="dialogue-packet dialogue-packet-b" cx="360" cy="238" r="4" />
      </svg>

      <div className="noumena-dialogue-stages">
        {stages.map(([label, index]) => (
          <span key={label}><small>{index}</small>{label}</span>
        ))}
      </div>
      <div className="noumena-dialogue-index">N</div>
    </div>
  )
}
