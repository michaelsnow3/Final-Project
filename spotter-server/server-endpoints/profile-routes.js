const express = require("express");
const profileEditRoutes = express.Router();
const search = require("../search/search-spotify.js");

module.exports = function() {

  profileEditRoutes.post("/user_info/:user_token", function(req, res) {

    console.log("user_token:" + params.user_token);

    var options = {
      url: "https://api.spotify.com/v1/me",
      headers: { Authorization: "Bearer " + params.user_token },
      json: true
    };

    request.get(options, function(error, response, body) {
      let avatar = (body.images.length === 0) ? null : body.images[0].url;
      let userInfo = {
        username: body.display_name,
        avatar: avatar,
        email: body.email
      };
      console.log(userInfo);
    });
    return profileEditRoutes;
  }

  profileEditRoutes.post("/edit/:type", function(req, res) {
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

  return profileEditRoutes;
};
