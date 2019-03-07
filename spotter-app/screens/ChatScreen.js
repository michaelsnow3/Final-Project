import React from 'react';
import ShowChatrooms from '../components/ShowChatrooms';
import Chat from '../components/Chat';

import {
  StyleSheet,
  Button,
  Image,
  Platform,
  ScrollView,
} from 'react-native';

import { MonoText } from '../components/StyledText';

export default class ChatScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      chatrooms: [],
      inChatWith: null,
      showSuggestMusic: false
    };
  }

  // save current user's chatrooms to state when page renders
  componentDidMount() {
    fetch('http://172.46.0.236:8888/chat/chatrooms', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 9
      })
    }).then(data => {
      let chatrooms = JSON.parse(data._bodyInit).chatrooms;
      this.setState({ chatrooms });
    })
  }

  sendOnPress = (sendMessageToSocketServer, fetchMessages) => {
    let chatroomId = this.state.inChatWith.chatroomId
    if(this.state.text === '') return
    fetch('http://172.46.0.236:8888/chat/message/create', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: this.state.text,
            type: 'message',
            userId: 9,
            chatroomId: chatroomId
          })

        })
        .then(() => {
          fetchMessages()
          sendMessageToSocketServer()
        })
  }

  onChangeText = (text) => {
    this.setState({text})
  }

  clearTextInput = () => {
    this.setState({text: ''});
  }

  handleChatWithFriend = (friend) => {
    this.setState({inChatWith: friend})
  }

  render() {
    if(this.state.inChatWith) {
      return <Chat 
        text={this.state.text}
        sendOnPress={this.sendOnPress} 
        inChatWith={this.state.inChatWith}
        handleChatWithFriend={this.handleChatWithFriend}
        onChangeText={this.onChangeText}
        clearTextInput={this.clearTextInput}
      />
    }else {
      return <ShowChatrooms 
        chatrooms={this.state.chatrooms} 
        handleChatWithFriend={this.handleChatWithFriend} 
      />
    }
    
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }
}

const styles = StyleSheet.create({

});
