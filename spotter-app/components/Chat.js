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

function Chat({ sendOnPress, onChangeText }) {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

      <TextInput
        placeholder="Type here to translate!"
        onChangeText={onChangeText}
      />

      <Button
        onPress={sendOnPress}
        title="Send"
        color="#841584"
        accessibilityLabel="Send Message"
      />

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  text: {
    height: 40,
    backgroundColor: 'lightblue',
    width: '70%'
  }
});

export default Chat