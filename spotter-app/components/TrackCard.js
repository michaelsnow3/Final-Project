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

function TrackCard({track, handleTrackPress, handleAddTrack, isSelectedTrack, fetchTrackInfo}) {
  let trackStyle = isSelectedTrack ? styles.selectedTrack : styles.container;
  // display tracks on suggest music page
  if(handleTrackPress) {
    fetchTrackInfo(track.id).then(track => {
      console.log(track)
    })
    return (
      <TouchableOpacity 
        style={trackStyle}
        onPress={() => handleTrackPress( track )}
      >
        <Text style={styles.name}>{track.content} by {track.artistName}</Text>
      </TouchableOpacity>
    )
  }
  // display tracks on add track page
  return (
    <TouchableOpacity 
      style={trackStyle}
      onPress={() => handleAddTrack( track )}
    >
      <Text style={styles.name}>{track.name} by {track.artistName}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    textAlignVertical: 'center',
  },
  selectedTrack: {
    height: 50,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: '#ff9a47',
    justifyContent: 'center',
  }
});

export default TrackCard;