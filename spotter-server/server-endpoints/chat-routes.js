const express = require("express");
const chatRoutes = express.Router();

module.exports = function(selectQueries, insertQueries) {
  chatRoutes.post("/chatrooms", function(req, res) {
    let userId = req.body.userId;
    selectQueries.selectFriendChats(userId).then(chatrooms => {
      res.json({ chatrooms });
    });
  });

  chatRoutes.post("/message/view", function(req, res) {
    let chatroomId = req.body.chatroomId;
    selectQueries.selectMessages(chatroomId).then(messages => {
      console.log(messages)
      res.json({ messages })
    })
  })

  return chatRoutes;
};
