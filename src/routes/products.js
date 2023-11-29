const express = require('express');
const fs = require('fs');

const router = express.Router();

const PRODUCTS_FILE = 'productos.json';

router.get('/', (req, res) => {
  const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
  res.json(products);
});

router.get('/:pid', (req, res) => {
  const productId = req.params.pid;
  res.json(product);
});

router.post('/', (req, res) => {
  const newProduct = req.body;
  res.json(newProduct);
});

router.put('/:pid', (req, res) => {
  const productId = req.params.pid;
  const updatedProduct = req.body;
  res.json(updatedProduct);
});

router.delete('/:pid', (req, res) => {
  const productId = req.params.pid;
  res.json({ message: 'Producto eliminado exitosamente' });
});

module.exports = router;

