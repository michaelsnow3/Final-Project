module.exports = function insertQueries(knex) {
  return {

    addMessage: async function (content, type, userId, chatroomId, spotifyId) {
      try{
        if(spotifyId) {
          await knex('message').insert({id: spotifyId, type: type, content: content, user_id: userId, chatroom_id: chatroomId});
        }else {
          await knex('message').insert({type: type, content: content, user_id: userId, chatroom_id: chatroomId});
        }
      }
      catch(e) {
        console.log('error inserting message into database', e)
      }
    }
  }
}