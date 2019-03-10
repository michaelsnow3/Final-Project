import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';


import UserCard from '../components/UserCard';
import FriendScreenNav from '../components/FriendScreenNav';

function ShowFriends({friends, handler}) {
  const friendsList = friends.map(friend => {
    return <UserCard name={friend.name} id={friend.id} handler={handler} key={Math.random().toString()} />
  });

  return(
    <View>
      <Text style={styles.name}>Friends</Text>
      <FriendScreenNav />
      {friendsList}
    </View>
  )
}
const styles = StyleSheet.create({
  name: {
    fontSize: 50,
    textAlign: 'center'
  }
});
export default ShowFriends