/* ═══════════════════════════════════════
   ORDERS STORE — Real orders persisted to localStorage
   Shared between checkout (write) and admin (read)
═══════════════════════════════════════ */

const ORDERS_KEY = 'bl_real_orders';
const CUSTOMERS_KEY = 'bl_real_customers';
const STOCK_KEY = 'bl_stock';

const STATUS_LABELS = {
  pending: 'Pendente',
  paid: 'Pago',
  shipped: 'Enviado',
  delivered: 'Entregue',
  cancelled: 'Cancelado'
};

function loadRealOrders() {
  try { return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]'); }
  catch { return []; }
}

function saveRealOrders(arr) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(arr));
}

function loadRealCustomers() {
  try { return JSON.parse(localStorage.getItem(CUSTOMERS_KEY) || '[]'); }
  catch { return []; }
}

function saveRealCustomers(arr) {
  localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(arr));
}

function nextOrderId() {
  const realOrders = loadRealOrders();
  const mockMax = (typeof ORDERS !== 'undefined') ? Math.max(...ORDERS.map(o => o.id), 0) : 1042;
  const realMax = realOrders.length ? Math.max(...realOrders.map(o => o.id)) : 0;
  return Math.max(mockMax, realMax) + 1;
}

function createRealOrder(orderData) {
  const orders = loadRealOrders();
  const id = nextOrderId();
  const newOrder = {
    id,
    number: '#BL-' + id,
    date: new Date().toISOString().split('T')[0],
    status: 'pending',
    statusLabel: STATUS_LABELS.pending,
    tracking: null,
    isReal: true,
    createdAt: new Date().toISOString(),
    ...orderData
  };
  orders.unshift(newOrder);
  saveRealOrders(orders);

  // Save/update customer
  if (newOrder.customer && newOrder.customer.email) {
    const customers = loadRealCustomers();
    const existing = customers.find(c => c.email === newOrder.customer.email);
    if (existing) {
      existing.orders = (existing.orders || 0) + 1;
      existing.totalSpent = (existing.totalSpent || 0) + newOrder.total;
      existing.lastOrder = newOrder.date;
    } else {
      customers.unshift({
        id: 1000 + customers.length + 1,
        name: newOrder.customer.name,
        email: newOrder.customer.email,
        phone: newOrder.customer.phone || '',
        orders: 1,
        totalSpent: newOrder.total,
        since: newOrder.date,
        lastOrder: newOrder.date,
        isReal: true
      });
    }
    saveRealCustomers(customers);
  }

  // Persist last order for the success page
  localStorage.setItem('bl_last_order', JSON.stringify(newOrder));
  return newOrder;
}

function updateOrderStatus(orderId, status) {
  const orders = loadRealOrders();
  const o = orders.find(x => x.id === orderId);
  if (o) {
    o.status = status;
    o.statusLabel = STATUS_LABELS[status] || status;
    saveRealOrders(orders);
    return o;
  }
  return null;
}

function updateOrderTracking(orderId, code) {
  const orders = loadRealOrders();
  const o = orders.find(x => x.id === orderId);
  if (o) {
    o.tracking = code;
    saveRealOrders(orders);
    return o;
  }
  return null;
}

function getAllOrders() {
  const real = loadRealOrders();
  const mock = (typeof ORDERS !== 'undefined') ? ORDERS : [];
  // Real orders first (newest), then mock
  return [...real, ...mock];
}

function getAllCustomers() {
  const real = loadRealCustomers();
  const mock = (typeof CUSTOMERS !== 'undefined') ? CUSTOMERS : [];
  // Dedupe by email
  const seen = new Set(real.map(c => c.email));
  const mockFiltered = mock.filter(c => !seen.has(c.email));
  return [...real, ...mockFiltered];
}

function getOrderById(id) {
  return getAllOrders().find(o => o.id === id);
}

function deleteRealOrder(orderId) {
  let orders = loadRealOrders();
  orders = orders.filter(o => o.id !== orderId);
  saveRealOrders(orders);
}

// ─── Stock helpers ───
function loadStock() {
  try { return JSON.parse(localStorage.getItem(STOCK_KEY) || '{}'); }
  catch { return {}; }
}
function saveStock(s) { localStorage.setItem(STOCK_KEY, JSON.stringify(s)); }

function getProductStock(productId) {
  const overrides = loadStock();
  if (overrides[productId] !== undefined) return overrides[productId];
  const p = (typeof PRODUCTS !== 'undefined') ? PRODUCTS.find(x => x.id === productId) : null;
  return p ? p.stock : 0;
}

function decrementStock(productId, qty) {
  const cur = getProductStock(productId);
  const overrides = loadStock();
  overrides[productId] = Math.max(0, cur - qty);
  saveStock(overrides);
}

// ─── Auto-merge: replace mock ORDERS/CUSTOMERS with merged data ───
function refreshMergedData() {
  try {
    if (typeof ORDERS !== 'undefined') ORDERS = getAllOrders();
    if (typeof CUSTOMERS !== 'undefined') CUSTOMERS = getAllCustomers();
  } catch (e) { /* mock-data.js may not be loaded yet */ }
}
refreshMergedData();

// ─── Stats for dashboard ───
function getRealStats() {
  const orders = loadRealOrders();
  const customers = loadRealCustomers();
  const paidOrders = orders.filter(o => o.status !== 'cancelled');
  const revenue = paidOrders.reduce((s, o) => s + (o.total || 0), 0);
  const avgTicket = paidOrders.length ? revenue / paidOrders.length : 0;

  return {
    realOrderCount: orders.length,
    realCustomerCount: customers.length,
    realRevenue: revenue,
    realAvgTicket: avgTicket,
    pendingCount: orders.filter(o => o.status === 'pending').length,
    paidCount: orders.filter(o => o.status === 'paid').length,
    shippedCount: orders.filter(o => o.status === 'shipped').length,
    deliveredCount: orders.filter(o => o.status === 'delivered').length
  };
}
