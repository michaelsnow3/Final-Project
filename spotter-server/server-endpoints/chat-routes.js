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
      res.json({ messages })
    })
  })

  chatRoutes.post("/message/create", function(req, res) {
    let { content, type, userId, chatroomId } = req.body

    insertQueries.addMessage(content, type, userId, chatroomId).then(data => {
      res.json({ data })
    })

  })

  return chatRoutes;
};
