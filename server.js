const express = require('express'); 
const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('./routes/users/users-router.js');

const server = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
};

server.use(express.json());
server.use(helmet());
server.use(cors(corsOptions));

server.use('/api', usersRouter);

module.exports = server;