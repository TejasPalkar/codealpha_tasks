const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb://localhost:27017/ecom', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());

app.use('/products', require('./routes/products'));
app.use('/orders', require('./routes/orders'));

app.listen(5000, () => console.log('Server running on port 5000'));
