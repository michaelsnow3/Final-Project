import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  TextInput,
  YellowBox
} from "react-native";
YellowBox.ignoreWarnings([
  "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?"
]);

import FriendScreen from "../screens/FriendScreen";
import Message from "./Message";
import SuggestMusicMenu from "./SuggestMusicMenu";
import ChatInput from "./ChatInput";
import ShowSuggestions from "./ShowSuggestions";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestMenuState: false,
      selectedTrack: null,
      suggestedTracks: []
    };
    this._isMounted = false;
    this.fetchTrackInfo = this.fetchTrackInfo.bind(this);
  }
  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.props.fetchMessages().then(this.getSuggestedTracks);
      this.props.initSocket();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.props.setLimit(20, true)
  }

  getSuggestedTracks = async () => {
    let tracks = [];
    let messages = this.props.messages;
    for (let i = 0; i < messages.length; i++) {
      if (messages[i].type === "track") {
        let track = await this.fetchTrackInfo(messages[i].id.split("-")[0]);
        track.id = messages[i].id;
        tracks.push(track);
      }
    }
    this._isMounted && this.setState({ suggestedTracks: tracks });
  };

  fetchTrackInfo = async function(id) {
    parsedId = id.split("-")[0];
    let data = await fetch(`${this.props.url}/chat/track/${parsedId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    let track = JSON.parse(data._bodyInit).track;
    return track;
  };

  suggestMusicButtonHandler = () => {
    this.setState({
      suggestMenuState: !this.state.suggestMenuState
    });
  };

  previousMessagesCallback = () => {
    this.props.setLimit(this.props.messages.length + 5, false)
  }

  render() {
    let {
      sendOnPress,
      onChangeText,
      inChatWith,
      handleChatWithFriend,
      navigation,
      page,
      handleTrackPress,
      messages
    } = this.props;

    backToShowFriends = () => {
      handleChatWithFriend(null, "showChatrooms");
    };
    let messageList = messages.map(message => {
      return (
        <Message
          userId={this.props.userId}
          handleTrackPress={handleTrackPress}
          message={message}
          key={Math.random().toString()}
        />
      );
    });

    let previousMessagesButton = messageList.length >= 20 &&  (
      <TouchableOpacity onPress={this.previousMessagesCallback} style={styles.previousMessagesButton}>
        <Text style={styles.previousMessagesText}>Previous Messages</Text>
      </TouchableOpacity>
    )

    // only render suggest music menu if suggest music button is clicked
    let suggestMusicMenu = (
      <View style={{ height: 40 }}>
        <ChatInput
          suggestMusicButtonHandler={this.suggestMusicButtonHandler}
          text={this.props.text}
          onChangeText={onChangeText}
          sendMessageToSocketServer={this.props.sendMessageToSocketServer}
          fetchMessages={this.props.fetchMessages}
          sendOnPress={sendOnPress}
          updateStateMessages={this.updateStateMessages}
        />
      </View>
    );

    if (this.state.suggestMenuState) {
      suggestMusicMenu = (
        <View style={{height: 100}}>
          <SuggestMusicMenu
            suggestMusicButtonHandler={this.suggestMusicButtonHandler}
            navigation={navigation}
            handleChatWithFriend={handleChatWithFriend}
            inChatWith={inChatWith}
          />
        </View>
      );
    }
    // renders suggested tracks if user presses show tracks button
    if (page === "showSuggestions") {
      return (
        <ShowSuggestions
          handleChatWithFriend={handleChatWithFriend}
          inChatWith={inChatWith}
          suggestedTracks={this.state.suggestedTracks}
          selectedTrack={this.props.selectedTrack}
          handleTrackPress={this.props.handleTrackPress}
          fetchTrackInfo={this.fetchTrackInfo}
          getSuggestedTracks={this.getSuggestedTracks}
        />
      );
    }

    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={65}
        behavior="padding"
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.back} onPress={backToShowFriends}>
            <Text style={styles.backButtonText}>{"<"}</Text>
          </TouchableOpacity>

          <Text style={styles.text}>{inChatWith.name}</Text>
        </View>

        <ScrollView
          ref={ref => (this.scrollView = ref)}
          onContentSizeChange={() => {
            this.props.scrollToBottom && this.scrollView.scrollToEnd({ animated: true });
          }}
          style={styles.messageList}
        >
          {previousMessagesButton}
          {messageList}
        </ScrollView>
        {suggestMusicMenu}
      </KeyboardAvoidingView>
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
    height: 5,
    alignItems: "center",
    borderBottomWidth: 1,
    marginBottom: 10
  },
  backButtonText: {
    fontSize: 20,
    textAlign: "center"
  },
  text: {
    fontSize: 30,
    marginEnd: 20
  },
  back: {
    height: 30,
    width: 60,
    backgroundColor: "#d5dae2",
    borderRadius: 20
  },
  messageList: {
    height: "65%"
  },
  previousMessagesText: {
    fontSize: 20,
  },
  previousMessagesButton: {
    height: 40,
    backgroundColor: '#d4d6d4',
    borderWidth: 1,
    borderColor: '#9ca39c',
    borderRadius: 20,
    marginBottom: 25,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Chat;
