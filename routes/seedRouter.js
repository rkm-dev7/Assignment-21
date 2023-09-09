const express = require('express');
const { seedSales } = require('../controller/seedController');
const seedRouter = express.Router();

seedRouter.post('/seedSale', seedSales)

module.exports = {seedRouter}