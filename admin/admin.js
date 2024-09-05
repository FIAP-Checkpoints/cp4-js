function fetchProducts() {
  return JSON.parse(localStorage.getItem('products')) || [];
}

async function createProduct(product) {
  const products = fetchProducts();
  product.id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  products.push(product);
  localStorage.setItem('products', JSON.stringify(products));
  return product;
}

async function updateProduct(product) {
  const products = fetchProducts();
  const index = products.findIndex(p => parseInt(p.id) === parseInt(product.id));
  if (index !== -1) {
    products[index] = product;
    localStorage.setItem('products', JSON.stringify(products));
    return product;
  }
  throw new Error('Product not found');
}

async function deleteProduct(productId) {
  const products = fetchProducts();
  const updatedProducts = products.filter(p => p.id !== productId);
  localStorage.setItem('products', JSON.stringify(updatedProducts));
}

async function renderAdminProducts() {
  const products = fetchProducts();
  const productContainer = document.getElementById('admin-product-list');
  productContainer.innerHTML = '';
  for (const product of products) {
    const productCard = `
      <div class="col-md-4 mb-4">
        <div class="card">
          <img src="${product.img}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text"><strong>$${parseFloat(product.price).toFixed(2)}</strong></p>
            <p class="card-text"><small class="text-muted">Category: ${product.category}</small></p>
            <div class="btn-group">
              <button class="btn btn-success" onclick="editProduct(${product.id})"><i class="fas fa-edit me-1"></i>Edit</button>
              <button class="btn btn-danger" onclick="deleteProductAndRender(${product.id})"><i class="fas fa-trash-alt me-1"></i>Delete</button>
            </div>
          </div>
        </div>
      </div>
    `;
    productContainer.insertAdjacentHTML('beforeend', productCard);
  }
}

function editProduct(productId) {
  const products = fetchProducts();
  const product = products.find(p => parseInt(p.id) === parseInt(productId));
  if (product) {
    document.getElementById('product-id').value = product.id;
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-category').value = product.category;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-img').value = product.img;
    document.getElementById('product-description').value = product.description;
  }
}

async function deleteProductAndRender(productId) {
  await deleteProduct(productId);
  renderAdminProducts();
}

document.getElementById('product-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const product = {
    id: document.getElementById('product-id').value ? parseInt(document.getElementById('product-id').value) : null,
    name: document.getElementById('product-name').value,
    category: document.getElementById('product-category').value,
    price: parseFloat(document.getElementById('product-price').value),
    img: document.getElementById('product-img').value,
    description: document.getElementById('product-description').value
  };
  if (product.id) {
    await updateProduct(product);
  } else {
    await createProduct(product);
  }
  this.reset();
  document.getElementById('product-id').value = '';
  renderAdminProducts();
});

document.addEventListener("DOMContentLoaded", () => {
  renderAdminProducts();
});