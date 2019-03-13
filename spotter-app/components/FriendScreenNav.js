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
    showFriendRequestsTextstyle = styles.unfocusedText
    showFriendsButtonStyle = styles.focusedButton
    showFriendRequestsButtonStyle = styles.unfocusedButton
  }else {
    showFriendsTextSyle = styles.unfocusedText
    showFriendRequestsTextstyle = styles.focusedText
    showFriendsButtonStyle = styles.unfocusedButton
    showFriendRequestsButtonStyle = styles.focusedButton
  }
  return(
    <View style={styles.container}>

    <TouchableOpacity onPress={handleShowFriendsPress} style={[styles.showFriends, showFriendsButtonStyle]}>
      <Text style={showFriendsTextSyle}>Friends</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={handleShowFriendRequestsPress} style={[styles.showFriendRequests, showFriendRequestsButtonStyle]}>
      <Text style={showFriendRequestsTextstyle}>Friend Requests</Text>
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
  },
  // focusedButton: {
  //   backgroundColor: '#dbdbdb)',
  // },
  // unfocusedButton: {
  //   backgroundColor: '#e8e8e8',
  // }
}

export default FriendScreenNav