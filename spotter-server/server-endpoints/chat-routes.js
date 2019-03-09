const express = require("express");
const chatRoutes = express.Router();
const search = require("../search/search-spotify.js")
const uuidv4 = require('uuid/v4');

module.exports = function(selectQueries, insertQueries) {
  chatRoutes.get("/chatrooms/:user_id", function(req, res) {
    let userId = req.params.user_id;
    selectQueries.selectFriendChats(userId).then(chatrooms => {
      res.json({ chatrooms });
    });
  });

  chatRoutes.get("/message/view/:chatroom_id", function(req, res) {
    let chatroomId = req.params.chatroom_id;
    selectQueries.selectMessages(chatroomId).then(messages => {
      res.json({ messages })
    })
  })

  chatRoutes.post("/message/create", function(req, res) {
    let { content, type, userId, chatroomId, spotifyId } = req.body
    let id = type === 'track' ? spotifyId : uuidv4()
    insertQueries.addMessage(content, type, userId, chatroomId, id).then(data => {
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
