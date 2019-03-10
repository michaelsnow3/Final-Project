exports.up = function(knex, Promise) {

  return dropMessageTable()
    .then(createMessageTable)

  function dropMessageTable(){
    return knex.schema.dropTable('message')
  }

  function createMessageTable() {
    return knex.schema.createTable('message', function (table) {
      table.text('id').primary();
      table.string('type');
      table.timestamp('date').defaultTo(knex.fn.now());
      table.string('content');
      table.integer('user_id')
      .references('users.id');
      table.integer('chatroom_id')
      .references('chatroom.id').onDelete('cascade');
    })
  }

}

exports.down = function(knex, Promise) {
  return dropMessageTable()
    .then(createMessageTable)

  function dropMessageTable(){
    return knex.schema.dropTable('message')
  }

  function createMessageTable() {
    return knex.schema.createTable('message', function (table) {
      table.increments('id');
      table.string('type');
      table.timestamp('date').defaultTo(knex.fn.now());
      table.string('content');
      table.integer('user_id')
      .references('users.id');
      table.integer('chatroom_id')
      .references('chatroom.id').onDelete('cascade');
    })
  }

}