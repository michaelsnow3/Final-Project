import React from 'react';
import {
  View,
  Button,
  Image,
  StyleSheet,
  Text,
  AsyncStorage,
} from 'react-native';

//////////// have a list of all route paths
// receive user id in props?
// set user id
// message button redirect to chat
// styling

export default class OtherProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      my_id : null,

      friend: false,
      user_id : this.props.id,
      name : "",
      avatar : null,
      top3 : "",
    }
    console.log(`id:${this.props.id},in OtherProfileScreen`);
  }
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this._getMyId();
  }

  _getMyId = async () => {

    console.log(`execute _getMyId`);

    const userIdFromSpotify = await AsyncStorage.getItem('userIdFromSpotify');
    const nodeServerUrl     = await AsyncStorage.getItem('nodeServerUrl');

    console.log("get my id url:", `${nodeServerUrl}/nearby/get_id/${userIdFromSpotify}`);

    fetch(`${nodeServerUrl}/nearby/get_id/${userIdFromSpotify}`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": 'application/json',   
        "Connection": "close",   
      }
    })
    .then((response) => response.json())
    .then((jsonData) => {
      if (jsonData.id !== undefined) {
        this.setState({my_id: jsonData.id});

        this.getUser(nodeServerUrl, this.props.name);
        //this.getFav();
        this.checkFriend(nodeServerUrl);
      }
    })
    .catch(function(error) {
      console.log('Problem with get my_id:', error);
      throw error;
    });
  };

  getUser = async (nodeServerUrl, username) => {

    console.log("get user url:", `${nodeServerUrl}/profile/user_info/${username}`);

    fetch(`${nodeServerUrl}/profile/user_info/${username}`)
    .then((response) => response.json())
    .then((jsonData) => {

      console.log("jsonData:");
      console.log(jsonData);

      this._setUserInfo(jsonData);
      this._setUserFav(jsonData);
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
  };

  _setUserInfo = (jsonData) => {
    if (jsonData.name) {
      this.setState({name: jsonData.name});
    }

    if (jsonData.avatar) {
      this.setState({avatar: jsonData.avatar});
    }
  };

  _setUserFav = (jsonData) => {
    if (jsonData.favoriteGenres) {
        this.setState({favoriteGenres: jsonData.favoriteGenres});
    }

    if (jsonData.favoriteArtists) {
      this.setState({favoriteArtists: jsonData.favoriteArtists});
    }

    if (jsonData.favoriteSongs) {
      this.setState({favoriteSongs: jsonData.favoriteSongs});
    }
  }

  checkFriend = (nodeServerUrl) => {
    fetch(`${nodeServerUrl}/show_profile/friend_status`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id : this.state.my_id,
      friend_id : this.state.user_id
    }),
    })
    .then((response) => {
      (response._bodyText === 'true') ? this.setState({friend : true}) : this.setState({friend : false});
    })
    .catch((err) => {
      console.log(err);
    });
  }

  addFriend = () => {

    console.log("url in addFriend:", `${this.state.nodeServerUrl}/show_profile/add_friend`);

    fetch(`${this.state.nodeServerUrl}/show_profile/add_friend`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id : this.state.my_id,
        friend_id : this.state.user_id
      }),
      })
      .then(() => {
        this.setState({friend : true})
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Doesnt work
  message = () => {
    this.props.navigation.navigate(`Chat`);
  }

  render() {
    const addOrMsg = (this.state.friend) ?
    (<Button title="Message" onPress={this.message} style={styles.container}/>) :
    (<Button title="Add Friend" onPress={this.addFriend} style={styles.container}/>);

    const avatar = (this.state.avatar === null ) ?
    <Text style={styles.textStyle}> No Image </Text> :
    <Image style={{width: 200, height: 200,}} source={{uri: this.state.avatar}} />

    return (
      <View>
        <Text style={styles.textStyle}>
          {this.state.name}{'\n'}
        </Text>
        {avatar}
        <Text style={styles.textStyle}>
          {'\n'}Top 3 Favourite Songs:
        </Text>
        <Text style={styles.textStyle}>
          {this.state.top3}
        </Text>
        {addOrMsg}
        <Button title="View Friends" onPress={() => {
          this.props.handler( null, 'ShowFriends'
          )
        }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  textStyle: {
    textAlign: 'center',
    fontSize:25,
  },
});

// get favorite information from db instead of from spotify now
  // getFav = async () => {
  //   fetch(`${nodeServerUrl}/show_profile/fav`, {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       id : this.state.user_id
  //     })
  //   })
  //   .then((data) => data.json())
  //   .then(json => {
  //     const songNames = [];
  //     json.forEach(entry => {
  //       songNames.push(entry.name)
  //     })
  //     top3 = songNames.join("\r\n");
  //     this.setState({
  //       top3: top3
  //     })
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }
