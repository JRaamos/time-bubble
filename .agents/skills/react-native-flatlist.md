# Skill: Renderização de listas (usar FlatList, evitar map)

Objetivo: garantir performance e padronização ao renderizar listas no React Native.

Sempre que houver renderização de listas, deve-se evitar `.map()` diretamente no JSX e utilizar `FlatList`.

---

# Regra principal

❌ NÃO usar `.map()` para renderizar listas em telas.

Exemplo proibido:

```jsx
<StoreList>
  {
    stores.map((store) => (
      <StoreItem key={store.id}>
        <HomeStoreCard
          store={store}
          onPress={() => openStoreProducts(store)}
        />
      </StoreItem>
    ))
  }
</StoreList>
```

Problemas:

- pior performance
- sem virtualização
- renderiza todos os itens
- padrão inconsistente com o projeto

---

# Implementação correta

Sempre usar `FlatList`.

Exemplo correto:

```jsx
<StoreList
  data={stores}
  keyExtractor={(store) => store.id}
  renderItem={({ item: store }) => (
    <HomeStoreCard
      store={store}
      onPress={() => openStoreProducts(store)}
    />
  )}
  showsVerticalScrollIndicator={false}
/>
```

---

# Regra de arquitetura

O `FlatList` deve ser definido no `styled.js`.

Exemplo:

```javascript
export const StoreList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;
```

Nunca declarar `FlatList` diretamente no `index.js`.

---

# Boas práticas obrigatórias

Sempre usar:

- `keyExtractor`
- `renderItem`
- `data`
- `showsVerticalScrollIndicator`

Evitar lógica pesada dentro do `renderItem`.

Se necessário:

- mover lógica para `controller.js`

---

# Quando usar map

`.map()` só é aceitável quando:

- lista extremamente pequena (ex: 2–3 itens)
- não é uma lista rolável
- não está dentro de scroll

Exemplo aceitável:

```jsx
{tabs.map(tab => (
  <Tab key={tab.id} />
))}
```

---

# Checklist final

Antes de finalizar:

- A lista usa `FlatList`?
- O FlatList está no `styled.js`?
- Existe `keyExtractor`?
- Existe `renderItem`?
- Não existe `.map()` renderizando listas grandes?
# Skill: Renderização de listas (usar FlatList, evitar map)

Objetivo: garantir performance e padronização ao renderizar listas no React Native.

Sempre que houver renderização de listas, deve-se evitar `.map()` diretamente no JSX e utilizar `FlatList`.

---

# Regra principal

❌ NÃO usar `.map()` para renderizar listas em telas.

Exemplo proibido:

```jsx
<StoreList>
  {
    stores.map((store) => (
      <StoreItem key={store.id}>
        <HomeStoreCard
          store={store}
          onPress={() => openStoreProducts(store)}
        />
      </StoreItem>
    ))
  }
</StoreList>
```

Problemas:

- pior performance
- sem virtualização
- renderiza todos os itens
- padrão inconsistente com o projeto

---

# Implementação correta

Sempre usar `FlatList`.

Exemplo correto:

```jsx
<StoreList
  data={stores}
  keyExtractor={(store) => store.id}
  renderItem={({ item }) => (
    <StoreItem>
      <HomeStoreCard
        store={item}
        onPress={() => openStoreProducts(item)}
      />
    </StoreItem>
  )}
  showsVerticalScrollIndicator={false}
/>
```

---

# Regra importante de renderização

❌ NÃO criar funções auxiliares como:

```jsx
const renderStoreItem = ({ item }) => (
  <StoreItem>
    <HomeStoreCard store={item} />
  </StoreItem>
)
```

E depois usar:

```jsx
renderItem={renderStoreItem}
```

Esse padrão NÃO deve ser usado no projeto.

---

# Forma correta

O `renderItem` deve ficar **diretamente dentro do JSX**.

```jsx
<StoreList
  data={stores}
  keyExtractor={(store) => store.id}
  renderItem={({ item }) => (
    <StoreItem>
      <HomeStoreCard store={item} />
    </StoreItem>
  )}
/>
```

Isso mantém:

- leitura simples
- padrão consistente no projeto
- menos abstrações desnecessárias

---

# Regra de arquitetura

O `FlatList` deve ser definido no `styled.js`.

Exemplo:

```javascript
export const StoreList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;
```

Nunca declarar `FlatList` diretamente no `index.js`.

---

# Boas práticas obrigatórias

Sempre usar:

- `data`
- `keyExtractor`
- `renderItem`

E manter o `renderItem` **inline dentro do JSX**.

Evitar lógica pesada dentro do `renderItem`.

Se necessário:

- mover lógica para `controller.js`

---

# Quando usar map

`.map()` só é aceitável quando:

- lista extremamente pequena (ex: 2–3 itens)
- não é uma lista rolável
- não está dentro de scroll

Exemplo aceitável:

```jsx
{tabs.map(tab => (
  <Tab key={tab.id} />
))}
```

---

# Checklist final

Antes de finalizar:

- A lista usa `FlatList`?
- O FlatList está no `styled.js`?
- Existe `keyExtractor`?
- Existe `renderItem`?
- O `renderItem` está **inline no JSX**?
- Não existe `.map()` renderizando listas grandes?