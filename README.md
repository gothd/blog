# Ruan Hub

![License](https://img.shields.io/badge/license-MIT-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Status](https://img.shields.io/badge/status-production-blue)

Plataforma de **curadoria digital e blog**, desenvolvida com foco em performance (SSG), SEO técnico e Arquitetura Limpa.

## 🎯 Propósito

O Ruan Hub organiza descobertas digitais em categorias (Saúde, Sociedade, Economia, Tecnologia, Cultura), conectando criadores de conteúdo e consumidores a produtos transformadores.

## 🚀 Tech Stack

- **Core:** Next.js 16 (App Router)
- **Linguagem:** TypeScript
- **Estilo:** Tailwind CSS v4
- **Conteúdo:** MDX (Markdown + JSX) com `next-mdx-remote`
- **Busca:** Fuse.js (Client-side Fuzzy Search)

## ⚙️ Configuração e Variáveis de Ambiente

Para rodar o projeto, renomeie o arquivo `.env.example` para `.env.local` e preencha as variáveis:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
GOOGLE_SITE_VERIFICATION=seu_codigo_hash
# Novas variáveis para o sistema de Feedback:
REDIS_URL=sua_string_de_conexao_redis_(vercel_kv_ou_upstash)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=sua_chave_publica_do_recaptcha_v3
RECAPTCHA_SECRET_KEY=sua_chave_secreta_do_recaptcha_v3
```

## 📚 Gerenciamento de Conteúdo

O conteúdo é gerenciado via sistema de arquivos (File System CMS) na pasta `/src/content`.

### 1\. Estrutura de Pastas

Os posts devem ser organizados dentro da pasta de sua respectiva categoria:
`/src/content/[categoria]/meu-post.mdx`

### 2\. Frontmatter (Metadados)

```yaml
---
title: 'Título do Produto'
description: 'Meta description para SEO (160 caracteres)'
date: 'YYYY-MM-DD'
category: 'tecnologia' # Deve bater com a pasta e config/categories.ts
image: '/images/capa.jpg' # Na pasta public
price: 'R$ 97,00' # Opcional
affiliateLink: 'https://...' # Link de Venda (B2C)
isAuthorProduct: true # (Opcional) Ativa o Boost de visibilidade
---
```

### 3\. Sistema de Boost (Retenção)

Produtos marcados com `isAuthorProduct: true` recebem destaque automático no topo das listagens por **7 dias** após a data de publicação (`date`) ou atualização (`updatedAt`). A lógica respeita o fuso horário UTC-3 (Brasil).

### 4\. Categorias

As categorias são centralizadas em `src/config/categories.ts`. Para adicionar ou alterar uma categoria (cor, slug, descrição), edite apenas este arquivo.

## 🛡️ Sistema de Feedback Seguro

Implementamos um widget de feedback híbrido ao final dos posts para coletar dados quantitativos (likes/dislikes) e qualitativos (mensagens privadas opcionais) de forma segura, sem exigir login.

### Arquitetura de Segurança

Para prevenir abusos e spam mantendo uma arquitetura Serverless limpa, adotamos uma estratégia em camadas:

1.  **Frontend (UX Instantânea):** Utiliza `localStorage` para "lembrar" localmente que o usuário já votou, oferecendo feedback visual imediato e evitando cliques repetidos na interface.
2.  **Rate Limiting no Backend (IP):** A API de votação utiliza o **Redis** para criar uma trava baseada no IP do usuário + Slug do post. Isso impede que o mesmo IP vote mais de uma vez no mesmo post em um período de **24 horas**, garantindo a integridade dos contadores mesmo que o `localStorage` seja limpo.
3.  **Anti-Bot nas Mensagens (reCAPTCHA):** O envio de mensagens de texto opcionais é protegido pelo **Google reCAPTCHA v3** (invisível). Um token é gerado no cliente e validado no servidor pelo Google antes que a mensagem seja aceita, bloqueando submissões automatizadas.

## 🤝 Contribuição

1.  Fork o projeto.
2.  Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3.  Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`).
4.  Push para a branch (`git push origin feature/nova-feature`).
5.  Abra um Pull Request.

---

Mantido por [Gothd](https://www.google.com/search?q=https://github.com/gothd)
