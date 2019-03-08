const express = require("express");
const showProfile = express.Router();

module.exports = (knex) => {

  // getUserInfo
  showProfile.post("/info", (req, res) => {
      const id = req.body.id;
      knex('users')
        .select()
        .where({id : id})
        .then((results) => {
          const result = results[0];
          const vars = {
            name: result.name,
            avatar: result.avatar
          } 
          res.json(vars);
        })
        .catch((err) => {
          console.log(err);
        }); 
    });

  // getUserFav
  showProfile.post('/fav', (req, res) => {
    const id = req.body.id;
    knex
    .select('*')
    .from('users')
    .where('users.id', id)
    .join('favourite', {'users.id': 'favourite.user_id'})
    .join('favourite_song', {'favourite.id': 'favourite_id'})
    .join('song', {'song.id': 'song_id'})
    .then((results) => {  
      let songs = [];
      for (let song of results) {
        if (songs.length === 3){
          break;
        }
        songs.push(song)
      }
      res.json(songs);
    })
    .catch((err) => {
      console.log(err);
    });
  });

  // checkFriend
  showProfile.post("/friend_status", (req, res) => {
    const primary_user_id = req.body.user_id;
    const other_user_id = req.body.friend_id;
    knex
    .select('*')
    .from('friend')
    .where({'friend.user_id' : primary_user_id })
    .then((results) => {
        let result = false;
        for (let friend of results) { 
          if (friend.friend_id === other_user_id){
            result = true;
            break;
          }
        }
        res.json(result)
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // addFriend
  showProfile.post("/add_friend", (req, res) => {
    const primary_user_id = req.body.user_id;
    const other_user_id = req.body.friend_id;
    knex('friend')
      .insert({
        user_id: primary_user_id,
        friend_id: other_user_id 
      })
      .then(() => {
        res.json();
        console.log(`Primary user # ${primary_user_id} added a friend # ${other_user_id}`)
      })
      .catch((err) => {
        console.log(err);
      });
  });


  return showProfile;
}
