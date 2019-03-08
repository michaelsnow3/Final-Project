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
      friend_id : null
      
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
  // https://mysterious-gorge-24322.herokuapp.com:8888/profile/friends
  componentDidMount() {
    fetch('http://172.46.0.173:8888/show-friends/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id : 3
      })
    }).then(data => {
      console.log('data: ', data)
      // console.log(JSON.parse(data._bodyInit).friends);
      let friends = JSON.parse(data._bodyInit)
      this.setState({ friends })
      console.log('friends; ', friends)
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
        handleChatWithFriend={() => {
            console.log(111111)
          }} />
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
