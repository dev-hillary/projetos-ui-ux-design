
const PRODUCTS = [
 {id:1,name:"Vela Aromática Lavanda 200g",price:59.90,old:0,tag:"Mais vendido",rating:"4,9",reviews:342,img:"assets/products/produto-01.jpg",cat:"Decoração",desc:"Aroma suave e acabamento elegante para criar um clima acolhedor."},
 {id:2,name:"Vaso Orgânico Cerâmica Areia",price:89.90,old:109.90,tag:"-18%",rating:"4,8",reviews:215,img:"assets/products/produto-02.jpg",cat:"Decoração",desc:"Peça de cerâmica com formas orgânicas para composições naturais."},
 {id:3,name:"Abajur Nordic Madeira Natural",price:139.90,old:169.90,tag:"-18%",rating:"4,8",reviews:96,img:"assets/products/produto-03.jpg",cat:"Iluminação",desc:"Luz quente e design minimalista para deixar o ambiente mais aconchegante."},
 {id:4,name:"Almofada Bouclé Lilás 45x45",price:74.90,old:89.90,tag:"-16%",rating:"4,9",reviews:188,img:"assets/products/produto-04.jpg",cat:"Sala",desc:"Textura macia e tom lilás para renovar o sofá ou a poltrona."},
 {id:5,name:"Bandeja Decorativa Arco",price:64.90,old:0,tag:"Novidade",rating:"4,7",reviews:81,img:"assets/products/produto-05.jpg",cat:"Sala",desc:"Bandeja versátil para organizar objetos e montar composições."},
 {id:6,name:"Espelho Orgânico Decorativo",price:179.90,old:219.90,tag:"-18%",rating:"4,8",reviews:74,img:"assets/products/produto-06.jpg",cat:"Decoração",desc:"Formato orgânico que amplia e valoriza a decoração."},
 {id:7,name:"Organizador de Linho Multiuso",price:39.90,old:49.90,tag:"-20%",rating:"4,9",reviews:128,img:"assets/products/produto-07.jpg",cat:"Organização",desc:"Ideal para guardar acessórios, roupas pequenas e objetos."},
 {id:8,name:"Caneca Cerâmica Sun 350ml",price:44.90,old:0,tag:"Mais vendido",rating:"4,8",reviews:267,img:"assets/products/produto-08.jpg",cat:"Cozinha",desc:"Caneca minimalista para transformar seu café em um momento especial."},
 {id:9,name:"Vaso Cerâmica Rosa com Folhagem",price:69.90,old:79.90,tag:"-12%",rating:"4,7",reviews:103,img:"assets/products/produto-09.jpg",cat:"Decoração",desc:"Uma composição delicada para mesas, estantes e aparadores."},
 {id:10,name:"Quadro Abstrato Formas Orgânicas",price:99.90,old:129.90,tag:"-23%",rating:"4,8",reviews:91,img:"assets/products/produto-10.jpg",cat:"Decoração",desc:"Arte contemporânea em tons suaves para dar personalidade ao ambiente."},
 {id:11,name:"Manta Soft Lilás 1,50m",price:109.90,old:139.90,tag:"-21%",rating:"4,9",reviews:145,img:"assets/products/produto-11.jpg",cat:"Quarto",desc:"Manta macia para cama, sofá e momentos de descanso."},
 {id:12,name:"Cesto de Fibra Natural Grande",price:119.90,old:149.90,tag:"-20%",rating:"4,8",reviews:88,img:"assets/products/produto-12.jpg",cat:"Organização",desc:"Cesto decorativo para organizar mantas, brinquedos e objetos."},
 {id:13,name:"Kit Banho Spa Lavanda",price:94.90,old:119.90,tag:"-21%",rating:"4,9",reviews:117,img:"assets/products/produto-13.jpg",cat:"Banheiro",desc:"Kit delicado para transformar o banho em um momento de cuidado."},
 {id:14,name:"Caixa Presente Hoopee Lilás",price:79.90,old:99.90,tag:"Presente",rating:"4,9",reviews:64,img:"assets/products/produto-14.jpg",cat:"Presentes",desc:"Uma caixa especial para montar presentes com carinho."}
];
const CATEGORIES=["Todos","Decoração","Cozinha","Quarto","Banheiro","Sala","Organização","Iluminação","Presentes"];
const HEROES=[
 {title:"Seu cantinho, do seu jeito.",eyebrow:"NOVA COLEÇÃO · 2026",desc:"Decoração, conforto e praticidade para transformar sua casa em um lugar ainda mais especial.",img:"assets/hero-clean-1.jpg"},
 {title:"Aconchego em cada detalhe.",eyebrow:"COLEÇÃO HOOPEE CASA",desc:"Iluminação suave, texturas e peças que deixam os ambientes mais acolhedores.",img:"assets/hero-clean-2.jpg"},
 {title:"Pequenos detalhes, grande diferença.",eyebrow:"DECORAÇÃO",desc:"Vasos, objetos e formas orgânicas para criar uma casa com personalidade.",img:"assets/hero-clean-3.jpg"},
 {title:"Crie momentos para ficar.",eyebrow:"HOOPEE CASA",desc:"Peças escolhidas para transformar o cotidiano em momentos mais especiais.",img:"assets/hero-clean-4.jpg"}
];
const state={view:"home",category:"Todos",productId:null,hero:0,cart:loadCart(),order:loadOrder(),payment:"pix",selected:[]};

