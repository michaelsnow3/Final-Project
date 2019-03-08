import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
} from 'react-native';

import { Icon } from 'expo';

export default class NearbyScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searching: true,
      searchingDot: "",
      userToken: null,
      serverUrl: null,
    }
  }

  componentDidMount() {

    this._interval = setInterval(() => {
      this.setSearchingText();
    }, 1000);

    this.props.navigation.addListener('willFocus', this._getUserInfo)
  }

  _getUserInfo = async() => {

    const userToken = await AsyncStorage.getItem('userToken');
    this.setState({userToken: userToken});

    fetch(`https://api.spotify.com/v1/me/player/`, {
       method: 'GET',
       headers: {
          'Authorization': "Bearer " + userToken
       }
     })
    .then((response) => response.json())
    .then((jsonData) => {
      let currentAlbum  = jsonData.item.album.name;
      let currentArtist = jsonData.item.album.artists[0].name;
      let currentSong   = jsonData.item.name;

      let userCurrentMusic = {
        album: currentAlbum,
        artist: currentArtist,
        song: currentSong
      };
      console.log(`${currentAlbum} / ${currentArtist} / ${currentSong}`);

      _sendFindRequest(userCurrentMusic);

    }).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
      throw error;
    });

    /*
    const userToken = await AsyncStorage.getItem('userToken');
    this.setState({userToken: userToken});
    const serverUrl = await AsyncStorage.getItem('serverUrl');
    this.setState({serverUrl: serverUrl});

    console.log(`${serverUrl}/nearby/${userToken}`);
    fetch(`${serverUrl}/profile/user_info/${userToken}`, {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
     })
    .then((response) => response.json())
    .then((jsonData) => {
      console.log(jsonData);
    }).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
      throw error;
    });
    */


  };

  static navigationOptions = {
    header: null,
  };

  _sendFindRequest = (currentMusic) => {

  };

  setSearchingText = () => {
    if (this.state.searchingDot.length > 30) {
      this.setState({searchingDot: ""});
    } else {
      this.setState({searchingDot: this.state.searchingDot + " . "});
    }
  };

  render() {
    const searchingOrFind = this._showSearchingOrFind();

    return (
      <View>
        {searchingOrFind}
      </View>
    );
  }

  _showSearchingOrFind = () => {
    if (this.state.searching) {
      return (
        <View>
          <View style={{alignItems: 'center'}}>
          <Icon.Ionicons
            name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'}
            size={256}
          />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 32}}>  Search</Text>
            <Text style={{fontSize: 32}}>{this.state.searchingDot}</Text>
          </View>
        </View>
      );
    } else {

    }
  };
}

const styles = StyleSheet.create({

});
