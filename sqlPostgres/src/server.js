const express = require('express');
const routes = require('./routes');

require('./database');

const app = express();

app.use(express.json()); 
/*
Para saber como lidar com requisições em formato json 
Usado principalmente quando se vai trabalhar com uma API própria
*/
app.use(routes);

app.listen(3333);