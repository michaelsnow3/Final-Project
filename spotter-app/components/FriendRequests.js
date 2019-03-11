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
    this.props.friendRequestsFunc();
    // fetch(`${this.props.url}/show_profile/friend_requests/${this.props.userId}`, {
    //   method: 'GET',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    // }).then(data => {
    //   console.log("datadatadatadata:");
    //   console.log(data);

    //   let friendRequests = JSON.parse(data._bodyInit)
    //   this.setState({ friendRequests })
    // })
  }

  render() {

    const friendRequestsList =  this.props.friendRequests.map(friendRequest => {
      return <UserCard name={friendRequest.name} id={friendRequest.id} handler={this.props.handler} key={Math.random().toString()} />
    });

    return(
      <View style={styles.container}>
        <Text style={styles.name}>Friend Requests</Text>
        <View style={styles.nav}><FriendScreenNav handler={this.props.handler} GetfriendsList={this.props.GetfriendsList} /></View>
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