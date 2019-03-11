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
    return <UserCard backgroundColor={'#ff704c'} name={friend.name} id={friend.id} handler={handler} key={Math.random().toString()} />
  });

  return(
    <View style={styles.container}>
      <Text style={styles.name}>Friends</Text>
      <View style={styles.nav}><FriendScreenNav handler={handler} /></View>
      <ScrollView style={styles.friendList}>{friendsList}</ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
   height: '100%' 
  },
  name: {
    fontSize: 50,
    textAlign: 'center'
  },
  friendList: {
    height: '65%'
  },
  nav: {
    height: 50
  }
});
export default ShowFriends