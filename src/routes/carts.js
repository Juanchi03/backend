const express = require('express');
const router = express.Router();
const passport = require('passport');
const cartController = require('../controllers/cartController');
const ticketController = require('../controllers/ticketController'); 
const Product = require('../models/productModel'); 
const Ticket = require('../models/ticketModel'); 
const { isUser } = require('../middlewares/authorizationMiddleware');

router.post('/add', passport.authenticate('jwt', { session: false }), isUser, cartController.addToCart);

router.post('/:cid/purchase', passport.authenticate('jwt', { session: false }), isUser, async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await Cart.findById(cartId).populate('products.product');
    const productsToPurchase = cart.products;

    const productsNotPurchased = [];

    for (const cartProduct of productsToPurchase) {
      const product = cartProduct.product;
      if (product.stock >= cartProduct.quantity) {
        product.stock -= cartProduct.quantity;
        await product.save();
      } else {
        productsNotPurchased.push(cartProduct.product._id);
      }
    }

    if (productsNotPurchased.length > 0) {
      
      cart.products = cart.products.filter(cp => !productsNotPurchased.includes(cp.product._id));
      await cart.save();
      return res.status(400).json({ message: 'Some products were not purchased', productsNotPurchased });
    }

    
    const ticketData = {
      amount: cart.totalPrice,
      purchaser: req.user.email
    };
    const ticket = await Ticket.create(ticketData);

    
    cart.products = [];
    await cart.save();

    return res.status(200).json({ message: 'Purchase completed successfully', ticket });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;


