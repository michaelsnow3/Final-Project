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
      friends: []
    }
  }
  
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    // fetch('http://172.46.0.236:8888/profile/friends', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     userId: 7
    //   })
    // }).then(data => {
    //   // console.log(JSON.parse(data._bodyInit).friends);
    //   let friends = JSON.parse(data._bodyInit).friends
    //   this.setState({ friends })
    // })
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
