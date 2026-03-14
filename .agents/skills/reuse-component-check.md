# Skill: Reuso antes de criar componente (Card/Item/Row)

Objetivo: impedir duplicação de Card/Item/Row e garantir reuso.

Aplicar sempre que o Figma mostrar:
- card
- tile
- item
- row
- list item
- option item

---

## Checklist obrigatório (antes de criar qualquer componente novo)

### 1) Buscar antes de criar
Procurar em `src/components` (e subpastas) pelos termos:

Card  
Item  
Row  
Tile  
Option  
Menu  
Feed  
Profile  
Home  
List  

Se necessário, procurar também por nomes da feature:

Order  
Checkout  
Support  
etc  

---

### 2) Se for parecido → reutilizar
Se existir algo **>= 70% parecido** visual/estruturalmente:

❌ PROIBIDO criar componente novo.

Ação obrigatória:
- Reutilizar o componente existente.
- Ajustar com **props simples e semânticas** (sem `variant` string) ou **composição**.

Props recomendadas (exemplos):
isActive  
isDense  
disabled  
withShadow  
align  
size  

Composição (exemplos):
children  
left  
right  
header  
footer  

---

### 3) Criar novo apenas se inevitável
Só é permitido criar um componente novo se:

- (a) **não existir nada adaptável** e
- (b) **documentar no PR/commit**:
  - onde buscou
  - por que nenhum serviu

---

### 4) Figma diferente não significa componente diferente
Se a diferença do design for:
- cor
- espaçamento
- radius
- sombra
- fonte
- ícone

Isso NÃO justifica componente novo.

Reutilizar.

---

### 5) Se novo for inevitável → extrair base comum
Se existir componente parecido e ainda assim for inevitável criar novo:

- extrair base comum (`BaseCard`, `CardShell`, `CardContainer`)
- reapontar ambos para essa base