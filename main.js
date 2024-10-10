import "./style.css";
import { navigateTo } from "./router.js";

let products = JSON.parse(localStorage.getItem("products")) || [];
const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

// Función para obtener productos de la API
async function fetchProducts() {
  try {
    const response = await fetch("https://api-search-products-d92dad668ba2.herokuapp.com/products/get-products");
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

// Función para renderizar productos en un grid normal
export function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
      <img src="${product.img}" alt="${product.nombre}">
      <div class="product-info">
        <h3>${product.nombre}</h3>
        <p class="category">${product.categoria}</p>
        <p class="price">$${product.precio.toFixed(2)}</p>
        <p class="description">${product.descripcion}</p>
      </div> 
    `;
    productList.appendChild(productCard);
  });
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
  filteredProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
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
renderProducts();
populateCategoryFilter();