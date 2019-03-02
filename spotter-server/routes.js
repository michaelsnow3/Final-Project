"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {


  
  // SETUP USER PROFILE
  // takes input params, inserts into users table, redirects to ...
  router.post('', (req, res) => {
    let name = req.params.name;
    let avatar = req.params.avatar;
    let email = req.params.email;
    knex('users')
      .insert({
        name: req.body.name,
        avatar: req.params.avatar,
        email: req.body.email
      })
      .then(() => {
        res.redirect(``);
      })
      .catch((err) => {
        console.log(err);
      });
  });


  // SEARCH USER PROFILE
  // selects all users with input param name, returns a list of users with that name
  router.get('', (req, res) => {
    let name = req.params.name;
    knex('users')
      .select()
      .where({name : name})
      .then((results) => {
        const result = results[0];
        const vars = {
          name: result.name,
          avatar: result.avatar
        }
        res.render('', vars);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // SHOW USER FAVOURITE SONGS
  // join select user.id and favourites and fav.song/artist/genre and song/artist/genre
  // and renders a list of favourites
  router.get('', (req, res) => {
    let name = req.params.name;
    knex('users')
      .select()
      .where({name : name})
      .join('availability', {'users.id': 'favourite.user_id'})
      .join('favourite_song', {'favourite.id': 'favourite_id'})
      .join('song', {'song.id': 'song_id'})
      .then((results) => {
        ......

        }

      })
      .catch((err) => {
        console.log(err);
      });
  });



  
  return router;
};