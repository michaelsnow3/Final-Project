const express = require("express");
const messageEditRoutes = express.Router();

module.exports = function(knex) {
  messageEditRoutes.post("/friends", function(req, res) {
    
  });

  return messageEditRoutes;
};
