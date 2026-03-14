# Skill: Não criar consts derivadas para render/props (tudo inline no JSX)

Objetivo: manter componentes previsíveis e diretos, sem variáveis intermediárias para “resolver” props e JSX.

---

## Regra principal

❌ NÃO criar variáveis intermediárias para decidir o que renderizar (ex.: `defaultX`, `resolvedX`, `hasX`, `controlledX`) dentro do componente.

Exemplos proibidos:

```javascript
const resolvedActions = typeof actions === 'undefined' ? defaultHomeActions : actions

const defaultHomeActions = homeActionsPage
  ? <HomeActions page={homeActionsPage} cartCount={homeCartCount} />
  : null

  const resolvedSearchProps = searchProps || {}
const hasControlledSearch = typeof resolvedSearchProps.onChangeText === 'function'

Esse padrão NÃO deve ser usado.

Motivos:
	•	cria indireção desnecessária
	•	espalha “mini-regras” e defaults no JS
	•	o Codex começa a repetir esse padrão em todo lugar
	•	piora leitura e manutenção

⸻

Forma correta

✅ Renderizar direto no JSX, com condições inline.

Exemplo correto:
{
  !actions ? null :
    <Actions noPadding={noPadding}>
      {actions}
    </Actions>
}

{homeActionsPage ? <HomeActions page={homeActionsPage} cartCount={homeCartCount} /> : null}

<Header
  search={search}
  searchProps={searchProps}
  back={back ? back : goBack}
  noBack={noBack}
  rightAction={rightAction}
  side={side}
  title={title}
  notifications={notifications}
  closeable={closeable}
  funnel={funnel}
/>

Defaults: onde pode

✅ Defaults podem ser definidos no parâmetro da função (quando fizer sentido), sem criar consts derivadas no corpo.

Exemplo aceitável:

export default function ContainerAuthenticated({ searchProps = {}, actions = null, ...rest }) {
  ...
}

Mas mesmo assim:
	•	❌ não criar resolvedSearchProps, resolvedActions, etc.
	•	✅ usar direto searchProps e actions no JSX

  Checklist final

Antes de finalizar:
	•	Existe defaultX, resolvedX, hasX dentro do componente? ❌
	•	Existe typeof prop === 'undefined' para decidir render? ❌
	•	Existe prop || {} só para criar “objeto resolvido”? ❌
	•	Condições de render estão inline no JSX? ✅
	•	Props são passadas direto no componente? ✅
# Skill: Não criar consts derivadas para render/props (tudo inline no JSX)

Objetivo: manter componentes previsíveis e diretos, sem variáveis intermediárias para “resolver” props e JSX.

---

## Regra principal

❌ NÃO criar variáveis intermediárias para decidir o que renderizar (ex.: `defaultX`, `resolvedX`, `hasX`, `controlledX`) dentro do componente.

Exemplos proibidos:

```javascript
const resolvedActions = typeof actions === 'undefined' ? defaultHomeActions : actions

const defaultHomeActions = homeActionsPage
  ? <HomeActions page={homeActionsPage} cartCount={homeCartCount} />
  : null

const resolvedSearchProps = searchProps || {}
const hasControlledSearch = typeof resolvedSearchProps.onChangeText === 'function'
```

Esse padrão **NÃO** deve ser usado.

Motivos:

- cria indireção desnecessária
- espalha “mini-regras” e defaults no JS
- o Codex começa a repetir esse padrão em todo lugar
- piora leitura e manutenção

---

## Forma correta

✅ Renderizar direto no JSX, com condições inline.

Exemplo correto:

```jsx
{
  !actions ? null : (
    <Actions noPadding={noPadding}>
      {actions}
    </Actions>
  )
}

{homeActionsPage ? (
  <HomeActions page={homeActionsPage} cartCount={homeCartCount} />
) : null}

<Header
  search={search}
  searchProps={searchProps}
  back={back ? back : goBack}
  noBack={noBack}
  rightAction={rightAction}
  side={side}
  title={title}
  notifications={notifications}
  closeable={closeable}
  funnel={funnel}
/>
```

---

## Defaults: onde pode

✅ Defaults podem ser definidos no **parâmetro da função** (quando fizer sentido), sem criar consts derivadas no corpo.

Exemplo aceitável:

```javascript
export default function ContainerAuthenticated({ searchProps = {}, actions = null, ...rest }) {
  ...
}
```

Mas mesmo assim:

- ❌ não criar `resolvedSearchProps`, `resolvedActions`, etc.
- ✅ usar direto `searchProps` e `actions` no JSX

---

## Checklist final

Antes de finalizar:

- Existe `defaultX`, `resolvedX`, `hasX` dentro do componente? ❌
- Existe `typeof prop === 'undefined'` para decidir render? ❌
- Existe `prop || {}` só para criar “objeto resolvido”? ❌
- Condições de render estão inline no JSX? ✅
- Props são passadas direto no componente? ✅