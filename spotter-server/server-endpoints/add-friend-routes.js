const express = require("express");
const profileEditRoutes = express.Router();

module.exports = function() {
  addFriend.post("/add-friend", function(req, res) {
    console.log("in add friend");
  });

  return addFriend;
};
