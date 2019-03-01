exports.up = function(knex, Promise) {
  return Promise.all([
    // USERS
    knex.schema.createTable('users', function (table) {
      table.increments('id');
      table.string('name');
      table.string('avatar');
      table.string('email');
    }),
    // FRIEND
    knex.schema.createTable('friend', function (table) {
      table.integer('user_id')
      .references('users.id').onDelete('cascade');
      table.integer('friend_id')
      .references('users.id').onDelete('cascade');
    }),
    // CHATROOM
    knex.schema.createTable('chatroom', function (table) {
      table.increments('id');
    }),
    // USER_CHATROOM
    knex.schema.createTable('user_chatroom', function (table) {
      table.integer('user_id')
      .references('users.id').onDelete('cascade');
      table.integer('chatroom_id')
      .references('chatroom.id').onDelete('cascade');
    }),    
    // MESSAGE
    knex.schema.createTable('message', function (table) {
      table.increments('id');
      table.string('type');
      table.timestamp('date').defaultTo(knex.fn.now());
      table.string('content');
      table.integer('user_id')
      .references('users.id');
      table.integer('chatroom_id')
      .references('chatroom.id').onDelete('cascade');
    }),
    // FAVOURITE
    knex.schema.createTable('favourite', function (table) {
      table.increments('id');
      table.integer('user_id')
      .references('users.id').onDelete('cascade');
    }),
    // GENRE
    knex.schema.createTable('genre', function (table) {
      table.increments('id');
      table.string('name');
    }),
    // ARTIST
    knex.schema.createTable('artist', function (table) {
      table.increments('id');
      table.string('name');
      table.string('spotify');
    }),
    // SONG
    knex.schema.createTable('song', function (table) {
      table.increments('id');
      table.string('name');
      table.string('spotify');
      table.integer('artist_id')
      .references('artist.id').onDelete('cascade');
    }),
    // FAVOURITE_GENRE
    knex.schema.createTable('favourite_genre', function (table) {
      table.integer('favourite_id')
      .references('favourite.id').onDelete('cascade');
      table.integer('genre_id')
      .references('genre.id').onDelete('cascade');
    }),
    // FAVOURITE_ARTIST
    knex.schema.createTable('favourite_artist', function (table) {
      table.integer('favourite_id')
      .references('favourite.id').onDelete('cascade');
      table.integer('artist_id')
      .references('artist.id').onDelete('cascade');
    }),
    // FAVOURITE_SONG
    knex.schema.createTable('favourite_song', function (table) {
      table.integer('favourite_id')
      .references('favourite.id').onDelete('cascade');
      table.integer('song_id')
      .references('song.id').onDelete('cascade');
    }),
    // PLAYLIST
    knex.schema.createTable('playlist', function (table) {
      table.increments('id');
      table.string('name');
    }),
    // USER_PLAYLIST
    knex.schema.createTable('user_playlist', function (table) {
      table.integer('user_id')
      .references('users.id').onDelete('cascade');
      table.integer('playlist_id')
      .references('playlist.id').onDelete('cascade');
    }),
    // PLAYLIST_SONG
    knex.schema.createTable('playlist_song', function (table) {
      table.integer('song_id')
      .references('song.id').onDelete('cascade');
      table.integer('playlist_id')
      .references('playlist.id').onDelete('cascade');
    }),
  ]);
};


exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('playlist_song'),
    knex.schema.dropTable('user_playlist'),
    knex.schema.dropTable('playlist'),
    knex.schema.dropTable('favourite_song'),
    knex.schema.dropTable('favourite_artist'),
    knex.schema.dropTable('favourite_genre'),
    knex.schema.dropTable('song'),
    knex.schema.dropTable('artist'),
    knex.schema.dropTable('genre'),
    knex.schema.dropTable('favourite'),
    knex.schema.dropTable('message'),
    knex.schema.dropTable('user_chatroom'),
    knex.schema.dropTable('chatroom'),
    knex.schema.dropTable('friend'),
    knex.schema.dropTable('users')
  ]);
};
