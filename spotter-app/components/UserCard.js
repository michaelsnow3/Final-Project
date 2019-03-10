import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function UserCard({name, id, handler, handleChatWithFriend, friend, userId, url, fetchChatrooms}) {
  handler2 = () => {
    handler (id, 'OtherProfileScreen')
  }
  async function startNewChat() {
    await fetch(`${url}:8888/chat/chatroom/create`, {
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
      console.log(chatroomId, friend.name)
      handleChatWithFriend({
        name: friend.name,
        chatroomId: chatroomId
      }, 'showChat')
      fetchChatrooms()
    })
  }
  if(handleChatWithFriend) {
    handler2 = () => {
      startNewChat()
    }
  }
  console.log(handleChatWithFriend)
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
    backgroundColor: '#bfffea',
    marginTop: 5,
    marginBottom: 5
  },
  name: {
    fontSize: 30,
    textAlignVertical: 'center'
  }
});

export default UserCard;