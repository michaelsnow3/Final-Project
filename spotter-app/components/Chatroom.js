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
    let { name, chatroomId, handleChatWithFriend, avatar } = this.props

    let profilePicture = avatar || 
      'data:image/jpeg;base64,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'

    let chatAvatar = (
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: profilePicture
          }}
        />
      </View>
    )

    handleFriendPress = () => {
      handleChatWithFriend({
        name: name,
        chatroomId: chatroomId
      }, 'showChat')
    }

    let newdate = false;
    if(this.state.lastMessage){
      //parse date
      let dateObj = new Date(this.state.lastMessage.date);
      var month = dateObj.getUTCMonth() + 1;
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();
  
      newdate = year + "/" + month + "/" + day;
    }

    let lastMessageContent = this.state.lastMessage && this.state.lastMessage.content
    if(this.state.lastMessage && (this.state.lastMessage.content.length > 70)) {
      lastMessageContent = lastMessageContent.substring(0, 60) + '...';
    }
    return (
      <TouchableOpacity style={styles.container} onPress={handleFriendPress}>
      {chatAvatar}
      <View style={styles.chatroomInfo}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.lastMessage}>{lastMessageContent}</Text>
      </View>
      <Text style={styles.date}>{newdate}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    borderTopWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatroomInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  date: {
    alignSelf: 'center',
    fontSize: 15,
    marginRight: 10,
  },
  lastMessage: {
    fontSize: 15,
  },
  imageContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 15,
    marginRight: 15,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20,
  }
});

export default Chatroom;