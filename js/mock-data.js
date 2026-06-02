/* ═══════════════════════════════════════
   MOCK DATA — Blackline Gear
   All fake data for the visual prototype
═══════════════════════════════════════ */

const PRODUCTS = [
  {
    id: 'x-pump',
    slug: 'x-pump',
    name: 'X-PUMP — Mini Bomba Elétrica 120PSI',
    shortName: 'X-PUMP 120PSI',
    category: 'Infladores',
    price: 579,
    comparePrice: null,
    installments: 12,
    image: 'assets/img/products/x-pump-main.webp',
    gallery: [
      'assets/img/products/x-pump-main.webp',
      'assets/img/gallery/x-pump-2.webp'
    ],
    badge: 'Mais vendido',
    rating: 5,
    reviewCount: 47,
    stock: 234,
    weight: 0.124,
    sku: 'BL-XP120',
    featured: true,
    active: true,
    description: 'A micro pump projetada para facilitar a vida de praticantes de esportes outdoor. Design mini, ultra leve e portátil.',
    shortDesc: 'Inflador elétrico portátil 120 PSI, 124g, bateria 450mAh.',
    specs: {
      'Pressão máxima': '120 PSI',
      'Peso': '124g',
      'Dimensões': '64.5 × 63 × 28mm',
      'Bateria': '450mAh / 7.4V / 3.33Wh',
      'Recarga': 'USB-C 5V 1.5A (30 min)',
      'Precisão': '±1 PSI',
      'Vazão': '15 L/min',
      'Potência': '55W',
      'Válvulas': 'Presta + Schrader + Bola',
      'Tempo 0-80 PSI': '~50 segundos'
    },
    features: [
      'Compatível com válvulas Presta e Schrader',
      'Display digital com pressão em tempo real',
      'Bateria recarregável via USB-C',
      'Carrega em apenas 30 minutos',
      'Motor brushless silencioso',
      'Desligamento automático na pressão alvo',
      'Corpo em liga de alumínio'
    ],
    page: 'produto-xpump.html'
  },
  {
    id: 'kit-no-flat',
    slug: 'kit-no-flat',
    name: 'KIT NO FLAT — X-Pump + Câmara de Ar',
    shortName: 'Kit No Flat',
    category: 'Kits',
    price: 688,
    comparePrice: null,
    installments: 12,
    image: 'assets/img/products/kit-no-flat.webp',
    gallery: ['assets/img/products/kit-no-flat.webp'],
    badge: 'Edição limitada',
    rating: 5,
    reviewCount: 31,
    stock: 18,
    weight: 0.200,
    sku: 'BL-KNF01',
    featured: true,
    active: true,
    description: 'Combo exclusivo: Mini Bomba Elétrica X-Pump + Câmara de Ar Nano Tube TPU grátis. Lote limitado.',
    shortDesc: 'X-Pump + Câmara Nano Tube TPU grátis. Edição limitada.',
    specs: {
      'Inclui': 'X-Pump 120PSI + Nano Tube TPU',
      'Peso total': '~200g',
      'Garantia': '1 ano incondicional'
    },
    features: [
      '1x Mini Bomba Elétrica X-PUMP 120PSI',
      '1x Câmara de Ar Nano Tube TPU',
      'Embalagem premium Blackline',
      'Edição limitada'
    ],
    page: 'produto-kit.html'
  },
  {
    id: 'nano-tube',
    slug: 'nano-tube',
    name: 'NANO TUBE — Câmara TPU Ultralight',
    shortName: 'Nano Tube TPU',
    category: 'Câmaras de ar',
    price: 109,
    comparePrice: null,
    installments: 12,
    image: 'assets/img/products/nano-tube.webp',
    gallery: [
      'assets/img/products/nano-tube.webp',
      'assets/img/gallery/nano-tube-2.webp',
      'assets/img/gallery/nano-tube-3.webp'
    ],
    badge: null,
    rating: 5,
    reviewCount: 23,
    stock: 89,
    weight: 0.044,
    sku: 'BL-NT700',
    featured: true,
    active: true,
    description: 'A revolução brasileira em câmaras de ar. Material TPU até 70% mais leve que butyl convencional.',
    shortDesc: 'Câmara TPU ultralight 44g (road) / 80g (MTB).',
    specs: {
      'Material': 'TPU Ultralight',
      'Peso Road': '44g',
      'Peso MTB': '80g',
      'Válvula': 'Presta 40/60/80mm',
      'Tamanhos': '700x28-32c / 29x2.1-2.6',
      'Pressão máxima': '115 PSI',
      'Compatibilidade': 'MTB, Road, Gravel, Triathlon'
    },
    features: [
      'Material TPU — até 70% mais leve que butyl',
      '44g (road) / 80g (MTB)',
      'Pressão máxima: 115 PSI',
      'Compatível: MTB, Road, Gravel, Triathlon'
    ],
    page: 'produto-nanotube.html'
  }
];

