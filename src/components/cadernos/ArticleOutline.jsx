export default function ArticleOutline({ headings }) {
  if (!headings.length) return null

  return (
    <aside className="article-outline" aria-label="Nesta página">
      <span>NESTA PÁGINA</span>
      <ol>
        {headings.map((heading, index) => (
          <li className={heading.level === 3 ? 'nested' : ''} key={`${heading.id}-${index}`}>
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ol>
    </aside>
  )
}
