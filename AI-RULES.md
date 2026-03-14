# 🤖 Mobile Frontend AI Development Contract

Este documento define as regras obrigatórias para geração de código no projeto mobile.

A IA deve respeitar integralmente a arquitetura existente.

---

# 🧭 1. Criação de Novas Screens

## ✅ Permitido criar novas screens SOMENTE quando solicitado.

Ao criar uma nova screen:

1. Seguir padrão existente em `src/screens/`
2. Manter mesma estrutura de organização
3. Registrar a screen no sistema de navegação existente
4. Não modificar navegação já implementada
5. Não alterar fluxo de telas existentes

❌ Nunca substituir navigator existente
❌ Nunca criar novo sistema de navegação
❌ Nunca alterar stack atual sem instrução explícita

---

# 🧭 2. Navegação

Sempre utilizar o padrão existente do projeto:

- Stack Navigator
- Bottom Tabs
- Drawer (se existir)

Nunca criar navegação paralela.

Ao adicionar nova tela:
- Declarar no mesmo arquivo onde as outras estão declaradas
- Seguir padrão de nomeação
- Manter tipagem (se existir)

---

# ♻️ 3. Reutilização é obrigatória

Antes de criar qualquer coisa nova, verificar:

- `components/`
- `hooks/`
- `services/`
- `utils/`
- `context/`
- `theme/`

Se existir algo semelhante → reutilizar.

Criar novo componente somente se:
- Não houver equivalente
- For realmente reutilizável
- Seguir padrão do projeto

---

# 🌐 4. Services e API

Regra obrigatória:

Screen
  ↓
Hook
  ↓
Service
  ↓
API

❌ Screen não pode chamar API direto
❌ Não usar fetch diretamente
❌ Não usar axios diretamente fora de services

Toda comunicação externa deve passar por `services/`.

---

# ⚛️ 5. Performance (Mobile é crítico)

## useMemo

Usar quando:
- Transformar listas
- Filtrar dados
- Mapear arrays grandes

Evitar recalcular a cada render.

---

## useCallback

Usar quando:
- Passar função para componentes filhos
- Handlers de FlatList
- Evitar re-render desnecessário

---

## React.memo

Utilizar para componentes de item de lista quando necessário.

---

## FlatList

Sempre usar FlatList para listas.
Nunca usar map direto para renderizar listas grandes.

Sempre:
- Definir keyExtractor
- Evitar inline functions pesadas
- Memorizar renderItem quando necessário

---

# 🎨 6. Estilo

Se precisar criar estilo novo:

- Usar o sistema padrão do projeto
  - styled-components (se existir)
  - ou StyleSheet padrão se for o padrão atual

Nunca:
- Criar estilos fora do padrão
- Hardcode de cores
- Ignorar theme

Sempre usar:
- theme.colors
- theme.spacing
- theme.fonts

---

# 📱 7. Componentização

Separação obrigatória:

- components/ → componentes reutilizáveis
- screens/ → composição de tela
- hooks/ → lógica reutilizável
- services/ → comunicação externa

Componentes devem ser:
- Pequenos
- Reutilizáveis
- Sem regra pesada

---

# 🔄 8. Estado Global

Se o projeto já usa:

- Context API
- Zustand
- Redux
- Outro gerenciador

A IA deve usar exclusivamente o padrão existente.

❌ Nunca introduzir nova lib de estado
❌ Nunca duplicar context

---

# 🔐 9. Breaking Changes são proibidos

A IA NÃO pode:

- Alterar navegação existente
- Alterar assinatura de services
- Modificar contratos de API
- Alterar props públicas existentes
- Alterar estrutura global do app

Se precisar estender:
→ Criar nova implementação compatível.

---

# 🧼 10. Código Limpo

O código deve:

- Seguir padrão já utilizado
- Não duplicar lógica
- Não criar complexidade desnecessária
- Manter consistência visual
- Seguir convenções existentes

---

# 🧠 11. Antes de Gerar Código

A IA deve validar mentalmente:

- Estou reutilizando componentes existentes?
- Estou seguindo o padrão das outras screens?
- Estou respeitando a navegação atual?
- Estou evitando breaking changes?
- Estou mantendo performance mobile?

Se qualquer resposta for "não"
→ Ajustar antes de gerar.

---

# 🔒 Regra Final

O projeto possui arquitetura consolidada.

A IA deve se adaptar ao projeto.
O projeto NÃO deve se adaptar ao código gerado.