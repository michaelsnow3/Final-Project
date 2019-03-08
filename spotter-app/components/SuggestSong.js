import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView
} from "react-native";

import TrackCard from './TrackCard';

export default class SuggestSong extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      searchResults: []
    };
  }

  static navigationOptions = {
    header: null
  };

  searchSpotify = () => {
    if(!this.state.text) return
    fetch(`${this.props.url}:8888/chat/track/suggest`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.text
      })
    }).then(data => {
      let searchResults = JSON.parse(data._bodyInit).searchResults;
      this.setState({ searchResults })
    })
  };
  
  handleAddTrack = (track) => {
    console.log(track)
    fetch(`${this.props.url}:8888/chat/message/create`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: track.spotifyId,
        type: 'suggest',
        userId: 9,
        chatroomId: this.props.inChatWith.chatroomId
      })

    }).then(data => {
      this.props.handleChatWithFriend(this.props.inChatWith, 'showChat')
    })
  }

  render() {
    let {
      handleChatWithFriend,
      inChatWith,
      handleTrackSuggestion
    } = this.props;

    let searchResultTags = this.state.searchResults.map(track => {
      return <TrackCard track={track} handleAddTrack={this.handleAddTrack} key={Math.random().toString()} />
    });
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => {
              handleChatWithFriend(inChatWith, "showChat");
            }}
          >
            <Text style={styles.backButtonText}>{"<"}</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Suggest a Song!</Text>
        </View>

        <View style={styles.input}>
          <TextInput
            placeholder="Search Spotify"
            value={this.state.text}
            style={styles.textInput}
            onChangeText={text => {
              this.setState({ text });
            }}
          />
          <TouchableOpacity onPress={this.searchSpotify}>
            <Text style={styles.sendText}>Search</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.suggestionList}>{searchResultTags}</ScrollView>
      </KeyboardAvoidingView>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
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
  input: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  textInput: {
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    width: "70%"
  },
  sendText: {
    fontSize: 20
  },
  suggestionList: {
    height: "60%"
  }
});
