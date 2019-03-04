const express = require("express");
const addFriend = express.Router();

module.exports = function() {
  addFriend.post("/", function(req, res) {
    console.log("in add friend");
  });

  return addFriend;
};
