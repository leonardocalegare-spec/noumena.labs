import { Logo } from './Brand.jsx'

export default function FooterBase() {
  return (
    <div className="footer-base">
      <div className="container footer-inner">
        <Logo />
        <p>Clareza para decidir. Tecnologia para avançar.</p>
        <div>
          <span>© {new Date().getFullYear()} Noumena Labs</span>
          <a href={import.meta.env.BASE_URL}>VOLTAR AO INÍCIO ↑</a>
        </div>
      </div>
    </div>
  )
}
