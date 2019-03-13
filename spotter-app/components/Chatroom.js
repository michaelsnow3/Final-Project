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

class Chatroom extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      lastMessage: null
    }

    this._isMounted = false
  }
  componentDidMount() {
    this._isMounted = true
    if(this._isMounted) {
      this.fetchLastMessage()
    }
  }

  fetchLastMessage = async () => {
    let data = await fetch(`${this.props.url}/chat/message/last/${this.props.chatroomId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    let message = JSON.parse(data._bodyInit).message;
    // sort messages by date
    this.setState({ lastMessage: message })

    // this.setState({ messages: sortedMessages });
  }

  render() {
    let { name, chatroomId, handleChatWithFriend } = this.props
    handleFriendPress = () => {
      handleChatWithFriend({
        name: name,
        chatroomId: chatroomId
      }, 'showChat')
    }

    let lastMessageContent = this.state.lastMessage && this.state.lastMessage.content
    let lastMessageDate = this.state.lastMessage && this.state.lastMessage.date
    
    return (
      <TouchableOpacity style={styles.container} onPress={handleFriendPress}>
      <View style={styles.chatroomInfo}>
        <Text style={styles.name}>{name}</Text>
        <Text>{lastMessageContent}</Text>
      </View>
      <Text>{lastMessageDate}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: '#a8e8a7',
    justifyContent: 'center',
    marginBottom: 10
  },
  name: {
    fontSize: 30,
  }
});

export default Chatroom;