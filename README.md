# BLACKLINE GEAR — E-commerce Premium

Protótipo visual completo do e-commerce Blackline Gear — vitrine de acessórios premium para bicicleta (X-Pump, Kit No Flat, Nano Tube).

## Estrutura

```
SITE BLACKLINE/
├── index.html          # Home
├── produtos.html       # Catálogo
├── produto-*.html      # Páginas individuais
├── carrinho.html       # Carrinho
├── checkout.html       # Checkout 4 steps
├── login.html          # Auth pages
├── conta.html          # Área do cliente
├── admin*.html         # Painel administrativo
├── 404.html            # Página não encontrada
├── sitemap.xml         # SEO
├── robots.txt          # SEO
├── css/                # Design system
│   ├── variables.css
│   ├── base.css
│   ├── components.css
│   ├── layout.css
│   ├── pages.css
│   ├── premium.css     # Dark/Light + animações
│   ├── product-page.css
│   ├── checkout.css
│   └── admin.css
├── js/                 # Lógica
│   ├── mock-data.js    # Dados fictícios
│   ├── app.js          # Carrinho, render, eventos
│   ├── premium.js      # GSAP, tema, ripple
│   └── admin-shared.js # Sidebar admin
└── assets/img/         # Imagens reais dos produtos
```

## Páginas (27 no total)

### Loja Pública
- Home, Catálogo, 3 páginas de produto, Sobre, FAQ, Contato

### Carrinho & Checkout
- Carrinho, Checkout (4 steps), Sucesso

### Área do Cliente
- Login, Cadastro, Recuperar senha, Conta, Pedidos, Detalhe pedido, Desejos

### Admin (8 páginas)
- Dashboard, Produtos, Form Produto, Pedidos, Detalhe pedido, Clientes, Cupons, Estoque, Relatórios

## Recursos

- Dark/Light Mode com persistência (localStorage)
- Carrinho funcional com localStorage
- Sistema de favoritos
- Filtros do catálogo
- Lightbox de galeria
- Animações GSAP + ScrollTrigger
- Glassmorphism nos cards
- Cookie banner LGPD
- Sitemap XML + robots.txt
- Schema.org Product
- 404 customizado
- Responsivo mobile

## Tecnologias

- HTML5 + CSS3 + JavaScript (vanilla)
- GSAP 3 + ScrollTrigger
- Chart.js (gráficos do admin)
- Font Awesome 6
- Google Fonts (Bebas Neue, Inter, JetBrains Mono)

## Rodando localmente

```bash
npx http-server -p 8080
```

Acesse: http://localhost:8080

## Deploy

Pode ser hospedado em qualquer servidor estático:
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

## Licença

Projeto privado da Blackline Gear.
