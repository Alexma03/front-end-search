import { addProduct } from "../utils/addProduct.js";

export function setupAddProductForm() {
  const form = document.getElementById("productForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nombre = document.getElementById("productName").value;
    const img = document.getElementById("productImg").value;
    const categoria = document.getElementById("productCategory").value;
    const precio = document.getElementById("productPrice").value;
    const descripcion = document.getElementById("productDescription").value;

    const productData = {
      nombre,
      img,
      categoria,
      descripcion,
      precio,
    };

    try {
      const response = await addProduct(productData);
      if (response.status === 200) {
        // Redirigir a la página principal o actualizar la lista de productos
        alert("Producto añadido exitosamente a la base de datos.");
        window.location.href = "/";
      } else if (response.status === 500) {
        // Mostrar un mensaje de error al usuario
        alert("Por favor compruebe que no exista un producto con el mismo nombre.");
      } else {
        // Manejar errores de la API
        console.error("Error al añadir el producto:", response);
        // Mostrar un mensaje de error al usuario
        alert("Error al añadir el producto. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al añadir el producto:", error);
      // Mostrar un mensaje de error al usuario
      alert("Error al añadir el producto. Por favor, inténtalo de nuevo.");
    }

    // Limpiar el formulario
    event.target.reset();
  });
}
