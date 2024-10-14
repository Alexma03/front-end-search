export async function addProduct(productData) {
  try {
    const response = await fetch(
      "http://localhost:8080/products/add-product",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      }
    );
    return response.status;
  } catch (error) {
    console.error("Error adding product:", error);
    alert("Error al agregar el producto. Por favor, inténtalo de nuevo.");
  }
}
