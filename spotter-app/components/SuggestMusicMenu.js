import React from 'react'
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function SuggestMusicMenu({ suggestMusicButtonHandler }) {
  return(
    <View style={styles.container}>
      <View style={styles.suggestions}>
        <Text style={styles.text}>Suggest a Song</Text>
        <Text style={styles.text}>Create Playlist</Text>
        <Text style={styles.text}>Suggested Songs</Text>
        <Text style={styles.text}>Show Playlist</Text>
      </View>
      <TouchableOpacity onPress={suggestMusicButtonHandler}><Text style={styles.minimize}>-</Text></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  suggestions: {
    flex: 1,
    flexDirection: 'column',
  },
  text: {
    fontSize: 20
  },
  minimize: {
    fontSize: 30,
    height: 30,
    width: 30,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    alignSelf: 'center'
  }
})

export default SuggestMusicMenu;