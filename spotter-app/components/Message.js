import React from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

function Message({ message, handleTrackPress, userId }) {
  let { content, date, user_id, type, } = message
  let messageStyle = user_id === userId ? styles.userMessage : styles.friendMessage

  //parse date
  let dateObj = new Date(date);
  var month = dateObj.getUTCMonth() + 1;
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();

  newdate = year + "/" + month + "/" + day;

  // check if message is a track
  if(type === 'track') {
    return(
      <TouchableOpacity onPress={() => handleTrackPress(message)} style={styles.suggestMessage}>
        <Text style={styles.date}>{newdate}</Text>
        <Text style={styles.content}>{`${message.name} by ${message.artistName}`}</Text>
      </TouchableOpacity>
    )
  }
  return(
    <View style={messageStyle}>
      <Text style={styles.date}>{newdate}</Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  userMessage: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: 'lightgreen',
    width: '50%',
    marginBottom: 15,
    alignSelf: 'flex-start'
  },
  friendMessage: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: 'lightblue',
    width: '50%',
    marginBottom: 15,
    alignSelf: 'flex-end'
  },
  suggestMessage: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: '#f9c345',
    width: '50%',
    marginBottom: 15,
    alignSelf: 'center'
  },
  content: {
    fontSize: 20,
    textAlignVertical: 'center'
  },
  date: {
    fontSize: 15,
    fontStyle: 'italic'
  }
});

export default Message;