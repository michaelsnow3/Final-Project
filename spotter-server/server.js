
require('dotenv').config();

const PORT = process.env.PORT || 8888;
const ENV = process.env.ENV || "development";
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);

const express = require('express'); // Express web server framework
const request = require('request'); // "Request" library
const cors = require('cors');
const cookieParser = require('cookie-parser');
const querystring = require('querystring');

const routes = require("routes");

const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret
const redirect_uri = 'http://d5b3d9ee.ngrok.io/callback/'; // Your redirect uri

const stateKey = 'spotify_auth_state';

const app = express();

app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());

// //spotify Oauth endpoints
const loginRoutes = require('./spotify-auth/login-routes.js')
app.use('/login/', loginRoutes(stateKey, querystring, redirect_uri))

const callbackRoutes = require('./spotify-auth/callback-routes.js');
app.use('/callback/', callbackRoutes(stateKey, querystring, redirect_uri, request))

const refreshTokenRoutes = require('./spotify-auth/refresh-token-routes.js')
app.use('/refreshTokenRoutes/', refreshTokenRoutes())

const search = require('./search/search-spotify.js')
search.searchSpotify('track', 'Danger Zone').then(data => {
  console.log(data)
})

app.use("/routes", routes(knex));


console.log('Listening on port ' + PORT);
app.listen(PORT);

