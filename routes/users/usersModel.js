const db = require('../../db/dbConfig');

module.exports = {
    find,
    add,
    findBy,
    findById,
    remove
};

function find() {
    return db('users').select('id', 'username', 'password');
};

function findBy(username) {
    return db('users').where(username).first();
}

async function add(user) {
    const [id] = await db('users').insert(user);

    return findById(id);
}

function findById(id) {
    return db('users')
        .where({ id })
        .first();
}

function remove(id) {
    return db('users')
        .where({ id })
        .del();
}

