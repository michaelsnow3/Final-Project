module.exports = function insertQueries(knex) {
  return {

    addMessage: async function (content, type, userId, chatroomId, id) {
      try{
        await knex('message').insert({id: id, type: type, content: content, user_id: userId, chatroom_id: chatroomId});
      }
      catch(e) {
        console.log('error inserting message into database', e)
      }
    }
  }
}