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

import UserCard from '../components/UserCard'

class ShowChatrooms extends React.Component {
  render(){
    let { chatrooms, handleChatWithFriend } = this.props;
    const chatroomList = chatrooms.map(chatroom => {
      return <UserCard name={chatroom.name} id={chatroom.id} handleChatWithFriend={handleChatWithFriend} key={Math.random().toString()} />
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