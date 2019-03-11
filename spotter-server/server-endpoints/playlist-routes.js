
const express = require("express");
const playlistRoutes = express.Router();

module.exports = function(selectQueries, insertQueries) {

  playlistRoutes.get("/:token", function(req, res) {

  });

  return playlistRoutes

}