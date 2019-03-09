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

function StartChat({friends, handleChatWithFriend, userId, url}) {

  const friendsList = friends.map(friend => {
    return <UserCard 
      name={friend.name} 
      id={friend.id} 
      handleChatWithFriend={handleChatWithFriend} 
      friend={friend} 
      key={Math.random().toString()} 
      userId={userId}
      url={url}
    />
  });

  return(
    <View>
      <Text style={styles.name}>Start a Chat</Text>
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
export default StartChat