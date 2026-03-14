# Skill: Layout com Header e Sidebar (reuso obrigatório)

Objetivo: garantir reuso consistente de `@components/Header` e `@components/Sidebar`, evitando duplicação e variações via `variant` string.

Aplicar sempre que:
- a tela tiver topo com header (título, ações, busca, tabs, botão de menu, voltar/fechar)
- a tela precisar abrir menu lateral
- o Figma mostrar qualquer padrão de topbar/drawer

---

## Regras obrigatórias

### 1) Nunca criar header manual dentro da screen
- ❌ Proibido montar topo da tela “na mão” com View + Text + Pressable.
- ✅ O header deve vir do `ContainerAuthenticated` ou `ContainerUnauthenticated`.
- Quando precisar variar o header, fazer via `headerProps` no container.

---

### 2) Sidebar é única
- ❌ Não criar outro menu lateral/drawer.
- ✅ Usar `@components/Sidebar` como única implementação.

Regra:
- O acesso ao menu deve ser pelo botão de menu no `Header` abrindo o `Sidebar`.

---

### 3) Sem `variant` string
- ❌ Evitar `variant="home" | "tabs" | ...` para controlar layouts muito diferentes.
- ✅ Usar props semânticas booleanas e previsíveis.

Exemplos de props aceitáveis:
- `home`
- `tabs`
- `favorite`
- `closeable`
- `hasBottomStrip`
- `search`

---

## Boas práticas de implementação

### A) Render único no Header
- O `Header` deve manter **um fluxo de render principal**.
- Evitar múltiplos `return` grandes por modo.
- Se precisar extrair: extrair **blocos pequenos** (`UserInfo`, `SearchInput`, `TabsRow`) e usar dentro do mesmo fluxo.

---

### B) Condições direto no JSX (sem factories dentro do render)
- ✅ `{condicao ? <Bloco /> : null}`
- ❌ `const renderHeader = () => { ... }` dentro do componente

---

### C) Ajuste interno antes de criar estrutura paralela
Se o projeto já tem `Header`/`Sidebar`:
- primeiro tentar ajustar com props/composição
- só depois (se inevitável) criar um bloco reutilizável pequeno e acoplar ao header

---

## Checklist final (antes de finalizar a PR)

- Usei `ContainerAuthenticated` / `ContainerUnauthenticated`?
- Não existe header manual na screen?
- Não criei novo drawer/menu lateral?
- Não usei `variant` string para controlar layouts?
- Usei props semânticas e previsíveis?
- Mantive render único no `Header` (sem múltiplos retornos grandes)?