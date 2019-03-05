require("dotenv").config();

const PORT = process.env.PORT || 8888;
const ENV = process.env.ENV || "development";
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);

const express = require("express"); // Express web server framework
const request = require("request"); // "Request" library
const cors = require("cors");
const cookieParser = require("cookie-parser");
const querystring = require("querystring");

const routes = require("routes");

const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret

const redirect_uri = 'https://mysterious-gorge-24322.herokuapp.com/callback/'; // Your redirect uri

const stateKey = "spotify_auth_state";

const app = express();
const bodyParser = require("body-parser");

app
  .use(express.static(__dirname + "/public"))
  .use(cors())
  .use(cookieParser())
  .use(bodyParser.json())
  .use(
    bodyParser.urlencoded({
      extended: true
    })
  );

// spotify Oauth endpoints
const loginRoutes = require("./server-endpoints/spotify-auth/login-routes.js");
app.use("/login/", loginRoutes(stateKey, querystring, redirect_uri));

const callbackRoutes = require("./server-endpoints/spotify-auth/callback-routes.js");
app.use(
  "/callback/",
  callbackRoutes(stateKey, querystring, redirect_uri, request)
);

const refreshTokenRoutes = require("./server-endpoints/spotify-auth/refresh-token-routes.js");
app.use("/refresh_token/", refreshTokenRoutes());

// user profile endpoint
const profileEditRoutes = require("./server-endpoints/profile-routes.js");
app.use("/profile/", profileEditRoutes());

// add friend endpoint
const addFriendRoutes = require("./server-endpoints/add-friend-routes");
app.use('/add_friend', addFriendRoutes)

//app.use("/routes", routes(knex));

console.log('Listening on port ' + PORT);
app.listen(PORT);
