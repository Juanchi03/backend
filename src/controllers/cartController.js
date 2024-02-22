const CartDao = require('../daos/cartDao');
const ProductDao = require('../daos/productDao');
const TicketService = require('../services/ticketService');

class CartController {
  async purchaseCart(cartId) {
    try {
      const cart = await CartDao.getCartById(cartId);
      const productsToPurchase = [];

      for (const item of cart.products) {
        const product = await ProductDao.getProductById(item.productId);
        if (product.stock >= item.quantity) {
          productsToPurchase.push({ productId: item.productId, quantity: item.quantity });
        }
      }

      const purchasedProducts = [];
      const notPurchasedProducts = [];

      for (const item of productsToPurchase) {
        const product = await ProductDao.getProductById(item.productId);
        product.stock -= item.quantity;
        await product.save();
        purchasedProducts.push(product);
      }

      for (const item of cart.products) {
        const found = productsToPurchase.find(p => p.productId.toString() === item.productId.toString());
        if (!found) {
          notPurchasedProducts.push(item.productId);
        }
      }

      const ticketData = {
        code: generateTicketCode(),
        amount: calculateTotalAmount(purchasedProducts),
        purchaser: cart.userId,
      };

      const ticket = await TicketService.createTicket(ticketData);

      await CartDao.clearCart(cartId);

      return { purchasedProducts, notPurchasedProducts, ticket };
    } catch (error) {
      throw new Error('Error al procesar la compra del carrito');
    }
  }
}

function generateTicketCode() {
  
}

function calculateTotalAmount(products) {
  
}

module.exports = new CartController();


