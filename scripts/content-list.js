import { loadContentDocuments } from './content-utils.js'

const documents = await loadContentDocuments()
documents
  .sort((left, right) => left.item.code.localeCompare(right.item.code))
  .forEach(({ item }) => {
    console.log(`${item.code}  ${item.status.padEnd(9)}  ${item.slug}`)
  })
