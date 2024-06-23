const express = require('express');
const consmController = require('../controllers/consm');
const route = express.Router();

route.get('/', consmController.GetAll );

route.get('/chart ', consmController.Chart );

route.get('/:id', consmController.FindById );

route.delete('/:id', consmController.Deleteconsm);

route.post('/add', consmController.Ajout);


module.exports = route;