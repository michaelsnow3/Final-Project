var rp = require('request-promise')
require('dotenv').config();

var client_id = process.env.CLIENT_ID; // Your client id
var client_secret = process.env.CLIENT_SECRET; // Your secret


exports.searchSpotify = async function(type, title) {

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
    url: `https://api.spotify.com/v1/search?q=${title}&type=${type}`,
    headers: {
      'Authorization': 'Bearer ' + token
    },
    json: true
  };

  let spotifySearchResponse = await rp.get(options);
  let filteredItems = [];
  let filter = `${type}s`;
  spotifySearchResponse[filter].items.forEach((item, i) => {
    filteredItems.push({
      spotifyId: item.id,
      name: item.name
    })

    // get artist spotify id search type is a song 
    if(type === 'track'){
      filteredItems[i].artistId = item.artists.map(artist => {
        return artist.id
      })
    }
  })
  return filteredItems
}