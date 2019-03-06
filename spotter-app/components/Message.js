import React from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

function Message({ content, date }) {
  return(
    <View style={styles.container}>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.text}>{content}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: 'lightgreen'
  },
  content: {
    fontSize: 30,
    textAlignVertical: 'center'
  },
  date: {
    fontSize: 15,
    fontStyle: 'italic'
  }
});

export default Message;