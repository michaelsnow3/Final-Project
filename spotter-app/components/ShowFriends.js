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

import UserCard from '../components/UserCard'

function ShowFriends({friends}) {
  const friendsList = friends.map(friend => {
    return <UserCard name={friend.name} id={friend.id} key={Math.random().toString()} />
  });

  return(
    <View>
      <Text>Friends:</Text>
      {friendsList}
    </View>
  )
}

export default ShowFriends