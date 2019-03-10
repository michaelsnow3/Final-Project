import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function FriendScreenNav({}) {
  return(
    <View style={styles.container}>

    <TouchableOpacity style={styles.showFriends}>
      <Text style={styles.text}>Show Friends</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.showFriendRequests}>
      <Text style={styles.text}>Show Friend Requests</Text>
    </TouchableOpacity>

    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
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