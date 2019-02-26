const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const db = require('../../db/dbConfig.js');
const Users = require('./usersModel.js');

const router = express.Router();

// configure express-session middleware
router.use(
    session({
      name: 'notsession', // default is connect.sid
      secret: 'nobody tosses a dwarf!',
      cookie: {
        maxAge: 1000 * 60 * 60 * 3,
        secure: false, // only set cookies over https. Server will not send back a cookie over http.
      }, // 1 day in milliseconds
      httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
      resave: false,
      saveUninitialized: false,
      store: new KnexSessionStore({
        knex: db,
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60, // in ms
      }),
    })
);

router.get('/users',  checkAuth, async (req, res) => {
    try {
        const users = await Users.find();

        res.status(200).json(users);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Unable to get the list of Users' });
    }
});

router.get('/restricted/users', checkSession, async (req, res) => {
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
        const hash = bcrypt.hashSync(req.body.password, 12);

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
            req.session.userId = user.id;
            let cookie = req.session.name;
            res.status(200).json({ message: `Welcome ${user.username}!!`, cookie });
        } else {
            res.status(401).json({ error: 'Wrong login information' });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Unable to login '});
    }
})

router.get('/logout', (req, res) => {
    if(req.session){
        req.session.destroy(err => {
            if(err){
                res.status(500).json({ error: 'Unable to logout' });
            } else {
                res.status(200).json({ message: 'Logged Out' });
            }
        })
    }
})

router.delete('/restricted/users/:id', checkSession, async (req, res) => {
    try {
        const deleted = await Users.remove(req.params.id);
        if(deleted) {
            res.status(200).json({ message: 'User was succesfully deleted'});
        } else {
            res.status(400).json({ error: 'The User with that id does not exist'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'The User could not be deleted '});
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

function checkSession(req, res, next) {
    if (req.session && req.session.userId) {
        next();
    } else {
      res.status(401).json({ message: 'you shall not pass!!' });
    }
  }

module.exports = router;