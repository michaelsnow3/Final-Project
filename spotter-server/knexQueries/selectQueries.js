module.exports = function returnQueries(knex) {
  return {
    selectUserById: async function(userId) {
      try {
        let user = await knex("users")
          .select("name", "id")
          .where({ id: userId });
        return user[0];
      } catch (e) {
        console.log("error selecting user by id");
      }
    },

    selectFriends: async function(userId) {
      try {
        let friendIds = await knex("friend")
          .select("friend_id")
          .where({ user_id: userId });
        let friends = [];
        for (let i = 0; i < friendIds.length; i++) {
          let friend = await this.selectUserById(friendIds[i].friend_id);
          friends.push(friend);
        }
        return friends;
      } catch (e) {
        console.log("error selecting user's friends");
      }
    },

    selectFriendChats: async function(userId) {
      try {
        // select all chatroom ids for user
        let userChatroomIds = await knex("user_chatroom")
          .select("chatroom_id")
          .where({ user_id: userId });
        // for each chatroom select other users id, name and the chatrooms id
        let chatrooms = [];
        for (let i = 0; i < userChatroomIds.length; i++) {
          let chatroom = await knex.select('user_id', 'users.name', 'chatroom_id')
            .from('users')
            .innerJoin('user_chatroom', {'users.id': 'user_id'})
            .where({'chatroom_id': userChatroomIds[i].chatroom_id})
            .whereNot({'user_id': userId});
          chatroom[0] && chatrooms.push(chatroom[0]);
        }
        return chatrooms
      } catch (e) {
        console.log("error selecting all friends user has chats with");
      }
    },

    selectMessages: async function(chatroomId) {
      let messages = await knex().select('content')
        .from('message')
        .where({'chatroom_id': chatroomId})
      return messages
    }

  };
};
