const Algorithmia = require("algorithmia");
const express = require("express");
const meetRoutes = express.Router();

// const knexConfig = require("../knexfile");
// const ENV = process.env.ENV || "development";
// const knex = require('knex')(knexConfig[ENV])
// const matching = require('./test-algo')

module.exports = (knex) => {
  meetRoutes.post('/get', (req, res) => {
  let input = {
    "group1": [
      {
        "name": "User",
        "interests": [''],
        "values": [''],
        "age": "22",
        "coordinates": {
          "lat": 43.6532,
          "long": 79.3832
        }
      },
    ],
    "group2": []
  };
  // const test = (knex) => {
  console.log(11111111111)
  const id = req.body.user_id;
  let users;
  // filling the input array group2 with empties
  let count;
  knex('users')
  .count('id')
  .then((result) => {
    count = result;
    return count
  })
  .then((count) => {
    let intCount = Number(count[0].count)
    let filler = [];
    for (let i = 0; i < intCount; i++) {
      filler[i] = {
        "id" : null,
        "name": "",
        "interests": [''],
        "values": [''],
        "age": "22",
        "coordinates": {
          "lat": 43.6532,
          "long": 79.3832
        }
      }
    }
    input.group2 = filler;
  })
  .then(() => {
    // getting user's favourite songs
    knex
    .select('*')
    .from('users')
    .where('users.id', id)
    .join('favourite', {'users.id': 'favourite.user_id'})
    .join('favourite_song', {'favourite.id': 'favourite_id'})
    .join('song', {'song.id': 'song_id'})
    .then((results) => {
      for (let song of results) {
        if (input.group1[0].interests.length === 10){
          break;
        }
        input.group1[0].interests.push(song.name)
      }
      console.log("------");
      console.log(input.group1[0].interests);
      console.log("------");
    })
    // getting user's fav artists
    .then(() => {
      knex
      .select('*')
      .from('users')
      .where('users.id', id)
      .join('favourite', {'users.id': 'favourite.user_id'})
      .join('favourite_artist', {'favourite.id': 'favourite_id'})
      .join('artist', {'artist.id': 'artist_id'})
      .then((results) => {
        for (let artist of results) {
          if (input.group1[0].values.length === 10){
            break;
          }
          input.group1[0].values.push(artist.name)
        }
      })
    })
    .then(() => {
      // getting a list of all users and setting their names to be in input
      knex
      .select('*')
      .from('users')
      .then((resultsUsers) => {
        users = resultsUsers;
        for (let i = 0; i < users.length; i++) {
          input.group2[i].name = users[i].name + " " + users[i].id;
          input.group2[i].id   = users[i].id;
        }
      })
      .then(() => {
        // Setting group2 users's favourite songs and artists (interests and values...)
        knex
        .select('*')
        .from('users')
        .whereNot('users.id', id)
        .join('favourite', {'users.id': 'favourite.user_id'})
        .join('favourite_song', {'favourite.id': 'favourite_id'})
        .join('song', {'song.id': 'song_id'})
        .then((favSongs) => {
          for (let song of favSongs) {
            for (let user of input.group2){
              if (song.user_id === user.id) {
                user.interests.push(song.name)
              }
            }
          }
        })
        .then(() => {
          knex
          .select('*')
          .from('users')
          .whereNot('users.id', id)
          .join('favourite', {'users.id': 'favourite.user_id'})
          .join('favourite_artist', {'favourite.id': 'favourite_id'})
          .join('artist', {'artist.id': 'artist_id'})
          .then((favArtists) => {
            for (let artist of favArtists) {
              for (let user of input.group2){
                if (artist.user_id === user.id) {
                  user.values.push(artist.name)
                }
              }
            }
          })
          .then(() => {
            const matchResult = []
            let count = 0;
            const matching = (data) => {
            if (count === 5) {
              console.log('matching result: ', matchResult)
              res.json(matchResult);
            }
            else {
              Algorithmia.client("simP4D95tgvoG3/Ju6E4fp6kQFA1")
              .algo("matching/DatingAlgorithm/0.1.3")
              .pipe(data)
              .then(function(response) {
                const match = response.get()['User']
                matchResult.push(match)
                let newData = data;
                newData.group2 = data.group2.filter(entry => {
                  return entry.name !== match
                })
                count++;
                return matching(newData)
              });
            }
          }
          matching(input)
          })
        })
      })
    })
  });
})
return meetRoutes;
}
