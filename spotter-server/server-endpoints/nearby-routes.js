const express = require("express");
const nearbyRoutes = express.Router();

module.exports = function(knex) {

  nearbyRoutes.get("/get_id/:user_id_from_spotify", function(req, res) {

    console.log("Get User ID:", req.params.user_id_from_spotify);

    knex('users').where('name', req.params.user_id_from_spotify)
    .then(function(rows) {
      console.log(rows);
      if (rows.length === 0) {
        console.log("Id:", rows[0].id);
        res.status(200).send({id: rows[0].id});
      } else {
        console.log("User doesn't exist");
        res.status(200);
      }
    })
    .catch((error) => {
      console.log("nearbyRoutes get user id error1:");
      res.status(500).send({error: error});
      throw error;
    });

    res.status(500).send({error: "Can't Get Id"});
  });

  return nearbyRoutes;
};
