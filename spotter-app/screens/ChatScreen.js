import React from 'react';
import io from 'socket.io-client';
import ShowFriends from '../components/ShowFriends';
import Chat from '../components/Chat';

const socketUrl = 'http://172.46.0.236:3005'
import {
  StyleSheet,
  Image,
  Platform,
  ScrollView,
  YellowBox,
} from 'react-native';

import { MonoText } from '../components/StyledText';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

export default class ChatScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      socket: null,
      friends: [],
      inChatWith: null
    };
  }

  componentWillMount() {
    this.initSocket();
  }

  // save current user's friends to state when page renders
  componentDidMount() {
    fetch('http://172.46.0.236:8888/profile/friends', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 7
      })
    }).then(data => {
      // console.log(JSON.parse(data._bodyInit).friends);
      let friends = JSON.parse(data._bodyInit).friends
      this.setState({ friends })
    })
  }



  initSocket = () => {
    const socket = io(socketUrl);

    console.log('in insocket')

    socket.on('connect', () => {
      console.log('connected')
    })

    this.setState({ socket })
  }

  sendOnPress = () => {
    console.log('send message button pressed!')
  }

  onChangeText = (text) => {
    this.setState({text})
  }

  handleChatWithFriend = (friend) => {
    this.setState({inChatWith: friend})
  }

  

  render() {

    if(this.state.inChatWith) {
      return <Chat 
        sendOnPress={this.sendOnPress} 
        inChatWith={this.state.inChatWith}
      />
    }else {
      return <ShowFriends 
        friends={this.state.friends} 
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
