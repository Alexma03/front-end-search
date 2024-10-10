export function navigateTo(url) {
  history.pushState(null, null, url);
  handleRoute();
}

export function handleRoute() {
  const path = window.location.pathname;
  if (path === "/" || path === "/index.html") {
    import("./main.js").then((module) => {
      module.renderProducts();
    });
  } else if (path === "/add-product.html") {
    import("./add-product.js");
  } else {
    console.error("Ruta no encontrada:", path);
  }
}

window.addEventListener("popstate", handleRoute);
window.addEventListener("DOMContentLoaded", handleRoute);

// Hacer navigateTo disponible globalmente
window.navigateTo = navigateTo;