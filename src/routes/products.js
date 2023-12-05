const express = require('express');
const productManager = require('../managers/productManager');
const router = express.Router();

router.get('/', (req, res) => {
  const products = productManager.getAllProducts();
  res.json(products);
});

router.get('/:pid', (req, res) => {
  const productId = req.params.pid;
  const product = productManager.getProductById(productId);
  res.json(product);
});

router.post('/', (req, res) => {
  const newProduct = req.body;
  const product = productManager.addProduct(newProduct);
  res.json(product);
});

router.put('/:pid', (req, res) => {
  const productId = req.params.pid;
  const updatedProduct = req.body;
  const product = productManager.updateProduct(productId, updatedProduct);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

router.delete('/:pid', (req, res) => {
  const productId = req.params.pid;
  const result = productManager.deleteProduct(productId);
  res.json(result);
});

module.exports = router;

