import React from 'react';
import io from 'socket.io-client'

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
      socket: null
    };
  }

  componentWillMount() {
    this.initSocket();
  }

  initSocket = () => {
    const socket = io(socketUrl);

    console.log('in insocket')

    socket.on('connect', () => {
      console.log('connected')
    })

    this.setState({ socket })
  }

  sendOnClick = () => {
    console.log('send button clicked')
    // fetch('https://sleepy-plateau-86995.herokuapp.com/profile/edit/track', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     title: 'test'
    //   })
    // }).then(data => {
    //   console.log(JSON.parse(data._bodyInit))
    // })
  }

  render() {
    
    return (
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior="padding" enabled
        >
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
          onPress={this.sendOnClick}
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
