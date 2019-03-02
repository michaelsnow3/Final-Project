var faker = require('faker');

const fakeArtist = () => ({
  name: faker.name.lastName(),
});

exports.seed = function(knex, Promise) {

  const fakeArtists = [];
  for (let i = 0; i < 10; i++) {
    fakeArtists.push(fakeArtist());
  }
  // Deletes ALL existing entries
  return Promise.all([
    // Reset user ids to start with 1 again
    knex.schema.raw('ALTER SEQUENCE artist_id_seq RESTART WITH 1'),
    knex('artist').del()
      .then(function () {
        // Inserts seed entries
        return knex('artist').insert(fakeArtists);
    })
  ])
};
