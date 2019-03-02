var faker = require('faker');

const fakeGenre = () => ({
  name: faker.random.word(),
});

exports.seed = function(knex, Promise) {

  const fakeGenres = [];
  for (let i = 0; i < 10; i++) {
    fakeGenres.push(fakeGenre());
  }
  // Deletes ALL existing entries
  return Promise.all([
    // Reset user ids to start with 1 again
    knex.schema.raw('ALTER SEQUENCE genre_id_seq RESTART WITH 1'),
    knex('genre').del()
      .then(function () {
        // Inserts seed entries
        return knex('genre').insert(fakeGenres);
    })
  ])
};
