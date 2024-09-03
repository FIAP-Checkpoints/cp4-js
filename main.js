// Fetch products from localStorage
function fetchProducts() {
  return JSON.parse(localStorage.getItem('products')) || [];
}

// Function to render products
function renderProducts(filter = 'all') {
  const products = fetchProducts();
  const productList = document.getElementById('product-list');
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
          <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    `;
    productList.appendChild(productCard);
  });
}

// Function to add product to cart
function addToCart(productId) {
  const products = fetchProducts();
  const product = products.find(p => p.id === productId);
  if (product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
  }
}

// Function to update cart
function updateCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartCount = document.getElementById('cart-count');
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

// Function to remove product from cart
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

// Event listener for category filter
document.getElementById('category-filter').addEventListener('change', function() {
  const selectedCategory = this.value;
  renderProducts(selectedCategory);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCart();
});

// Check for products in localStorage, if not present, fetch from JSON file
if (!localStorage.getItem('products')) {
  fetch('/data/products.json')
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('products', JSON.stringify(data.products));
      renderProducts();
    })
    .catch(error => console.error('Error loading products:', error));
}

// Function to clear the cart
function clearCart() {
  localStorage.removeItem('cart');
  updateCart();
}