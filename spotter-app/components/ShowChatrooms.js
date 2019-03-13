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
    let { chatrooms, handleChatWithFriend, url } = this.props;
    const chatroomList = chatrooms.map((chatroom, i) => {
      return (
        <Chatroom 
          name={chatroom.name} 
          chatroomId={chatroom.chatroom_id} 
          handleChatWithFriend={handleChatWithFriend} 
          key={i} 
          url={url}
        />
      )
    });
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.name}>Chats</Text>
          <TouchableOpacity style={styles.startChat} onPress={() => handleChatWithFriend(null, 'startChat')}>
            <Image
              style={styles.image}
              source={{
                uri: "https://cdn.iconscout.com/icon/premium/png-256-thumb/new-chat-2-751649.png"
              }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.chatroomList}>{chatroomList}</ScrollView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    height: 140,
  },
  name: {
    fontSize: 50,
    textAlign: 'center',
    marginLeft: 10,
  },
  text: {
    fontSize: 25,
    textAlign: 'center',
  },
  image:{
    height: 40,
    width: 40,
    marginTop: 10,
    marginRight: 10,
  },
  chatroomList: {
    height: '75%',
  }
});
export default ShowChatrooms