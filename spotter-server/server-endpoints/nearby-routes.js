const express = require("express");
const nearbyRoutes = express.Router();
const search = require("../search/search-spotify.js");

module.exports = function(knex) {

  nearbyRoutes.get("/get_id/:user_id_from_spotify", function(req, res) {

    console.log("Get User ID:", req.params.user_id_from_spotify);

    knex('users').where('name', req.params.user_id_from_spotify)
    .then(function(rows) {
      console.log(rows);
      if (rows.length !== 0) {
        console.log("Id:", rows[0].id);
        res.status(200).send(JSON.stringify({id: rows[0].id}));
        return;
      } else {
        console.log("User doesn't exist");
        res.status(200);
        return;
      }
    })
    .catch((error) => {
      console.log("nearbyRoutes get user id error:");
      res.status(500).send({error: error});
      throw error;
    });
  });

  nearbyRoutes.get("/get_cover/:type/:content", function(req, res) {

    console.log(`In /get_cover/${req.params.type}/${req.params.content}`);

    search.searchSpotify(req.params.type, req.params.content)
    .then(track => {
      console.log(track);
      res.json({track});
    })
    .catch(e => console.log("GET /track/:id", e))
  });

  return nearbyRoutes;
};
