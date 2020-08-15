const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById,
};

async function insert(milkshake) {
  const [id] = await db('milkshakes').insert(milkshake, 'id');
  return db('milkshakes').where({id}).first();
}

async function update(id, changes) {
    return db('milkshakes').where({id}).update(changes)
        .then(count =>{
            return findById(id);
        })
}

function remove(id) {
   return db('milkshakes').where({id}).del();
}

function getAll() {
  return db('milkshakes');
}

function findById(id) {
  return db('milkshakes')
  .where({id})
  .first();
}
