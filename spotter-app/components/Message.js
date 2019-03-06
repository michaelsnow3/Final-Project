import React from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

function Message({ content, date, userId }) {
  let messageStyle = userId === 7 ? styles.userMessage : styles.friendMessage

  let dateObj = new Date(date);
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();

  newdate = year + "/" + month + "/" + day;

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