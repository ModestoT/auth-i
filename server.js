const express = require('express'); 
const helmet = require('helmet');
const server = express();

const usersRouter = require('./routes/users/users-router.js');

server.use(express.json());
server.use(helmet());

server.use('/api/users', usersRouter);

module.exports = server;