import "./styles/style.css";
import { fetchProducts } from "./utils/api.js";
import { setupFilters } from "./components/Filters.js";
import { renderProducts } from "./components/ProductList.js";

let products = [];

document.addEventListener("DOMContentLoaded", async () => {
  products = await fetchProducts();
  renderProducts(products);
  setupFilters(products, renderProducts);
});