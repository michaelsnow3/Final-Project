import React from 'react'
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

function SuggestMusicMenu({ suggestMusicButtonHandler, inChatWith, handleChatWithFriend }) {
  return(
    <View style={styles.container}>
      <View style={styles.suggestions}>

        <TouchableOpacity style={styles.topOption} onPress={() => {
          handleChatWithFriend(inChatWith, 'suggestSong')
        }}>
          <Text style={styles.text}>Suggest a Song</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomOption} onPress={() =>  {
          handleChatWithFriend(inChatWith, 'showSuggestions')
        }}>
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
    alignItems: 'center',
    borderTopWidth: 1
  },
  suggestions: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 25,
    textAlign: 'center'
  },
  minimize: {
    fontSize: 20,
    alignSelf: 'center',
    marginRight: 20,
    borderTopWidth: 1
  },
  topOption: {
    borderBottomWidth: 1,
    width: '70%'
  },
  bottomOption: {
    width: '70%'
  },
})

export default SuggestMusicMenu;