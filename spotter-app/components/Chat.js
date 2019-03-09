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
import ChatInput from './ChatInput';
import ShowSuggestions from "./ShowSuggestions";

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      suggestMenuState: false,
      selectedTrack: null
    }
    this.fetchMessages = this.fetchMessages.bind(this)
    this.fetchTrackInfo = this.fetchTrackInfo.bind(this)
  }
  componentDidMount() {
    this.fetchMessages();
  }

  componentWillMount() {
    this.initSocket();
  }

  fetchMessages = async function() {
    let data = await fetch(`${this.props.url}:8888/chat/message/view`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatroomId: this.props.inChatWith.chatroomId
      })
    })
    let messages = JSON.parse(data._bodyInit).messages;
    let messagesAndTracks = []
    for(let i = 0; i < messages.length; i++) {
      let message = messages[i];
      if(message.type === 'suggest') {
        track = await this.fetchTrackInfo(message.content);
        message = {
          name: track.name,
          spotifyId: track.spotifyId,
          type: 'track',
          artistName: track.artistName,
          date: message.date,
          user_id: message.user_id,
          url: track.url
        }
      }
      messagesAndTracks.push(message)
    }
    this.setState({ messages: messagesAndTracks });
  }

  fetchTrackInfo = async function(id) {
    let data = await fetch(`${this.props.url}:8888/chat/track/${id}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        })
    return JSON.parse(data._bodyInit).track
  }

  initSocket = () => {
    this.socket = io.connect(`${this.props.url}:3005`)

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

  updateStateMessages = (message) => {
    this.setState({
      messages: [...this.state.messages, message]
    })
  }

  render(){
    let { sendOnPress, onChangeText, inChatWith, handleChatWithFriend, navigation, page, handleTrackPress } = this.props;
    backToShowFriends = () => {
      handleChatWithFriend(null, 'showChatrooms');
    }
    let messageList = this.state.messages.map(message => {
      return (
        <Message 
          userId={this.props.userId}
          handleTrackPress={handleTrackPress}
          message={ message } 
          key={Math.random().toString()}
        />
      )
    })

    // only render suggest music menu if suggest music button is clicked
    let suggestMusicMenu = <ChatInput 
      suggestMusicButtonHandler={this.suggestMusicButtonHandler} 
      text={this.props.text} 
      onChangeText={onChangeText}
      sendMessageToSocketServer={this.sendMessageToSocketServer}
      fetchMessages={this.fetchMessages}
      sendOnPress={sendOnPress}
      updateStateMessages={this.updateStateMessages}
    />

    if(this.state.suggestMenuState) {
      suggestMusicMenu = <SuggestMusicMenu 
        suggestMusicButtonHandler={this.suggestMusicButtonHandler} 
        navigation={navigation} 
        handleChatWithFriend={handleChatWithFriend}
        inChatWith={inChatWith}
      />
    }
    // renders suggested tracks if user presses show tracks button
    if(page === 'showSuggestions') {
      return (
        <ShowSuggestions 
          handleChatWithFriend={handleChatWithFriend}
          inChatWith={inChatWith}
          messages={this.state.messages}
          selectedTrack={this.props.selectedTrack}
          handleTrackPress={this.props.handleTrackPress}
        />
      )
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