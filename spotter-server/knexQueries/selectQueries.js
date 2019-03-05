module.exports = function returnQueries(knex) {
  return {

    selectFriends: async function(userId) {
      try {
        let friendIds = await knex('friend').select('friend_id').where({user_id: userId});
        let friends = []
        for(let i = 0; i < friendIds.length; i++){
          let friend = await this.selectUserById(friendIds[i].friend_id);
          friends.push(friend);
        }
        return friends
      }
      catch(e) {
        console.log('error selecting user\'s friends', e);
      }
    },

    selectUserById: async function(userId) {
      try {
        let user = await knex('users').select('name', 'id').where({id: userId});
        return user[0]
      }
      catch(e) {
        console.log('error selecting user by id');
      }
    }

  }
}