
exports.seed = function(knex, Promise) {
  const ids = [];
  for (let i = 1; i <= 20; i++){
    ids.push({id: i})
  }
  // Deletes ALL existing entries
  return knex('chatroom').del()
    .then(function () {
      // Inserts seed entries
      return knex('chatroom').insert(ids);
    });
};
