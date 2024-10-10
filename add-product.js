import { navigateTo } from "./router.js";

const newProductForm = document.getElementById("newProductForm");
const cancelButton = document.getElementById("cancelButton");

// Manejar la creación de un nuevo producto
newProductForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const newProduct = {
    nombre: document.getElementById("newProductName").value,
    categoria: document.getElementById("newProductCategory").value,
    precio: parseFloat(document.getElementById("newProductPrice").value),
    descripcion: document.getElementById("newProductDescription").value,
    img: document.getElementById("newProductImage").value,
  };

  try {
    const response = await fetch("https://api-search-products-d92dad668ba2.herokuapp.com/products/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    if (!response.ok) {
      throw new Error("Error al guardar el producto");
    }

    // Redirigir de vuelta a la página principal
    navigateTo("/index.html");
  } catch (error) {
    console.error("Error:", error);
    alert("Hubo un error al guardar el producto. Por favor, inténtalo de nuevo.");
  }
});

// Manejar la cancelación del formulario
cancelButton.addEventListener("click", () => {
  navigateTo("/index.html");
});