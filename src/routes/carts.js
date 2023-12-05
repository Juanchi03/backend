const express = require('express');
const cartManager = require('../managers/cartManager');
const router = express.Router();

router.post('/', (req, res) => {
  const newCart = req.body;
  const cart = cartManager.addCart(newCart);
  res.json(cart);
});

router.get('/:cid', (req, res) => {
  const cartId = req.params.cid;
  const cart = cartManager.getCartById(cartId);
  res.json(cart ? cart.products : []);
});

router.post('/:cid/product/:pid', (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const { quantity } = req.body;
  const result = cartManager.addProductToCart(cartId, productId, quantity);
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ message: 'Carrito no encontrado' });
  }
});

module.exports = router;

