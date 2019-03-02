var faker = require('faker');
const rand = () => {
  return Math.floor(Math.random() * 10) + 1;
}

const fakeEntry = () => ({
  name: faker.commerce.productName(),
  artist_id: rand(),
});

exports.seed = function(knex, Promise) {

  const fakeEntries = [];
  for (let i = 0; i < 50; i++) {
    fakeEntries.push(fakeEntry());
  }
  // Deletes ALL existing entries
  return Promise.all([
    // Reset user ids to start with 1 again
    knex.schema.raw('ALTER SEQUENCE song_id_seq RESTART WITH 1'),
    knex('song').del()
      .then(function () {
        // Inserts seed entries
        return knex('song').insert(fakeEntries);
    })
  ])
};
