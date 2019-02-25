const db = require('../../db/dbConfig');

module.exports = {
    find,
    add
};

function find() {
    return db('users').select('id', 'username', 'password');
};

function add(user) {
    return db('users')
        .insert(user)
        .then(user => {
            console.log(user);
        })
}

