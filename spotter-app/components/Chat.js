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

class Chat extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: []
    }
  }
  componentDidMount() {
    fetch('http://192.168.0.22:8888/chat/message/view', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chatroomId: 10
          })
        }).then(data => {
          let messages = JSON.parse(data._bodyInit).messages;
          this.setState({ messages });
        })
  }
  render(){
    let { sendOnPress, onChangeText, inChatWith, handleChatWithFriend } = this.props;
    backToShowFriends = () => {
      handleChatWithFriend(null);
    }
    let messageList = this.state.messages.map(message => {
      return <Text>{message.content}</Text>
    })
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
  
        <TouchableOpacity style={styles.back} onPress={backToShowFriends}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
  
        <View>
          <Text style={styles.text}>{inChatWith.name}</Text>
        </View>

        {messageList}
  
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
  backButtonText: {
    fontSize: 20,
    textAlign: 'center'
  },
  text: {
    fontSize: 40
  },
  back: {
    height: 40,
    width: 100,
    backgroundColor: 'blue',
    borderRadius: 20
  }
});

export default Chat