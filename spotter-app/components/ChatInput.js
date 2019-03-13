import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet,
  Keyboard
} from 'react-native'

function ChatInput( { suggestMusicButtonHandler, text, onChangeText, sendMessageToSocketServer, fetchMessages, sendOnPress }) {
  handleOnSend = async () => {
    await sendOnPress(sendMessageToSocketServer, fetchMessages)
    Keyboard.dismiss()
  }
  return(
    <View style={styles.input}>
      <TouchableOpacity onPress={suggestMusicButtonHandler}>
        <Text style={styles.suggestMusicButton}>+</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Send a message"
        value={text}
        style={styles.textInput}
        onChangeText={onChangeText}
      />

      <TouchableOpacity onPress={handleOnSend}>
        <Text style={styles.sendText}>Send</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  suggestMusicButton: {
    fontSize: 30
  },
  textInput: {
    height: '100%',
    borderRadius: 10,
    borderWidth: 1.5,
    width: '70%',
    alignSelf: 'center',
  },

  sendText: {
    fontSize: 20,
  },
});
export default ChatInput