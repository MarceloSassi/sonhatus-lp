# SONHATUS · Página de vendas

## Estrutura

```
sonhatus/
├── index.html                  Marcação semântica, sprite de ícones SVG e conteúdo
├── README.md
└── assets/
    ├── css/main.css            Tokens, céu fixo, liquid glass, componentes, animações
    ├── js/
    │   ├── tailwind.config.js  Paleta e tipografia do Tailwind (CDN)
    │   ├── main.js             Entrada (ES module)
    │   ├── reveal.js           Revelação por scroll (IntersectionObserver)
    │   └── faq.js              Acordeão acessível
    └── img/
        ├── background-desktop.png
        ├── background-mobile.png
        └── produto-placeholder.svg
```

## Como funciona o fundo

`.sky` é `position: fixed` com a imagem em `background-image` e troca de arquivo em `min-width: 768px`.
`.sky-veil` aplica o degradê de contraste. Nenhum uso de `background-attachment: fixed`, que falha em iOS.
Todo o conteúdo rola por cima, com revelação em `transform` e `opacity`.

## Pontos a substituir antes de publicar

| Marcador | Onde | O que inserir |
|---|---|---|
| `produto-placeholder.svg` | hero e `og:image` | foto do frasco em WebP ou PNG, fundo transparente, 640x800 |
| `[DEPOIMENTO REAL 01-03]`, `[NOME]`, `[CIDADE]` | seção Provas | depoimentos reais e verificáveis |
| `[INSERIR A RECOMENDAÇÃO DE CONSUMO...]` | FAQ | texto exato do rótulo aprovado |
| `[LINK_CHECKOUT_1_FRASCO]`, `[LINK_CHECKOUT_KIT_2]`, `[LINK_CHECKOUT_KIT_3]` | seção Oferta | URLs de checkout |
| `[REPRODUZIR INTEGRALMENTE AS ORIENTAÇÕES...]` | FAQ, gestantes e lactantes | texto exato do rótulo aprovado |
| `[RAZÃO SOCIAL]`, `[CNPJ]`, `[ENDEREÇO]` | rodapé | dados da empresa |
| `R$ 79,90` / `R$ 139,90` / `R$ 159,80` / `R$ 189,90` / `R$ 239,70` | seção Oferta | preços comerciais reais |
| `Mais vendido` | card do kit com 3 frascos | manter apenas se a afirmação for verdadeira e verificável |
| `https://exemplo.com.br/sonhatus` | `<link rel="canonical">` | URL final |

Os preços atuais vêm do documento de copy e são fictícios. A unidade da Vitamina B6 (1,3 mcg) precisa de
confirmação do responsável técnico, assim como as advertências obrigatórias do rótulo.

## Produção

O Tailwind está via CDN para agilizar a edição. Antes de subir, gere o CSS compilado:

```bash
npx tailwindcss -i ./assets/css/tailwind.src.css -o ./assets/css/tailwind.css --minify
```

Crie `tailwind.src.css` com as diretivas `@tailwind`, replique o bloco `theme.extend` de
`assets/js/tailwind.config.js` em um `tailwind.config.js` na raiz e troque a tag do CDN pelo
`<link>` do arquivo gerado. Isso remove cerca de 100 KB de JS bloqueante e melhora FCP e LCP.

## Checklist de performance

1. Converter os dois fundos para WebP ou AVIF e comprimir (alvo: menos de 250 KB cada).
2. Servir a imagem do produto em WebP mantendo `width`, `height`, `loading="eager"` e `fetchpriority="high"`.
3. Substituir o CDN do Tailwind pelo CSS compilado e minificado.
4. Ativar cache de página e CDN (Cloudflare, WP Rocket ou LiteSpeed).
5. Medir no PageSpeed em 4G simulado, com foco em LCP e CLS.

## Uso no Elementor

O código está separado em arquivos, não em widget único. Para colar em um widget HTML do Elementor,
concatene `main.css` dentro de `<style>` e os três arquivos JS dentro de um `<script>` com IIFE,
mantendo o prefixo das classes. Alternativa mais limpa: enfileirar `main.css` e `main.js` pelo
`functions.php` do tema filho e deixar no widget apenas a marcação.
