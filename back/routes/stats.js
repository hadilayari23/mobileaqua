const express = require('express');
const StatsController = require('../controllers/Stats');

const route = express.Router();

// route.get('/', StatsController.GetAll );

route.get('/', StatsController.device_stats );

module.exports = route;