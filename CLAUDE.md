# CLAUDE.md

Contexto permanente deste repositório. Leia antes de qualquer alteração.

## Projeto

Landing page de vendas do SONHATUS, suplemento alimentar encapsulado (melatonina, magnésio,
L-triptofano, vitaminas B3, B6 e B12). Página estática, sem build, destino final WordPress com
Elementor. Objetivo único: levar o visitante à seção de oferta e ao checkout.

## Stack

HTML semântico, CSS puro em `assets/css/main.css`, JavaScript vanilla em ES modules.
Tailwind apenas para layout e espaçamento, compilado em `assets/css/tailwind.css` a partir de
`assets/js/tailwind.config.js`. Ao usar uma classe Tailwind nova no HTML, recompilar:
`npx tailwindcss@3 -c assets/js/tailwind.config.js -o assets/css/tailwind.css --minify`.
Sem frameworks, sem bibliotecas externas, sem dependências novas sem justificativa explícita de peso.

## Estrutura

```
index.html                      marcação e conteúdo
assets/css/main.css             tokens, céu fixo, liquid glass, componentes, animações
assets/css/tailwind.css         utilitários Tailwind compilados (gerado, não editar à mão)
assets/js/tailwind.config.js    paleta e tipografia do Tailwind (usado só na compilação)
assets/js/main.js               entrada
assets/js/reveal.js             revelação por scroll (IntersectionObserver)
assets/js/faq.js                acordeão acessível
assets/img/                     fundos e placeholder do produto
```

Servir sempre por HTTP local (`python3 -m http.server`), nunca `file://`, por causa dos ES modules.

## Conceito visual (não alterar sem pedido)

Céu noturno, atmosfera calma, roxo profundo e lilás. O fundo é fixo (`.sky` em `position: fixed`,
troca de arquivo em 768px) e só o conteúdo rola por cima, com sensação de flutuação.
Nunca usar `background-attachment: fixed`, que quebra no iOS.

Vidro líquido em painéis, cards, chips, ofertas e FAQ, sempre herdando a base única
`--glass-face`, `--glass-edge`, `--glass-blur`, `--glass-shadow`. Nenhuma variação local de blur,
borda ou sombra sem necessidade real.

Gradiente prateado (`--silver`) é acento pontual: marca, parte da headline, preços e valores da
fórmula. Não espalhar para outros elementos.

Tipografia: apenas a stack nativa do sistema definida em `--font-sans`. Nenhuma webfont.

Movimento: revelação de entrada e drift do frasco no hero. Não adicionar parallax, partículas,
hover elaborado em cada card nem animação nova sem pedido.

## Regras de código

Mobile first, escalando por `min-width`. Breakpoints usados: 768px e 1024px.
Animar apenas `transform` e `opacity`. Imagens com `width` e `height` explícitos.
Alvos de toque com no mínimo 44px. `:focus-visible` visível em todo elemento interativo.
`prefers-reduced-motion` respeitado em qualquer motion novo.
Sem `!important`, sem `setTimeout` para resolver timing, sem estilo inline quando há classe.
Sem CSS morto, sem seletor duplicado, sem função JS declarada e não usada.
Classes descritivas no padrão bloco e elemento já presente (`.offer__price`, `.faq__trigger`).
Novos estilos entram na seção numerada correspondente do `main.css`, não no fim do arquivo.
Nenhum travessão (— ou –) em texto, comentário ou copy. Usar vírgula, ponto ou dois-pontos.

## Restrições de autonomia

Não criar nem reescrever copy sem pedido explícito. Quando faltar texto, usar `[TEXTO]`.
Não alterar layout, paleta, tipografia ou hierarquia sem pedido explícito.
Problema técnico real (contraste, acessibilidade, bug) vira observação curta no fim da resposta,
nunca alteração aplicada por conta própria.
Preservar todos os marcadores entre colchetes (`[LINK_CHECKOUT_1_FRASCO]`, `[DEPOIMENTO REAL 01]`,
`[RAZÃO SOCIAL]`). Eles são pontos de substituição do cliente.

## Conformidade regulatória (crítico)

SONHATUS é suplemento alimentar, não medicamento. A copy não pode conter alegação de tratamento,
prevenção, cura, insônia, ansiedade, sono profundo, melhora garantida do sono ou qualquer promessa
clínica. Depoimentos só entram se reais e verificáveis, sem relato de resultado clínico.
Os preços atuais são fictícios. A recomendação de consumo só pode vir do rótulo aprovado.
Na dúvida sobre uma frase, sinalizar em vez de publicar.

## Performance

Metas: LCP abaixo de 2,5s, CLS abaixo de 0,1.
Imagem do produto é o LCP: manter `loading="eager"` e `fetchpriority="high"`, nunca `lazy`.
Fundos devem ir para WebP ou AVIF antes do deploy.
O hero entra por animação CSS (`.enter`), não pelo `reveal.js`, para não atrasar FCP e LCP.

## Estilo de resposta

Direto, sem preâmbulo, sem resumo do que foi feito, sem oferta de ajuda adicional.
Mostrar apenas o diff ou o trecho alterado, não o arquivo inteiro, salvo quando reescrito por completo.
