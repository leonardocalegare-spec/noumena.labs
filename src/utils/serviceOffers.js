const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
})

export function formatServicePrice(price) {
  if (price.type === 'quote') return 'Sob orçamento'
  const amount = currency.format(price.amount).replace(/\u00a0/g, ' ')
  const prefix = price.type === 'from' ? 'A partir de ' : ''
  const suffix = price.type === 'monthly' ? '/mês' : ''
  return `${prefix}${amount}${suffix}${price.unit ? ` ${price.unit}` : ''}`
}
