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

function UserCard({name, id, handler, handleChatWithFriend, friend, userId, url, fetchChatrooms, backgroundColor}) {
  handler2 = () => {
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
  if(handleChatWithFriend) {
    handler2 = () => {
      startNewChat()
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