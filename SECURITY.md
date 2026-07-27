# Segurança da Noumena Labs

## Escopo atual

Este repositório entrega uma aplicação estática. O site não possui autenticação, banco de dados, upload, formulário próprio ou API. Os contatos são links externos para o WhatsApp e o projeto Parkaz. Publicações em vídeo podem carregar o player do YouTube somente após uma ação do visitante.

## Proteções implementadas

- Content Security Policy restritiva, sem `unsafe-inline` ou `unsafe-eval`.
- Fontes hospedadas localmente, sem dependência de CSS ou arquivos de terceiros durante a navegação.
- Bloqueio de enquadramento por terceiros contra clickjacking.
- HTTPS obrigatório via HSTS no ambiente publicado.
- Bloqueio de MIME sniffing e política de referência `strict-origin-when-cross-origin`.
- Frames externos limitados exclusivamente a `youtube-nocookie.com`.
- Dependências fixadas por versão e `package-lock.json` versionado.
- Arquivos de ambiente, credenciais e chaves privadas ignorados pelo Git.
- Pipeline de CI com lint, testes, build e auditoria de dependências.
- Links externos abertos com `rel="noreferrer"`.

As configurações de headers estão em `vercel.json` para Vercel e em `public/_headers` para provedores compatíveis, como Netlify e Cloudflare Pages.

## Checklist de publicação

1. Ativar MFA no GitHub, no provedor de hospedagem e no registrador do domínio.
2. Proteger a branch principal e exigir que o workflow de segurança passe antes do merge.
3. Manter HTTPS ativo e nunca desabilitar o redirecionamento de HTTP.
4. Confirmar os headers na URL de produção após cada alteração de infraestrutura.
5. Guardar segredos somente no provedor de hospedagem. Variáveis `VITE_*` nunca devem conter credenciais, pois entram no bundle público.
6. Revisar alertas do Dependabot e executar `npm run security:check` regularmente.
7. Restringir membros e tokens de implantação ao menor privilégio necessário.
8. Confirmar que vídeos publicados permitem incorporação e não dependem de URLs privadas.

## Se o site ganhar backend ou formulários

Antes de publicar qualquer endpoint, adicionar validação no servidor, limite de requisições, proteção contra abuso, CORS com origens explícitas, logs sem dados sensíveis e armazenamento de segredos apenas no backend. Autenticação baseada em cookies também exigirá cookies `HttpOnly`, `Secure` e `SameSite`, além de proteção contra CSRF.

## Relato responsável

Uma possível vulnerabilidade deve ser comunicada pelo contato disponível no site. Não publique detalhes exploráveis em uma issue pública antes da correção.
