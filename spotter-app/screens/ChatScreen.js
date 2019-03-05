import React from 'react';
import io from 'socket.io-client'
import UserCard from '../components/UserCard'

const socketUrl = 'http://172.46.0.236:3005'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
  YellowBox,
  Button,
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
      friends: []
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
    console.log('send button clicked')
    
  }

  render() {

    console.log(this.state.friends)

    const friendsList = this.state.friends.map(friend => {
      return <UserCard name={friend.name} id={friend.id} key={Math.random().toString()} />
    });

    // console.log(friendsList)
    
    return (
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior="padding" enabled
        >
        { friendsList }
        <View style={{
          flexDirection: 'row'
        }}>

        <TextInput
          style={{
            height: 40,
            backgroundColor: 'lightblue',
            width: '70%'
          }}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({text})}
        />

        <Button
          onPress={this.sendOnPress}
          title="Send"
          color="#841584"
          accessibilityLabel="Send Message"
        />

        </View>
      </KeyboardAvoidingView>
    );
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
