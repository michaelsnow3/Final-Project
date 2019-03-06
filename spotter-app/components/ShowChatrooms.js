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
      return <Chatroom name={chatroom.name} id={chatroom.id} handleChatWithFriend={handleChatWithFriend} key={Math.random().toString()} />
    });
    return(
      <View>
        <Text style={styles.name}>chatrooms:</Text>
        {chatroomList}
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