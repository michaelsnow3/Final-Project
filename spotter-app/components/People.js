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

function People({people, handler, handleChatWithFriend}) {
  const peopleList = people.map(person => {
    return <UserCard name={person.name} id={person.id} handler={handler} handleChatWithFriend={handleChatWithFriend} key={Math.random().toString()} />
  });
  return(
    <View> 
      <Text style={styles.name}>Here are your closest matches!</Text> 
      {peopleList}
    </View>
  )
}
const styles = StyleSheet.create({
  name: {
    fontSize: 50,
    textAlign: 'center'
  }
});
export default People