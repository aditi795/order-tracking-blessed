const express = require('express');
const bodyparser = require('body-parser');


const app = express();
const port = 3000;

const urlparser = bodyparser.urlencoded({extended:true});



const indexRouter = require('./routes/index');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const customersRouter = require('./routes/customers');
const newOrderRouter = require('./routes/newOrder');

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(urlparser);

app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/customers', customersRouter);
app.use('/newOrder', newOrderRouter);

app.listen(port, () => {
    console.log(`Server listening on Port: ${port}`);
});

module.exports = app;
