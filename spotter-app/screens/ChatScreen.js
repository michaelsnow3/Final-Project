import React from "react";
import ShowChatrooms from "../components/ShowChatrooms";
import Chat from "../components/Chat";
import SuggestSong from "../components/SuggestSong";

import {
  StyleSheet,
  Button,
  Image,
  Platform,
  ScrollView,
  AsyncStorage
} from "react-native";

import { MonoText } from "../components/StyledText";

export default class ChatScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      text: "",
      chatrooms: [],
      page: "showChatrooms",
      suggestedSong: {},
      url: "http://172.46.0.236",
      inChatWith: null,
      userId: 9,
      selectedTrack: null
    };
  }

  // save current user's chatrooms to state when page renders
  componentDidMount() {
    fetch(`${this.state.url}:8888/chat/chatrooms`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: this.state.userId
      })
    }).then(data => {
      let chatrooms = JSON.parse(data._bodyInit).chatrooms;
      this.setState({ chatrooms });
    });

  }

  // getUserId = async () => {
  //   try{
  //     let token = await AsyncStorage.getItem('userToken');
  //     fetch(`${this.state.url}:8888/profile/user_id`, {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         token: token
  //       })
  //     }).then(data => {
  //       console.log(JSON.parse(data))
  //     });
  //   }
  //   catch(e){
  //     console.log('error getting user id', e)
  //   }
  // }

  sendOnPress = (sendMessageToSocketServer, fetchMessages) => {
    if (this.state.text === "") return;
    fetch(`${this.state.url}:8888/chat/message/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: this.state.text,
        type: "message",
        userId: this.state.userId,
        chatroomId: this.state.inChatWith.chatroomId
      })
    }).then(() => {
      fetchMessages();
      sendMessageToSocketServer();
    });
  };

  onChangeText = text => {
    this.setState({ text });
  };

  clearTextInput = () => {
    this.setState({ text: "" });
  };

  handleChatWithFriend = (friend, page) => {
    this.setState({
      inChatWith: friend,
      page: page
    });
  };

  handleTrackPress = track => {
    this.setState({ 
      page: 'showSuggestions',
      selectedTrack: track
    })
  };

  render() {
    switch (this.state.page) {
      case "showChat":
        return (
          <Chat
            text={this.state.text}
            sendOnPress={this.sendOnPress}
            inChatWith={this.state.inChatWith}
            handleChatWithFriend={this.handleChatWithFriend}
            onChangeText={this.onChangeText}
            clearTextInput={this.clearTextInput}
            url={this.state.url}
            navigation={this.props.navigation}
            page={this.state.page}
            userId={this.state.userId}
            handleTrackPress={this.handleTrackPress}
          />
        );
      case 'showSuggestions':
        return (
          <Chat
            text={this.state.text}
            sendOnPress={this.sendOnPress}
            inChatWith={this.state.inChatWith}
            handleChatWithFriend={this.handleChatWithFriend}
            onChangeText={this.onChangeText}
            clearTextInput={this.clearTextInput}
            url={this.state.url}
            navigation={this.props.navigation}
            page={this.state.page}
            userId={this.state.userId}
            handleTrackPress={this.handleTrackPress}
            selectedTrack={this.state.selectedTrack}     
          />
        );
      case "showChatrooms":
        return (
          <ShowChatrooms
            chatrooms={this.state.chatrooms}
            handleChatWithFriend={this.handleChatWithFriend}
          />
        );
      case "suggestSong":
        return (
          <SuggestSong
            handleChatWithFriend={this.handleChatWithFriend}
            inChatWith={this.state.inChatWith}
            url={this.state.url}
            page={this.state.page}
            userId={this.state.userId}  
          />
        );
    }
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

const styles = StyleSheet.create({});
