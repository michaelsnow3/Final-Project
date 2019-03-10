var rp = require('request-promise')
require('dotenv').config();

var client_id = process.env.CLIENT_ID; // Your client id
var client_secret = process.env.CLIENT_SECRET; // Your secret


async function searchSpotify(type, title) {

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
  // console.log(spotifySearchResponse.artists.items[0])
  let filteredItems = [];
  let filter = `${type}s`;
  spotifySearchResponse[filter].items.forEach((item, i) => {
    filteredItems.push({
      spotifyId: item.id,
      name: item.name
    })

    // get artist spotify id search type is a song 
    if(type === 'track'){
      item.artists.forEach(artist => {
        filteredItems[i].artistId = [];
        filteredItems[i].artistName = [];
        filteredItems[i].artistId.push(artist.id)
        filteredItems[i].artistName.push(artist.name)
      })
    }
  })
  return filteredItems
}

async function searchTrackById(id) {
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
    url: `https://api.spotify.com/v1/tracks/${id}`,
    headers: {
      'Authorization': 'Bearer ' + token
    },
    json: true
  };

  let spotifySearchResponse = await rp.get(options);
  let trackInfo = {
    name: spotifySearchResponse.name,
    artistName: spotifySearchResponse.artists[0].name,
    id: spotifySearchResponse.id,
    url: spotifySearchResponse.external_urls.spotify
  }
  return trackInfo
}

module.exports = {
  searchSpotify: searchSpotify,
  searchTrackById: searchTrackById
}
