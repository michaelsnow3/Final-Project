require("dotenv").config();

const PORT = process.env.PORT || 8888;
const ENV = process.env.ENV || "development";

const express = require("express"); // Express web server framework
const request = require("request"); // "Request" library
const rp = require("request-promise") //request promise library
const cors = require("cors");
const cookieParser = require("cookie-parser");
const querystring = require("querystring");

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);

// import query functions
const selectQueries = require("./knexQueries/selectQueries.js")(knex);
const insertQueries = require("./knexQueries/insertQueries.js")(knex);

// const routes = require("./routes");

const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your secret

const redirect_uri = 'http://78955d4f.ngrok.io/callback/'; // Your redirect uri

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
app.use("/profile/", profileEditRoutes(request, selectQueries));

// chat endpoints
const chatRoutes = require("./server-endpoints/chat-routes.js");
app.use("/chat/", chatRoutes(selectQueries, insertQueries));

// show friends routes
const friendRoutes = require("./server-endpoints/show-friends-routes.js");
app.use("/show-friends/", friendRoutes(selectQueries));

// message endpoint
const messageEditRoutes = require("./server-endpoints/message-routes.js");
app.use("/message/", messageEditRoutes());

// add friend endpoint
const addFriendRoutes = require("./server-endpoints/add-friend-routes");
app.use("/add_friend", addFriendRoutes);

// show profile endpoint
const showProfileRoutes = require("./server-endpoints/show-profile-routes")
app.use('/show_profile', showProfileRoutes(knex));

// Find people nearby endpoint
const nearbyRoutes = require("./server-endpoints/nearby-routes")
app.use('/nearby', nearbyRoutes(knex));

//app.use("/routes", routes(knex));

console.log("Listening on port " + PORT);
app.listen(PORT);
