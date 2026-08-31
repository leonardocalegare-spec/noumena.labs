import assert from 'node:assert/strict'
import test from 'node:test'
import * as carousel from '../src/lib/carousel.js'

const { wrapCarouselIndex } = carousel

test('carrossel circula em ambas as direções', () => {
  assert.equal(wrapCarouselIndex(3, 3), 0)
  assert.equal(wrapCarouselIndex(-1, 3), 2)
  assert.equal(wrapCarouselIndex(-4, 3), 2)
})

test('carrossel permanece seguro sem itens', () => {
  assert.equal(wrapCarouselIndex(1, 0), 0)
  assert.equal(wrapCarouselIndex(1, -1), 0)
})

test('carrossel preserva a direção ao circular pelas extremidades', () => {
  assert.equal(carousel.getCarouselDirection?.(0, -1, 3), 'previous')
  assert.equal(carousel.getCarouselDirection?.(2, 3, 3), 'next')
})
