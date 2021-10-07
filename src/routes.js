const express = require('express');
const UserController = require('./controllers/UserController')
const EventController = require('./controllers/EventController');
const { verifyJWT } = require('./verify');

const routes = express.Router();

routes.get('/users', UserController.index); //Listar os usuários
routes.post('/users', UserController.store); //Rota para cadastro de usuários
//UserController.store está chamando a função store do UserController
routes.post('/users/login', UserController.login);
routes.put('/users/edit', verifyJWT, UserController.edit);

routes.get('/users/:userId/events', verifyJWT, EventController.index);
routes.post('/users/:userId/events', EventController.store);
routes.delete('/users/:userId/events', EventController.delete);

module.exports = routes;