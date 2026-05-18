const menuData = [
    { category: "🍔 Hamburguesas", items: [
        { name: "Sencilla", desc: "Jamón y mozzarella (Carne o Pollo)", price: 13000 },
        { name: "Mexicana de Carne", desc: "Jamón, mozzarella, tocineta, chimichurri", price: 15000 },
        { name: "Combinada", desc: "Jamón, mozzarella, chorizo, butifarra, tocina", price: 17000 },
        { name: "Mixta", desc: "Jamón y mozzarella, doble carne o doble pollo", price: 20000 },
        { name: "Stanford", desc: "Jamón, mozzarella, carne, pollo, chorizo, butifarra, tocina", price: 22000 }
    ]},
    { category: "🌭 Perros Calientes", items: [
        { name: "Sencillo", desc: "Tradicional", price: 7000 },
        { name: "Mexicano", desc: "Tocineta, gratinado, chimichurri", price: 10000 },
        { name: "Choriperro", desc: "Con chorizo", price: 11000 },
        { name: "Suizo Ranchero", desc: "Ranchero y suizo", price: 15000 },
        { name: "Stanford Big", desc: "Suiza, pollo, mazorca, jamón, tocineta", price: 20000 },
        { name: "Perro Hamburguesa", desc: "5 carnes + más", price: 31000 }
    ]},
    { category: "🍟 Salchipapas", items: [
        { name: "Sencilla", desc: "Papas + salchicha", price: 14000 },
        { name: "Suiza", desc: "Gratinado", price: 20000 },
        { name: "Mixta", desc: "Variedad carnes", price: 23000 },
        { name: "4 Carnes", desc: "Pollo, carne, chorizo, butifarra", price: 25000 }
    ]},
    { category: "🥪 Sándwich", items: [
        { name: "Jamón Queso", desc: "Clásico", price: 15000 },
        { name: "4 Carnes", desc: "Pollo, carne, chorizo, butifarra", price: 22000 },
        { name: "Especial Stanford", desc: "Pollo, carne, chorizo, butifarra, tocina, maíz, jamón", price: 25000 }
    ]},
    { category: "🍗 Carnes & Parrilladas", items: [
        { name: "Vaquero Mixto", desc: "Incluye papa o bollo", price: 27000 },
        { name: "Parrillada Especial", desc: "Carne, pollo, cerdo, chorizo, santa rosario", price: 39000 }
    ]},
    { category: "🍌 Patacones", items: [
        { name: "Sencillos", desc: "Patacón con suero", price: 14000 },
        { name: "Stanford", desc: "El máximo", price: 35000 }
    ]},
    { category: "🌽 Mazorca Gratinada", items: [
        { name: "Sencilla", desc: "Mazorca gratinada", price: 13000 },
        { name: "Especial Stanford", desc: "Toda la carne", price: 35000 }
    ]},
    { category: "🍻 Para Compartir (Salvajadas)", items: [
        { name: "Stanford 2p", desc: "Chorizo, butifarra, carne, pollo, salchicha, maíz", price: 35000 },
        { name: "Mega Stanford 3p", desc: "Para 3 personas", price: 49000 },
        { name: "Hiper Familiar 6p", desc: "Familiar gigante", price: 85000 }
    ]},
    { category: "➕ Adicionales", items: [
        { name: "Salchicha", desc: "Adicional", price: 4000 },
        { name: "Gratinado", desc: "Adicional", price: 4000 },
        { name: "Porción de Papa", desc: "Adicional", price: 7000 }
    ]}
];

let cart = [];

function renderMenu() {
    const container = document.getElementById('menu-container');
    let html = '';
    menuData.forEach(cat => {
        html += `<div class="section-title">${cat.category}</div><div class="products-grid">`;
        cat.items.forEach(item => {
            html += `
                <div class="product-card">
                    <div class="product-info">
                        <div class="product-title">${item.name}</div>
                        <div class="product-desc">${item.desc || 'Delicia Stanford'}</div>
                        <div class="product-price">$${item.price.toLocaleString()}</div>
                        <button class="btn-add" data-name="${item.name.replace(/"/g, '&quot;')}" data-price="${item.price}">➕ Agregar al carrito</button>
                    </div>
                </div>
            `;
        });
        html += `</div>`;
    });
    container.innerHTML = html;
    
    document.querySelectorAll('.btn-add').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const name = btn.getAttribute('data-name');
            const price = parseInt(btn.getAttribute('data-price'));
            addToCart(name, price);
        });
    });
}

