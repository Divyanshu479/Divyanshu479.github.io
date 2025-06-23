let cart = JSON.parse(localStorage.getItem('cart')) || {};
const cartCountEl = document.querySelector('.cart-count')
const cartTotalEl = document.querySelector('.cart-total')


function updateCartSummary() {
  let totalItems = 0;
  let totalPrice = 0;
  for (let id in cart) {
    totalItems += cart[id].qty;
    totalPrice += cart[id].qty * cart[id].price;
  }
  if (cartCountEl) cartCountEl.textContent = totalItems;
  if (cartTotalEl) cartTotalEl.textContent = totalPrice.toFixed(2);
  localStorage.setItem('cart', JSON.stringify(cart));
}
updateCartSummary();


document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', e => {
    const id = btn.dataset.id;
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);
    if (!cart[id]) cart[id] = { id, name, price, qty: 0 };
    cart[id].qty++;
    btn.innerText = '✔ Added';
    btn.disabled = true;
    setTimeout(() => { btn.innerText = 'Add to Cart'; btn.disabled = false; }, 1000);
    updateCartSummary();
  })
});


function renderCartItems() {
  const list = document.getElementById('cart-items-list');
  const summary = document.getElementById('cart-summary');
  if (!list) return;

  list.innerHTML = '';
  let totalItems = 0;
  let totalPrice = 0;

  for (let id in cart) {
    const { name, price, qty } = cart[id];
    totalItems += qty;
    totalPrice += price * qty;

    list.innerHTML += `
      <li style="padding:.5rem 0; border-bottom:1px solid #eee; display:flex; align-items:center; gap:1rem;">
        <span style="flex:1;"><strong>${name}</strong> — ₹${price} x ${qty} = ₹${(price * qty).toFixed(2)}</span>
        <button class="decrement" data-id="${id}" style="padding:.3rem .8rem;">–</button>
        <button class="increment" data-id="${id}" style="padding:.3rem .8rem;">+</button>
      </li>
    `;
  }

  summary.innerHTML = totalItems
    ? `Total items: ${totalItems} | Total: ₹${totalPrice.toFixed(2)}`
    : `Your cart is empty.`;
}


document.addEventListener('click', e => {
  if (e.target.classList.contains('increment')) {
    let id = e.target.dataset.id;
    cart[id].qty++;
    updateCartSummary();
    renderCartItems();
  }
  if (e.target.classList.contains('decrement')) {
    let id = e.target.dataset.id;
    if (cart[id].qty > 1) {
      cart[id].qty--;
    } else {
      delete cart[id]; 
    }
    updateCartSummary();
    renderCartItems();
  }
});

renderCartItems();
