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

    this._getUserInfoAndSendFindRequest();
  }

  _getUserInfoAndSendFindRequest = async() => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.setState({userToken: userToken});
    const serverUrl = await AsyncStorage.getItem('serverUrl');
    this.setState({serverUrl: serverUrl});

    console.log(`${serverUrl}/nearby/${userToken}`);
    fetch(`${serverUrl}/nearby/${userToken}`, {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
     })
    .then((response) => response.json())
    .then((jsonData) => {
      console.log(jsonData);
    });
  };

  static navigationOptions = {
    header: null,
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
