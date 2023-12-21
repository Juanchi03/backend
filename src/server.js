const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 8080;

mongoose.connect('mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', './views');

const ProductDao = require('./src/dao/productDao');
const CartModel = require('./src/models/cartModel'); 
const CartDao = require('./src/dao/cartDao');
const MessageDao = require('./src/dao/messageDao');

app.get('/', async (req, res) => {
  const products = await ProductDao.getAllProducts();
  res.render('home', { products });
});

app.get('/realtimeproducts', async (req, res) => {
  const products = await ProductDao.getAllProducts();
  res.render('realTimeProducts', { products });
});

app.get('/chat', async (req, res) => {
  const messages = await MessageDao.getAllMessages();
  res.render('chat', { messages });
});

app.post('/api/products', async (req, res) => {
  try {
    const newProduct = req.body; 
    const createdProduct = await ProductDao.addProduct(newProduct);
    io.emit('newProduct', createdProduct);
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto' });
  }
});

app.delete('/api/products/:productId', async (req, res) => {
  const productId = req.params.productId;
  try {
    const deletedProduct = await ProductDao.deleteProduct(productId);
    io.emit('deleteProduct', deletedProduct);
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});


app.get('/api/carts/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const userCart = await CartDao.getCartByUserId(userId);
    res.status(200).json(userCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito del usuario' });
  }
});

app.post('/api/carts/:userId/addProduct/:productId', async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  try {
    const updatedCart = await CartDao.addProductToCart(userId, productId);
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
});



io.on('connection', (socket) => {
  console.log('Usuario conectado');

  socket.on('sendMessage', async (message) => {
    try {
      await MessageDao.addMessage(message);
      io.emit('message', message);
    } catch (error) {
      console.error('Error al guardar el mensaje:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});


