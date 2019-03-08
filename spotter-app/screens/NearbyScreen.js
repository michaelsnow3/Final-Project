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
import io from 'socket.io-client';

export default class NearbyScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searching: true,
      searchingDot: "",
      email: null
    }

    this.initSocket();
  }

  componentDidMount() {
    this._interval = setInterval(() => {
      this.setSearchingText();
    }, 1000);

    this.props.navigation.addListener('willFocus', this._sendFindRequest);
  }

  initSocket = async () => {

    const email           = await AsyncStorage.getItem('email');
    const nodeServerUrl   = await AsyncStorage.getItem('nodeServerUrl');
    const socketServerUrl = await AsyncStorage.getItem('socketServerUrl');

    this.setState({email: email}, () => {
      try {
        this.socket = io.connect(`${socketServerUrl}:3005`);
        this.socket.on('connect', () => {
          console.log('connected at Nearby');
          this._sendFindRequest(email);
        });
      } catch (error) {
        console.log('Problem with initSocket:' + error.message);
        throw error;
      }
    });
  };

  static navigationOptions = {
    header: null,
  };

  _sendFindRequest = () => {
    console.log("Email at app side:");
    console.log(this.state.email);
    if (this.socket && this.socket.connected && this.state.email) {
      this.socket.emit("findPeople", {
        myEmail: this.state.email
      });
    }
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
