const fs = require('fs');
const PRODUCTS_FILE = 'productos.json';

class ProductManager {
  getAllProducts() {
    return JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
  }

  getProductById(productId) {
    const products = this.getAllProducts();
    return products.find((p) => p.id === productId);
  }

  addProduct(product) {
    const products = this.getAllProducts();
    product.id = this.generateProductId();
    products.push(product);
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    return product;
  }

  updateProduct(productId, updatedProduct) {
    const products = this.getAllProducts();
    const index = products.findIndex((p) => p.id === productId);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedProduct };
      fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
      return products[index];
    } else {
      return null;
    }
  }

  deleteProduct(productId) {
    let products = this.getAllProducts();
    products = products.filter((p) => p.id !== productId);
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    return { message: 'Producto eliminado exitosamente' };
  }

  generateProductId() {}
}

module.exports = new ProductManager();
