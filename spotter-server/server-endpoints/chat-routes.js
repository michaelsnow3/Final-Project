const express = require("express");
const chatRoutes = express.Router();
const search = require("../search/search-spotify.js")

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

  chatRoutes.get("/track/:id", function(req, res) {
    let { id } = req.params;
    search.searchTrackById(id).then(track => {res.json({track})});
  })

  chatRoutes.post("/track/suggest", function(req, res) {
    let { title } = req.body;
    let type = 'track';
    search.searchSpotify(type, title).then(searchResults =>{
      res.json({searchResults})
    });
  })

  return chatRoutes;
};
