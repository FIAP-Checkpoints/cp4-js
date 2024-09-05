// Make functions global
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;

function fetchProducts() {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  console.log('Fetched products:', products); // Debug log
  return products;
}

function renderProducts(filter = 'all') {
  const products = fetchProducts();
  const productList = document.getElementById('product-list');
  if (!productList) {
    console.error('Product list element not found');
    return;
  }
  productList.innerHTML = '';
  const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);
  filteredProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('col-md-4', 'mb-4');
    productCard.innerHTML = `
      <div class="card product-card">
        <img src="${product.img}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">$${product.price.toFixed(2)}</p>
          <p class="card-text">${product.description}</p>
          <button class="btn btn-success w-100" onclick="addToCart(${product.id})">
            <i class="fas fa-cart-plus me-2"></i>Add to Cart
          </button>
        </div>
      </div>
    `;
    productList.appendChild(productCard);
  });
}

function addToCart(productId) {
  const products = fetchProducts();
  const product = products.find(p => parseInt(p.id) === parseInt(productId));
  if (product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    console.log('Product added to cart:', product); // Debug log
  } else {
    console.error('Product not found:', productId);
  }
}

function updateCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartCount = document.getElementById('cart-count');
  
  if (!cartItems || !cartTotal || !cartCount) {
    console.error('Cart elements not found');
    return;
  }

  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    cartItems.innerHTML += `
      <div class="cart-item d-flex justify-content-between align-items-center">
        <img src="${item.img}" alt="${item.name}" class="img-fluid" width="50">
        <div>
          <p class="m-0">${item.name}</p>
          <small>$${item.price.toFixed(2)}</small>
        </div>
        <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">&times;</button>
      </div>
    `;
  });
  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = cart.length;
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

function clearCart() {
  localStorage.removeItem('cart');
  updateCart();
}

document.addEventListener('DOMContentLoaded', () => {
  const categoryFilter = document.getElementById('category-filter');
  if (categoryFilter) {
    categoryFilter.addEventListener('change', function() {
      const selectedCategory = this.value;
      renderProducts(selectedCategory);
    });
  }

  if (!localStorage.getItem('products')) {
    fetch('/data/products.json')
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('products', JSON.stringify(data.products));
        console.log('Products loaded into localStorage:', data.products); // Debug log
        renderProducts();
      })
      .catch(error => console.error('Error loading products:', error));
  } else {
    renderProducts();
  }
  updateCart();
});