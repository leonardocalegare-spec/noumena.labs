import { generatedCadernos } from '../generated/cadernos.js'

const byNewest = (left, right) => {
  const dateComparison = String(right.publishedAt || '').localeCompare(String(left.publishedAt || ''))
  return dateComparison || right.sequence - left.sequence
}

export const allCadernos = [...generatedCadernos].sort(byNewest)
export const publishedCadernos = allCadernos.filter((item) => item.status === 'published')
export const visibleCadernos = allCadernos

export const featuredCaderno = publishedCadernos.find((item) => item.featured) || publishedCadernos[0]

export function getVisibleCaderno(slug) {
  return visibleCadernos.find((item) => item.slug === slug)
}

export function getRelatedCadernos(current, limit = 3) {
  return visibleCadernos
    .filter((item) => item.slug !== current.slug)
    .map((item) => ({
      item,
      score: item.topics.filter((topic) => current.topics.includes(topic)).length,
    }))
    .sort((left, right) => right.score - left.score || byNewest(left.item, right.item))
    .slice(0, limit)
    .map(({ item }) => item)
}
