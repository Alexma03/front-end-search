import './style.css';

// Mock API para productos (ampliada)
const mockProducts = [
  { id: 1, name: 'Laptop Pro', category: 'Electrónica', price: 1299.99, image: 'https://via.placeholder.com/400x300?text=Laptop+Pro', description: 'Potente laptop para profesionales' },
  { id: 2, name: 'Smartphone X', category: 'Electrónica', price: 799.99, image: 'https://via.placeholder.com/400x300?text=Smartphone+X', description: 'Último modelo con cámara avanzada' },
  { id: 3, name: 'Camiseta Casual', category: 'Ropa', price: 29.99, image: 'https://via.placeholder.com/400x300?text=Camiseta+Casual', description: 'Cómoda camiseta para el día a día' },
  { id: 4, name: 'Zapatillas Runner', category: 'Calzado', price: 89.99, image: 'https://via.placeholder.com/400x300?text=Zapatillas+Runner', description: 'Ideales para correr largas distancias' },
  { id: 5, name: 'Libro Bestseller', category: 'Libros', price: 19.99, image: 'https://via.placeholder.com/400x300?text=Libro+Bestseller', description: 'El libro más vendido del año' },
  { id: 6, name: 'Smartwatch Fit', category: 'Electrónica', price: 199.99, image: 'https://via.placeholder.com/400x300?text=Smartwatch+Fit', description: 'Monitorea tu salud y actividad' },
  { id: 7, name: 'Cámara DSLR', category: 'Electrónica', price: 699.99, image: 'https://via.placeholder.com/400x300?text=Cámara+DSLR', description: 'Para fotógrafos profesionales' },
  { id: 8, name: 'Auriculares Noise-Cancelling', category: 'Electrónica', price: 249.99, image: 'https://via.placeholder.com/400x300?text=Auriculares+NC', description: 'Sumérgete en tu música favorita' },
  { id: 9, name: 'Chaqueta de Invierno', category: 'Ropa', price: 129.99, image: 'https://via.placeholder.com/400x300?text=Chaqueta+Invierno', description: 'Mantente abrigado con estilo' },
  { id: 10, name: 'Tablet Ultra', category: 'Electrónica', price: 449.99, image: 'https://via.placeholder.com/400x300?text=Tablet+Ultra', description: 'Perfecta para trabajo y entretenimiento' },
];

let products = [...mockProducts];
const productList = document.getElementById('productList');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');

// Función para renderizar productos en estilo bento
function renderProducts() {
  productList.innerHTML = '';
  products.forEach((product, index) => {
    const productCard = document.createElement('div');
    productCard.className = `product-card ${index === 0 ? 'featured' : ''}`;
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="category">${product.category}</p>
        <p class="price">$${product.price.toFixed(2)}</p>
        <p class="description">${product.description}</p>
      </div>
    `;
    productCard.addEventListener('click', () => showProductDetails(product));
    productList.appendChild(productCard);
  });
}

// Función para mostrar detalles del producto
function showProductDetails(product) {
  const detailsHTML = `
    <div class="product-details">
      <img src="${product.image}" alt="${product.name}">
      <div class="details-info">
        <h2>${product.name}</h2>
        <p class="category">${product.category}</p>
        <p class="price">$${product.price.toFixed(2)}</p>
        <p class="description">${product.description}</p>
        <button onclick="window.history.back()">Volver</button>
      </div>
    </div>
  `;
  document.body.innerHTML = detailsHTML;
}

// Función para aplicar filtros (sin cambios)
function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  products = mockProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm) &&
    (selectedCategory === '' || product.category === selectedCategory)
  );

  renderProducts();
}

// Event listeners para filtros (sin cambios)
searchInput.addEventListener('input', applyFilters);
categoryFilter.addEventListener('change', applyFilters);

// Poblar el filtro de categorías (sin cambios)
const categories = [...new Set(mockProducts.map(product => product.category))];
categories.forEach(category => {
  const option = document.createElement('option');
  option.value = category;
  option.textContent = category;
  categoryFilter.appendChild(option);
});

// Renderizar productos iniciales
renderProducts();

// Manejar navegación (sin cambios)
window.addEventListener('popstate', () => {
  document.body.innerHTML = document.getElementById('app').outerHTML;
  renderProducts();
});