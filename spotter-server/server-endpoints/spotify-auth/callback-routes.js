const express = require("express");
const callbackRoutes = express.Router();
require("dotenv").config();

module.exports = function(stateKey, querystring, redirect_uri, request) {
  callbackRoutes.get("/", function(req, res) {
    // your application requests refresh and access tokens
    // after checking the state parameter

    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
      res.redirect(
        "/#" +
          querystring.stringify({
            error: "state_mismatch"
          })
      );
    } else {
      res.clearCookie(stateKey);
      var authOptions = {
        url: "https://accounts.spotify.com/api/token",
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: "authorization_code"
        },
        headers: {
          Authorization:
            "Basic " +
            new Buffer(
              process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
            ).toString("base64")
        },
        json: true
      };

      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          var access_token = body.access_token,
            refresh_token = body.refresh_token;

          var options = {
            url: "https://api.spotify.com/v1/me",
            headers: { Authorization: "Bearer " + access_token },
            json: true
          };

          // use the access token to access the Spotify Web API
          request.get(options, function(error, response, body) {
            let userInfo = {
              username: body.display_name,
              avatar: body.images[0].url,
              email: body.email
            };
            console.log(userInfo);
          });

          // get users top tracks
          var userTopTracks = {
            url: "https://api.spotify.com/v1/me/top/tracks",
            headers: { Authorization: "Bearer " + access_token },
            json: true
          };

          request.get(userTopTracks, function(error, response, body) {
            let topTracks = body.items.map(track => {
              return {
                name: track.name,
                spotifyId: track.id,
                artistId: track.artists.map(artist => artist.id),
                artistName: track.artists.map(artist => artist.name)
              };
            });

            console.log(topTracks);
          });

          // get users top artists
          var userTopArtists = {
            url: "https://api.spotify.com/v1/me/top/artists",
            headers: { Authorization: "Bearer " + access_token },
            json: true
          };

          request.get(userTopArtists, function(error, response, body) {
            let topArtists = body.items.map(artist => {
              return {
                name: artist.name,
                spotifyId: artist.id
              };
            });

            console.log(topArtists);
          });

          // we can also pass the token to the browser to make requests from there
          res.redirect(
            "/#" +
              querystring.stringify({
                access_token: access_token,
                refresh_token: refresh_token
              })
          );
        } else {
          res.redirect(
            "/#" +
              querystring.stringify({
                error: "invalid_token"
              })
          );
        }
      });
    }
  });

  return callbackRoutes;
};
