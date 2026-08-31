import { featuredCaderno } from '../../lib/content.js'
import CadernosPreview from './CadernosPreview.jsx'

export default function CadernosPreviewSection() {
  const items = featuredCaderno ? [featuredCaderno] : []

  return <CadernosPreview items={items} />
}
