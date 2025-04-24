# Documentação de Referência do Projeto AionX Dashboard Alchemy

## Visão Geral

Este projeto é um painel de controle moderno para gerenciamento de conexões e monitoramento de status, com foco em integração ao Discord e automação de selfbots. O dashboard foi desenvolvido utilizando React (com TypeScript), priorizando responsividade, experiência do usuário e um design limpo e acessível.

- **URL do Projeto:** https://lovable.dev/projects/1aabfefe-40e4-4747-b488-d3d0b9a6dbeb

## Estrutura do Projeto

- `src/components/ui/table.tsx`: Componentes reutilizáveis para tabelas, com foco em acessibilidade e responsividade.
- `src/components/layout/MainLayout.tsx`: Layout principal, com barra lateral, cabeçalho, controle de tema (claro/escuro), avatar do usuário e notificações.
- `src/pages/DashboardPage.tsx`: Página principal do dashboard, exibe métricas, status, conexões recentes e guia rápido.
- `index.html`: Estrutura base do HTML, inclui scripts essenciais e metadados para SEO e redes sociais.

## Principais Componentes

### Table (Tabela)
- Componente flexível para exibição de dados tabulares.
- Suporte a cabeçalho, corpo, rodapé, linhas, células e legendas.
- Utiliza classes utilitárias para estilização e responsividade.

### MainLayout
- Estrutura o app com sidebar, header e área principal.
- Integra autenticação e controle de tema.
- Exibe avatar do usuário, notificações e campo de busca.
- Usa componentes como `Sidebar`, `Button`, `Avatar`, `Toaster` e `Outlet` para roteamento.

### DashboardPage
- Exibe métricas de conexões ativas, totais e status do selfbot.
- Lista conexões recentes e fornece um guia rápido de uso.
- Utiliza componentes visuais como `Card`, `Badge`, `Button` e ícones customizados.
- Animações e feedback visual para carregamento e status.

## Estilo de Design

- **Framework:** React + TypeScript
- **Estilização:** Classes utilitárias (provavelmente TailwindCSS ou similar)
- **Design tokens:**
  - Cores: Uso de `primary`, `background`, `muted`, `border`, `foreground`.
  - Tipografia: Fontes sem serifa, tamanhos variados para títulos, legendas e textos auxiliares.
  - Espaçamento: Uso consistente de `gap`, `p-`, `m-`, `rounded-` para espaçamento e bordas.
- **Acessibilidade:**
  - Foco visível em campos de input.
  - Feedback visual em botões e elementos interativos.
  - Suporte a temas claro e escuro.
- **Responsividade:**
  - Layouts adaptáveis para diferentes tamanhos de tela (`sm:`, `md:`, `lg:`).
  - Grid e flexbox para organização dos componentes.

## Padrões de Design

- Componentização: Separação clara entre UI, layout e páginas.
- Reutilização: Componentes como Table, Card, Button e Avatar são reutilizados em diferentes partes do app.
- Hooks customizados: Uso de hooks para autenticação, tema e dados do usuário.
- Feedback visual: Animações de carregamento, transições e indicadores de status.
- Navegação: Uso de `Outlet` para renderização de rotas filhas.

## Referências Visuais

- Ícones: Uso de ícones SVG para status, ações e navegação.
- Avatar: Exibição do avatar do usuário com fallback para inicial.
- Notificações: Badge com contador de notificações.
- Cards: Exibição de métricas e listas em cards com sombra sutil.

## Observações Finais

Este documento serve como referência central para desenvolvedores e designers, facilitando a manutenção, evolução e onboarding no projeto. Recomenda-se manter este arquivo atualizado conforme novas funcionalidades e padrões forem implementados.