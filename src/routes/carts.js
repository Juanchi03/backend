const express = require('express');
const fs = require('fs');

const router = express.Router();

const CARTS_FILE = 'carrito.json';

router.post('/', (req, res) => {
  const newCart = req.body;
  res.json(newCart);
});

router.get('/:cid', (req, res) => {
  const cartId = req.params.cid;
  res.json(cartProducts);
});

router.post('/:cid/product/:pid', (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const { quantity } = req.body;
  res.json({ message: 'Producto agregado al carrito exitosamente' });
});

module.exports = router;
