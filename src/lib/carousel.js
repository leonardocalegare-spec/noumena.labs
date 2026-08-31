export function wrapCarouselIndex(index, length) {
  if (!Number.isInteger(length) || length <= 0) return 0
  return ((index % length) + length) % length
}

export function getCarouselDirection(active, index, length, movement) {
  if (movement) return movement > 0 ? 'next' : 'previous'

  const next = wrapCarouselIndex(index, length)
  if (active === 0 && next === length - 1) return 'previous'
  if (active === length - 1 && next === 0) return 'next'
  return next > active ? 'next' : 'previous'
}
