import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  TextInput,
  Button,
} from 'react-native';
import FriendScreen from '../screens/FriendScreen';

function Chat({ sendOnPress, onChangeText, inChatWith, handleChatWithFriend }) {
  backToShowFriends = () => {
    handleChatWithFriend(null);
  }
  return (
    <KeyboardAvoidingView behavior="padding" enabled>

      <View>
        <Text>{inChatWith.name}</Text>
      </View>

      <Button
          onPress={backToShowFriends}
          title="Back"
          color="#841584"
          accessibilityLabel="Show friends"
        />

      <View style={styles.container}>
        <TextInput
          placeholder="Type here to translate!"
          style={styles.textInput}
          onChangeText={onChangeText}
        />
        <Button
          onPress={sendOnPress}
          title="Send"
          color="#841584"
          accessibilityLabel="Send Message"
        />
      </View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  textInput: {
    height: 40,
    backgroundColor: 'lightblue',
    width: '70%'
  },
  text: {
    fontSize: 50
  }
});

export default Chat