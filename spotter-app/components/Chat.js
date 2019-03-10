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
      selectedTrack: null,
      suggestedTracks: [],
    }
    this._isMounted = false;
    this.fetchMessages = this.fetchMessages.bind(this)
    this.fetchTrackInfo = this.fetchTrackInfo.bind(this)
  }
  componentDidMount() {
    this._isMounted = true;

    this._isMounted && this.fetchMessages().then(this.getSuggestedTracks)
  }

  componentWillMount() {
    this.initSocket();
  }

  fetchMessages = async function() {
    let data = await fetch(`${this.props.url}:8888/chat/message/view/${this.props.inChatWith.chatroomId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    let messages = JSON.parse(data._bodyInit).messages;
    // sort messages by date
    let sortedMessages = messages.sort(function(a, b) {
      return new Date(a.date) - new Date(b.date);
    });

    this.setState({ messages: sortedMessages });
  }

  getSuggestedTracks = async() => {
    let tracks = [];
    let messages = this.state.messages;
    for(let i = 0; i < messages.length; i++) {
      if(messages[i].type === 'track'){
        let track = await this.fetchTrackInfo(messages[i].id);
        tracks.push(track)
      }
    }
    this.setState({suggestedTracks: tracks})
  }

  fetchTrackInfo = async function(id) {
    let data = await fetch(`${this.props.url}:8888/chat/track/${id}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        })
    let track = JSON.parse(data._bodyInit).track
    return track
  }

  initSocket = () => {
    this.socket = io.connect(`${this.props.url}:3005`)

    console.log('in insocket')

    this.socket.on('connect', () => {
      console.log('connected')
      this.socket.on(this.props.inChatWith.chatroomId, (data) => {
        this.props.clearTextInput()
        this.getSuggestedTracks()
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
          suggestedTracks={this.state.suggestedTracks}
          selectedTrack={this.props.selectedTrack}
          handleTrackPress={this.props.handleTrackPress}
          fetchTrackInfo={this.fetchTrackInfo}
        />
      )
    }

    return (
      <KeyboardAvoidingView keyboardVerticalOffset = {60} behavior="padding" style={styles.container}>
      
        <View style={styles.header}>
          <TouchableOpacity style={styles.back} onPress={backToShowFriends}>
            <Text style={styles.backButtonText}>{'<'}</Text>
          </TouchableOpacity>

          <Text adjustsFontSizeToFit style={styles.text}>{inChatWith.name}</Text>
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
    height: '65%'
  },
});

export default Chat