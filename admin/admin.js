// Fetch products from localStorage
function fetchProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
  }
  
  // Save products to localStorage
  function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
  }
  
  // Add a new product
  function addProduct(product) {
    const products = fetchProducts();
    product.id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    products.push(product);
    saveProducts(products);
    renderAdminProducts();
  }
  
  // Update an existing product
  function updateProduct(product) {
    const products = fetchProducts();
    const index = products.findIndex(p => p.id === parseInt(product.id));
    if (index !== -1) {
      products[index] = product;
      saveProducts(products);
      renderAdminProducts();
    }
  }
  
  // Delete a product
  function deleteProduct(productId) {
    const products = fetchProducts();
    const updatedProducts = products.filter(p => p.id !== parseInt(productId));
    saveProducts(updatedProducts);
    renderAdminProducts();
  }
  
  // Render products in the admin panel
  function renderAdminProducts() {
    const products = fetchProducts();
    const productContainer = document.getElementById('admin-product-list');
    productContainer.innerHTML = '';
  
    products.forEach(product => {
      const productCard = `
        <div class="col-md-4 mb-4">
          <div class="card">
            <img src="${product.img}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              <p class="card-text"><strong>$${parseFloat(product.price).toFixed(2)}</strong></p>
              <p class="card-text"><small class="text-muted">Category: ${product.category}</small></p>
              <button class="btn btn-primary btn-sm me-2" onclick="editProduct(${product.id})">Edit</button>
              <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.id})">Delete</button>
            </div>
          </div>
        </div>
      `;
      productContainer.insertAdjacentHTML('beforeend', productCard);
    });
  }
  
  // Edit a product
  function editProduct(productId) {
    const products = fetchProducts();
    const product = products.find(p => p.id === parseInt(productId));
    if (product) {
      document.getElementById('product-id').value = product.id;
      document.getElementById('product-name').value = product.name;
      document.getElementById('product-category').value = product.category;
      document.getElementById('product-price').value = product.price;
      document.getElementById('product-img').value = product.img;
      document.getElementById('product-description').value = product.description;
    }
  }
  
  // Event listener for form submission
  document.getElementById('product-form').addEventListener('submit', function(e) {
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
      updateProduct(product);
    } else {
      addProduct(product);
    }
  
    this.reset();
    document.getElementById('product-id').value = '';
  });
  
  // Initialize products in localStorage if not already present
  if (!localStorage.getItem('products')) {
    fetch('/data/products.json')
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('products', JSON.stringify(data.products));
        renderAdminProducts();
      });
  } else {
    renderAdminProducts();
  }