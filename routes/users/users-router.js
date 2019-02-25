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
        let newUser = req.body;
        const hash = bcrypt.hashSync(req.body.password, 15);

        newUser.password = hash;

        const user = await Users.add(newUser);
        res.status(201).json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Unable to register the user' });
    }
});

router.post('/login', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    try {
        const user = await Users.findBy({ username });
        
        if(user && bcrypt.compareSync(password, user.password)){
            res.status(200).json({ message: `Welcome ${user.username}!!`});
        } else {
            res.status(401).json({ error: 'Wrong login information' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Unable to login '});
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