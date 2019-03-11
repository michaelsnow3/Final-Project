const express = require("express");
const friendRoutes = express.Router();

module.exports = function(selectQueries) {
  friendRoutes.post("/", function(req, res) {
    const userID = req.body.id;
    console.log("userID in show-friends-page:", userID);
    selectQueries.selectFriends(userID, selectQueries.verifyFriends)
    .then((data) => {
      res.json(data)
    })


    console.log("show friends ");
  });

  return friendRoutes;
};
