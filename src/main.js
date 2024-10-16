import "./styles/style.css";
import { fetchProducts } from "./utils/fetchProducts.js";
import { setupFilters } from "./components/Filters.js";
import { renderProducts } from "./components/ProductList.js";
import { setupAddProductForm } from "./controllers/AddProductController.js";

let products = [];

document.addEventListener("DOMContentLoaded", async () => {
  products = await fetchProducts();
  renderProducts(products);
  setupFilters(products, renderProducts);
  setupAddProductForm();
});