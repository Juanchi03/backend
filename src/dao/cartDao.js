const Cart = require('../models/cartModel');

class CartDao {
  async getCartByUserId(userId) {
    try {
      return await Cart.findOne({ userId }).populate('products.productId');
    } catch (error) {
      throw new Error('Error al obtener el carrito del usuario');
    }
  }

  async addProductToCart(userId, productId) {
    try {
      const userCart = await Cart.findOne({ userId });

      if (!userCart) {
        const newCart = await Cart.create({ userId, products: [{ productId, quantity: 1 }] });
        return newCart.populate('products.productId').execPopulate();
      }

      const existingProduct = userCart.products.find((item) => item.productId._id.toString() === productId);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        userCart.products.push({ productId, quantity: 1 });
      }

      const updatedCart = await userCart.save();
      return updatedCart.populate('products.productId').execPopulate();
    } catch (error) {
      throw new Error('Error al agregar el producto al carrito');
    }
  }
}

module.exports = new CartDao();

