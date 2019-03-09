const express = require("express");
const profileEditRoutes = express.Router();
const search = require("../search/search-spotify.js");
const ENV = process.env.ENV || "development";
const knexConfig = require("../knexfile");
const knex = require("knex")(knexConfig[ENV]);

module.exports = function(request) {

  profileEditRoutes.post("/insert_user_if_not_exist", function(req, res) {
    var options = {
      url: "https://api.spotify.com/v1/me",
      headers: { Authorization: "Bearer " + req.body.user_token },
      json: true
    };

    request.get(options, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        let avatar = (body.images.length === 0) ? null : body.images[0].url;
        let userInfo = {
          name: body.display_name,
          avatar: avatar,
          email: body.email
        };

        knex('users').where('name', userInfo.name)
        .then(function(rows) {
          if (rows.length === 0) {
            knex('users')
            .insert(userInfo)
            .returning('id')
            .then((id) => {
              console.log(id[0]);
              knex('favourite')
              .insert({"user_id": id[0]})
              .then(()=> {
                console.log("Insert New User");
                res.status(200);
              });
            });
          } else {
            console.log("User exist");
            res.status(200);
          }
        })
        .catch((error) => {
          console.log("profileEditRoutes insert new user error1:");
          res.status(500).send({error: error});
          throw error;
        });
      } else {
        console.log("profileEditRoutes insert new user error2:");
        console.log(error);
        res.status(500).send({error: error});
        throw error;
      }
    });
  });

  profileEditRoutes.get("/user_info/:email", function(req, res) {

    knex('users').where('email', req.params.email)
    .then((rows) => {
      let user_id = rows[0].id;
      let userName = rows[0].name;
      let userAvatar = rows[0].avatar;
      let userEmail = rows[0].email;

      Promise.all([
        new Promise(function(resolve, reject) {
          knex
          .select('*')
          .from('favourite')
          .innerJoin('users', user_id, 'favourite.user_id')
          .innerJoin('favourite_genre', 'favourite.id', 'favourite_genre.favourite_id')
          .innerJoin('genre', 'favourite_genre.genre_id', 'genre.id')
          .then((results) => {
            let genreArr = [];
            for (let genre of results) {
              genreArr.push(genre.name);
            }
            resolve(genreArr);
          })
          .catch((error) => {
            console.log("Error when get favourite genre:", error);
            res.status(500).send({error: error});
            throw error;
          });
        }),

        new Promise(function(resolve, reject) {
          knex
          .select('*')
          .from('favourite')
          .innerJoin('users', user_id, 'favourite.user_id')
          .innerJoin('favourite_artist', 'favourite.id', 'favourite_artist.favourite_id')
          .innerJoin('artist', 'favourite_artist.artist_id', 'artist.id')
          .then((results) => {
            let artistArr = [];
            for (let artist of results) {
              artistArr.push(artist.name);
            }
            resolve(artistArr);
          })
          .catch((error) => {
            console.log("Error when get favourite artist:", error);
            res.status(500).send({error: error});
            throw error;
          });
        }),

        new Promise(function(resolve, reject) {
          knex
          .select('*')
          .from('favourite')
          .innerJoin('users', user_id, 'favourite.user_id')
          .innerJoin('favourite_song', 'favourite.id', 'favourite_song.favourite_id')
          .innerJoin('song', 'favourite_song.song_id', 'song.id')
          .then((results) => {
            let songArr = [];
            for (let song of results) {
              songArr.push(song.name);
            }
            resolve(songArr);
          })
          .catch((error) => {
            console.log("Error when get favourite song:", error);
            res.status(500).send({error: error});
            throw error;
          });
        }),
      ])
      .then(function(values) {
        let userDetailInfo = {
          name: userName,
          avatar: userAvatar,
          email: userEmail,
          favoriteGenres: values[0],
          favoriteArtists: values[1],
          favoriteSongs: values[2],
        };

        res.status(200).send(userDetailInfo);
      })
      .catch((error) => {
        console.log("Error when after promise:", error);
        res.status(500).send({error: error});
        throw error;
      });
    })
    .catch((error) => {
      console.log("Error in the end at user_info:", error);
      res.status(500).send({error: error});
      throw error;
    });
  });

  profileEditRoutes.post("/edit/", function(req, res) {

    let type = req.body.type;
    console.log("type:", type);

    let data = req.body.favoriteData;
    console.log("data:", data);

    let userName = req.body.userName;
    console.log("userName:", userName);

    let userId = -1;
    let favouriteId = -1;

    knex('users').where('name', userName)
    .then((rows) => {
      userId = rows[0].id;

      knex('favourite').where('user_id', userId)
      .then((rows) => {
        favouriteId = rows[0].id;

        console.log("userId:", userId);
        console.log("favouriteId:", favouriteId);

        let dbType = "";
        let dbContent = "";
        let contentIdType = "";
        switch (type) {
          case "Genre":
            dbType = "favourite_genre";
            dbContent = "genre";
            contentIdType = "genre_id";
            break;
          case "Artist":
            dbType = "favourite_artist";
            dbContent = "artist";
            contentIdType = "artist_id";
            break;
          case "Song":
            dbType = "favourite_song";
            dbContent = "song";
            contentIdType = "song_id";
            break;
          break;
        };

        console.log("dbType:", dbType);
        console.log("contentIdType:", contentIdType);
        console.log("dbContent:", dbContent);

        knex(dbType)
          .where('favourite_id', favouriteId)
          .del()
          .then(function (result) {
            for(let item of data) {
              knex(dbContent).where('name', item)
              .then((favouriteContent) => {
                console.log("favouriteContent:");
                console.log(favouriteContent);

                if (favouriteContent.length !== 0) {
                  let updateObj = {};
                  updateObj['favourite_id'] = favouriteId;
                  updateObj[contentIdType] = favouriteContent[0].id;

                  knex(dbType)
                  .insert(updateObj)
                  .then((results) => {
                    console.log("results:");
                    console.log(results);
                  });
                } else {
                  console.log("Insert New Content:", item);
                  knex(dbContent)
                  .insert({name: item})
                  .returning('id')
                  .then(function (id) {
                    console.log("id:", id[0]);
                    let updateObj = {};
                    updateObj['favourite_id'] = favouriteId;
                    updateObj[contentIdType] = id[0];
                    knex(dbType)
                    .insert(updateObj)
                    .then((results) => {
                      console.log("results:");
                      console.log(results);
                      res.status(200).send({results: "Insert Success."});
                    });
                  });
                }
              });
            }
          });
        });
      });

    // edit username
    if (type === "username") {
      res.json({ username: req.body.username });
      return;
    }

    // edit avatar
    if (type === "avatar") {
      res.json({ avatar: req.body.avatar });
      return;
    }
  });

  profileEditRoutes.post("/friends", function(req, res) {
    const userId = req.body.userId;
    selectQueries
      .selectFriends(userId)
      .then(friends => {
        res.json({ friends: friends });
      })
      .catch(e => {
        console.log("error with select friends async function", e);
      });
  });

  return profileEditRoutes;
};
