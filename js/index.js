
async function cargarProductos() {
  try {
    const response = await fetch('./js/listaRopa.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al cargar los productos:', error);
  }
}


function renderizarProductos(productos) {
  const containerItems = document.querySelector('.container-items');
  containerItems.innerHTML = '';

  productos.forEach((producto, index) => {
    const item = document.createElement('div');
    item.classList.add('item');
    item.innerHTML = `
      <figure>
        <img src="${producto.imagen}" alt="producto" />
      </figure>
      <div class="info-product">
        <h2>${producto.nombre}</h2>
        <p class="price">${producto.precio}</p>
        <button class="add-to-cart" data-index="${index}">Añadir al carrito</button>
      </div>
    `;

    const addToCartButton = item.querySelector('.add-to-cart');
    addToCartButton.addEventListener('click', addToCartHandler);

    containerItems.appendChild(item);
  });
}


function addToCartHandler(e) {
  const index = parseInt(e.target.dataset.index);
  const producto = productos[index];

  if (producto) {
    cart.push({ id: producto.imagen, name: producto.nombre, price: producto.precio });
    
    
    const options = {
      text: `${producto.nombre} agregado al carrito`,
      duration: 3000,
      gravity: 'top', 
      position: 'center', 
      backgroundColor: 'rgba(0, 176, 155, 0.8)', 
      stopOnFocus: true, 
      className: 'toastify-custom-style' 
    };

    Toastify(options).showToast();
    updateCartCounter();
  }
}


function updateCartCounter() {
  const contadorProductos = document.getElementById('contador-productos');
  contadorProductos.innerText = cart.length;
}


let cart = [];


let productos = [];
cargarProductos().then(data => {
  productos = data;
  renderizarProductos(productos);
});



const cartIcon = document.getElementById('cart-icon');
const cartDropdown = document.querySelector('.container-cart-products');
const cartItemsContainer = document.querySelector('.cart-items');
const totalPagar = document.querySelector('.total-pagar');


function toggleCart() {
  cartDropdown.classList.toggle('show-cart');
  renderCartItems();
}

function renderCartItems() {
  cartItemsContainer.innerHTML = '';
  let totalPrice = 0;

  
  const cartTitle = document.createElement('div');
  cartTitle.classList.add('cart-item');
  cartTitle.innerHTML = `
      <div class="cart-product-info">
          <span class="item-name">Carrito de compras</span>
      </div>
  `;
  cartItemsContainer.appendChild(cartTitle);

  cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
          <div class="cart-product-info">
              <span class="item-name">${item.name}</span>
              <span class="item-price">$${item.price}</span>
          </div>
      `;

      cartItemsContainer.appendChild(cartItem);
      totalPrice += item.price;
  });

  totalPagar.textContent = `$${totalPrice}`;
}


cartIcon.addEventListener('click', toggleCart);

cartIcon.addEventListener ("click" , function(){
  cartDropdown.classList.toggle("hidden-cart")
})