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
import io from 'socket.io-client';
import FriendScreen from '../screens/FriendScreen';
import Message from './Message';

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
  }
  componentDidMount() {
    this.fetchMessages();
  }

  componentWillMount() {
    this.initSocket();
  }

  fetchMessages = () => {
    fetch('http://172.46.0.236:8888/chat/message/view', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chatroomId: this.props.inChatWith.chatroomId
          })
        }).then(data => {
          let messages = JSON.parse(data._bodyInit).messages;
          this.setState({ messages });
        })
  }

  initSocket = () => {
    this.socket = io.connect(`http://172.46.0.236:3005`)

    console.log('in insocket')

    this.socket.on('connect', () => {
      console.log('connected')
      this.socket.on(this.props.inChatWith.chatroomId, (data) => {
        this.props.clearTextInput()
      })
    })
  }

  sendMessageToSocketServer = () => {
    this.socket.emit('message', {
      chatroomId: this.props.inChatWith.chatroomId
    })
  }

  render(){
    let { sendOnPress, onChangeText, inChatWith, handleChatWithFriend } = this.props;
    backToShowFriends = () => {
      handleChatWithFriend(null);
    }
    let messageList = this.state.messages.map(message => {
      return <Message content={message.content} date={message.date} key={Math.random().toString()} />
    })
    return (
      <View>
  
        <TouchableOpacity style={styles.back} onPress={backToShowFriends}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
  
        <View>
          <Text style={styles.text}>{inChatWith.name}</Text>
        </View>

        <ScrollView style={styles.messageList}>{messageList}</ScrollView>
  
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <TextInput
            placeholder="Send a message"
            value={this.props.text}
            style={styles.textInput}
            onChangeText={onChangeText}
          />
          <Button
            onPress={() => sendOnPress(this.sendMessageToSocketServer, this.fetchMessages)}
            title="Send"
            color="#841584"
            accessibilityLabel="Send Message"
          />
        </KeyboardAvoidingView>
  
      </View>
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
  },
  messageList: {
    height: '60%'
  }
});

export default Chat