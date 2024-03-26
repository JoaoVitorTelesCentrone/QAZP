const express = require('express');
const productsRouter = require('./routes/products');

const app = express();

app.use(express.json());

app.use('/products', productsRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

module.exports = app;
