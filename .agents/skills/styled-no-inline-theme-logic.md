# Skill: Styling sem lógica de theme no index (tudo no styled)

Objetivo: garantir que toda lógica de estilo fique centralizada no `styled.js`, mantendo as screens simples e evitando lógica de theme espalhada no JSX.

---

# Regra principal

❌ NÃO usar `useTheme()` para decidir cores ou estilos dentro de `index.js` ou `controller.js`.

Exemplo proibido:

```javascript
const theme = useTheme()
const logoBackground = theme[store?.logoBackgroundToken] || theme.surfaceTertiary
```

Motivos:

- espalha lógica de estilo no JSX
- quebra o padrão de arquitetura
- dificulta manutenção

---

# Estilos devem ficar no styled

Toda decisão visual deve acontecer no `styled.js`.

Exemplo correto:

```javascript
export const TagText = styled.Text.attrs({})`
  color: ${p => p.theme.textBrand};
  font-family: Medium;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.2px;
`
```

---

# Condições devem ficar no styled

Quando houver variações visuais, usar props semânticas.

Exemplo correto:

```javascript
export const TagText = styled.Text.attrs({})`
  color: ${p => (p.primary ? p.theme.primary : p.theme.textBrand)};
  font-family: Medium;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.2px;
`
```

---

# ❌ Não criar funções auxiliares para resolver theme

Não criar funções JS separadas para resolver cores ou estilos do theme.

Exemplo proibido:

```javascript
const getLogoBackgroundColor = ({ theme, logoBackgroundToken }) => (
  theme[logoBackgroundToken] || theme.surfaceTertiary
)

const getLogoLineColor = ({ theme, logoLineColorToken }) => (
  theme[logoLineColorToken] || theme.textBrand
)

export const LogoArea = styled.View.attrs({})`
  background: ${getLogoBackgroundColor};
`

export const LogoLine = styled.Text.attrs({})`
  color: ${getLogoLineColor};
`
```

Esse padrão NÃO deve ser usado.

Motivos:

- espalha lógica fora do styled
- dificulta leitura
- cria indireção desnecessária
- quebra o padrão do projeto

---

# Forma correta

A lógica deve ficar diretamente dentro do CSS do styled component.

Exemplo correto:

```javascript
export const LogoArea = styled.View.attrs({})`
  width: ${p => (p.hero ? '120px' : '80px')};
  min-height: ${p => (p.hero ? '120px' : '80px')};
  background: ${p => p.theme?.[p?.logoBackgroundToken] || p.theme.surfaceTertiary};
  padding: 8px;
  align-items: center;
  justify-content: center;
`

export const LogoLine = styled.Text.attrs({})`
  color: ${p => p.theme?.[p?.logoLineColorToken] || p.theme.textBrand};
  text-align: center;
`
```

Toda condição de estilo deve ficar **diretamente no styled** usando `p => ...`.

---

# ❌ Não criar styled genérico com props de estilo

Evitar componentes que aceitam props de estilo como:

```javascript
color: ${p => p.color || p.theme.textBrand}
font-family: ${p => p.family || 'Medium'}
font-size: ${p => p.size || '12px'}
line-height: ${p => p.lineHeight || '12px'}
letter-spacing: ${p => p.spacing || '0px'}
```

Esse padrão cria componentes genéricos difíceis de manter.

---

# Forma correta

Criar styled com valores definidos e apenas pequenas variações semânticas.

Exemplo:

```javascript
export const TagText = styled.Text.attrs({})`
  color: ${p => (p.primary ? p.theme.primary : p.theme.textBrand)};
  font-family: Medium;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.2px;
`
```

---

# Checklist final

Antes de finalizar:

- Existe `useTheme()` dentro do `index.js` apenas para lógica de estilo? ❌
- Alguma cor está sendo decidida no JSX? ❌
- Styled aceita props genéricas de estilo (`color`, `size`, `family`)? ❌
- As condições de estilo estão no `styled.js`? ✅
