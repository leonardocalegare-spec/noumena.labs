export function getServicesPerPage(width) {
  if (width <= 720) return 1
  if (width <= 980) return 2
  return 3
}

export function getLastServicePageStart(total, perPage) {
  if (total <= 0 || perPage <= 0) return 0
  return Math.floor((total - 1) / perPage) * perPage
}

export function normalizeServicePage(start, perPage, total) {
  if (total <= 0 || perPage <= 0) return 0
  const safeStart = Math.min(Math.max(0, start), total - 1)
  return Math.min(Math.floor(safeStart / perPage) * perPage, getLastServicePageStart(total, perPage))
}

export function getVisibleServiceRange(start, perPage, total) {
  if (total <= 0) return { from: 0, to: 0 }
  const normalized = normalizeServicePage(start, perPage, total)
  return { from: normalized + 1, to: Math.min(normalized + perPage, total) }
}