function addToCart(name, price) {
    const existing = cart.find(i => i.name === name);
    if (existing) existing.qty++;
    else cart.push({ name, price, qty: 1 });
    updateCartUI();
}

function updateCartUI() {
    const cartList = document.getElementById('cart-items-list');
    const totalSpan = document.getElementById('cart-total');
    const countSpan = document.getElementById('cart-count');
    let total = 0;
    let itemCount = 0;
    cartList.innerHTML = '';
    cart.forEach((item, idx) => {
        total += item.price * item.qty;
        itemCount += item.qty;
        cartList.innerHTML += `
            <div class="cart-item">
                <span>${item.name} x${item.qty}</span>
                <span>$${(item.price * item.qty).toLocaleString()}</span>
                <button class="remove-item" data-idx="${idx}" style="background:red; color:white; border:none; border-radius:20px; padding:4px 10px;">🗑</button>
            </div>
        `;
    });
    totalSpan.innerText = `Total: $${total.toLocaleString()}`;
    countSpan.innerText = itemCount;
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = parseInt(btn.getAttribute('data-idx'));
            cart.splice(idx, 1);
            updateCartUI();
        });
    });
}

let captchaAnswer = 13;
function generateCaptcha() {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    captchaAnswer = a + b;
    const captchaQuestion = document.getElementById('captcha-question');
    if (captchaQuestion) captchaQuestion.innerHTML = `¿Cuánto es ${a} + ${b}?`;
}

document.getElementById('clear-cart')?.addEventListener('click', () => { cart = []; updateCartUI(); });

const cartSidebar = document.getElementById('cart-sidebar');
document.getElementById('cart-icon')?.addEventListener('click', () => cartSidebar.classList.add('open'));
document.getElementById('close-cart')?.addEventListener('click', () => cartSidebar.classList.remove('open'));
document.getElementById('proceed-to-checkout')?.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
    document.getElementById('form-pedido').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('btn-generar-pedido')?.addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const confirmPago = document.getElementById('confirm-pago').checked;
    const captchaResp = parseInt(document.getElementById('captcha-input').value);
    
    if (!nombre || !direccion || !telefono) { alert("❌ Completa todos los datos del domicilio."); return; }
    if (!confirmPago) { alert("⚠️ Debes confirmar que pagaste por Nequi al 3011554548."); return; }
    if (captchaResp !== captchaAnswer) { alert("❌ Captcha incorrecto. Verifica que no eres robot."); generateCaptcha(); return; }
    if (cart.length === 0) { alert("🛒 Agrega productos al carrito primero."); return; }
    
    let totalGeneral = 0;
    let resumenPedido = "🍔 *NUEVO PEDIDO STANFORD* 🍔\n\n";
    cart.forEach(item => { 
        totalGeneral += item.price * item.qty; 
        resumenPedido += `• ${item.name} x${item.qty} = $${(item.price * item.qty).toLocaleString()}\n`;
    });
    resumenPedido += `\n💰 *Total: $${totalGeneral.toLocaleString()}*`;
    resumenPedido += `\n✅ Pago confirmado por Nequi al 3011554548`;
    resumenPedido += `\n\n📦 *DATOS DOMICILIO:*\nNombre: ${nombre}\nDirección: ${direccion}\nTeléfono: ${telefono}\nTiempo estimado: 30-45 min.`;
    
    const mensaje = encodeURIComponent(resumenPedido);
    window.open(`https://wa.me/573011554548?text=${mensaje}`, '_blank');
    alert("✅ Pedido enviado a Stanford. En breve recibirás confirmación por WhatsApp. ¡Gracias!");
    cart = []; 
    updateCartUI();
    document.getElementById('nombre').value = '';
    document.getElementById('direccion').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('confirm-pago').checked = false;
    document.getElementById('captcha-input').value = '';
    generateCaptcha();
});

renderMenu();
updateCartUI();
generateCaptcha();