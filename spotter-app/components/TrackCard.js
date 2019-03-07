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

function TrackCard({track, handleTrackPress}) {
  handlePress = () => {
    handleTrackPress({
      name: track.name,
      spotifyId: track.spotifyId
    })
  }
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={styles.name}>{track.name} by {track.artistName[0]}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  name: {
    fontSize: 20,
    textAlignVertical: 'center'
  }
});

export default TrackCard;