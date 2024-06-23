const express = require('express');
const intensity = require('../controllers/intensity');
const route = express.Router();

route.get('/', intensity.GetAll );

route.get('/:id', intensity.FindById );

route.patch('/:id', intensity.Updateintensity);

route.delete('/:id', intensity.Deleteintensity);

route.post('/add', intensity.Ajout);

route.post('/stats', intensity.device_stats );


module.exports = route;