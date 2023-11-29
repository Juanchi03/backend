const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 8080;

app.use(express.json());

const productsRouter = require('./src/routes/products');
app.use('/api/products', productsRouter);

const cartsRouter = require('./src/routes/carts');
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
