var faker = require('faker');

const fakeEntry = () => ({
  name: faker.random.word(),
});

exports.seed = function(knex, Promise) {

  const fakeEntries = [];
  for (let i = 0; i < 10; i++) {
    fakeEntries.push(fakeEntry());
  }
  // Deletes ALL existing entries
  return Promise.all([
    // Reset user ids to start with 1 again
    knex.schema.raw('ALTER SEQUENCE playlist_id_seq RESTART WITH 1'),
    knex('playlist').del()
      .then(function () {
        // Inserts seed entries
        return knex('playlist').insert(fakeEntries);
    })
  ])
};
