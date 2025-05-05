const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/', async (req, res) => {
  const order = new Order({ items: req.body.items });
  await order.save();
  res.status(201).send('Order placed');
});

module.exports = router;
