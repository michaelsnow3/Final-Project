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
      friends: [],
      page: 'ShowFriends',
      friend_id : null,
      userId: null,
      nodeServerUrl: null,
      userToken: null
    }

    // Create Socket Server Connection here
    // Because Friend it the first page create
    // After login
    this.initSocket();
  }

  initSocket = async () => {
    await AsyncStorage.clear();
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

  handler = (friend_id, page) => {
    this.setState({
      page : page,
      friend_id : friend_id
    })
  }

  _getUserInfo = async () => {
    const nodeServerUrl = await AsyncStorage.getItem('nodeServerUrl');
    this.setState({url: nodeServerUrl});
    const userToken = await AsyncStorage.getItem('userToken');
    this.setState({userToken: userToken});
    fetch(`${nodeServerUrl}/profile/user_info/${userToken}`, {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
     })
    .then((response) => response.json())
    .then((jsonData) => {
      this.setState({userId: jsonData.name});
    });
  }
  
  componentDidMount() {
    try {
      this._getUserInfo().then( data => {
        console.log(this.state.userId)
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
          console.log('data: ', data)
          let friends = JSON.parse(data._bodyInit)
          this.setState({ friends })
        });
      })
      } catch(error) {
        console.log('Problem with componentDidMount:' + error.message);
        throw error;
      }

  }

  render() {
    switch (this.state.page) {
      case 'ShowFriends':
        return (
          <ScrollView style={styles.container}>
            <ShowFriends
              friends={this.state.friends}
              handler={this.handler}
            />
            <Text>Friends</Text>
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
    }
  }
}

const styles = StyleSheet.create({

});
