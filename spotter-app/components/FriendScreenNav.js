import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function FriendScreenNav({ handler, getUserId }) {
  handleShowFriendsPress = () => {
    handler(null, 'ShowFriends');
    getUserId();
  }
  handleShowFriendRequestsPress = () => {
    handler(null, 'FriendRequests')
    getUserId();
  }
  return(
    <View style={styles.container}>

    <TouchableOpacity onPress={handleShowFriendsPress} style={styles.showFriends}>
      <Text style={styles.text}>Friends</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={handleShowFriendRequestsPress} style={styles.showFriendRequests}>
      <Text style={styles.text}>Friend Requests</Text>
    </TouchableOpacity>

    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  showFriends: {
    width: '50%',
    backgroundColor: '#ffa975',
    justifyContent: 'center',
  },
  showFriendRequests: {
    width: '50%',
    backgroundColor: '#f47f38',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 5,
  }
}

export default FriendScreenNav