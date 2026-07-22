export function BrandMark({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <circle className="brand-field" cx="32" cy="32" r="27" />
      <path className="brand-orbit orbit-a" d="M10 25a24 24 0 0 1 37-14" />
      <path className="brand-orbit orbit-b" d="M54 39A24 24 0 0 1 17 53" />
      <path className="brand-pillar" d="M17 44V20l30 24V20" />
      <path className="brand-axis" d="m17 20 30 24" />
      <circle className="brand-pulse pulse-a" cx="32" cy="32" r="13" />
      <circle className="brand-pulse pulse-b" cx="32" cy="32" r="18" />
      <circle className="brand-essence" cx="32" cy="32" r="8.5" />
      <circle className="brand-node" cx="51" cy="14" r="2.5" />
    </svg>
  )
}

export function Logo() {
  return (
    <a className="logo" href="#inicio" aria-label="Noumena Labs — início">
      <BrandMark className="logo-mark compact-mark" />
      <span className="logo-type">NOUMENA <b>LABS</b></span>
    </a>
  )
}
