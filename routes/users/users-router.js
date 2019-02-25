const express = require('express');
const bcrypt = require('bcryptjs');

const Users = require('./usersModel.js');

const router = express.Router();

router.get('/users', checkAuth, async (req, res) => {
    try {
        const users = await Users.find();

        res.status(200).json(users);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Unable to get the list of Users' });
    }
});

router.post('/register', async (req, res) => {
    try { 
        const newUser = await Users.add(req.body);
        const hash = bcrypt.hashSync(user.password, 15);

        newUser.password = hash;

        res.status(201).json(newUser);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Unable to register the user' });
    }
})

function checkAuth (req, res, next) {
    const token = req.headers.token;
    if(token === 'banana') {
        next();
    } else {
        res.status(401).json({ error: 'You are not Authorized to view this information' });
    }
}

module.exports = router;