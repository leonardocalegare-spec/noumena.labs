export function wrapCarouselIndex(index, length) {
  if (!Number.isInteger(length) || length <= 0) return 0
  return ((index % length) + length) % length
}
