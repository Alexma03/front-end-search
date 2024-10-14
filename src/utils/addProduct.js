export async function addProduct(productData) {
  try {
    const response = await fetch(
      "https://api-search-products-d92dad668ba2.herokuapp.com/products/add-product",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      }
    );
    return response;
  } catch (error) {
    console.error("Error adding product:", error);
    alert("Error al agregar el producto. Por favor, inténtalo de nuevo.");
  }
}
