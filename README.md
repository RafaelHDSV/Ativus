# Ativus

Quadro Kanban em React para organizar tarefas em colunas, com arrastar e soltar entre etapas. Interface em português, tema escuro e dados de exemplo para explorar o fluxo sem backend.

## O que faz

- **Colunas:** criar, editar e excluir colunas (nome e descrição opcional).
- **Itens:** adicionar tarefas em cada coluna, editar inline, excluir e ver detalhes em modal.
- **Drag and drop:** mover itens entre colunas pela interface nativa de arrastar.
- **Dados de demonstração:** ao abrir, o quadro carrega colunas mockadas; clique no logo para restaurar o estado inicial ou use **Limpar colunas** para esvaziar o quadro.

O estado fica apenas na memória do navegador — não há API nem persistência entre recarregamentos.

## Stack

| Camada | Tecnologia |
|--------|------------|
| UI | React 18, TypeScript |
| Build | Vite 6 |
| Componentes | Ant Design 5 |
| Estilo | Sass (CSS Modules) |
| Ícones | Phosphor Icons |
| Datas | dayjs |

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18+ (recomendado LTS)
- [Yarn](https://yarnpkg.com/) ou npm

## Como rodar

```bash
# Clonar o repositório
git clone https://github.com/RafaelHDSV/ativus.git
cd ativus

# Instalar dependências
yarn install

# Servidor de desenvolvimento (http://localhost:5173)
yarn dev
```

Outros scripts:

| Comando | Descrição |
|---------|-----------|
| `yarn build` | Gera o build de produção em `dist/` |
| `yarn preview` | Serve o build localmente |
| `yarn lint` | Executa o ESLint no projeto |

## Estrutura do projeto

```
src/
├── App.tsx                 # ConfigProvider do Ant Design + view principal
├── views/Main/             # Navbar, modal de coluna e listagem de colunas
├── components/
│   ├── Column/             # Coluna Kanban, itens, DnD e formulários
│   └── Pressable/          # Botão/área clicável reutilizável
├── constants/              # Tema Ant Design
└── variables.scss          # Tokens SCSS globais (injetados no Vite)
```

A lógica de colunas e mocks está em `src/components/Column/` (`useColumns`, `MOCKED_VALUES`, interfaces).

## Limitações atuais

- IDs de colunas gerados com `Math.random()` — adequado para protótipo, não para produção.
- Sem autenticação, persistência (localStorage/API) ou sincronização entre abas.
- Drag and drop baseado em HTML5, sem biblioteca dedicada (ex.: dnd-kit).

## Licença

[MIT](LICENSE) — Copyright (c) 2025 Rafael Vieira

## Apoie

<a href="https://www.buymeacoffee.com/vieira" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me a Coffee" height="32" width="117" style="height: 32px !important; width: 117px !important;" ></a>
