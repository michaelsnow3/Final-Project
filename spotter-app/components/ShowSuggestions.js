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
import TrackCard from './TrackCard'
import TrackMenu from './TrackMenu'

class ShowSuggestions extends React.Component {
  render() {
    let { handleChatWithFriend, inChatWith, messages, handleTrackPress, selectedTrack, fetchTrackInfo} = this.props;
    let suggestions = messages.map(message => {
      if(message.type === 'track') {
        let isSelectedTrack = message.spotifyId === selectedTrack.spotifyId;
        let trackMenu = isSelectedTrack && <TrackMenu track={selectedTrack} />
        return (
          <View key={message.id}>
            <TrackCard 
              track={message}
              handleTrackPress={handleTrackPress}
              isSelectedTrack={isSelectedTrack}
              fetchTrackInfo={fetchTrackInfo}
            />
            {trackMenu}
          </View>
        )
      }
    })
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => {
              handleChatWithFriend(inChatWith, "showChat");
            }}
          >
            <Text style={styles.backButtonText}>{"<"}</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Suggestions:</Text>
        </View>
        <ScrollView style={styles.suggestions}>
          {suggestions}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontSize: 30,
    marginEnd: 20
  },
  back: {
    height: 30,
    width: 60,
    backgroundColor: "#d5dae2",
    borderRadius: 20
  },
  backButtonText: {
    fontSize: 20,
    textAlign: "center"
  },
  suggestions: {
    height: '70%'
  }
});

export default ShowSuggestions