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
  Button,
} from 'react-native';

import { Icon } from 'expo';
import io from 'socket.io-client';
import UserCard from '../components/UserCard';
import { getUserDbId } from '../components/GetUserDbId';
import FlipComponent from 'react-native-flip-component';

export default class NearbyScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searching: true,
      searchingDot: "",
      email: null,

      timer: 0,
      isFlipped: false,
      matchedPersonDbId: null,
      matchPerson: null
    }
  }

  componentDidMount() {

    this.initSocket();

    this.props.navigation.addListener('willFocus', this._sendFindRequest);
    this.props.navigation.addListener('willFocus', this._trunOnSearching);
  }

  initSocket = async () => {

    const socketServerUrl = await AsyncStorage.getItem('socketServerUrl');
    const nodeServerUrl   = await AsyncStorage.getItem('nodeServerUrl');
    const email           = await AsyncStorage.getItem('email');

    this.setState({nodeServerUrl: nodeServerUrl});

    const that = this;

    this.setState({email: email}, () => {
      try {
        this.socket = io.connect(`${socketServerUrl}:3005`);
        this.socket.on('connect', () => {
          console.log('connected at Nearby');
          this._sendFindRequest(email);

          // confusing... why the "this" in _matchPeople function is different
          // from "this" here
          //this._matchPeople(this);
        });

        this.socket.on('findMatchPeople', function(match) {
          console.log("match:");
          console.log(match);
          if (match) {
            that.setState({matchPerson: match.matchPerson});
            let delaySec = (that.state.timer > 3) ? 1000 : 3000;
            setTimeout(that._matchingPeople, delaySec);
          }
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

  _matchingPeople = () => {

    console.log("_matchingPeople");

    this.setState({searching: false});
    clearInterval(this.timerSearchingText);
    clearInterval(this.timerCountDown);

    getUserDbId(this.state.matchPerson, this.state.nodeServerUrl)
    .then((response) => response.json())
    .then((jsonData) => {
      console.log("jsonData:");
      console.log(jsonData);
      if (jsonData.id !== undefined) {
        this.setState({matchedPersonDbId: jsonData.id});
      }
    })
    .catch(function(error) {
      console.log('Problem with your getUserDbId: ' + error.message);
      throw error;
    });
  };

  _sendFindRequest = () => {
    if (this.socket && this.socket.connected && this.state.email) {
      this.socket.emit("findPeople", {
        myEmail: this.state.email
      });
    }
  };

  _setSearchingText = (that) => {
    if (that.state.searchingDot.length > 30) {
      that.setState({searchingDot: ""});
    } else {
      that.setState({searchingDot: that.state.searchingDot + " . "});
    }
  };

  _countDownTimer = (that) => {
    that.setState({timer: that.state.timer + 1});
    if(this.state.timer === 6) {

      this.setState({timer: 0});
      this.setState({searchingDot: ""});
      clearInterval(this.timerSearchingText);
      clearInterval(this.timerCountDown);

      let that = this;
      Alert.alert('Finding People', "No people listening similar music nearby",
        [
          {text: 'Ok', onPress: () => {} },
          {text: 'Search Again', onPress: () => this._searchAgain(that) },
        ]
      );
    }
  };

  _trunOnSearching = () => {
    if (this.state.timer === 0) {

      let that = this;

      this.timerSearchingText = setInterval(() => {
          this._setSearchingText(that);
      }, 800);

      this.timerCountDown = setInterval(() => {
          this._countDownTimer(that);
      }, 1000);
    }
  };

  _searchAgain = (that) => {
    that.setState({timer: 0});
    that._trunOnSearching();
    that._sendFindRequest(that.state.email);
  };

  render() {

    const searchingOrFind = this._showSearchingOrFind();

    return (
      <View>
        <Text style={styles.name}>Nearby</Text>
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
      return (
        <View>
          <FlipComponent
            isFlipped={this.state.isFlipped}
            frontView={
              <View>
                <Text style={{ textAlign: 'center' }}>
                  Front Side
                </Text>
              </View>
            }
            backView={
              <View>
                <Text style={{ textAlign: 'center' }}>
                  Back Side
                </Text>
              </View>
            }
          />
          <Button
            onPress={() => {
              this.setState({ isFlipped: !this.state.isFlipped })
            }}
            title="Flip"
          />
      </View>
      );
    }
  };
}

const styles = StyleSheet.create({
  name: {
    fontSize: 50,
    textAlign: 'center'
  }
});
