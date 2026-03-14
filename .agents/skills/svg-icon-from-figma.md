# Skill: Ícone SVG vindo do Figma (obrigatório)

Regra principal:

SVG tem **PRIORIDADE MÁXIMA**.

Se o Figma fornecer um ícone em SVG, **sempre usar SVG**.

---

# ❌ Proibido

Nunca substituir SVG por:

- Image
- styled.Image
- PNG
- URL externa
- assets remotos

---

# Fluxo obrigatório

## 1) Converter SVG

Salvar o arquivo em uma destas pastas:

src/assets/icons/comum/

ou

src/assets/icons/project/

---

## 2) Formato obrigatório do arquivo

O arquivo **não deve exportar um componente React**.

Deve exportar um **objeto** com `svg` e `viewBox`.

Exemplo obrigatório:

```js
export default {
  svg: (
    <>
      <Path />
    </>
  ),
  viewBox: "0 0 24 24"
}

Regras
	•	usar react-native-svg
	•	não exportar componente wrapper
	•	manter o padrão existente do projeto

⸻

3) Registrar no index da pasta

Adicionar o novo ícone no index.js da pasta correspondente.

Exemplo:

export { default as nomeDoIcone } from './nomeDoIcone'


⸻

4) Usar via wrapper de ícones

Uso obrigatório do wrapper central de ícones:

import Icons from '@assets/icons'

<Icons icon="nomeDoIcone" width={24} height={24} />


⸻

Naming

Regras de nomenclatura:
	•	nome do arquivo = nome do ícone
	•	reutilizar ícones existentes antes de criar novos
	•	não duplicar ícones

---

## Por que essa versão é melhor para agentes

Ela resolve problemas que fazem LLMs **alucinarem implementação**:

1️⃣ Blocos de código fechados corretamente  
2️⃣ Seções claras (`#`, `##`)  
3️⃣ Fluxo sequencial (1 → 4)  
4️⃣ Regras explícitas separadas de exemplos  

Isso aumenta muito a chance de o agente **seguir exatamente o padrão**.

---

💡 **Pequena melhoria opcional (recomendo muito)**

Adicionar logo no início:

```md
Esta skill deve ser aplicada sempre que um ícone SVG aparecer no Figma.