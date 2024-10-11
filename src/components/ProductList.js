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
    productList.appendChild(productCard);
  });
}
