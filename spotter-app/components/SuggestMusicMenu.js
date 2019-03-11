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
          <Text style={styles.text}>Suggest Song</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomOption} onPress={() =>  {
          handleChatWithFriend(inChatWith, 'showSuggestions')
        }}>
          <Text style={styles.text}>View Suggestions</Text>
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
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  suggestions: {
    flex: 1,
    flexDirection: 'column',
  },
  text: {
    fontSize: 25,
    textAlign: 'center',
  },
  minimize: {
    fontSize: 20,
    alignSelf: 'center',
    marginRight: 20,
    borderTopWidth: 1
  },
  topOption: {
    width: '80%',
  },
  bottomOption: {
    width: '80%',
    marginTop: 10
  }
})

export default SuggestMusicMenu;