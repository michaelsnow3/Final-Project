import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

function UserCard({name, id, handler, setName, setFriendName, handleChatWithFriend, friend, userId, url, fetchChatrooms, backgroundColor}) {
  handler2 = () => {
    console.log(111111,'usercard', id)
    handler (id, 'OtherProfileScreen')
  }
  async function startNewChat() {
    await fetch(`${url}/chat/chatroom/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: userId,
        friendId: id
      })
    }).then(data => {
      let chatroomId = JSON.parse(data._bodyInit).chatroomId
      handleChatWithFriend({
        name: friend.name,
        chatroomId: chatroomId
      }, 'showChat')
      fetchChatrooms()
    })
  }
  if (handleChatWithFriend) {
    handler2 = () => {
      startNewChat()
    }
  }

  if (setFriendName) {
    handler2 = () => {
      console.log(22222222,'usercard', id)
      setFriendName(name);
      handler (id, 'OtherProfileScreen')
    }
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handler2}>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'black',
    marginTop: 5,
    marginBottom: 5,
    justifyContent: 'center',
    backgroundColor: '#ffc787'
  },
  name: {
    fontSize: 30,
    textAlignVertical: 'center'
  }
});

export default UserCard;