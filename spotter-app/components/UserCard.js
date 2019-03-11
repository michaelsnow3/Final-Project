import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

function UserCard({name, id, handler}) {
  callHandler = () => {
    handler (id, 'OtherProfileScreen')
  }
  return (
    <TouchableOpacity style={styles.container} onPress={callHandler}>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: '#adccff'
  },
  name: {
    fontSize: 30,
    textAlignVertical: 'center'
  }
});

export default UserCard;