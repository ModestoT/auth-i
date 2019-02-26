const express = require('express'); 
const helmet = require('helmet');
const cors = require('cors');
const server = express();

const usersRouter = require('./routes/users/users-router.js');

const corsOptions = {
    credentials: true
};

server.use(helmet());
server.use(express.json());
server.use(cors(corsOptions));

server.use('/api', usersRouter);

module.exports = server;