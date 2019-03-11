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

export default class FriendScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      friends: [],
      page: 'ShowFriends',
      friend_id : null,
      primary_id : 3 
    }
  }
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
  componentDidMount() { 
    fetch('http://0da00b68.ngrok.io/show-friends/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id : this.state.primary_id
      })
    }).then(data => {
      let friends = JSON.parse(data._bodyInit)
      this.setState({ friends })
    })
  }
  
  render() {
    switch (this.state.page) {
      case 'ShowFriends':
        return (
          <ScrollView style={styles.container}>
              <ShowFriends 
                friends={this.state.friends} 
                handler={this.handler}
                handleChatWithFriend={() => {}} 
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
          handleChatWithFriend={() => {}} />
        )
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
