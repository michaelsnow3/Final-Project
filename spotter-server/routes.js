"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {


  
  // SETUP USER PROFILE
  // takes input params, inserts into users table, redirects to ...
  router.post('/:id/user', (req, res) => {
    knex('users')
      .insert({
        name: req.body.name,
        avatar: req.body.avatar,
        email: req.body.email
      })
      .then(() => {
        res.redirect(`/main`);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // SHOW FRIENDS
  // list of users in friends
  router.get('/:id/friends', (req, res) => {
    let user_id = req.params.id;
    knex('users')
      .select()
      .join('friend', {'users.id' : 'user_id'})
      .select('friend_id')
      .then((results) => {
        const friendIDS = results[0];
        let friendList = [];
        for (let i in friendIDS) {
          knex('users')
            .select()
            .where({id : i})
            .then((results) => {
              friendList.push(results[0]);
            })
        } 
        res.json(friendList);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // SEARCH USER PROFILE
  // selects all users with input param name, returns a list of users with that name
  router.get('/search_user', (req, res) => {
    const name = req.body.name;
    knex('users')
      .select()
      .where({name : name})
      .then((results) => {
        const result = results[0];
        const vars = {
          id : result.id,
          name: result.name,
          avatar: result.avatar
        }
        res.json(vars);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // SHOW USER PROFILE
  // select a user by id, show his avatar and name
  router.get('/show_user/:id', (req, res) => {
    let id = req.params.id;
    knex('users')
      .select()
      .where({id : id})
      .then((results) => {
        const result = results[0];
        const vars = {
          id : result.id,
          name: result.name,
          avatar: result.avatar
        }
        res.json(vars);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // ADD FRIEND
  // takes a perspective friend's user id and puts it in friend table for adder's userid
  router.post('/:id/friends', (req, res) => {
    knex('friend')
      .insert({
        user_id : req.params.id,
        friend_id: req.body.friend_id
      })
      .then(() => {
        res.redirect(`/show_user/:id`);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // ACCEPT/REJECT FRIEND REQUEST

  // MESSAGE - ONLY VALID IF BOTH ARE FRIENDS

  // SHOW USER FAVOURITE SONGS
  // join select user.id and favourites and fav.song/artist/genre and song/artist/genre
  // and sends a list of favourites

  // *******add artist's name
  router.get('/:id/fav_song', (req, res) => {
    const id = req.params.id;
    knex('users')
      .select()
      .where({id : id})
      .join('favourite', {'users.id': 'favourite.user_id'})
      .join('favourite_song', {'favourite.id': 'favourite_id'})
      .join('song', {'song.id': 'song_id'})
      .then((results) => {
        const result = results[0];
        const songs = {
          name : result.name,
          spotify : result.spotify,
          artist_id : result.artist_id
        }
        res.json(songs);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // SHOW USER FAVOURITE ARTISTS
  // join select user.id and favourites and fav.song/artist/genre and song/artist/genre
  // and sends a list of favourites
  router.get('/:id/fav_artist', (req, res) => {
    const id = req.params.id;
    knex('users')
      .select()
      .where({id : id})
      .join('favourite', {'users.id': 'favourite.user_id'})
      .join('favourite_artist', {'favourite.id': 'favourite_id'})
      .join('artist', {'artist.id': 'artist_id'})
      .then((results) => {
        const result = results[0];
        const artists = {
          name : result.name,
          spotify : result.spotify
        }
        res.json(artists);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // SHOW USER FAVOURITE GENRES
  // join select user.id and favourites and fav.song/artist/genre and song/artist/genre
  // and sends a list of favourites
  router.get('/:id/fav_genre', (req, res) => {
    const id = req.params.id;
    knex('users')
      .select()
      .where({id : id})
      .join('favourite', {'users.id': 'favourite.user_id'})
      .join('favourite_genre', {'favourite.id': 'favourite_id'})
      .join('genre', {'genre.id': 'genre_id'})
      .then((results) => {
        const result = results[0];
        const genres = {
          name : result.name
        }
        res.json(genres);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // MEET 
  // display users
  // select a given users' favourite songs
  // select all users and their favourite songs
  // join these two tables, and then select users column
  router.get('/:id/meet', (req, res) => {
    const id = req.params.id;
    knex('users')
      .select()
      .where({id : id})
      .join('favourite', {'users.id': 'favourite.user_id'})
      .join('favourite_song', {'favourite.id': 'favourite_id'})
      .join('song', {'song.id': 'song_id'})
      .then((results) => {
        const result = results[0];
        const songs = {
          id : result.id
        }
        knex('users')
          .select()
          .join('favourite', {'users.id' : 'favourite.user_id'})
          .join('favourite_song', {'favourite.id': 'favourite_id'})
          .join('song', {'song.id': 'song_id'})
          .select('song')
  //////////////
        res.send();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // CHAT - message history
  // display message history for a user
  router.get('/:id/chat/message_history', (req, res) => {
    const id = req.params.id;
    knex('users')
      .select()
      .where({id : id})
      .join('user_chatroom', {'users.id' : 'user_chatroom.user_id'})
      .join('chatroom', {'user_chatroom.chatroom_id' : 'chatroom.id'})
      .join('message', {'chatroom.id' : 'message.chatroom_id'})
      .select('type', 'date', 'content')
      .then((results) => {
        const result = results[0];
        const messages = [];
        for (let i in result) {
          if (i.type === 'message') {
            messages.push(i);
          }
        }
        res.json(messages)
      });
  });

  // CHAT - RECOMENDATIONS HISTORY



  return router;
};