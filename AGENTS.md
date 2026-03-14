# AGENTS — Guia Núcleo (Leitura Obrigatória)

Este arquivo contém apenas regras globais e imutáveis do projeto.
Tutoriais e receitas devem ser carregados via skills em `.agents/skills`.

---

## 🔒 Regra 0 — Ordem obrigatória antes de codar

Antes de gerar qualquer código, o agente deve:

1) Ler este arquivo inteiro.
2) Confirmar o node-id e a tela correta no Figma.
3) Carregar as skills aplicáveis (somente as necessárias).
4) Só então implementar.

Se houver conflito entre design e arquitetura do projeto:
✅ a arquitetura do projeto tem prioridade.

---

## 🔧 Skills disponíveis (carregar sob demanda)

- `.agents/skills/build-screen-from-figma.md`
  → quando criar uma screen nova (estrutura + fluxo)

- `.agents/skills/reuse-component-check.md`
  → quando o Figma tiver card/item/row/list

- `.agents/skills/svg-icon-from-figma.md`
  → quando existir ícone SVG no Figma

- `.agents/skills/layout-header-sidebar.md`
  → quando a tela envolver Header/Sidebar/menu/topbar/drawer

- `.agents/skills/react-native-flatlist.md`
  → quando renderizar listas no React Native

- `.agents/skills/styled-no-inline-theme-logic.md`
  → quando houver lógica de cores ou estilos relacionados ao theme

- `.agents/skills/no-derived-render-consts.md`
  → quando houver default/resolved/has* para decidir renderização ou props

---

## 0) Modo atual do app (obrigatório)

O projeto é um app mobile front-end com persistência local no dispositivo:

- Não integrar com backend.
- Não criar APIs, chamadas HTTP novas ou dependência de serviços remotos para fluxo principal.
- Persistir dados localmente no aparelho (ex.: storage local do app).
- `controller.js` pode concentrar estado, regras de tela e integração com armazenamento local.
- Prioridade: layout fiel ao Figma + navegação consistente.
- Se alguma necessidade futura depender de backend, sinalizar como TODO sem implementar a integração agora.

---

## 1) Estrutura obrigatória por screen

Toda screen deve ter:

- `index.js`  → view
- `controller.js` → lógica + estado
- `styled.js` → estilos

Regras:
- `index.js` deve ser simples.
- Lógica pesada nunca dentro do render.

---

## 2) Navegação e layout

- Sempre usar o Container/layout padrão do projeto.
- Não criar container novo se já existir equivalente.
- Respeitar arquitetura de rotas existente.

Header/Sidebar:
- Reuso obrigatório (ver skill `layout-header-sidebar.md`).

---

## 3) Styling (imutável)

- Usar somente `styled-components`.
- ❌ Não usar CSS modules, Tailwind, ou `style={{ ... }}` inline.
- Para variações visuais, controlar por props semânticas.
- ❌ Não usar `useTheme()` para decidir estilos ou cores dentro de `index.js` ou `controller.js`.
- ❌ Não criar styled components genéricos que aceitam props de estilo (`color`, `size`, `family`, etc.).
- ✅ Condições de estilo devem ser implementadas diretamente no `styled.js` usando props semânticas (`primary`, `active`, `muted`, etc.).

---

## 3.1) Render e props (imutável)

- ❌ Não criar variáveis intermediárias para render/props dentro do componente (ex.: `defaultX`, `resolvedX`, `hasX`).
- ❌ Não usar `typeof prop === 'undefined'` para decidir renderização.
- ❌ Não criar “props resolvidas” com `prop || {}` só para checar algo depois (`resolvedSearchProps`).
- ✅ Condições devem ficar inline no JSX (ternário/&&) e props devem ser passadas diretamente ao componente.
- ✅ Defaults (quando necessários) devem ser feitos no parâmetro da função (ex.: `searchProps = {}`, `actions = null`), sem criar `resolved*` no corpo.

---

## 4) Tokens e Theme (imutável)

- ❌ Nenhuma cor literal (`#...`, `rgb`, `rgba`, `hsl`) em screens/componentes.
- ✅ Toda cor deve vir do theme (`p.theme.<token>`).
- Se surgir cor nova do design: criar token antes de usar.

---

## 5) Reuso antes de criar (prioridade máxima)

Antes de criar qualquer componente novo, procurar em:

- `src/components`
- `src/hooks`
- `src/services`
- `src/utils`
- `src/context`

Se o Figma mostrar card/item/row/list:
→ aplicar skill `reuse-component-check.md`.

---

## ✅ Checklist final (antes de entregar)

- Node-id validado no Figma?
- Screen segue `index/controller/styled`?
- Reuso aplicado antes de criar componente novo?
- Sem cores hardcoded?
- Sem `variant` string para controlar layouts complexos?
- Header/Sidebar reutilizados via Container?
