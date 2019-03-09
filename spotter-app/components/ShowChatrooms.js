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
      <View>
        <Text style={styles.name}>Chats</Text>
        <Text>{"\n"}</Text>
        <ScrollView>{chatroomList}</ScrollView>
        <TouchableOpacity onPress={() => handleChatWithFriend(null, 'startChat')}><Text>Start a New Chat With a Friend</Text></TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  name: {
    fontSize: 50,
    textAlign: 'center'
  }
});
export default ShowChatrooms