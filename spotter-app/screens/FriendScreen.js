import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
} from 'react-native';

import ShowFriends from '../components/ShowFriends';

import { MonoText } from '../components/StyledText';

import OtherProfileScreen from './OtherProfileScreen.js';

import { getCurrentMusic } from '../components/GetCurrentMusic';

import { sendMusicSocketServer } from '../components/SendCurrentMusicToSocketS';

import io from 'socket.io-client';

export default class FriendScreen extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      friends: []
    }

    // Create Socket Server Connection here
    // Because Friend it the first page create
    // After login
    this.initSocket();
  }

  initSocket = async () => {

    const nodeServerUrl   = await AsyncStorage.getItem('nodeServerUrl');
    const socketServerUrl = await AsyncStorage.getItem('socketServerUrl');

    this.socket = io.connect(`${socketServerUrl}:3005`);
    this.socket.on('connect', () => {
      console.log('connected');
    });

    this._interval = setInterval(() => {
      sendMusicSocketServer(getCurrentMusic(), this.socket);
    }, 15000);
  };

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    try {
      fetch('https://mysterious-gorge-24322.herokuapp.com:8888/profile/friends', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 7
        })
      })
      .then(data => {
        // console.log(JSON.parse(data._bodyInit).friends);
        let friends = JSON.parse(data._bodyInit).friends
        this.setState({ friends })
      })
      .catch(function(error) {
        console.log('Problem with fetch friends:' + error.message);
        throw error;
      });
    } catch(error) {
      console.log('Problem with componentDidMount:' + error.message);
      throw error;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ShowFriends
          friends={this.state.friends}
          handleChatWithFriend={() => {}}
        />
        <Text>Friends</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
