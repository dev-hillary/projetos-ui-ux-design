const PRODUCTS = [
  {id:1,name:"Tênis Runner Pro",brand:"Hoopee Performance",price:299.90,category:"Corrida",rating:4.9,color:"Preto",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",desc:"Tecnologia de amortecimento avançada com um design moderno e respirável. Ideal para corridas diárias e uso casual com máximo conforto."},
  {id:2,name:"Tênis Urban Pulse",brand:"Hoopee Urban",price:259.90,category:"Casual",rating:4.8,color:"Branco",image:"https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=85",desc:"Visual urbano minimalista, leve e versátil para acompanhar sua rotina do trabalho ao fim de semana."},
  {id:3,name:"Tênis Street Nova",brand:"Hoopee Street",price:219.90,category:"Casual",rating:4.7,color:"Cinza",image:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=85",desc:"Silhueta contemporânea com sola confortável e acabamento pensado para composições urbanas."},
  {id:4,name:"Tênis Sprint Max",brand:"Hoopee Performance",price:349.90,category:"Corrida",rating:4.9,color:"Azul",image:"https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=85",desc:"Construído para treinos intensos, com suporte responsivo e sensação de leveza a cada passada."},
  {id:5,name:"Tênis Cloud Move",brand:"Hoopee Performance",price:389.90,category:"Corrida",rating:4.9,color:"Branco",image:"https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=900&q=85",desc:"Entressola macia e construção flexível para transformar caminhadas e corridas em experiências confortáveis."},
  {id:6,name:"Tênis Daily Knit",brand:"Hoopee Essential",price:199.90,category:"Casual",rating:4.6,color:"Preto",image:"https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=85",desc:"Tênis casual com cabedal knit respirável e proposta clean para o dia a dia."},
  {id:7,name:"Bota Adventure Trail",brand:"Hoopee Outdoor",price:389.90,category:"Outdoor",rating:4.8,color:"Marrom",image:"https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=900&q=85",desc:"Bota robusta para trilhas e aventuras, com solado aderente e proteção para terrenos variados."},
  {id:8,name:"Slip On Easy",brand:"Hoopee Essential",price:179.90,category:"Casual",rating:4.5,color:"Bege",image:"https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=85",desc:"Praticidade sem perder estilo: design slip-on, confortável e fácil de combinar."},
  {id:9,name:"Tênis Court Classic",brand:"Hoopee Court",price:279.90,category:"Esporte",rating:4.8,color:"Branco",image:"https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&w=900&q=85",desc:"Inspirado nas quadras, com visual clássico, estrutura firme e conforto para uso esportivo ou casual."},
  {id:10,name:"Tênis Urban Leather",brand:"Hoopee Premium",price:269.90,category:"Casual",rating:4.7,color:"Preto",image:"https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=85",desc:"Acabamento sofisticado e design urbano para quem quer elevar o visual sem abrir mão do conforto."},
  {id:11,name:"Sandália Flow",brand:"Hoopee Summer",price:149.90,category:"Casual",rating:4.5,color:"Creme",image:"https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=900&q=85",desc:"Leve, confortável e pronta para dias quentes. Solado macio e design clean."},
  {id:12,name:"Tênis Motion Air",brand:"Hoopee Performance",price:329.90,category:"Corrida",rating:4.9,color:"Verde",image:"assets/motion-air.png",desc:"Modelo responsivo para quem busca velocidade, estabilidade e conforto em treinos diários."}
];

const CATEGORIES = ["Todos","Casual","Corrida","Esporte","Outdoor"];
const names = ["Marina","Lucas","Rafa","Nina","Theo","Bia","Caio","Luna"];
const randomName = names[Math.floor(Math.random()*names.length)];

let state = {
  view:"home",
  selectedProductId:1,
  category:"Todos",
  search:"",
  selectedSize:38,
  payment:"pix",
  cart: JSON.parse(localStorage.getItem("hoopee_cart") || "null"),
  lastOrder: JSON.parse(localStorage.getItem("hoopee_last_order") || "null"),
  orderAddress: {cep:"",street:"",number:"",neighborhood:""},
};

if(!state.cart){
  state.cart = PRODUCTS.slice(0,10).map(p => ({productId:p.id,size:38,qty:1}));
  saveCart();
}

function saveCart(){localStorage.setItem("hoopee_cart",JSON.stringify(state.cart))}
function money(v){return v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}
function product(id){return PRODUCTS.find(p=>p.id===Number(id))}
function cartCount(){return state.cart.reduce((s,i)=>s+i.qty,0)}
function cartSubtotal(){return state.cart.reduce((s,i)=>s+product(i.productId).price*i.qty,0)}
function total(){return cartSubtotal()}
function escapeHtml(str){return String(str).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}

function icon(name,size=19){
  const common=`width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"`;
  const paths={
    search:`<circle cx="11" cy="11" r="7"></circle><path d="m20 20-4-4"></path>`,
    cart:`<path d="M3 4h2l2.4 11.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.5L21 8H6"></path><circle cx="10" cy="20" r="1"></circle><circle cx="18" cy="20" r="1"></circle>`,
    user:`<circle cx="12" cy="8" r="3.5"></circle><path d="M5 21a7 7 0 0 1 14 0"></path>`,
    arrow:`<path d="m9 18 6-6-6-6"></path>`,
    back:`<path d="m15 18-6-6 6-6"></path>`,
    check:`<path d="m5 12 4 4L19 6"></path>`,
    shield:`<path d="M12 3 20 6v5c0 5-3.3 8.4-8 10-4.7-1.6-8-5-8-10V6l8-3Z"></path><path d="m9 12 2 2 4-4"></path>`,
    truck:`<path d="M3 6h11v10H3z"></path><path d="M14 10h4l3 3v3h-7z"></path><circle cx="7" cy="18" r="1.7"></circle><circle cx="18" cy="18" r="1.7"></circle>`,
    bag:`<path d="M5 8h14l1 12H4L5 8Z"></path><path d="M9 8V6a3 3 0 0 1 6 0v2"></path>`,
    minus:`<path d="M5 12h14"></path>`,
    plus:`<path d="M12 5v14M5 12h14"></path>`
  };
  return `<svg ${common}>${paths[name]||paths.search}</svg>`;
}

function header(view){
  const classes={
    home:"header-home",
    product:"header-product",
    cart:"header-cart",
    checkout:"header-checkout",
    confirmation:"header-confirmation",
    orders:"header-orders"
  };

  const title={
    home:"Descubra seu próximo passo",
    product:"Detalhes do produto",
    cart:"Seu carrinho",
    checkout:"Finalização segura",
    confirmation:"Pedido confirmado",
    orders:"Meus pedidos"
  }[view];

  return `<header class="app-header ${classes[view]||""}">
    <div class="header-top">
      <div class="header-top-inner">
        <span>Hoopee Club</span>
        <span>Frete grátis acima de R$ 199</span>
        <span>Troca fácil em até 30 dias</span>
        <span>Compra segura</span>
        <div class="header-top-spacer"></div>
        <span>Olá, ${randomName}</span>
        <button class="header-mini-link" onclick="go('orders')">Meus pedidos</button>
      </div>
    </div>

    <div class="header-main">
      <div class="header-inner">
        <button class="brand-logo" onclick="go('home')" aria-label="Ir para a página inicial">
          <img src="assets/hoopee-logo-header.png" alt="Hoopee">
        </button>

        <div class="header-search">
          ${icon("search",19)}
          <input id="globalSearch" value="${escapeHtml(state.search)}"
            placeholder="Buscar na Hoopee"
            oninput="handleSearch(this.value)"
            aria-label="Buscar na Hoopee">
          <span class="search-hint">⌘ K</span>
        </div>

        <div class="header-actions">
          <button class="icon-btn header-icon" onclick="go('orders')" title="Meus pedidos">
            ${icon("bag",20)}
          </button>
          <button class="icon-btn header-icon cart-header-btn" onclick="go('cart')" title="Carrinho">
            ${icon("cart",20)}
            <span class="badge">${cartCount()}</span>
          </button>
          <button class="user-chip header-user" onclick="go('orders')" title="Minha conta">
            <div class="avatar">${randomName[0]}</div>
            <span>${randomName}</span>
            ${icon("arrow",15)}
          </button>
        </div>
      </div>
    </div>

    <nav class="header-nav">
      <div class="header-nav-inner">
        <button onclick="setCategory('Todos')" class="${state.category==='Todos'?'active':''}">Todos os produtos</button>
        <button onclick="setCategory('Corrida')" class="${state.category==='Corrida'?'active':''}">Corrida</button>
        <button onclick="setCategory('Casual')" class="${state.category==='Casual'?'active':''}">Casual</button>
        <button onclick="setCategory('Esporte')" class="${state.category==='Esporte'?'active':''}">Esporte</button>
        <button onclick="setCategory('Outdoor')" class="${state.category==='Outdoor'?'active':''}">Outdoor</button>
        <span class="nav-divider"></span>
        <button onclick="document.getElementById('products')?.scrollIntoView({behavior:'smooth'})">Ofertas</button>
        <button onclick="go('orders')">Meus pedidos</button>
        <span class="nav-current">${title}</span>
      </div>
    </nav>
  </header>`;
}
function layout(content){
  return `${header(state.view)}<main class="main">${content}</main>`;
}

function productCard(p){
  return `<article class="product-card">
    <button style="display:block;width:100%;border:0;background:none;text-align:left" onclick="openProduct(${p.id})">
      <div class="product-image">
        <img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy">
        <span class="stock-pill">⚡ Últimas unidades</span>
      </div>
      <div class="product-info">
        <div class="product-brand">${escapeHtml(p.brand)}</div>
        <div class="product-name">${escapeHtml(p.name)}</div>
        <div class="product-meta">${p.category} · ★ ${p.rating}</div>
        <div class="product-price">${money(p.price)}</div>
      </div>
    </button>
    <div class="product-actions" style="padding:0 16px 16px">
      <button class="btn btn-secondary" onclick="openProduct(${p.id})">Ver detalhes</button>
      <button class="btn btn-primary" onclick="quickAdd(${p.id})">Adicionar</button>
    </div>
  </article>`;
}

function home(){
  const filtered=PRODUCTS.filter(p=>{
    const cat=state.category==="Todos"||p.category===state.category;
    const q=state.search.trim().toLowerCase();
    return cat && (!q || `${p.name} ${p.category} ${p.brand}`.toLowerCase().includes(q));
  });

  const heroProducts = [12,4,5];
  const heroId = heroProducts[(Date.now() % heroProducts.length)];
  const hero = product(heroId) || PRODUCTS[11];

  return `<section class="page home-page">

    <div class="home-hero-shell">
      <button class="hero-arrow hero-prev" onclick="heroShift(-1)" aria-label="Slide anterior">${icon("back",21)}</button>

      <div class="hero">
        <div class="hero-copy">
          <div class="hero-eyebrow">NOVA COLEÇÃO · 2026</div>
          <h1>Seu próximo passo<br>começa aqui.</h1>
          <p>Tecnologia, conforto e estilo para acompanhar você em qualquer desafio.</p>
          <div class="hero-actions">
            <button class="hero-btn" onclick="openProduct(${hero.id})">Conhecer ${escapeHtml(hero.name)}</button>
            <button class="hero-link" onclick="setCategory('Corrida')">Ver linha de corrida ${icon("arrow",15)}</button>
          </div>
        </div>

        <div class="hero-product">
          <div class="hero-glow"></div>
          <img src="${hero.image}" alt="${escapeHtml(hero.name)}">
          <div class="hero-product-tag">HOOPEE<br><strong>PERFORMANCE</strong></div>
        </div>
      </div>

      <button class="hero-arrow hero-next" onclick="heroShift(1)" aria-label="Próximo slide">${icon("arrow",21)}</button>

      <div class="hero-dots">
        <button class="active" onclick="openProduct(12)"></button>
        <button onclick="openProduct(4)"></button>
        <button onclick="openProduct(5)"></button>
        <button onclick="openProduct(1)"></button>
      </div>
    </div>

    <div class="benefits-bar">
      <div class="benefit">${icon("truck",22)}<div><strong>Frete grátis</strong><span>acima de R$ 199</span></div></div>
      <div class="benefit">${icon("shield",22)}<div><strong>Compra segura</strong><span>seus dados protegidos</span></div></div>
      <div class="benefit">${icon("check",22)}<div><strong>Troca fácil</strong><span>até 30 dias</span></div></div>
      <div class="benefit">${icon("bag",22)}<div><strong>Produtos originais</strong><span>das melhores marcas</span></div></div>
      <div class="benefit">${icon("cart",22)}<div><strong>Parcele em até 6x</strong><span>sem juros</span></div></div>
      <div class="benefit">${icon("user",22)}<div><strong>Atendimento</strong><span>rápido e humanizado</span></div></div>
    </div>

    <div class="shop-layout">
      <aside class="sidebar">
        <h3>Categorias</h3>
        <ul class="category-list">
          ${CATEGORIES.map(c=>`<li><button class="${state.category===c?"active":""}" onclick="setCategory('${c}')">${c}</button></li>`).join("")}
        </ul>
        <div class="sidebar-note">
          <strong>Hoopee Club</strong>
          Frete grátis e condições especiais para membros.
          <button onclick="toast('Hoopee Club em breve!')" class="club-link">Conhecer o clube →</button>
        </div>
      </aside>

      <div class="catalog">
        <div class="catalog-head" id="products">
          <div>
            <div class="section-kicker">SELEÇÃO HOOPEE</div>
            <h2>${state.search?`Resultados para "${escapeHtml(state.search)}"`:"Mais escolhidos da Hoopee"}</h2>
            <p>${filtered.length} produtos encontrados</p>
          </div>
          <div class="catalog-tools">
            <span>Ordenar por</span>
            <button class="sort-button" onclick="toast('Produtos organizados por destaque')">Mais relevantes ${icon("arrow",14)}</button>
          </div>
        </div>

        ${filtered.length
          ? `<div class="products-grid">${filtered.map(productCard).join("")}</div>`
          : `<div class="empty">Nenhum produto encontrado.<br><button class="btn btn-primary" style="margin-top:15px" onclick="setCategory('Todos')">Ver todos os produtos</button></div>`
        }
      </div>
    </div>

    <section class="brand-strip">
      <div><span class="brand-strip-label">HOOPEE</span><strong>Performance</strong><small>Para quem não para.</small></div>
      <div><strong>Conforto</strong><small>em cada passo</small></div>
      <div><strong>Design</strong><small>que acompanha seu ritmo</small></div>
      <button onclick="setCategory('Corrida')">Explorar coleção →</button>
    </section>

  </section>`;
}

function heroShift(direction){
  const ids=[12,4,5,1];
  const currentIndex=Math.max(0,ids.indexOf(state.selectedProductId));
  const next=ids[(currentIndex+direction+ids.length)%ids.length];
  state.selectedProductId=next;
  render();
}
function productPage(){
  const p=product(state.selectedProductId);
  const related=PRODUCTS.filter(x=>x.id!==p.id && x.category===p.category).slice(0,4);
  return `<section class="page">
    <div class="breadcrumb"><button onclick="go('home')">Hoopee</button><span>/</span><span>${escapeHtml(p.category)}</span><span>/</span><span>${escapeHtml(p.name)}</span></div>
    <div class="product-detail">
      <div>
        <div class="gallery-main"><img src="${p.image}" alt="${escapeHtml(p.name)}"></div>
        <div class="thumbs">${[p.image,...related.slice(0,3).map(x=>x.image)].map((img,i)=>`<button class="thumb ${i===0?"active":""}" onclick="this.parentElement.querySelectorAll('.thumb').forEach(x=>x.classList.remove('active'));this.classList.add('active');document.querySelector('.gallery-main img').src='${img}'"><img src="${img}" alt=""></button>`).join("")}</div>
      </div>
      <div class="detail-copy">
        <div class="brand">${escapeHtml(p.brand)}</div>
        <h1>${escapeHtml(p.name)}</h1>
        <div class="rating">★★★★★ <strong>${p.rating}</strong> · 128 avaliações verificadas</div>
        <div class="detail-price">${money(p.price)}</div>
        <div class="installment">ou 10x de ${money(p.price/10)} sem juros</div>
        <div class="option-title">Selecione o tamanho</div>
        <div class="sizes">${[38,39,40,41,42,43].map(s=>`<button class="size ${state.selectedSize===s?"selected":""}" onclick="selectSize(${s})">${s}</button>`).join("")}</div>
        <div class="detail-buttons">
          <button class="btn buy-now" onclick="buyNow(${p.id})">Comprar agora</button>
          <button class="btn add-cart" onclick="addToCart(${p.id},1,true)">Adicionar ao carrinho</button>
        </div>
        <div class="description-box"><h3>Descrição do produto</h3><p>${escapeHtml(p.desc)}</p></div>
        <div class="features">
          <div class="feature">${icon("truck",15)} Frete grátis para todo o Brasil</div>
          <div class="feature">${icon("shield",15)} Compra segura e garantida</div>
          <div class="feature">↩ Troca fácil em até 30 dias</div>
          <div class="feature">✓ Produto com garantia Hoopee</div>
        </div>
      </div>
    </div>
    <div class="section-head"><div><h2>Você também pode gostar</h2><p>Escolhas parecidas com ${escapeHtml(p.name)}</p></div></div>
    <div class="products-grid">${related.length?related.map(productCard).join(""):PRODUCTS.filter(x=>x.id!==p.id).slice(0,4).map(productCard).join("")}</div>
  </section>`;
}

function summary(){
  return `<aside class="summary">
    <h3>Resumo do pedido</h3>
    <div class="summary-row"><span>Subtotal</span><strong>${money(cartSubtotal())}</strong></div>
    <div class="summary-row"><span>Frete</span><strong class="free">Grátis</strong></div>
    <hr class="summary-divider">
    <div class="summary-row summary-total"><span>Total</span><span>${money(total())}</span></div>
    ${state.view==="cart"?`<button class="btn btn-primary" onclick="go('checkout')">Continuar para o Checkout ${icon("arrow",14)}</button>`:""}
    <div style="font-size:10px;color:var(--muted);margin-top:12px;text-align:center">Pagamento protegido · seus dados são criptografados</div>
  </aside>`;
}

function cartPage(){
  return `<section class="page cart-layout">
    <div>
      <div class="page-title">Seu Carrinho <span style="font-size:12px;color:var(--muted);font-weight:500">(${cartCount()} itens)</span></div>
      ${state.cart.length?`<div class="cart-list">${state.cart.map((item,i)=>{
        const p=product(item.productId);
        return `<div class="cart-item">
          <div class="cart-thumb"><img src="${p.image}" alt="${escapeHtml(p.name)}"></div>
          <div><h3>${escapeHtml(p.name)}</h3><small>Tamanho: ${item.size} · ${escapeHtml(p.color)}</small><div class="cart-price">${money(p.price)}</div></div>
          <div class="qty-control"><button onclick="changeQty(${i},-1)">${icon("minus",13)}</button><span>${item.qty}</span><button onclick="changeQty(${i},1)">${icon("plus",13)}</button></div>
          <button class="remove" onclick="removeItem(${i})">Remover</button>
        </div>`;
      }).join("")}</div>`:`<div class="empty">Seu carrinho está vazio.<br><button class="btn btn-primary" style="margin-top:15px" onclick="go('home')">Continuar comprando</button></div>`}
    </div>
    ${summary()}
  </section>`;
}

function checkoutPage(){
  return `<section class="page checkout-layout">
    <div>
      <div class="page-title">Finalizar Pedido</div>
      <div class="checkout-card">
        <h2>Endereço de entrega</h2>
        <div class="form-grid">
          <div class="field"><label>CEP</label><input placeholder="00000-000" value="${state.orderAddress.cep}" oninput="state.orderAddress.cep=this.value"></div>
          <div class="field"><label>Rua</label><input placeholder="Nome da rua" value="${state.orderAddress.street}" oninput="state.orderAddress.street=this.value"></div>
          <div class="field"><label>Número</label><input placeholder="123" value="${state.orderAddress.number}" oninput="state.orderAddress.number=this.value"></div>
          <div class="field"><label>Bairro</label><input placeholder="Seu bairro" value="${state.orderAddress.neighborhood}" oninput="state.orderAddress.neighborhood=this.value"></div>
          <div class="field"><label>Cidade</label><input placeholder="Sua cidade"></div>
          <div class="field"><label>Estado</label><select><option>CE</option><option>PB</option><option>BA</option><option>SP</option><option>RJ</option></select></div>
        </div>
      </div>
      <div class="checkout-card">
        <h2>Pagamento</h2>
        <div class="payment-tabs">
          <button class="payment-tab ${state.payment==="pix"?"active":""}" onclick="setPayment('pix')">Pix</button>
          <button class="payment-tab ${state.payment==="card"?"active":""}" onclick="setPayment('card')">Cartão de Crédito</button>
        </div>
        ${state.payment==="pix"?`
          <div class="payment-panel">
            <div class="qr"></div>
            <strong style="font-size:12px">QR Code Pix demonstrativo</strong>
            <p style="font-size:10px;color:var(--muted);margin-top:4px">Em uma aplicação real, o QR seria gerado pelo gateway de pagamento.</p>
          </div>`:`
          <div class="payment-panel">
            <div class="card-fields">
              <div class="field" style="grid-column:1/-1"><label>Número do cartão</label><input placeholder="0000 0000 0000 0000"></div>
              <div class="field"><label>Validade</label><input placeholder="MM/AA"></div>
              <div class="field"><label>CVV</label><input placeholder="123"></div>
              <div class="field" style="grid-column:1/-1"><label>Nome no cartão</label><input placeholder="Nome completo"></div>
            </div>
          </div>`}
        <div class="security-note">${icon("shield",13)} Seus dados de pagamento são protegidos. Não armazenamos dados do cartão.</div>
        <button class="btn btn-primary" style="margin-top:18px;width:100%" onclick="confirmOrder()">Confirmar pedido · ${money(total())}</button>
      </div>
    </div>
    ${summary()}
  </section>`;
}

function confirmationPage(){
  const order=state.lastOrder;
  const items=order?.items||state.cart;
  const rec=PRODUCTS.filter(p=>!items.some(i=>i.productId===p.id)).slice(0,3);
  return `<section class="page confirmation">
    <div class="success-circle">${icon("check",38)}</div>
    <h1>Pedido confirmado com sucesso! 🎉</h1>
    <p>Número do pedido: <strong>#HP-${order?.id||"92837"}</strong></p>
    <div class="delivery-progress">
      <div class="progress-step done"><span>✓</span><div><strong>Pedido confirmado</strong><small>Pagamento aprovado</small></div></div>
      <div class="progress-line done"></div>
      <div class="progress-step current"><span>2</span><div><strong>Preparando pedido</strong><small>Separação no estoque</small></div></div>
      <div class="progress-line"></div>
      <div class="progress-step"><span>3</span><div><strong>Em transporte</strong><small>Previsão: 3 a 5 dias úteis</small></div></div>
    </div>
    <div class="confirm-grid">
      <div class="order-box">
        <h3>Resumo do Pedido</h3>
        ${items.slice(0,5).map(i=>{const p=product(i.productId);return `<div class="confirm-product"><img src="${p.image}" alt=""><div><h4>${escapeHtml(p.name)}</h4><p>Quantidade: ${i.qty} · Tamanho: ${i.size}</p><strong>Total: ${money(p.price*i.qty)}</strong></div></div>`}).join("")}
        ${items.length>5?`<p style="font-size:10px;color:var(--muted)">+ ${items.length-5} outros itens no pedido</p>`:""}
        <hr class="summary-divider">
        <div class="summary-row"><span>Método</span><strong>${order?.payment==="pix"?"Pix (Aprovado instantaneamente)":"Cartão de crédito"}</strong></div>
        <div class="summary-row"><span>Entrega</span><strong>3 a 5 dias úteis</strong></div>
        <div class="summary-row summary-total"><span>Total</span><span>${money(order?.total||0)}</span></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:14px">
          <button class="btn btn-primary" style="width:100%" onclick="go('orders')">Ver meus pedidos</button>
          <button class="btn btn-secondary" style="width:100%" onclick="go('home')">Continuar comprando</button>
        </div>
      </div>
      <div class="recommendations">
        <h3>Você também pode gostar</h3>
        <div class="recommend-list">${rec.map(p=>`<div class="recommend"><img src="${p.image}" alt="${escapeHtml(p.name)}"><div><h4>${escapeHtml(p.name)}</h4><p>${money(p.price)}</p></div><button onclick="openProduct(${p.id})">Ver</button></div>`).join("")}</div>
      </div>
    </div>
  </section>`;
}

function ordersPage(){
  const order=state.lastOrder;
  if(!order) return `<section class="page orders-layout"><div class="empty"><h2 style="color:var(--text);margin-bottom:6px">Você ainda não tem pedidos</h2><p>Escolha seus favoritos e finalize uma compra para ela aparecer aqui.</p><button class="btn btn-primary" style="margin-top:15px" onclick="go('home')">Ir para a loja</button></div></section>`;
  return `<section class="page orders-layout">
    <div class="order-created">
      <div><h1>Pedido Criado</h1><p>Seu pedido foi criado com sucesso. Agora é só acompanhar a entrega.</p></div>
      <div class="order-id">#HP-${order.id}</div>
    </div>
    <div class="order-history">
      <div class="history-head"><h2>Pedido #HP-${order.id}</h2><span class="status">● Confirmado</span></div>
      <p style="font-size:11px;color:var(--muted);margin-bottom:12px">Realizado em ${order.date}</p>
      ${order.items.map(i=>{const p=product(i.productId);return `<div class="history-item"><img src="${p.image}" alt=""><div><h3>${escapeHtml(p.name)}</h3><p>Quantidade: ${i.qty} · Tamanho: ${i.size}</p><p>Entrega estimada: 3 a 5 dias úteis</p></div><strong>${money(p.price*i.qty)}</strong></div>`}).join("")}
      <div class="summary-row summary-total" style="margin-top:18px"><span>Total do pedido</span><span>${money(order.total)}</span></div>
    </div>
  </section>`;
}

function render(){
  const views={home,product:productPage,cart:cartPage,checkout:checkoutPage,confirmation:confirmationPage,orders:ordersPage};
  document.getElementById("app").innerHTML=layout(views[state.view]());
  window.scrollTo({top:0,behavior:"smooth"});
}

function go(view){state.view=view;render()}
function openProduct(id){state.selectedProductId=id;state.view="product";render()}
function setCategory(c){state.category=c;state.search="";state.view="home";render()}
function handleSearch(v){state.search=v;state.category="Todos";render()}
function selectSize(s){state.selectedSize=s;render()}

function addToCart(id,qty=1,notify=false){
  const found=state.cart.find(i=>i.productId===id && i.size===state.selectedSize);
  if(found) found.qty+=qty; else state.cart.push({productId:id,size:state.selectedSize,qty});
  saveCart();
  if(notify){toast("Produto adicionado ao carrinho");go("cart")}else render();
}
function quickAdd(id){state.selectedProductId=id;addToCart(id,1,true)}
function buyNow(id){
  state.cart=[{productId:id,size:state.selectedSize,qty:1}];
  saveCart();go("checkout");
}
function changeQty(index,delta){
  state.cart[index].qty=Math.max(1,state.cart[index].qty+delta);
  saveCart();render();
}
function removeItem(index){
  state.cart.splice(index,1);saveCart();render();toast("Produto removido");
}
function setPayment(p){state.payment=p;render()}
function confirmOrder(){
  if(!state.cart.length){toast("Seu carrinho está vazio");return}
  const id=Math.floor(10000+Math.random()*89999);
  state.lastOrder={id,date:new Date().toLocaleDateString("pt-BR"),payment:state.payment,total:total(),items:JSON.parse(JSON.stringify(state.cart))};
  localStorage.setItem("hoopee_last_order",JSON.stringify(state.lastOrder));
  state.cart=[];saveCart();state.view="confirmation";render();
  toast("Pedido confirmado!");
}
let toastTimer;
function toast(message){
  const el=document.getElementById("toast");
  el.textContent=message;el.classList.add("show");
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2500);
}

render();
