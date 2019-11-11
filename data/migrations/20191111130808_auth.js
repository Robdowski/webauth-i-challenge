
exports.up = function(knex) {
  knex.schema.createTable('user', table => {
      table.increments()

      table.string('username', 255).notNullable()
      table.string('password', 255).notNullable()
  })
};

exports.down = function(knex) {
  knex.schema.dropTableIfExists('user')
};
