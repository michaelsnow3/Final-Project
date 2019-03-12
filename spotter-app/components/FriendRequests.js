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
import UserCard from './UserCard'

class FriendRequests extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getUserId();
  }

  render() {

    const friendRequestsList =  this.props.friendRequests.map(friendRequest => {
      return <UserCard setFriendName={this.props.setFriendName} name={friendRequest.name} id={friendRequest.id} handler={this.props.handler} key={Math.random().toString()} />
    });

    return(
      <View style={styles.container}>
        <Text style={styles.name}>Friend Requests</Text>
        <View style={styles.nav}><FriendScreenNav handler={this.props.handler} getUserId={this.props.getUserId} /></View>
        <ScrollView style={styles.requestList}>{friendRequestsList}</ScrollView>
      </View>
    )
  }
}
  const styles = StyleSheet.create({
    container: {
      height: '100%'
     },
    name: {
      fontSize: 50,
      textAlign: 'center'
    },
    requestList: {
      height: '65%'
    },
    nav: {
      height: 50
    }
  });

export default FriendRequests