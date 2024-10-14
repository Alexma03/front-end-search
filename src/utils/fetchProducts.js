export async function fetchProducts() {
  try {
    const response = await fetch("https://api-search-products-d92dad668ba2.herokuapp.com/products/get-products");
    const data = await response.json();
    console.log("API Response:", data); // Log para verificar la respuesta de la API

    if (Array.isArray(data)) {
      return data;
    } else {
      console.error("Invalid API response format:", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}