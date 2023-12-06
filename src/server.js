const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const exphbs = require('express-handlebars');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 8080;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('home', { products: getAllProducts() });
});

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { products: getAllProducts() });
});

io.on('connection', (socket) => {
  console.log('Usuario conectado');
  
  socket.on('newProduct', () => {
    io.emit('updateProducts', getAllProducts());
  });

  socket.on('deleteProduct', () => {
    io.emit('updateProducts', getAllProducts());
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

function getAllProducts() {
  return [];
}
