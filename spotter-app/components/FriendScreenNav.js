import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function FriendScreenNav({ handler, getUserId, page }) {
  handleShowFriendsPress = () => {
    handler(null, 'ShowFriends');
    getUserId();
  }
  handleShowFriendRequestsPress = () => {
    handler(null, 'FriendRequests')
    getUserId();
  }
  let showFriendsTextSyle = {};
  let showFriendRequestsText = {};
  if(page === 'ShowFriends') {
    showFriendsTextSyle = styles.focusedText
    showFriendRequestsText = styles.unfocusedText
  }else {
    showFriendsTextSyle = styles.unfocusedText
    showFriendRequestsText = styles.focusedText
  }
  return(
    <View style={styles.container}>

    <TouchableOpacity onPress={handleShowFriendsPress} style={styles.showFriends}>
      <Text style={showFriendsTextSyle}>Friends</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={handleShowFriendRequestsPress} style={styles.showFriendRequests}>
      <Text style={showFriendRequestsText}>Friend Requests</Text>
    </TouchableOpacity>

    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: 'rgba(36, 207, 95, 0.75)',
  },
  showFriends: {
    width: '50%',
    justifyContent: 'center',
  },
  showFriendRequests: {
    width: '50%',
    justifyContent: 'center',
  },
  focusedText: {
    fontSize: 23,
    textAlign: 'center',
    marginTop: 5,
    fontWeight: 'bold',
  },
  unfocusedText: {
    fontSize: 23,
    textAlign: 'center',
    marginTop: 5,
    opacity: 0.7,
  }
}

export default FriendScreenNav