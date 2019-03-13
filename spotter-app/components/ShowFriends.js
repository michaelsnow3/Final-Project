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

function ShowFriends({friends, handler, getUserId, setFriendName, page}) {
  let orderedFriends = friends.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  })

  const friendsList = orderedFriends.map((friend, i) => {
    return (
      <UserCard 
        setFriendName={setFriendName} 
        name={friend.name} 
        prevFriend={friends[i - 1]} 
        id={friend.id} 
        handler={handler} 
        key={i} 
        friend={friend}
      />
    )
  });
  return(
    <View style={styles.container}>
      <View style={styles.nav}><FriendScreenNav page={page} handler={handler} getUserId={getUserId}/></View>
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