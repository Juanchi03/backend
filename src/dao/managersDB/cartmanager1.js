const CartDao = require('../cartDao');

class CartManagerDB {
  async getCartByUserId(userId) {
    try {
      return await CartDao.getCartByUserId(userId);
    } catch (error) {
      throw new Error('Error al obtener el carrito del usuario (DB)');
    }
  }

  async addProductToCart(userId, productId) {
    try {
      return await CartDao.addProductToCart(userId, productId);
    } catch (error) {
      throw new Error('Error al agregar el producto al carrito (DB)');
    }
  }
}

module.exports = new CartManagerDB();
