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

function TrackCard({ track, handleTrackPress, handleAddTrack, isSelectedTrack }) {
  let trackStyle = isSelectedTrack ? styles.selectedTrack : styles.container;
  let handleTrack = handleAddTrack || handleTrackPress
  return (
    <TouchableOpacity 
      style={trackStyle}
      onPress={() => handleTrack( track )}
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
    backgroundColor: 'rgba(249, 195, 69, 0.5)',
    justifyContent: 'center',
  }
});

export default TrackCard;