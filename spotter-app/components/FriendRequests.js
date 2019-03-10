import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import FriendScreenNav from '../components/FriendScreenNav'

class FriendRequests extends React.Component {
  render() {
    return(
      <View>
        <FriendScreenNav />
        <ScrollView>
        </ScrollView>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  
});

export default FriendRequests