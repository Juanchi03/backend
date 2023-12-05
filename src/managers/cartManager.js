const fs = require('fs');
const CARTS_FILE = 'carrito.json';

class CartManager {
  getAllCarts() {
    return JSON.parse(fs.readFileSync(CARTS_FILE, 'utf8'));
  }

  getCartById(cartId) {
    const carts = this.getAllCarts();
    return carts.find((c) => c.id === cartId);
  }

  addCart(cart) {
    const carts = this.getAllCarts();
    cart.id = this.generateCartId();
    carts.push(cart);
    fs.writeFileSync(CARTS_FILE, JSON.stringify(carts, null, 2));
    return cart;
  }

  addProductToCart(cartId, productId, quantity) {
    const carts = this.getAllCarts();
    const index = carts.findIndex((c) => c.id === cartId);

    if (index !== -1) {
      const productIndex = carts[index].products.findIndex((p) => p.id === productId);
      if (productIndex !== -1) {
        carts[index].products[productIndex].quantity += quantity;
      } else {
        carts[index].products.push({ id: productId, quantity });
      }
      fs.writeFileSync(CARTS_FILE, JSON.stringify(carts, null, 2));
      return { message: 'Producto agregado al carrito exitosamente' };
    } else {
      return null;
    }
  }

  generateCartId() {}
}

module.exports = new CartManager();
