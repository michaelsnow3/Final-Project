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

function UserCard({name, id}) {
  return (
    <View>
      <Text>{name}</Text>
    </View>
  )
}

export default UserCard;