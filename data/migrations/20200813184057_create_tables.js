exports.up = function (knex) {
    return knex.schema.createTable("milkshakes", tbl => {
      tbl.increments();
  
      tbl.string("flavor", 255).notNullable();
    });
  };
  
  exports.down = function (knex) {
    // undo the operation in up
    return knex.schema.dropTableIfExists("milkshakes");
  };