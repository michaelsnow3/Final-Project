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

    this.state = {
      friendRequests: [],
    }
  }

  componentDidMount() {
    fetch(`${this.props.url}/show_profile/friend_requests/${this.props.userId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(data => {
      let friendRequests = JSON.parse(data._bodyInit)
      this.setState({ friendRequests })
    })
  }

  render() {
    const friendRequestsList = this.state.friendRequests.map(friendRequest => {
      return <UserCard name={friendRequest.name} id={friendRequest.id} handler={this.props.handler} key={Math.random().toString()} />
    });

    return(
      <View>
        <Text style={styles.name}>Friend Requests</Text>
        <FriendScreenNav handler={this.props.handler} />
        <ScrollView style={styles.requestList}>{friendRequestsList}</ScrollView>
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