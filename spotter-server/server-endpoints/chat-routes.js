const express = require("express");
const chatRoutes = express.Router();
const search = require("../search/search-spotify.js")
const uuidv4 = require('uuid/v4');

module.exports = function(selectQueries, insertQueries) {
  chatRoutes.get("/chatrooms/:user_id", function(req, res) {
    let userId = req.params.user_id;
    selectQueries.selectFriendChats(userId).then(chatrooms => {
      res.json({ chatrooms });
    })
    .catch(e => console.log('GET /chatroom/create', e))
  });

  chatRoutes.post("/chatroom/create", function(req, res) {
    let { userId, friendId } = req.body;
    selectQueries.checkIfChatroomExists(userId, friendId).then(chatroomId => {
      console.log(chatroomId)
      if(chatroomId) {
        console.log(chatroomId)
        res.json({chatroomId})
      }else {
        insertQueries.addChatroom(userId, friendId)
          .then(chatroomId => res.json({chatroomId}))
          .catch(e => console.log('POST /chatrooms/:user_id', e))
      }
    })
  });

  chatRoutes.get("/message/view/:chatroom_id/:limit", function(req, res) {
    let { chatroom_id, limit } = req.params
    selectQueries.selectMessages(chatroom_id, limit).then(messages => {
      res.json({ messages })
    })
    .catch(e => console.log("GET /message/view/:chatroom_id", e))
  })

  chatRoutes.post("/message/create", function(req, res) {
    let { content, type, userId, chatroomId, spotifyId } = req.body
    let id = type === 'track' ? spotifyId + '-' + uuidv4() : uuidv4()
    insertQueries.addMessage(content, type, userId, chatroomId, id).then(data => {
      res.json({ data })
    })
    .catch(e => console.log("POST /message/create", e))
  })

  chatRoutes.get("/track/:id", function(req, res) {
    let { id } = req.params;
    search.searchTrackById(id).then(track => {res.json({track})})
    .catch(e => console.log("GET /track/:id", e))
  })

  chatRoutes.post("/track/suggest", function(req, res) {
    let { title } = req.body;
    let type = 'track';
    search.searchSpotify(type, title).then(searchResults =>{
      res.json({searchResults})
    })
    .catch(e => console.log("POST /track/suggest", e))
  })

  return chatRoutes;
};
