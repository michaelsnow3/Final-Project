var rp = require('request-promise')
require('dotenv').config();

var client_id = process.env.CLIENT_ID; // Your client id
var client_secret = process.env.CLIENT_SECRET; // Your secret

exports.topSongs = async function() {

  let user = { country: 'CA',
  display_name: 'Mike Snow',
  email: 'mikesnow444@gmail.com',
  external_urls: { spotify: 'https://open.spotify.com/user/mikesnow444' },
  followers: { href: null, total: 2 },
  href: 'https://api.spotify.com/v1/users/mikesnow444',
  id: 'mikesnow444',
  images:
   [ { height: null,
       url:
        'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=636112509795662&height=200&width=200&ext=1554031664&hash=AeRZyLHZw5TlIYPQ',
       width: null } ],
  product: 'open',
  type: 'user',
  uri: 'spotify:user:mikesnow444' };

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