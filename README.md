# Ruan Hub

![License](https://img.shields.io/badge/license-MIT-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Status](https://img.shields.io/badge/status-development-yellow)

Bem-vindo ao repositório do **Ruan Hub**.

Este projeto é uma plataforma de **curadoria digital e blog**, desenvolvido com foco em performance e SEO para indexação de produtos de afiliação e conteúdos educativos.

## 🎯 Propósito do Projeto

O Ruan Hub é um espaço de descobertas digitais organizado por categorias (Saúde, Sociedade, Economia, Tecnologia, Cultura). O objetivo técnico é criar uma aplicação **JAMstack** rápida, segura e escalável que sirva como:

1.  **Hub de Conteúdo:** Artigos e reviews de produtos.
2.  **Portfólio Open-Source:** Demonstração de habilidades em React, Next.js e Arquitetura de Software.

## 🚀 Tech Stack

- **Core:** Next.js 16 (App Router)
- **Linguagem:** TypeScript
- **Estilo:** Tailwind CSS
- **Conteúdo:** MDX (Markdown gerenciável)

## 📂 Estrutura de Pastas

A arquitetura segue princípios de separação de responsabilidades para facilitar a manutenção:

- `/app`: Rotas e Layouts (Next.js App Router).
- `/components`: Interface do usuário (Cards de produto, Headers, etc).
- `/content`: Base de dados em arquivos (Posts e Produtos).
- `/lib`: Lógica de negócios e utilitários.

## 📚 Gerenciamento de Conteúdo

Os posts e produtos são gerenciados via arquivos **MDX** na pasta `/src/content`.
Não é necessário banco de dados. Basta criar um arquivo `.mdx` e ele aparecerá automaticamente no site.

### Estrutura do Frontmatter

Cada arquivo deve começar com o seguinte cabeçalho de metadados:

```yaml
---
title: 'Título do Produto ou Artigo'
description: 'Descrição curta para SEO (Meta Description)'
date: 'YYYY-MM-DD'
category: 'tecnologia' # Opções: tecnologia, saude, economia, sociedade, cultura
image: '/images/nome-do-arquivo.jpg' # Caminho relativo à pasta public/
price: 'R$ 00,00' # Opcional: Exibe preço no card
affiliateLink: 'https://...' # Opcional: Link para compra (B2C)

# Campos B2B (Programa de Parceiros) - Opcionais
affiliationLink: 'https://...' # Link para cadastro de afiliado
commissionRate: '50%' # Taxa de comissão exibida
affiliationTitle: 'Título personalizado para o box de parceiros'
---
```

### Imagens

Coloque as imagens de capa na pasta `/public/images`.
Recomendamos o formato **JPG** ou **WebP** com proporção **16:9** e largura mínima de **1200px** para melhor resolução em telas retina.

---

Mantido por [Gothd](https://github.com/gothd)
