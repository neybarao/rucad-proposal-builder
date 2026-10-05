# RUCAD Proposal Builder

Aplicação web client-side para criação, persistência local e exportação em PDF de propostas comerciais da RUCAD.

## Rodar localmente

```bash
npm run dev
```

Abra `http://127.0.0.1:4173`.

Também é possível abrir `index.html` diretamente no navegador, porque a aplicação é estática.

## Publicação

O deploy é feito pelo GitHub Pages via GitHub Actions. Todo push em `main` publica a versão estática do repositório.

## Dados

As propostas são salvas automaticamente no navegador do usuário via IndexedDB, com fallback para `localStorage`. Não há backend, login ou CRM.
