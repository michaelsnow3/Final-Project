import React from 'react'
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function SuggestMusicMenu({ suggestMusicButtonHandler, navigation, inChatWith, handleChatWithFriend }) {
  return(
    <View style={styles.container}>
      <View style={styles.suggestions}>

        <TouchableOpacity onPress={() => {
          handleChatWithFriend(inChatWith, 'suggestSong')
        }}>
          <Text style={styles.text}>Suggest a Song</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={suggestMusicButtonHandler}>
          <Text style={styles.text}>Suggested Songs</Text>
        </TouchableOpacity>
        
      </View>
      <TouchableOpacity onPress={suggestMusicButtonHandler}><Text style={styles.minimize}>Message</Text></TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  suggestions: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20
  },
  minimize: {
    fontSize: 15,
    alignSelf: 'center'
  }
})

export default SuggestMusicMenu;