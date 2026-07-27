import FooterBase from '../components/FooterBase.jsx'
import Header from '../components/Header.jsx'
import Icon from '../components/Icon.jsx'
import PageMeta from '../components/PageMeta.jsx'

export default function NotFoundPage() {
  return (
    <>
      <PageMeta
        title="Página não encontrada — Noumena Labs"
        description="O endereço informado não corresponde a uma página disponível."
        canonicalPath={import.meta.env.BASE_URL}
      />
      <Header />
      <main className="not-found-page" id="conteudo-principal">
        <div className="container not-found-card">
          <span>ERRO/404</span>
          <h1>Esse registro não existe.</h1>
          <p>O endereço pode ter mudado ou ainda não foi publicado nos Cadernos Noumena.</p>
          <a className="button" href={`${import.meta.env.BASE_URL}cadernos/`}>Explorar os Cadernos <Icon name="arrow" size={17} /></a>
        </div>
      </main>
      <footer className="editorial-footer"><FooterBase /></footer>
    </>
  )
}