const ORDERS = [
  {
    id: 1042, number: '#BL-1042', date: '2026-05-28',
    customer: { name: 'Carlos Mendes', email: 'carlos@email.com', phone: '(11) 98765-4321' },
    status: 'paid', statusLabel: 'Pago',
    items: [{ productId: 'x-pump', name: 'X-PUMP 120PSI', qty: 1, price: 579, image: 'assets/img/products/x-pump-main.webp' }],
    subtotal: 579, shipping: 0, discount: 0, total: 579,
    payment: 'PIX', tracking: null,
    address: { street: 'Rua Augusta', number: '1200', complement: 'Apto 42', neighborhood: 'Consolação', city: 'São Paulo', state: 'SP', zip: '01304-001' }
  },
  {
    id: 1041, number: '#BL-1041', date: '2026-05-27',
    customer: { name: 'Ana Silva', email: 'ana@email.com', phone: '(21) 97654-3210' },
    status: 'pending', statusLabel: 'Pendente',
    items: [{ productId: 'kit-no-flat', name: 'Kit No Flat', qty: 1, price: 688, image: 'assets/img/products/kit-no-flat.webp' }],
    subtotal: 688, shipping: 0, discount: 50, total: 638,
    payment: 'Cartão 12x', tracking: null, coupon: 'BLACKFRIDAY',
    address: { street: 'Av. Atlântica', number: '500', complement: '', neighborhood: 'Copacabana', city: 'Rio de Janeiro', state: 'RJ', zip: '22021-000' }
  },
  {
    id: 1040, number: '#BL-1040', date: '2026-05-26',
    customer: { name: 'Pedro Lima', email: 'pedro@email.com', phone: '(31) 96543-2109' },
    status: 'shipped', statusLabel: 'Enviado',
    items: [{ productId: 'nano-tube', name: 'Nano Tube TPU', qty: 2, price: 109, image: 'assets/img/products/nano-tube.webp' }],
    subtotal: 218, shipping: 0, discount: 0, total: 218,
    payment: 'PIX', tracking: 'BR123456789BR',
    address: { street: 'Rua da Bahia', number: '800', complement: 'Sala 3', neighborhood: 'Centro', city: 'Belo Horizonte', state: 'MG', zip: '30160-011' }
  },
  {
    id: 1039, number: '#BL-1039', date: '2026-05-24',
    customer: { name: 'Juliana Costa', email: 'juliana@email.com', phone: '(41) 95432-1098' },
    status: 'delivered', statusLabel: 'Entregue',
    items: [
      { productId: 'x-pump', name: 'X-PUMP 120PSI', qty: 1, price: 579, image: 'assets/img/products/x-pump-main.webp' },
      { productId: 'nano-tube', name: 'Nano Tube TPU', qty: 1, price: 109, image: 'assets/img/products/nano-tube.webp' }
    ],
    subtotal: 688, shipping: 0, discount: 0, total: 688,
    payment: 'Boleto', tracking: 'BR987654321BR',
    address: { street: 'Rua XV de Novembro', number: '300', complement: '', neighborhood: 'Centro', city: 'Curitiba', state: 'PR', zip: '80020-310' }
  },
  {
    id: 1038, number: '#BL-1038', date: '2026-05-22',
    customer: { name: 'Marcos Oliveira', email: 'marcos@email.com', phone: '(51) 94321-0987' },
    status: 'cancelled', statusLabel: 'Cancelado',
    items: [{ productId: 'x-pump', name: 'X-PUMP 120PSI', qty: 1, price: 579, image: 'assets/img/products/x-pump-main.webp' }],
    subtotal: 579, shipping: 0, discount: 0, total: 579,
    payment: 'Cartão', tracking: null,
    address: { street: 'Rua dos Andradas', number: '1500', complement: '', neighborhood: 'Centro', city: 'Porto Alegre', state: 'RS', zip: '90020-015' }
  }
];

const CUSTOMERS = [
  { id: 1, name: 'Carlos Mendes', email: 'carlos@email.com', phone: '(11) 98765-4321', orders: 3, totalSpent: 1846, since: '2025-08-15' },
  { id: 2, name: 'Ana Silva', email: 'ana@email.com', phone: '(21) 97654-3210', orders: 1, totalSpent: 638, since: '2026-05-27' },
  { id: 3, name: 'Pedro Lima', email: 'pedro@email.com', phone: '(31) 96543-2109', orders: 2, totalSpent: 797, since: '2026-01-10' },
  { id: 4, name: 'Juliana Costa', email: 'juliana@email.com', phone: '(41) 95432-1098', orders: 1, totalSpent: 688, since: '2026-05-24' },
  { id: 5, name: 'Marcos Oliveira', email: 'marcos@email.com', phone: '(51) 94321-0987', orders: 0, totalSpent: 0, since: '2026-05-22' },
  { id: 6, name: 'Fernanda Santos', email: 'fernanda@email.com', phone: '(85) 93210-9876', orders: 4, totalSpent: 2536, since: '2025-03-05' },
  { id: 7, name: 'Ricardo Almeida', email: 'ricardo@email.com', phone: '(61) 92109-8765', orders: 2, totalSpent: 1158, since: '2025-11-20' }
];

