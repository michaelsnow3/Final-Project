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
      return <Message content={message.content} date={message.date} userId={message.user_id} key={Math.random().toString()} />
    })
    return (
      <KeyboardAvoidingView keyboardVerticalOffset = {60} behavior="padding" style={styles.container}>
      
        <View style={styles.header}>
          <TouchableOpacity style={styles.back} onPress={backToShowFriends}>
            <Text style={styles.backButtonText}>{'<'}</Text>
          </TouchableOpacity>

          <Text style={styles.text}>{inChatWith.name}</Text>
        </View>

        <ScrollView
          ref={ref => this.scrollView = ref}
          onContentSizeChange={(contentWidth, contentHeight)=>{        
            this.scrollView.scrollToEnd({animated: true});
          }}
          style={styles.messageList}
        >
          {messageList}
        </ScrollView>
  
        <View style={styles.input}>
          <TextInput
            placeholder="Send a message"
            value={this.props.text}
            style={styles.textInput}
            onChangeText={onChangeText}
          />
          <TouchableOpacity onPress={() => sendOnPress(this.sendMessageToSocketServer, this.fetchMessages)}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>

        </View>
  
      </KeyboardAvoidingView>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sendText: {
    fontSize: 20,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 5,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    width: '70%',
    alignSelf: 'center',
  },
  backButtonText: {
    fontSize: 20,
    textAlign: 'center'
  },
  text: {
    fontSize: 40,
    marginEnd: 20,
  },
  back: {
    height: 30,
    width: 60,
    backgroundColor: '#d5dae2',
    borderRadius: 20,
  },
  messageList: {
    maxHeight: '70%'
  }
});

export default Chat