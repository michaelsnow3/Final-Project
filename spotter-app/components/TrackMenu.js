import React from 'react'
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';

function TrackMenu({ track }) {


  handleClick = () => {
    Linking.canOpenURL(track.url).then(supported => {
      if (supported) {
        Linking.openURL(track.url);
      } else {
        console.log("Don't know how to open URI: " + track.url);
      }
    });
  };
  return(
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleClick}>
          <Text style={styles.text}>Go to Spotify</Text>
        </TouchableOpacity>
      </View>
      <Text>{'\n'}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    height: 60,
  },
  text: {
    fontSize: 25,
    textAlign: 'center',
  },
})

export default TrackMenu;