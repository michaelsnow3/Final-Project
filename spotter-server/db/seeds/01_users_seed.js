var faker = require('faker');

const fakeEntry = () => ({
  name: faker.name.findName(),
  avatar: faker.internet.avatar(),
  email: faker.internet.email()
});

exports.seed = function(knex, Promise) {

  const fakeEntries = [];
  for (let i = 0; i < 10; i++) {
    fakeEntries.push(fakeEntry());
  }
  // Deletes ALL existing entries
  return Promise.all([
    // Reset user ids to start with 1 again
    knex.schema.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1'),
    knex('users').del()
      .then(function () {
        // Inserts seed entries
        return knex('users').insert([
          {name: 'Yu-Ning'},
          {name: 'Michael'},
          {name: 'Stan'}]
          .concat(fakeEntries));
    })
  ])
};
