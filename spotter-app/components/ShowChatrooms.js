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

import Chatroom from '../components/Chatroom.js'

class ShowChatrooms extends React.Component {
  render(){
    let { chatrooms, handleChatWithFriend } = this.props;
    const chatroomList = chatrooms.map(chatroom => {
      return <Chatroom name={chatroom.name} chatroomId={chatroom.chatroom_id} handleChatWithFriend={handleChatWithFriend} key={Math.random().toString()} />
    });
    return(
      <View style={styles.container}>
        <Text style={styles.name}>Chats</Text>
        <Text>{"\n"}</Text>
        <ScrollView>{chatroomList}</ScrollView>
        <TouchableOpacity style={styles.backButton} onPress={() => handleChatWithFriend(null, 'startChat')}>
          <Text style={styles.text}>Start a New Chat With a Friend</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    fontSize: 50,
    textAlign: 'center'
  },
  text: {
    fontSize: 25,
    textAlign: 'center',
  },
  backButton: {
    height: 50,
    backgroundColor: '#dde5d7',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
  }
});
export default ShowChatrooms