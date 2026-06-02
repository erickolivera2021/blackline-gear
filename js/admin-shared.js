/* ═══════════════════════════════════════
   ADMIN SHARED — Sidebar + Header render
═══════════════════════════════════════ */

function renderAdminSidebar(activePage) {
  const items = [
    { id: 'dashboard', icon: 'fa-chart-line', label: 'Dashboard', href: 'admin.html' },
    { id: 'produtos', icon: 'fa-box', label: 'Produtos', href: 'admin-produtos.html', badge: PRODUCTS.length },
    { id: 'pedidos', icon: 'fa-shopping-cart', label: 'Pedidos', href: 'admin-pedidos.html', badge: ORDERS.filter(o=>o.status==='pending').length },
    { id: 'clientes', icon: 'fa-users', label: 'Clientes', href: 'admin-clientes.html' },
    { id: 'cupons', icon: 'fa-ticket', label: 'Cupons', href: 'admin-cupons.html' },
    { id: 'estoque', icon: 'fa-warehouse', label: 'Estoque', href: 'admin-estoque.html' },
    { id: 'relatorios', icon: 'fa-chart-pie', label: 'Relatórios', href: 'admin-relatorios.html' },
  ];

  const sidebar = document.getElementById('adminSidebar');
  if (!sidebar) return;
  sidebar.innerHTML = `
    <div class="admin-sidebar-logo"><a href="admin.html"><img src="assets/img/logo/blackline-logo.png" alt="Blackline" height="28" /></a></div>
    <nav class="admin-sidebar-nav">
      ${items.map(i => `
        <a href="${i.href}" class="admin-nav-item ${i.id===activePage?'active':''}">
          <i class="fas ${i.icon}"></i> ${i.label}
          ${i.badge ? `<span class="nav-badge">${i.badge}</span>` : ''}
        </a>
      `).join('')}
    </nav>
    <div class="admin-sidebar-footer">
      <a href="index.html" class="admin-nav-item" style="margin-bottom:4px"><i class="fas fa-store"></i> Ver Loja</a>
      <a href="login.html" class="admin-nav-item" style="color:var(--danger)"><i class="fas fa-sign-out-alt"></i> Sair</a>
      <div style="margin-top:12px;font-size:.68rem;color:var(--muted-2)">Blackline Admin v1.0</div>
    </div>
  `;
}

function renderAdminTopbar(title, actions = '') {
  const topbar = document.getElementById('adminTopbar');
  if (!topbar) return;
  topbar.innerHTML = `
    <div>
      <h1>${title}</h1>
      <p style="font-size:.82rem;color:var(--muted);margin-top:4px">${new Date().toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</p>
    </div>
    <div class="admin-topbar-actions">
      ${actions}
      <div class="avatar" style="cursor:pointer" title="Admin">AD</div>
    </div>
  `;
}
