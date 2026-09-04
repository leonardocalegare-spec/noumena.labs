import assert from 'node:assert/strict'
import test from 'node:test'
import {
  getLastServicePageStart,
  getServicesPerPage,
  getVisibleServiceRange,
  normalizeServicePage,
} from '../src/utils/serviceCarousel.js'

test('define três, dois ou um card nos breakpoints aprovados', () => {
  assert.equal(getServicesPerPage(1440), 3)
  assert.equal(getServicesPerPage(981), 3)
  assert.equal(getServicesPerPage(980), 2)
  assert.equal(getServicesPerPage(721), 2)
  assert.equal(getServicesPerPage(720), 1)
  assert.equal(getServicesPerPage(320), 1)
})

test('calcula a última página sem deixar espaços inválidos', () => {
  assert.equal(getLastServicePageStart(6, 3), 3)
  assert.equal(getLastServicePageStart(6, 2), 4)
  assert.equal(getLastServicePageStart(6, 1), 5)
})

test('normaliza a posição ao mudar a quantidade visível', () => {
  assert.equal(normalizeServicePage(3, 2, 6), 2)
  assert.equal(normalizeServicePage(4, 3, 6), 3)
  assert.equal(normalizeServicePage(99, 3, 6), 3)
  assert.equal(normalizeServicePage(-4, 3, 6), 0)
})

test('informa o intervalo visível em numeração humana', () => {
  assert.deepEqual(getVisibleServiceRange(0, 3, 6), { from: 1, to: 3 })
  assert.deepEqual(getVisibleServiceRange(4, 2, 6), { from: 5, to: 6 })
  assert.deepEqual(getVisibleServiceRange(5, 1, 6), { from: 6, to: 6 })
})
