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

import { YellowBox } from 'react-native';

import ShowFriends from '../components/ShowFriends';

import { MonoText } from '../components/StyledText';

import OtherProfileScreen from './OtherProfileScreen.js';

import FriendRequests from '../components/FriendRequests.js';

import { getCurrentMusic } from '../components/GetCurrentMusic';

import { sendMusicSocketServer } from '../components/SendCurrentMusicToSocketS';

import io from 'socket.io-client';

export default class FriendScreen extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      friends: [],
      page: 'ShowFriends',
      friend_id : null,
      userId: null,
      nodeServerUrl: null,
      userToken: null,
      username: null,
    }

    // Create Socket Server Connection here
    // Because Friend it the first page create
    // After login
    this.initSocket();

    YellowBox.ignoreWarnings([
      'Unhandled promise rejection: SyntaxError: JSON Parse error: Unexpected EOF',
      'Unrecognized WebSocket connection option(s)',
      'Possible Unhandled Promise Rejection'
    ]);
  }

  getUserId = () => {
    fetch(`${this.state.nodeServerUrl}/nearby/get_id/${this.state.username}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then((data) => {
      let userId = JSON.parse(data._bodyInit).id
      this.setState({userId}, () => {
        this.fetchFriends()
      })
    });
  }

  fetchFriends = () => {
    fetch(`${this.state.nodeServerUrl}/show-friends/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id : this.state.userId
      })
    }).then(data => {
      let friends = JSON.parse(data._bodyInit)
      this.setState({ friends })
    })
  }

  initSocket = async () => {

    const userToken       = await AsyncStorage.getItem('userToken');
    const nodeServerUrl   = await AsyncStorage.getItem('nodeServerUrl');
    await this.setState({nodeServerUrl})
    const socketServerUrl = await AsyncStorage.getItem('socketServerUrl');
    const username        = await AsyncStorage.getItem('userIdFromSpotify');

    await this.setState({username})
    this.getUserId()

    this.socket = io.connect(`${socketServerUrl}:3005`);
    this.socket.on('connect', () => {
      console.log('connected');
    });

    this._interval = setInterval(() => {
      sendMusicSocketServer(getCurrentMusic(), this.socket);
    }, 15000);

    this._insertUserIfNotExist(userToken, nodeServerUrl);
  };

  static navigationOptions = {
    header: null,
  };

  handler = (friend_id, page) => {
    this.setState({
      page : page,
      friend_id : friend_id
    })
  }

  _insertUserIfNotExist = (userToken, nodeServerUrl) => {
    fetch(`${nodeServerUrl}/profile/insert_user_if_not_exist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_token: userToken
      })
    })
    .then((response) => {
      console.log("_insertUserIfNotExist:", response);
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
  };

  render() {
    switch (this.state.page) {
      case 'ShowFriends':
        return (
          <ScrollView style={styles.container}>
            <ShowFriends
              friends={this.state.friends}
              handler={this.handler}
            />
          </ScrollView>
        );
      case 'OtherProfileScreen':
        return (
          <OtherProfileScreen
          handler={this.handler}
          id={this.state.friend_id}
          navigation={this.props.navigation}
          handleChatWithFriend={() => {
            console.log(111111)
          }} />
        );
      case 'friendRequests':
      return (
        <FriendRequests />
      )
    }
  }
}

const styles = StyleSheet.create({

});
