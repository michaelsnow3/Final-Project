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
      user_id_from_spotify: null,
      username: null,
      friendRequests: [],
      name: null
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

  componentDidMount() {
    //this.props.navigation.addListener('willFocus', this.fetchFriends);
    //this.props.navigation.addListener('willFocus', this.fetchFriendRequest);
    this.props.navigation.addListener('willFocus', this.getUserId);
    //this.getUserId();
  }

  setFriendName = (name) => {
    this.setState({
      name: name,
    });
  };

  fetchFriendRequest = () => {

    console.log("fetchFriendRequest url:", `${this.state.nodeServerUrl}/show_profile/friend_requests/${this.state.userId}`);

    fetch(`${this.state.nodeServerUrl}/show_profile/friend_requests/${this.state.userId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(data => {
          //console.log(data);

      let friendRequests = JSON.parse(data._bodyInit)
      this.setState({ friendRequests })
    })
  };

  getUserId = () => {

    console.log("url in getUserId:", `${this.state.nodeServerUrl}/nearby/get_id/${this.state.username}`);

    fetch(`${this.state.nodeServerUrl}/nearby/get_id/${this.state.username}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then((data) => {
      let userId = JSON.parse(data._bodyInit).id
      this.setState({userId}, () => {
        this.fetchFriends()
        this.fetchFriendRequest()
      })
    })
    .catch(function(error) {
      console.log('Problem with fetch friends:', error);
      this._signOutAsync();
    });
  }

  fetchFriends = () => {

    console.log("url fetchFriends:", `${this.state.nodeServerUrl}/show-friends/`);

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
    const socketServerUrl = await AsyncStorage.getItem('socketServerUrl');
    const username        = await AsyncStorage.getItem('userIdFromSpotify');

    await this.setState({nodeServerUrl});
    await this.setState({username})
    this.getUserId()

    this.socket = io.connect(`${socketServerUrl}:3005`);
    this.socket.on('connect', () => {
      console.log('connected');
    });

    this._interval = setInterval(() => {
      sendMusicSocketServer(getCurrentMusic(), this.socket);
    }, 10000);

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
  // heroku server:
  // https://mysterious-gorge-24322.herokuapp.com:8888/show-friends/
  // componentDidMount() {
  //   fetch('http://0da00b68.ngrok.io/show-friends/', {

  _getUserInfo = async () => {
    const nodeServerUrl = await AsyncStorage.getItem('nodeServerUrl');
    this.setState({url: nodeServerUrl});
    const userIdFromSpotify = await AsyncStorage.getItem('userIdFromSpotify');
    this.setState({userIdFromSpotify: userIdFromSpotify});
    fetch(`${nodeServerUrl}/nearby/get_id/${userIdFromSpotify}`, {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
     })
    .then((response) => response.json())
    .then((jsonData) => {
      this.setState({id: jsonData.id});
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

  _insertUserIfNotExist = (userToken, nodeServerUrl) => {
    console.log("url _insertUserIfNotExist:", `${nodeServerUrl}/profile/insert_user_if_not_exist`);
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
  };

  render() {
    switch (this.state.page) {
      case 'ShowFriends':
        return (
          <View style={styles.container}>
            <ShowFriends
              friends={this.state.friends}
              getUserId={this.getUserId}
              handler={this.handler}
              setFriendName={this.setFriendName}
              backgroundColor={'#ff704c'}
              page={this.state.page}
            />
          </View>
        );
      case 'OtherProfileScreen':
        return (
          <OtherProfileScreen
            handler={this.handler}
            id={this.state.friend_id}
            navigation={this.props.navigation}
            name={this.state.name}
            getUserId={this.getUserId}
          />
        );
      case 'FriendRequests':
      return (
        <View style={styles.container}>
          <FriendRequests
            handler={this.handler}
            url={this.state.nodeServerUrl}
            userId={this.state.userId}
            getUserId={this.getUserId}
            friendRequests={this.state.friendRequests}
            backgroundColor={'#ff704c'}
            setFriendName={this.setFriendName}
            page={this.state.page}
          />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({

});
