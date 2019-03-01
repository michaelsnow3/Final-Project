var express = require('express'); // Express web server framework
var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var rp = require('request-promise')
var cors = require('cors');
var querystring = require('querystring');

require('dotenv').config();

var app = express();
var client_id = process.env.CLIENT_ID; // Your client id
var client_secret = process.env.CLIENT_SECRET; // Your secret


exports.getSongs = async function(song) {

  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  let getTokenResponse = await rp.post(authOptions)
  let token = getTokenResponse.access_token

  var options = {
    url: `https://api.spotify.com/v1/search?q=${song}&type=track`,
    headers: {
      'Authorization': 'Bearer ' + token
    },
    json: true
  };

  let spotifySearchResponse = await rp.get(options);
  let filteredSongs = [];
  spotifySearchResponse.tracks.items.forEach(track => {
    filteredSongs.push({
      spotifyId: track.id,
      name: track.name,
      artists: track.artists
    })
  })
  return filteredSongs
}