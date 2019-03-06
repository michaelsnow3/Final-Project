module.exports = function insertQueries(knex) {
  return {
    addMessage: async function (inputContent, inputType, userId, chatroomId) {
      try{
        await knex('message').insert({type: inputType, content: inputContent, user_id: userId, chatroom_id: chatroomId});
      }
      catch(e) {
        console.log('error inserting message into database', e)
      }
    }
  }
}