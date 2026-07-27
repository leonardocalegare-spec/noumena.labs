import { featuredCaderno, publishedCadernos } from '../../lib/content.js'
import CadernosPreview from './CadernosPreview.jsx'

export default function CadernosPreviewSection() {
  const items = featuredCaderno
    ? [featuredCaderno, ...publishedCadernos.filter((item) => item.slug !== featuredCaderno.slug)].slice(0, 3)
    : []

  return <CadernosPreview items={items} />
}
