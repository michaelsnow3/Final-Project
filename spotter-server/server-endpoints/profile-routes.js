const express = require("express");
const profileRoutes = express.Router();
const search = require("../search/search-spotify.js");


module.exports = function(selectQueries) {

  profileRoutes.post("/edit/:type", function(req, res) {
    let inputType = req.params.type;

    // edit username
    if (inputType === "username") {
      res.json({ username: req.body.username });
      return;
    }

    // edit avatar
    if (inputType === "avatar") {
      res.json({ avatar: req.body.avatar });
      return;
    }

    // edit favourite song/artist
    let inputTitle = req.body.title;

    search.searchSpotify(inputType, inputTitle).then(searchList => {
      console.log(searchList);
      res.json({ searchResults: searchList });
    });
  });

  profileRoutes.post("/friends", function(req, res) {
    console.log('in friends post request')
    const userId = req.body.userId;
    selectQueries.selectFriends(userId).then((friends) => {
      res.json({ friends: friends })
    })
    .catch((e) => {
      console.log('error with select friends async function', e)
    })
  });

  return profileRoutes;
};

