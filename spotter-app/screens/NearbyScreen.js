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
  Alert,
} from 'react-native';

import { Icon } from 'expo';
import io from 'socket.io-client';

export default class NearbyScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searching: true,
      searchingDot: "",
      email: null,

      willingSendFindRequest: true,
      timer: 0
    }
  }

  componentDidMount() {

    this.initSocket();

    this._interval = setInterval(() => {
      if (this.state.willingSendFindRequest) {
        this.setSearchingText();
        this._countDownTimer();
      }
    }, 1000);

    this.props.navigation.addListener('willFocus', this._sendFindRequest);
    this.props.navigation.addListener('willFocus', this._trunOnSearching);
  }

  initSocket = async () => {

    const socketServerUrl = await AsyncStorage.getItem('socketServerUrl');
    const nodeServerUrl   = await AsyncStorage.getItem('nodeServerUrl');
    const email           = await AsyncStorage.getItem('email');

    this.setState({email: email}, () => {
      try {
        this.socket = io.connect(`${socketServerUrl}:3005`);
        this.socket.on('connect', () => {
          console.log('connected at Nearby');
          this._sendFindRequest(email);
          this._matchPeople();
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

  _matchPeople = () => {
    console.log("socket on _matchPeople");
    this.socket.on('findMatchPeople', function(match) {
      console.log("match:");
      console.log(match);
    });
  };

  _sendFindRequest = () => {
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

  _countDownTimer = () => {
    this.setState({timer: this.state.timer + 1});
    let time = this.state.timer;
    if(this.state.timer === 6) {
      Alert.alert('Finding People', "No people listening similar music nearby",
        [
          {text: 'Ok', onPress: () => this._stopSearching() },
          {text: 'Search Again', onPress: () => this._resetTimer() },
        ]
      );
    }
  };

  _trunOnSearching = () => {
    this.setState({willingSendFindRequest: true});
    this.setState({timer: 0});
  };

  _stopSearching = () => {
    this.setState({willingSendFindRequest: false});
    this.setState({searchingDot: ""});
  };

  _resetTimer = () => {
    this.setState({timer: 0});
    this.setState({searchingDot: ""});
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
