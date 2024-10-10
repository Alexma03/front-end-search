import "./style.css";

let products = [];
const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

// Función para obtener productos de la API
async function fetchProducts() {
  try {
    const response = await fetch("/api/products/get-products");
    const data = await response.json();
    console.log("API Response:", data); // Log para verificar la respuesta de la API

    if (Array.isArray(data)) {
      products = data;
      console.log("Products:", products); // Log para verificar los productos
      renderProducts();
      populateCategoryFilter();
    } else {
      console.error("Invalid API response format:", data);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Función para renderizar productos en estilo bento
function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product, index) => {
    const productCard = document.createElement("div");
    productCard.className = `product-card ${index === 0 ? "featured" : ""}`;
    productCard.innerHTML = `
      <img src="${product.img}" alt="${product.nombre}">
      <div class="product-info">
        <h3>${product.nombre}</h3>
        <p class="category">${product.categoria}</p>
        <p class="price">$${product.precio.toFixed(2)}</p>
        <p class="description">${product.descripcion}</p>
      </div>
    `;
    productCard.addEventListener("click", () => showProductDetails(product));
    productList.appendChild(productCard);
  });
}

// Función para mostrar detalles del producto
function showProductDetails(product) {
  const detailsHTML = `
    <div class="product-details">
      <img src="${product.img}" alt="${product.nombre}">
      <div class="details-info">
        <h2>${product.nombre}</h2>
        <p class="category">${product.categoria}</p>
        <p class="price">$${product.precio.toFixed(2)}</p>
        <p class="description">${product.descripcion}</p>
        <button onclick="window.history.back()">Volver</button>
      </div>
    </div>
  `;
  document.body.innerHTML = detailsHTML;
}

// Función para aplicar filtros
function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filteredProducts = products.filter(
    (product) =>
      product.nombre.toLowerCase().includes(searchTerm) &&
      (selectedCategory === "" || product.categoria === selectedCategory)
  );

  renderFilteredProducts(filteredProducts);
}

// Función para renderizar productos filtrados
function renderFilteredProducts(filteredProducts) {
  productList.innerHTML = "";
  filteredProducts.forEach((product, index) => {
    const productCard = document.createElement("div");
    productCard.className = `product-card ${index === 0 ? "featured" : ""}`;
    productCard.innerHTML = `
      <img src="${product.img}" alt="${product.nombre}">
      <div class="product-info">
        <h3>${product.nombre}</h3>
        <p class="category">${product.categoria}</p>
        <p class="price">$${product.precio.toFixed(2)}</p>
        <p class="description">${product.descripcion}</p>
      </div>
    `;
    productCard.addEventListener("click", () => showProductDetails(product));
    productList.appendChild(productCard);
  });
}

// Poblar el filtro de categorías
function populateCategoryFilter() {
  const categories = [...new Set(products.map((product) => product.categoria))];
  console.log("Categories:", categories); // Log para verificar las categorías
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Event listeners para filtros
searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);

// Renderizar productos iniciales
fetchProducts();

// Manejar navegación
window.addEventListener("popstate", () => {
  document.body.innerHTML = document.getElementById("app").outerHTML;
  renderProducts();
});