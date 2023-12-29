const express = require('express');
const router = express.Router();
const CartModel = require('../models/cartModel');
const ProductModel = require('../models/productModel');

// ...

router.delete('/:cid/products/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;

  try {
    const cart = await CartModel.findById(cartId);

    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    cart.products = cart.products.filter((product) => product.productId.toString() !== productId);

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto del carrito', error: error.message });
  }
});

router.put('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  const updatedProducts = req.body.products;

  try {
    const cart = await CartModel.findById(cartId).populate('products.productId');

    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    cart.products = updatedProducts;

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el carrito', error: error.message });
  }
});

router.put('/:cid/products/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const { quantity } = req.body;

  try {
    const cart = await CartModel.findById(cartId).populate('products.productId');

    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    const productIndex = cart.products.findIndex((p) => p.productId._id.toString() === productId);

    if (productIndex !== -1) {
      cart.products[productIndex].quantity = quantity;
    }

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la cantidad del producto en el carrito', error: error.message });
  }
});

router.delete('/:cid', async (req, res) => {
  const cartId = req.params.cid;

  try {
    const cart = await CartModel.findById(cartId);

    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    cart.products = [];

    await cart.save();

    res.status(200).json({ message: 'Productos eliminados del carrito exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar los productos del carrito', error: error.message });
  }
});

// ...

