const express = require('express');
const UserController = require('./controllers/UserController')

const routes = express.Router();

routes.post('/users', UserController.store); //Rota para cadastro de usuários
//UserController.store está chamando a função store do UserController
module.exports = routes;