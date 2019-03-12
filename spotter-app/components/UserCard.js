import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function UserCard({name, id, handler, page, setFriendName, handleChatWithFriend, friend, userId, url, fetchChatrooms, prevFriend}) {
  let newLetter = false
  if(!prevFriend || name[0].toUpperCase() !== prevFriend.name[0].toUpperCase()) {
    newLetter = <View style={styles.newLetterContainer}><Text style={styles.newLetterText}>{name[0].toUpperCase()}</Text></View>
  }
  if(page === 'FriendRequests') {
    newLetter = false
  }

  handler2 = () => {
    console.log(111111,'usercard', id)
    handler (id, 'OtherProfileScreen')
  }
  async function startNewChat() {

    console.log("url startNewChat:", `${url}/chat/chatroom/create`);

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

      console.log("chatroomIdchatroomId:");
      console.log(chatroomId);

      handleChatWithFriend({
        name: friend.name,
        chatroomId: chatroomId
      }, 'showChat')
    })
    .then(() => {
      fetchChatrooms()
    });
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
    <View>
      {newLetter}
      <TouchableOpacity style={styles.container} onPress={handler2}>
        <Text style={styles.name}>{name}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    borderBottomWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
  },
  name: {
    fontSize: 30,
    textAlignVertical: 'center',
    marginLeft: 15,
  },
  newLetterContainer: {
    backgroundColor: 'rgba(36, 207, 95, 0.1)',
    borderBottomWidth: 1,
  },
  newLetterText: {
    fontSize: 20,
    paddingLeft: 15,
    
  }
});

export default UserCard;