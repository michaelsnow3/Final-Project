const express = require("express");
const friendRoutes = express.Router();

module.exports = function(selectQueries) {
  friendRoutes.post("/", function(req, res) {
    const userID = req.body.id;
    selectQueries.selectFriends(userID)
    .then((data) => {
      res.json(data)
    })
  });
  return friendRoutes;
};
