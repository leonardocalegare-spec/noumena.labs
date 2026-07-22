import assert from 'node:assert/strict'
import test from 'node:test'
import { wrapCarouselIndex } from '../src/lib/carousel.js'

test('carrossel circula em ambas as direções', () => {
  assert.equal(wrapCarouselIndex(3, 3), 0)
  assert.equal(wrapCarouselIndex(-1, 3), 2)
  assert.equal(wrapCarouselIndex(-4, 3), 2)
})

test('carrossel permanece seguro sem itens', () => {
  assert.equal(wrapCarouselIndex(1, 0), 0)
  assert.equal(wrapCarouselIndex(1, -1), 0)
})
