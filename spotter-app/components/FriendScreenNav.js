import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function FriendScreenNav({ handler }) {
  handleShowFriendsPress = () => {
    handler(null, 'ShowFriends')
  }
  handleShowFriendRequestsPress = () => {
    handler(null, 'FriendRequests')
  }
  return(
    <View style={styles.container}>

    <TouchableOpacity onPress={handleShowFriendsPress} style={styles.showFriends}>
      <Text style={styles.text}>Show Friends</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={handleShowFriendRequestsPress} style={styles.showFriendRequests}>
      <Text style={styles.text}>Show Friend Requests</Text>
    </TouchableOpacity>

    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    marginBottom: 10,
  },
  showFriends: {
    width: '50%',
    backgroundColor: '#ffa975',
  },
  showFriendRequests: {
    width: '50%',
    backgroundColor: '#f47f38',
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 5
  }
}

export default FriendScreenNav