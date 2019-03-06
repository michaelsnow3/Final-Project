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

function Chatroom({name, id, handleChatWithFriend}) {
  handleFriendPress = () => {
    handleChatWithFriend({
      name: name,
      id: id
    })
  }
  return (
    <TouchableOpacity style={styles.container} onPress={handleFriendPress}>
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

export default Chatroom;