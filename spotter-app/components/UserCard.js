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

function UserCard({name, id, handler, handleChatWithFriend, friend, userId, url}) {
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
    })
    // handleChatWithFriend(friend, 'showChat')
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
    borderColor: '#d6d7da',
    backgroundColor: '#adccff'
  },
  name: {
    fontSize: 30,
    textAlignVertical: 'center'
  }
});

export default UserCard;