function money(v){return v.toLocaleString("pt-BR",{style:"currency",currency:"BRL"});}
function product(id){return PRODUCTS.find(p=>p.id===Number(id));}
function loadCart(){try{return JSON.parse(localStorage.getItem("hoopeeCartCasa"))||[]}catch{return[]}}
function saveCart(){localStorage.setItem("hoopeeCartCasa",JSON.stringify(state.cart))}
function loadOrder(){try{return JSON.parse(localStorage.getItem("hoopeeOrderCasa"))}catch{return null}}
function saveOrder(){localStorage.setItem("hoopeeOrderCasa",JSON.stringify(state.order))}
function cartCount(){return state.cart.reduce((s,i)=>s+i.qty,0)}
function cartTotal(){return state.cart.reduce((s,i)=>s+i.price*i.qty,0)}

function header(){
 return `<header class="header"><div class="container">
   <div class="brand-row">
     <button class="logo" data-view="home" aria-label="Hoopee"><img src="assets/hoopee-logo.png" alt="Hoopee"></button>
     <form class="search" id="searchForm"><span class="search-icon">⌕</span><input id="searchInput" placeholder="Buscar na Hoopee" autocomplete="off"><button aria-label="Buscar">⌕</button></form>
     <div class="header-actions">
       <button class="profile" aria-label="Perfil do usuário"><span class="profile-avatar" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="3.2"></circle><path d="M5.5 19c.8-3.2 3.1-5 6.5-5s5.7 1.8 6.5 5"></path></svg></span><span class="profile-name">Hillary</span></button>
       <button class="icon-btn" data-view="cart" aria-label="Carrinho"><span class="cart-symbol" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h4l2.2 15.2a2 2 0 0 0 2 1.8h11.7a2 2 0 0 0 1.9-1.5L29 11H9"></path><circle cx="13" cy="27" r="1.7" fill="currentColor" stroke="none"></circle><circle cx="24" cy="27" r="1.7" fill="currentColor" stroke="none"></circle></svg></span><span class="badge">${cartCount()}</span></button>
     </div>
   </div>
   <nav class="nav">${["Casa","Decoração","Cozinha","Quarto","Banheiro","Sala","Organização","Presentes","Novidades","Ofertas"].map((n,i)=>`<button class="${i===0&&state.view==="home"?"active":""}" ${["Novidades","Ofertas"].includes(n)?`data-special="${n.toLowerCase()}"`:`data-category="${n==="Casa"?"Todos":n}"`}>${n}</button>`).join("")}</nav>
 </div></header>`;
}
function sidebar(){
 return `<aside class="sidebar"><div class="side-card"><div class="side-title">Categorias</div>
 ${CATEGORIES.map(c=>`<button class="category ${state.category===c?"active":""}" data-category="${c}"><span class="cat-icon">${["Todos","⌂"],["Decoração","▧"],["Cozinha","☕"],["Quarto","▱"],["Banheiro","⌁"],["Sala","▰"],["Organização","▣"],["Iluminação","♧"],["Presentes","♢"].find(x=>x[0]===c)?.[1]||"•"}</span>${c}</button>`).join("")}</div>
 <div class="side-card club"><h3>♔ Hoopee Casa</h3><p>Deixe seu lar ainda mais especial com peças escolhidas para você.</p><button>Quero ser membro →</button></div></aside>`;
}
function hero(){
 return `<section class="hero">${HEROES.map((h,i)=>`<article class="hero-slide ${i===state.hero?"active":""}">
   <div class="hero-copy"><div class="eyebrow">${h.eyebrow}</div><h1>${h.title}</h1><p>${h.desc}</p><button class="hero-cta" data-scroll-products>Explorar novidades →</button></div>
   <div class="hero-photo ${h.img.endsWith(".svg")?"svg-art":""}" style="background-image:url('${h.img}')"></div>
 </article>`).join("")}
 <div class="hero-nav"><button class="hero-arrow" data-hero-prev aria-label="Anterior">‹</button><button class="hero-arrow" data-hero-next aria-label="Próximo">›</button></div>
 <div class="hero-dots">${HEROES.map((_,i)=>`<button class="dot ${i===state.hero?"active":""}" data-hero-dot="${i}" aria-label="Slide ${i+1}"></button>`).join("")}</div></section>`;
}
function benefits(){
 const b=[["🚚","Frete grátis","acima de R$ 199"],["♢","Compra segura","seus dados protegidos"],["⟳","Troca fácil","até 30 dias"],["✦","Produtos originais","das melhores marcas"],["▣","Parcele em até 6x","sem juros"],["♧","Atendimento","rápido e humanizado"]];
 return `<section class="benefits">${b.map(x=>`<div class="benefit"><span class="benefit-icon">${x[0]}</span><div><b>${x[1]}</b><span>${x[2]}</span></div></div>`).join("")}</section>`;
}
function productCard(p){
 return `<article class="product-card" data-product="${p.id}">
   <span class="tag">${p.tag}</span><div class="product-image"><img src="${p.img}" alt="${p.name}" loading="lazy"></div>
   <div class="product-info"><div class="product-name">${p.name}</div><div class="rating">★ ${p.rating} <span>(${p.reviews})</span></div><div class="price">${money(p.price)} ${p.old?`<span class="old-price">${money(p.old)}</span>`:""}</div></div>
 </article>`;
}
function galleryImages(p){
 return [1,2,3,4,5].map(n=>`assets/products/produto-${String(p.id).padStart(2,"0")}-${n}.jpg`);
}
const REVIEW_BANK={
 1:[['Marina','A vela tem um aroma delicado e deixou o quarto muito aconchegante.'],['Lívia','A embalagem é linda e o cheiro é suave, exatamente como eu queria.'],['Camila','Chegou muito bem protegida e perfumou a casa toda.']],
 2:[['Júlia','O vaso é ainda mais bonito de perto. A cerâmica tem um acabamento ótimo.'],['Renata','Ficou perfeito na minha sala, tamanho excelente.'],['Bia','A cor é delicada e combina com vários ambientes.']],
 3:[['Amanda','A luz é quentinha e o abajur deixou meu cantinho muito mais confortável.'],['Sofia','Muito bonito, firme e fácil de combinar com a decoração.'],['Clara','Produto bem acabado e chegou super protegido.']],
 4:[['Laura','Muito macia e a cor lilás é linda.'],['Nina','Transformou meu sofá, parece uma peça de loja de decoração.'],['Fernanda','Gostei bastante da textura e do tamanho.']],
 5:[['Isabela','A bandeja é charmosa e cabe bastante coisa.'],['Alice','Usei na mesa de centro e ficou maravilhosa.'],['Manu','Acabamento bonito e leve.']],
 6:[['Beatriz','O formato orgânico deixa a parede muito elegante.'],['Helena','Chegou inteiro e a moldura é linda.'],['Rafaela','Deu sensação de ambiente maior.']],
 7:[['Carolina','Organizou minhas coisas e ainda ficou bonito no armário.'],['Melissa','O tecido é delicado e o tamanho é ótimo.'],['Joana','Muito útil para deixar tudo no lugar.']],
 8:[['Gabriela','A caneca é linda e confortável para usar no dia a dia.'],['Luiza','Chegou perfeita e a estampa é muito delicada.'],['Malu','Virou minha caneca favorita para café.']],
 9:[['Valentina','O vaso é delicado e a composição ficou linda.'],['Bianca','Gostei muito da combinação de rosa com verde.'],['Letícia','Produto exatamente como nas fotos.']],
 10:[['Nicole','As cores são suaves e combinaram muito com meu quarto.'],['Bruna','Quadro bonito, moderno e fácil de combinar.'],['Ester','Amei o resultado na parede.']],
 11:[['Yasmin','Muito macia e quentinha, perfeita para noites frias.'],['Ana','A cor é linda e a manta tem um toque muito gostoso.'],['Cecília','Uso no sofá todos os dias.']],
 12:[['Paula','Grande, resistente e muito bonito.'],['Isadora','Ficou perfeito para guardar mantas na sala.'],['Mirela','A fibra natural deixa a decoração mais aconchegante.']],
 13:[['Larissa','O kit deixou meu banheiro com cara de spa.'],['Aline','Os produtos são delicados e o aroma é maravilhoso.'],['Vitória','Ótima opção para presente também.']],
 14:[['Sabrina','A caixa é linda e deixa qualquer presente especial.'],['Elisa','Acabamento muito bonito e chegou impecável.'],['Marcela','Adorei, ficou super elegante para presentear.']]
};
function reviewStars(value){return '★'.repeat(Math.round(Number(value)))+'<span class="stars-muted">'+ '★'.repeat(5-Math.round(Number(value))) +'</span>';}
function productSection(list=PRODUCTS){
 return `<section id="products"><div class="section-head"><h2>${state.category==="Todos"?"Mais vendidos da Hoopee":state.category}</h2><button data-category="Todos">Ver todos →</button></div><div class="product-grid">${list.map(productCard).join("")}</div></section>`;
}
function home(){
 const list=state.category==="Todos"?PRODUCTS:PRODUCTS.filter(p=>p.cat===state.category);
 return `<main class="main"><div class="container shop-layout">${sidebar()}<div>${hero()}${benefits()}${productSection(list)}</div></div></main>`;
}
function detailView(){
 const p=product(state.productId)||PRODUCTS[0];
 const gallery=galleryImages(p);
 const reviews=REVIEW_BANK[p.id]||[];
 return `<main class="main"><div class="container"><div class="page-card detail-page"><button class="back" data-view="home">← Voltar para a loja</button>
 <div class="detail">
   <div class="detail-media"><div class="detail-image"><img id="detailMainImage" src="${p.img}" alt="${p.name}"></div><div class="detail-gallery">${gallery.map((src,i)=>`<button class="gallery-thumb ${i===0?"active":""}" data-thumb="${src}" aria-label="Ver imagem ${i+1}"><img src="${src}" alt="${p.name} — imagem ${i+1}"></button>`).join("")}</div></div>
   <div><div class="eyebrow detail-eyebrow">${p.cat.toUpperCase()}</div><h1>${p.name}</h1><div class="rating detail-rating">★ ${p.rating} · ${p.reviews} avaliações</div><div class="detail-price">${money(p.price)} ${p.old?`<span class="old-price">${money(p.old)}</span>`:""}</div><p class="detail-desc">${p.desc}</p>
   <div class="option-label">Quantidade</div><div class="size-row"><button class="size selected">1 unidade</button></div>
   <button class="primary" data-buy-now="${p.id}">Comprar agora</button><button class="secondary" data-add-cart="${p.id}">Adicionar ao carrinho</button>
   <div class="info-list"><div>✓ Envio seguro e rastreável</div><div>✓ Troca fácil em até 30 dias</div><div>✓ Compra protegida</div></div></div>
 </div>
 <section class="product-description"><h2>Descrição do produto</h2><p>${p.desc} Pensado para trazer beleza, conforto e praticidade para a sua casa, com acabamento cuidadoso e uma estética suave que combina com diferentes estilos de decoração.</p><div class="description-grid"><div><b>Categoria</b><span>${p.cat}</span></div><div><b>Avaliação</b><span>★ ${p.rating} de 5</span></div><div><b>Avaliações</b><span>${p.reviews} comentários</span></div></div></section>
 <section class="reviews-section"><div class="reviews-heading"><div><h2>Avaliações dos clientes</h2><p>Veja o que outras pessoas acharam deste produto.</p></div><div class="reviews-score"><strong>${p.rating}</strong><div>${reviewStars(p.rating)}</div><span>${p.reviews} avaliações</span></div></div>
 <div class="review-list">${reviews.map((r,i)=>`<article class="review-card"><div class="review-top"><div class="review-user"><span class="review-avatar">${r[0].charAt(0)}</span><div><b>${r[0]}</b><span>Compra verificada</span></div></div><div class="review-stars">${reviewStars(i===1?4.8:p.rating)}</div></div><p>${r[1]}</p></article>`).join("")}</div></section>
 </div></div></main>`;
}
function selectedItems(){return state.cart.filter(i=>state.selected.includes(i.id));}
function selectedTotal(){return selectedItems().reduce((s,i)=>s+i.price*i.qty,0);}
function selectedFreight(){return selectedTotal()>=199?0:19.90;}
function selectedGrandTotal(){return selectedTotal()+selectedFreight();}
function cartView(){
 if(!state.cart.length)return `<main class="main"><div class="container"><div class="page-card empty"><h2>Seu carrinho está vazio</h2><p>Escolha algo especial para sua casa.</p><button class="primary" style="max-width:280px" data-view="home">Continuar comprando</button></div></div></main>`;
 const selected=selectedItems();
 return `<main class="main"><div class="container"><div class="section-head"><div><h2>Meu carrinho</h2><p class="cart-subtitle">${cartCount()} item(ns) no carrinho</p></div><button data-view="home">Continuar comprando →</button></div><div class="cart-layout ${selected.length?"has-selection":"no-selection"}"><div class="page-card cart-products">
 <div class="cart-head"><label class="select-all"><input type="checkbox" data-select-all ${state.cart.length && state.cart.every(i=>state.selected.includes(i.id))?"checked":""}> Selecionar todos</label><span>${selected.length?`${selected.length} produto(s) selecionado(s)`:"Selecione os produtos que deseja comprar"}</span></div>
 ${state.cart.map(i=>{const p=product(i.id);const checked=state.selected.includes(p.id);return `<div class="cart-row ${checked?"is-selected":""}"><label class="cart-check"><input type="checkbox" data-select-cart="${p.id}" ${checked?"checked":""}><span></span></label><div class="cart-thumb"><img src="${p.img}" alt="${p.name}"></div><div><div class="cart-name">${p.name}</div><div class="cart-price">${money(p.price)}</div></div><div class="qty"><button data-qty="-1" data-id="${p.id}">−</button><span>${i.qty}</span><button data-qty="1" data-id="${p.id}">+</button></div></div>`}).join("")}
 </div>${selected.length?`<aside class="page-card summary"><h3>Resumo do pedido</h3><div class="summary-line"><span>Produtos selecionados</span><b>${selected.length}</b></div><div class="summary-line"><span>Subtotal</span><b>${money(selectedTotal())}</b></div><div class="summary-line"><span>Frete</span><b>${selectedFreight()===0?"Grátis":money(selectedFreight())}</b></div><div class="summary-total"><span>Total</span><span>${money(selectedGrandTotal())}</span></div><button class="primary" data-view="checkout">Continuar para o Checkout</button></aside>`:""}</div>${selected.length?"":`<div class="cart-selection-hint">Selecione um ou mais produtos acima para ver o resumo e continuar para o checkout.</div>`}</div></main>`;
}
function checkoutView(){
 const items=selectedItems();
 const total=selectedGrandTotal();
 return `<main class="main"><div class="container"><div class="page-card checkout-card"><button class="back" data-view="cart">← Voltar para o carrinho</button><h2>Finalizar compra</h2><p class="muted">Preencha seus dados para receber seu pedido.</p>
 <div class="checkout-columns"><section><h3>Dados de entrega</h3><div class="form-grid"><div class="field"><label>Nome completo</label><input id="name" placeholder="Seu nome"></div><div class="field"><label>CPF</label><input id="cpf" placeholder="000.000.000-00"></div><div class="field"><label>CEP</label><input id="cep" placeholder="00000-000"></div><div class="field"><label>Telefone</label><input id="phone" placeholder="(00) 00000-0000"></div><div class="field full"><label>Endereço</label><input id="address" placeholder="Rua, número"></div><div class="field"><label>Cidade</label><input id="city" placeholder="Sua cidade"></div><div class="field"><label>Estado</label><select id="state"><option>CE</option><option>PB</option><option>BA</option><option>SP</option></select></div><div class="field full"><label>Complemento</label><input id="complement" placeholder="Apartamento, bloco..."></div></div>
 <h3 style="margin-top:26px">Forma de pagamento</h3><div class="pay-options"><button class="pay-option ${state.payment==="pix"?"active":""}" data-payment="pix">PIX <small>Pagamento instantâneo</small></button><button class="pay-option ${state.payment==="card"?"active":""}" data-payment="card">Cartão <small>Até 6x sem juros</small></button></div>
 ${state.payment==="pix"?`<div class="pix-box"><b>Pagamento via Pix</b><div class="qr"></div><small>Escaneie o QR Code para pagar.</small></div>`:`<div class="form-grid"><div class="field full"><label>Número do cartão</label><input placeholder="0000 0000 0000 0000"></div><div class="field"><label>Validade</label><input placeholder="MM/AA"></div><div class="field"><label>CVV</label><input placeholder="000"></div></div>`}</section>
 <aside class="checkout-summary"><h3>Resumo da compra</h3>${items.map(i=>{const p=product(i.id);return `<div class="checkout-item"><img src="${p.img}" alt=""><div><b>${p.name}</b><span>${i.qty} × ${money(p.price)}</span></div></div>`}).join("")}<div class="summary-line"><span>Subtotal</span><b>${money(selectedTotal())}</b></div><div class="summary-line"><span>Frete</span><b>${selectedFreight()===0?"Grátis":money(selectedFreight())}</b></div><div class="summary-total"><span>Total</span><span>${money(total)}</span></div><button class="primary" data-confirm-order>Confirmar pedido</button></aside></div></div></div></main>`;
}
function confirmationView(){
 const o=state.order;
 return `<main class="main"><div class="container"><div class="page-card success"><div class="success-circle">✓</div><h1>Pedido confirmado!</h1><p class="muted">Seu pagamento foi recebido e o pedido está sendo preparado.</p><div class="status"><div class="status-step done"><div class="status-dot">✓</div>Pedido criado</div><div class="status-step"><div class="status-dot"></div>Em preparação</div><div class="status-step"><div class="status-dot"></div>A caminho</div></div><div class="order-summary"><b>Pedido #${o.id}</b><div class="summary-line"><span>Itens</span><span>${o.items.reduce((s,i)=>s+i.qty,0)}</span></div><div class="summary-line"><span>Total</span><b>${money(o.total)}</b></div><p class="muted">Seu pedido foi criado com sucesso. Agora é só acompanhar a entrega.</p></div><div class="success-actions"><button class="secondary" data-view="orders">Ver meus pedidos</button><button class="primary" data-view="home">Continuar comprando</button></div><div class="recommendations"><h3>Você também pode gostar</h3><div class="product-grid">${PRODUCTS.slice(3,9).map(productCard).join("")}</div></div></div></div></main>`;
}
function ordersView(){
 if(!state.order)return `<main class="main"><div class="container"><div class="page-card empty"><h2>Nenhum pedido ainda</h2><p>Quando você finalizar uma compra, ela aparecerá aqui.</p><button class="primary" style="max-width:280px" data-view="home">Explorar produtos</button></div></div></main>`;
 return `<main class="main"><div class="container"><div class="page-card"><button class="back" data-view="home">← Voltar para a loja</button><h2>Meus pedidos</h2><div class="order-box"><div class="order-top"><b>Pedido #${state.order.id}</b><span>Pedido Criado</span></div><p class="muted">Seu pedido foi criado com sucesso. Agora é só acompanhar a entrega.</p>${state.order.items.map(i=>{const p=product(i.id);return `<div class="order-item"><div class="order-thumb"><img src="${p.img}" alt="${p.name}"></div><div class="order-info"><div class="cart-name">${p.name}</div><div class="order-qty">${i.qty} unidade(s)</div></div><b class="order-price">${money(p.price*i.qty)}</b></div>`}).join("")}<div class="summary-total"><span>Total</span><span>${money(state.order.total)}</span></div></div></div></div></main>`;
}
function render({scroll=true}={}){
 const app=document.getElementById("app");
 const content=state.view==="home"?home():state.view==="product"?detailView():state.view==="cart"?cartView():state.view==="checkout"?checkoutView():state.view==="confirmation"?confirmationView():ordersView();
 let page=document.getElementById("page-content");
 if(!page){app.innerHTML=header()+`<div id="page-content">${content}</div>`}else page.innerHTML=content;
 const badge=document.querySelector(".badge");if(badge)badge.textContent=cartCount();
 if(scroll)window.scrollTo({top:0,behavior:"instant"});
}
function go(view,extra={}){state.view=view;Object.assign(state,extra);render()}
function addToCart(id,qty=1,sourceEl=null){
 const p=product(id);const item=state.cart.find(i=>i.id===Number(id));
 if(item)item.qty+=qty;else state.cart.push({id:p.id,qty,price:p.price});
 saveCart();updateBadge();animateToCart(sourceEl);showToast(`${p.name} foi adicionado ao carrinho`);
}
function updateBadge(){const b=document.querySelector(".badge");if(b)b.textContent=cartCount()}
function animateToCart(sourceEl){
 if(!sourceEl)return;
 const img=sourceEl.closest(".product-card")?.querySelector("img") || sourceEl.closest(".detail")?.querySelector(".detail-image img");
 const cart=document.querySelector(".header .icon-btn[data-view='cart']");
 if(!img||!cart)return;
 const a=img.getBoundingClientRect(),b=cart.getBoundingClientRect(),clone=img.cloneNode(true);
 clone.className="fly-image";clone.style.left=a.left+"px";clone.style.top=a.top+"px";clone.style.width=Math.min(95,a.width)+"px";clone.style.height=Math.min(75,a.height)+"px";document.body.appendChild(clone);
 requestAnimationFrame(()=>{clone.style.left=(b.left+b.width/2-18)+"px";clone.style.top=(b.top+b.height/2-18)+"px";clone.style.width="36px";clone.style.height="36px";clone.style.opacity=".2";clone.style.transform="scale(.45) rotate(8deg)"});
 setTimeout(()=>{clone.remove();cart.classList.add("cart-bump");setTimeout(()=>cart.classList.remove("cart-bump"),380)},600);
}
function showToast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),1800)}
function setHero(i){state.hero=(i+HEROES.length)%HEROES.length;document.querySelectorAll(".hero-slide").forEach((s,n)=>s.classList.toggle("active",n===state.hero));document.querySelectorAll(".dot").forEach((d,n)=>d.classList.toggle("active",n===state.hero))}
document.addEventListener("click",e=>{
 const view=e.target.closest("[data-view]");if(view){e.preventDefault();if(view.dataset.view==="checkout"&&!selectedItems().length){showToast("Selecione pelo menos um produto para continuar");return}go(view.dataset.view);return}
 const special=e.target.closest("[data-special]");
 if(special){state.category="Todos";let list=special.dataset.special==="novidades"?PRODUCTS.filter(p=>p.tag==="Novidade"||p.tag==="Presente"||p.id>=11):PRODUCTS.filter(p=>p.old>0);render();setTimeout(()=>{const grid=document.querySelector(".product-grid");if(grid)grid.innerHTML=list.map(productCard).join("");document.querySelector("#products")?.scrollIntoView({behavior:"smooth",block:"start"})},30);return}
 const cat=e.target.closest("[data-category]");if(cat){state.category=cat.dataset.category;if(state.view!=="home")go("home");else render();setTimeout(()=>document.getElementById("products")?.scrollIntoView({behavior:"smooth",block:"start"}),30);return}
 const add=e.target.closest("[data-add-cart]");if(add){e.stopPropagation();addToCart(add.dataset.addCart,1,add);return}
 const selectAll=e.target.closest("[data-select-all]");if(selectAll){state.selected=selectAll.checked?state.cart.map(i=>i.id):[];render({scroll:false});return}
 const select=e.target.closest("[data-select-cart]");if(select){const id=Number(select.dataset.selectCart);if(select.checked){if(!state.selected.includes(id))state.selected.push(id)}else{state.selected=state.selected.filter(x=>x!==id)}render({scroll:false});return}
 const thumb=e.target.closest("[data-thumb]");if(thumb){const main=document.getElementById("detailMainImage");if(main){main.src=thumb.dataset.thumb;document.querySelectorAll(".gallery-thumb").forEach(t=>t.classList.remove("active"));thumb.classList.add("active")}return}
 const card=e.target.closest("[data-product]");if(card){go("product",{productId:card.dataset.product});return}
 const buy=e.target.closest("[data-buy-now]");if(buy){const id=Number(buy.dataset.buyNow);addToCart(id,1,buy);state.selected=[id];go("checkout");return}
 const qty=e.target.closest("[data-qty]");if(qty){const item=state.cart.find(i=>i.id===Number(qty.dataset.id));if(item){item.qty+=Number(qty.dataset.qty);if(item.qty<=0){state.cart=state.cart.filter(i=>i.id!==item.id);state.selected=state.selected.filter(id=>id!==item.id)}saveCart();render({scroll:false})}return}
 const pay=e.target.closest("[data-payment]");if(pay){state.payment=pay.dataset.payment;render({scroll:false});return}
 const prev=e.target.closest("[data-hero-prev]");if(prev){setHero(state.hero-1);return}
 const next=e.target.closest("[data-hero-next]");if(next){setHero(state.hero+1);return}
 const dot=e.target.closest("[data-hero-dot]");if(dot){setHero(Number(dot.dataset.heroDot));return}
 const scroll=e.target.closest("[data-scroll-products]");if(scroll){document.getElementById("products")?.scrollIntoView({behavior:"smooth"});return}
 const confirm=e.target.closest("[data-confirm-order]");if(confirm){const name=document.getElementById("name")?.value.trim(),address=document.getElementById("address")?.value.trim(),items=selectedItems();if(!items.length){showToast("Selecione pelo menos um produto");go("cart");return}if(!name||!address){showToast("Preencha nome e endereço para continuar");return}state.order={id:String(Date.now()).slice(-8),items:items.map(i=>({...i})),total:selectedGrandTotal(),name};saveOrder();const selectedIds=items.map(i=>i.id);state.cart=state.cart.filter(i=>!selectedIds.includes(i.id));state.selected=[];saveCart();go("confirmation");showToast("Pedido confirmado!");return}
});
document.addEventListener("submit",e=>{if(e.target.id==="searchForm"){e.preventDefault();const q=document.getElementById("searchInput").value.trim().toLowerCase();if(!q){state.category="Todos";go("home");return}const found=PRODUCTS.filter(p=>(p.name+" "+p.cat).toLowerCase().includes(q));state.category="Todos";go("home");setTimeout(()=>{const grid=document.querySelector(".product-grid");if(grid)grid.innerHTML=found.length?found.map(productCard).join(""):`<div class="empty" style="grid-column:1/-1">Nenhum produto encontrado.</div>`;document.getElementById("products")?.scrollIntoView({behavior:"smooth"})},30)}});
setInterval(()=>{if(state.view==="home")setHero(state.hero+1)},5500);
render();
