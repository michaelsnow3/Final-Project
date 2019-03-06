const express = require("express");
const chatRoutes = express.Router();

module.exports = function(selectQueries) {
  chatRoutes.post("/chatrooms", function(req, res) {
    let userId = req.body.userId;
    selectQueries.selectFriendChats(userId).then(chatrooms => {
      res.json({ chatrooms });
    });
  });

  return chatRoutes;
};
