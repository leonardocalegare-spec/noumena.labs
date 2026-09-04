export const whatsappBase = 'https://wa.me/5511918218635?text='

export const generalProjectLink = `${whatsappBase}${encodeURIComponent(
  'Olá, Leonardo! Encontrei a Noumena Labs e quero conversar sobre uma necessidade do meu negócio.',
)}`

export const contactLinks = [
  {
    label: 'WhatsApp',
    value: '+55 11 91821-8635',
    href: `${whatsappBase}${encodeURIComponent(
      'Olá, Leonardo! Encontrei a Noumena Labs e gostaria de conversar sobre um projeto.',
    )}`,
  },
]
