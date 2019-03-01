var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var cookieParser = require('cookie-parser');
var querystring = require('querystring');

require('dotenv').config();

var client_id = process.env.CLIENT_ID; // Your client id
var client_secret = process.env.CLIENT_SECRET; // Your secret
var redirect_uri = 'http://localhost:8888/callback/'; // Your redirect uri

var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());

//spotify Oauth endpoints
const loginRoutes = require('./spotify-auth/login-routes.js')
app.use('/login/', loginRoutes(stateKey, querystring, redirect_uri))

const callbackRoutes = require('./spotify-auth/callback-routes.js');
app.use('/callback/', callbackRoutes(stateKey, querystring, redirect_uri, request))

const refreshTokenRoutes = require('./spotify-auth/refresh-token-routes.js')
app.use('/refreshTokenRoutes/', refreshTokenRoutes())

console.log('Listening on 8888');
app.listen(8888);
