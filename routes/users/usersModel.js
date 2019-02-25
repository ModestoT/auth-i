const db = require('../../db/dbConfig');

module.exports = {
    find,
    add,
    findById
};

function find() {
    return db('users').select('id', 'username', 'password');
};

async function add(user) {
    const [id] = await db('users').insert(user);

    return findById(id);
}

function findById(id) {
    return db('users')
        .where({ id })
        .first();
}