const COUPONS = [
  { id: 1, code: 'BLACKFRIDAY', type: 'fixed', value: 50, minOrder: 300, maxUses: 100, used: 34, expiresAt: '2026-12-31', active: true },
  { id: 2, code: 'PRIMEIRACOMPRA', type: 'percent', value: 10, minOrder: 0, maxUses: 500, used: 127, expiresAt: '2026-12-31', active: true },
  { id: 3, code: 'FRETEVIP', type: 'fixed', value: 30, minOrder: 200, maxUses: 50, used: 50, expiresAt: '2026-06-30', active: false },
  { id: 4, code: 'CICLISTA20', type: 'percent', value: 20, minOrder: 500, maxUses: 30, used: 8, expiresAt: '2026-08-31', active: true }
];

const REVIEWS = [
  { id: 1, productId: 'x-pump', author: 'Carlos M.', initials: 'CM', rating: 5, date: '2026-05-15', city: 'SP', text: 'Comprei pra usar nas trilhas e nunca mais saí sem ela. Pequena, potente e a bateria dura. Vale cada centavo!', verified: true },
  { id: 2, productId: 'x-pump', author: 'Rafael S.', initials: 'RS', rating: 5, date: '2026-05-10', city: 'RJ', text: 'Substituiu minha bomba de pé. Encho 100 PSI da road em menos de 1 minuto. Display digital é genial!', verified: true },
  { id: 3, productId: 'x-pump', author: 'André L.', initials: 'AL', rating: 5, date: '2026-04-28', city: 'MG', text: 'Furei pneu em trilha 2 vezes desde que comprei. Salvou minha pedalada nas duas. Compacta e poderosa.', verified: true },
  { id: 4, productId: 'nano-tube', author: 'Fernanda S.', initials: 'FS', rating: 5, date: '2026-05-20', city: 'PR', text: 'Incrivelmente leve! Dá pra sentir a diferença no peso da bike. Recomendo demais.', verified: true },
  { id: 5, productId: 'kit-no-flat', author: 'Ricardo A.', initials: 'RA', rating: 5, date: '2026-05-18', city: 'DF', text: 'Kit perfeito. Bomba + câmara de ar por um preço justo. Chegou rápido e bem embalado.', verified: true }
];

const ADMIN_STATS = {
  revenue: { value: 12450, change: 18.5, period: 'vs mês anterior' },
  orders: { value: 47, change: 12, period: 'vs mês anterior' },
  customers: { value: 38, change: 22, period: 'novos este mês' },
  avgTicket: { value: 264.89, change: 5.2, period: 'vs mês anterior' },
  conversionRate: 3.8,
  topProduct: 'X-PUMP 120PSI',
  monthlyRevenue: [
    { month: 'Jan', value: 8200 }, { month: 'Fev', value: 9100 },
    { month: 'Mar', value: 7800 }, { month: 'Abr', value: 10500 },
    { month: 'Mai', value: 12450 }, { month: 'Jun', value: 0 }
  ]
};

const SHIPPING_OPTIONS = [
  { id: 'pac', name: 'PAC — Correios', days: '5 a 8 dias úteis', price: 0, free: true },
  { id: 'sedex', name: 'SEDEX — Correios', days: '2 a 3 dias úteis', price: 18.90, free: false },
  { id: 'jadlog', name: 'JadLog — Transportadora', days: '4 a 6 dias úteis', price: 12.50, free: false }
];

const WHATSAPP_NUMBER = '5511941834958';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

// ─── Helper functions ───
function formatPrice(v) {
  return 'R$ ' + v.toFixed(2).replace('.', ',');
}
function formatDate(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('pt-BR');
}
function getStatusClass(status) {
  const map = { paid: 'green', pending: 'yellow', shipped: 'blue', delivered: 'green', cancelled: 'red' };
  return map[status] || 'yellow';
}
function getStatusBadge(status) {
  const map = { paid: 'badge-success', pending: 'badge-warning', shipped: 'badge-info', delivered: 'badge-success', cancelled: 'badge-danger' };
  return map[status] || 'badge-ghost';
}
function getProduct(id) { return PRODUCTS.find(p => p.id === id); }
