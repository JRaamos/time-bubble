# Skill: Construir tela a partir do Figma (modo do projeto)

Objetivo: criar telas novas seguindo o padrão do projeto, sem duplicação de componentes.

---

## Estrutura obrigatória da screen

Criar sempre:

- `index.js` -> view
- `controller.js` -> lógica, estado, mocks
- `styled.js` -> estilos (styled-components)

---

## Passo a passo obrigatório

### 1) Confirmar node-id e tela correta
- validar o node-id no Figma
- confirmar que está implementando a tela certa

### 2) Mapear reutilização antes de escrever JSX grande
- identificar cards/itens/linhas
- seguir a skill: `.agents/skills/reuse-component-check.md`

### 3) Controller primeiro
- criar estados e mocks no `controller.js`
- não criar integrações com backend nesta fase

### 4) Styled com tokens
- usar apenas styled-components
- sem hardcoded de cor (`#fff`, `#000`, etc)
- usar tokens do theme (`p.theme.*`)

### 5) View limpa
- `index.js` deve ser simples
- evitar lógica pesada dentro do render
- condições devem estar diretamente no JSX

### 6) Checklist final
Antes de finalizar:
- respeitou estrutura da screen?
- reutilizou componentes existentes?
- não criou `variant` string?
- não hardcodou cores?
- não duplicou card/item/row?