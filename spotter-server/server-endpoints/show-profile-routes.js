const express = require("express");
const showProfile = express.Router();

module.exports = (knex) => {

  // getUserInfo
  showProfile.post("/info", (req, res) => {
      let id = req.body.id;
      console.log(`Showing user # ${id} profile 111111`);
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
        console.log(`Showing user # ${id} profile 222222222`);
    });

  // getUserFav
  showProfile.post('/:id/fav', (req, res) => {
    const id = req.params.id;
    knex('users')
    .select()
    .where({id : id})
    .join('favourite', {'users.id': 'favourite.user_id'})
    .join('favourite_song', {'favourite.id': 'favourite_id'})
    .join('song', {'song.id': 'song_id'})
    .then((results) => {
      const result = results[0];
      let songs = [];
      for (let i = 1; i < 4; i ++) {
        songs.push({
          name : result[i].name,
          spotify : result[i].spotify,
          artist_id : result[i].artist_id
        })
      }
      res.json(songs);
    })
    .catch((err) => {
      console.log(err);
    });
  });

  // checkFriend
  showProfile.post("friend_status/:primary_id/:user_id", (req, res) => {
    const primary_user_id = req.params.primary_id;
    const other_user_id = req.params.user_id;
    knex('friend')
      .select()
      .where({primary_user_id : user_id})
      .then((results) => {
        const result = results[0];
        let isFriend = false;
        for (let i of result) {
          if (i.friend_id === other_user_id){
            isFriend = true;
            break;
          }
        }
        res.json(isFriend);
      })
      .catch((err) => {
        console.log(err);
      });
      console.log(`friend status is ${isFriend}`)
  });

  // addFriend
  showProfile.post("add_friend/:primary_id/:user_id", (req, res) => {
    const primary_user_id = req.params.primary_id;
    const other_user_id = req.params.user_id;
    knex('friend')
      .insert({
        user_id: primary_user_id,
        friend_id: other_user_id 
      })
      .then(() => {
        console.log(`Primary user # ${primary_user_id} added a friend # ${other_user_id}`)
      })
      .catch((err) => {
        console.log(err);
      });
  });


  return showProfile;
}
