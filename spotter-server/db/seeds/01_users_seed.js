var faker = require('faker');

const fakeUser = () => ({
  name: faker.name.findName(),
  avatar: faker.internet.avatar(),
  email: faker.internet.email()
});

exports.seed = function(knex, Promise) {

  const fakeUsers = [];
  for (let i = 0; i < 10; i++) {
    fakeUsers.push(fakeUser());
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
          .concat(fakeUsers));
    })
  ])
};
