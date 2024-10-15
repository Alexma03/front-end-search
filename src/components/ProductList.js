export function renderProducts(products) {
  const productList = document.getElementById("productList");
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

    productCard.addEventListener("click", async () => {
      try {
        const response = await fetch(
          `https://api-search-products-d92dad668ba2.herokuapp.com/products/delete-product/${product.id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          productCard.remove();
        } else {
          console.error("Error al eliminar el producto:", response.statusText);
        }
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    });

    productList.appendChild(productCard);
  });
}
