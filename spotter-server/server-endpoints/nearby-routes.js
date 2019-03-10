const express = require("express");
const nearbyRoutes = express.Router();

module.exports = function(request) {

  nearbyRoutes.get("/:user_token", function(req, res) {
    console.log("Start Finding People");
    console.log("UserToken:");
    console.log(req.params.user_token);
    res.status(200).send({userToken: "token"});
  });

  return nearbyRoutes;
};
