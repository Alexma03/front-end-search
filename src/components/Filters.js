export function setupFilters(products, renderFilteredProducts) {
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");

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

  searchInput.addEventListener("input", applyFilters);
  categoryFilter.addEventListener("change", applyFilters);

  populateCategoryFilter();
}