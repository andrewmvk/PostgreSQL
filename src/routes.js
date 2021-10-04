const express = require('express');
const UserController = require('./controllers/UserController')
const EventController = require('./controllers/EventController')

const routes = express.Router();

routes.get('/users', UserController.index); //Listar os usuários
routes.post('/users', UserController.store); //Rota para cadastro de usuários
//UserController.store está chamando a função store do UserController
routes.get('/users/:userId/events', EventController.index);
routes.post('/users/:userId/events', EventController.store);
routes.delete('/users/:userId/events', EventController.delete);

module.exports = routes;