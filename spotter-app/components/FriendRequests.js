import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import FriendScreenNav from './FriendScreenNav'

class FriendRequests extends React.Component {
  componentDidMount() {
    fetch(`${this.props.url}/show-friends/friend-requests/${this.props.userId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }
  render() {
    return(
      <View>
        <Text style={styles.name}>Friend Requests</Text>
        <FriendScreenNav handler={this.props.handler} />
        <ScrollView style={styles.requestList}><Text>friend requests</Text></ScrollView>
      </View>
    )
  }
}
  const styles = StyleSheet.create({
    name: {
      fontSize: 50,
      textAlign: 'center'
    },
    requestList: {
      height: '65%'
    }
  });

export default FriendRequests