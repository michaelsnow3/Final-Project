import React from "react";
import ShowChatrooms from "../components/ShowChatrooms";
import Chat from "../components/Chat";
import SuggestSong from "../components/SuggestSong";
import StartChat from "../components/StartChat";

import {
  StyleSheet,
  Button,
  Image,
  Platform,
  ScrollView,
  AsyncStorage,
  YellowBox,
} from "react-native";
import { MonoText } from "../components/StyledText";

import io from 'socket.io-client';

export default class ChatScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      text: "",
      chatrooms: [],
      page: "showChatrooms",
      suggestedSong: {},
      url: "https://4421722a.ngrok.io",
      inChatWith: null,
      userId: 6,
      selectedTrack: null,
      userToken: null,
      socketServerUrl: null,
      username: null,
      playlists: [],
      messages: []
    };

    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    if(this._isMounted){
      this._getUserInfo()
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  
  initSocket = () => {
    console.log(`${this.state.socketServerUrl}:3005`)
    this.socket = io.connect(`${this.state.socketServerUrl}:3005`)

    console.log('in insocket')

    this.socket.on('connect', () => {
      console.log('connected')
      this.socket.on(this.state.inChatWith.chatroomId.toString(), (data) => {
        this.fetchMessages()
        // this.forceUpdate()
      })
    })
  }

  fetchMessages = async () => {
    let data = await fetch(`${this.state.url}/chat/message/view/${this.state.inChatWith.chatroomId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    let messages = JSON.parse(data._bodyInit).messages;
    // sort messages by date
    let sortedMessages = messages.sort(function(a, b) {
      return new Date(a.date) - new Date(b.date);
    });

    this.setState({ messages: sortedMessages });
  }


  sendMessageToSocketServer = () => {
    this.socket.emit('message', {
      chatroomId: this.state.inChatWith.chatroomId
    })
  }

  _getUserInfo = async () => {

    const userToken = await AsyncStorage.getItem('userToken');
    this.setState({userToken: userToken});
    const nodeServerUrl = await AsyncStorage.getItem('nodeServerUrl');
    this.setState({url: nodeServerUrl});
    const socketServerUrl = await AsyncStorage.getItem('socketServerUrl');
    this.setState({socketServerUrl: socketServerUrl});
    const username = await AsyncStorage.getItem('userIdFromSpotify')
    this.setState({username}, () => {
      this.getUserId()
    })
  }

  fetchChatrooms = () => {
    fetch(`${this.state.url}/chat/chatrooms/${this.state.userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(data => {
      let chatrooms = JSON.parse(data._bodyInit).chatrooms;
      this.setState({ chatrooms });
    });
  }
  
  fetchFriends = () => {
    fetch(`${this.state.url}/show-friends/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id : this.state.userId
      })
    }).then(data => {
      let friends = JSON.parse(data._bodyInit)
      this.setState({ friends })
    })
  }

  sendOnPress = (sendMessageToSocketServer) => {
    if (this.state.text === "") return;
    fetch(`${this.state.url}/chat/message/create`, {
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
      this.fetchMessages();
      sendMessageToSocketServer();
    });
  };

  getUserId = () => {
    fetch(`${this.state.url}/nearby/get_id/${this.state.username}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then((data) => {
      let userId = JSON.parse(data._bodyInit).id
      this.setState({userId}, () => {
        this.fetchFriends()
        this.fetchChatrooms()
      })
    });
  }

  onChangeText = text => {
    this.setState({ text });
  };

  clearTextInput = () => {
    this.setState({ text: "" });
  };

  handleChatWithFriend = (friend, page, callback) => {
    // if(callback) {
    //   callback()
    // }
    this.setState({
      inChatWith: friend,
      page: page
    });
  };

  handleTrackPress = track => {
    if(this.state.selectedTrack && track.id === this.state.selectedTrack.id) {
      this.setState({
        selectedTrack: {}
      })
    }else {
      this.setState({ 
        page: 'showSuggestions',
        selectedTrack: track
      })
    }
  };

  getPlaylists = () => {
    fetch(`${this.state.url}/show_profile/${this.state.userToken}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then((data) => {
      console.log(data._bodyInit)
    })
  }

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
            socketServerUrl={this.state.socketServerUrl}
            initSocket={this.initSocket}
            sendMessageToSocketServer={this.sendMessageToSocketServer}
            fetchMessages={this.fetchMessages}
            messages={this.state.messages}
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
            socketServerUrl={this.state.socketServerUrl} 
            fetchMessages={this.fetchMessages}
            messages={this.state.messages}
          />
        );
      case "showChatrooms":
        return (
          <ShowChatrooms
            chatrooms={this.state.chatrooms}
            handleChatWithFriend={this.handleChatWithFriend}
          />
        );
      case 'startChat':
        return (
          <ScrollView style={styles.container}>
            <StartChat 
              friends={this.state.friends} 
              handleChatWithFriend={this.handleChatWithFriend} 
              userId={this.state.userId}
              url={this.state.url}
              fetchChatrooms={this.fetchChatrooms}
            />
          </ScrollView>
        );
      case "suggestSong":
        return (
          <SuggestSong
            handleChatWithFriend={this.handleChatWithFriend}
            inChatWith={this.state.inChatWith}
            url={this.state.url}
            page={this.state.page}
            userId={this.state.userId}  
            sendMessageToSocketServer={this.sendMessageToSocketServer}
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
