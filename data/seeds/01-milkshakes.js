
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('milkshakes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('milkshakes').insert([
        {id: 1, flavor: 'strawberry'},
        {id: 2, flavor: 'vanilla'},
        {id: 3, flavor: 'chocolate'}
      ]);
    });
};
