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
  YellowBox
} from 'react-native';
YellowBox.ignoreWarnings(['Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'])

import io from 'socket.io-client';

import FriendScreen from '../screens/FriendScreen';
import Message from './Message';
import SuggestMusicMenu from './SuggestMusicMenu';
import ChatInput from './ChatInput'

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      suggestMenuState: false
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

  suggestMusicButtonHandler = () => {
    this.setState({
      suggestMenuState: !this.state.suggestMenuState
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

    // only render suggest music menu if suggest music button is clicked
    let suggestMusicMenu = <ChatInput 
      suggestMusicButtonHandler={this.suggestMusicButtonHandler} 
      text={this.props.text} 
      onChangeText={onChangeText}
      sendMessageToSocketServer={this.sendMessageToSocketServer}
      fetchMessages={this.fetchMessages}
      sendOnPress={sendOnPress}
    />

    if(this.state.suggestMenuState) {
      suggestMusicMenu = <SuggestMusicMenu suggestMusicButtonHandler={this.suggestMusicButtonHandler} />
    }

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
        {suggestMusicMenu}
        
  
      </KeyboardAvoidingView>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 5,
    alignItems: 'center',
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
  },
});

export default Chat