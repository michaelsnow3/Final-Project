var faker = require('faker');
const uuidv4 = require('uuid/v4');
const rand = () => {
  return Math.floor(Math.random() * 10) + 1;
}

// Message types: text, notification
const fakeMessage = () => ({
  id: uuidv4(),
  type: "message",
  content: faker.lorem.sentence(),
  user_id: rand(),
  chatroom_id: rand()
});

exports.seed = function(knex, Promise) {
  const fakeMessages = [];
  for (let i = 0; i < 10; i++) {
    fakeMessages.push(fakeMessage());
  }
  // Deletes ALL existing entries
  return Promise.all([
    knex('message').del()
      .then(function () {
        // Inserts seed entries
        return knex('message').insert(fakeMessages);
    })
  ])
};
