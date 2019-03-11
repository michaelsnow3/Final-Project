const Algorithmia = require("algorithmia");
const express = require("express");
const meetRoutes = express.Router();

// const knexConfig = require("../knexfile");
// const ENV = process.env.ENV || "development";
// const knex = require('knex')(knexConfig[ENV])
// const matching = require('./test-algo')




let input = {
  "group1": [
    {
      "name": "User",
      "interests": ['c'],
      "values": ['d'],
      "age": "22",
      "coordinates": {
        "lat": 43.6532,
        "long": 79.3832
      }
    },
  ],
  "group2": [
    { 
      "id" : "",
      "name": "",
      "interests": ['a'],
      "values": ['b'],
      "age": "22",
      "coordinates": {
        "lat": 43.6532,
        "long": 79.3832
      }
    },
  ]
};

module.exports = (knex) => {

  meetRoutes.post('/get', (req, res) => {
// const test = (knex) => {
  const id = 7 //req.body.user_id;
  // filling the input array group2 with empties
  let count;
  let users;
  knex('users').count('id').then((result) => {count = result; return count})
  .then((count) => {
    let intCount = Number(count[0].count)
    let filler = [];
    for (let i = 0; i < intCount; i++) {
      filler[i] = {
        // "id" : null,
        "name": "",
        "interests": ['a'],
        "values": ['a'],
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
    // getting user's favourites
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
          // input.group2[i].id = users[i].id;
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


            const result = []
            let i = 0; 
            const run = (aaa) => {
            if ( i === 5) {
              console.log(2222222222, result)
              res.json(result);
            }
            else {
              Algorithmia.client("simmxo6hMreL3iS9k6Yu7G2k04B1")
              .algo("matching/DatingAlgorithm/0.1.3") // timeout is optional
              .pipe(aaa)
              .then(function(response) {
                const match = response.get()['User'] 
                result.push(match)
                console.log(response)
                // console.log('match: ', match)
                // console.log('result: ', result);
                let xxx = aaa; 
                xxx.group2 = aaa.group2.filter(x => {
                  return x.name !== match
                })
                // console.log(xxx)
                i++;
                return run(xxx)
              });
            }
          }
          run(input)


            // console.log('input', input)
            // console.log(matching(input))
            // res.JSON(matching(input))

            // console.log(JSON.stringify(input))
            // console.log(input.group2)
            // console.log(input)
            // input = JSON.stringify(input)
            // let finalResult = async () => {
            //   let response = await matching(input)
            //   console.log(response)
            //   return response;
            // }
            // console.log(matching)

            //   console.log(111111111111111, data)
            //   res.json({matches: data})
            // finalResult()          

          })

          
        })
      })
    })
  });
})
return meetRoutes;
}

// pass in primary users name
// function to fetch favs, top 10
// fill in user's favourites using func
// access all users from database
// fill in favs with func
// run matching



// matching(input)