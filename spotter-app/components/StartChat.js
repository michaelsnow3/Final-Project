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

function StartChat({friends, handleChatWithFriend, userId, url, fetchChatrooms}) {

  const friendsList = friends.map(friend => {
    return <UserCard 
      name={friend.name} 
      id={friend.id} 
      handleChatWithFriend={handleChatWithFriend} 
      friend={friend} 
      key={Math.random().toString()} 
      userId={userId}
      url={url}
      fetchChatrooms={fetchChatrooms}
    />
  });

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.back} onPress={() => {
          handleChatWithFriend(null, 'showChatrooms')
        }}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>

        <Text style={styles.text}>Start a Chat</Text>
      </View>
      <ScrollView>{friendsList}</ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 20,
    textAlign: 'center'
  },
  text: {
    fontSize: 40,
    marginEnd: 20,
  },
  back: {
    height: 30,
    width: 60,
    backgroundColor: '#d5dae2',
    borderRadius: 20,
  }
});
export default StartChat