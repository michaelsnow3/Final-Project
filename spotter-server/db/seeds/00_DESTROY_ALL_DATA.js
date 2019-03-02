exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    knex('playlist_song').del(),
    knex('user_playlist').del(),
    knex('playlist').del(),
    knex('favourite_song').del(),
    knex('favourite_artist').del(),
    knex('favourite_genre').del(),
    knex('song').del(),
    knex('artist').del(),
    knex('genre').del(),
    knex('favourite').del(),
    knex('message').del(),
    knex('user_chatroom').del(),
    knex('chatroom').del(),
    knex('friend').del(),
    knex('users').del()
  ])
};
