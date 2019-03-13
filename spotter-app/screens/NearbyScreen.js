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
  TouchableHighlight,
} from 'react-native';

import { Icon } from 'expo';
import io from 'socket.io-client';
import UserCard from '../components/UserCard';
import FlipComponent from 'react-native-flip-component';
import OtherProfileScreen from './OtherProfileScreen.js';
import Spinner from 'react-native-loading-spinner-overlay';

export default class NearbyScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      spinner: true,
      searching: true,
      email: null,
      userIdFromSpotify: null,

      timer: 0,
      isFlipped: false,
      matchedPersonDbId: null,
      matchPerson: null,
      matchType: null,
      matchContent: null,
      matchCover: null,

      myIdInDb: null,
      pictureFromSpotify: null
    }
  }

  componentDidMount() {

    this.initSocket();

    this.props.navigation.addListener('willFocus', this._sendFindRequest);
    this.props.navigation.addListener('willFocus', this._trunOnSearching);
  }

  initSocket = async () => {

    const userIdFromSpotify = await AsyncStorage.getItem('userIdFromSpotify');
    const socketServerUrl   = await AsyncStorage.getItem('socketServerUrl');
    const nodeServerUrl     = await AsyncStorage.getItem('nodeServerUrl');
    const email             = await AsyncStorage.getItem('email');

    this.setState({nodeServerUrl: nodeServerUrl});

    const that = this;

    this.setState({userIdFromSpotify: userIdFromSpotify}, () => {
      try {
        this.socket = io.connect(`${socketServerUrl}:3005`);
        this.socket.on('connect', () => {
          console.log('connected at Nearby');
          this._sendFindRequest(userIdFromSpotify);
        });

        this.socket.on('findMatchPeople', function(match) {
          console.log("match:");
          console.log(match);
          if (match) {
            that.setState({matchPerson: match.matchPerson});
            that.setState({matchContent: match.matchContent});
            if (match.matchType === "Song") {
              that.setState({matchType: "track"});
            } else {
              that.setState({matchType: match.matchType});
            }
            that.setState({matchCover: match.matchCover});

            let delaySec = (that.state.timer > 3) ? 1000 : 4000;
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

  _matchingPeople = async () => {

    console.log("_matchingPeople");

    clearInterval(this.timerSearchingText);
    clearInterval(this.timerCountDown);

    await fetch(`${this.state.nodeServerUrl}/nearby/get_id/${this.state.matchPerson}`)
    .then((response) => response.json())
    .then((jsonData) => {
      console.log("jsonData:");
      console.log(jsonData);
      if (jsonData.id !== undefined) {
        this.setState({matchedPersonDbId: jsonData.id});
        this.setState({searching: false});
      }
    })
    .catch(function(error) {
      console.log('Problem with get the matched user db Id:', error);
      throw error;
    });
  };

  _sendFindRequest = () => {
    if (this.socket && this.socket.connected && this.state.userIdFromSpotify) {
      this.socket.emit("findPeople", {
        myName: this.state.userIdFromSpotify
      });
    }
  };

  _countDownTimer = (that) => {
    that.setState({timer: that.state.timer + 1});
    if(this.state.timer === 6) {

      this.setState({timer: 0});
      clearInterval(this.timerCountDown);

      let that = this;
      Alert.alert('Finding People', "No people listening similar music nearby",
        [
          {text: 'Ok', onPress: () => {this.setState({spinner: false})} },
          {text: 'Search Again', onPress: () => this._searchAgain(that) },
        ]
      );
    }
  };

  _trunOnSearching = () => {
    if (this.state.timer === 0) {

      this.setState({spinner: true});
      let that = this;
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

  handler = (friend_id, page) => {
    this.setState({
      page : "OtherProfileScreen",
      friend_id : this.state.matchedPersonDbId
    });
  };

  render() {

    const searchingOrFind = this._showSearchingOrFind();

    return (
      <View>
        <Text style={styles.name}>Nearby</Text>
          <View style={{borderTopWidth:1,}}>
            {searchingOrFind}
          </View>
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
          <Spinner
            visible={this.state.spinner}
            textContent={'Searching...'}
            textStyle={styles.spinnerTextStyle}
          />
        </View>
      );
    } else {
      return (
        <View style={{ height: '100%', width: '100%' }}>
          <FlipComponent
            isFlipped={this.state.isFlipped}
            frontView={
              <View>
                <Text style={{ textAlign: 'center',fontSize:25 }}>
                  {'\n'}You match with :
                </Text>
                <Text style={{textAlign: 'center',fontSize:50, fontWeight:'bold',fontStyle:'italic',color:'#008000'}}>
                  {this.state.matchPerson}
                </Text>
                <TouchableHighlight style={{justifyContent: 'center',alignItems: 'center',}} onPress={() => {
                    this.setState({ isFlipped: !this.state.isFlipped })
                  }}>
                  <Image style={{width: 180, height: 180}} source={{uri: this.state.matchCover}} />
                </TouchableHighlight>
                <Text style={{textAlign: 'center',fontSize:25}}>
                  By {this.state.matchType} :
                </Text>
                <Text style={{textAlign: 'center',fontSize:50, fontWeight:'bold',fontStyle:'italic',color:'#CD853F'}}>
                  {this.state.matchContent}
                </Text>
              </View>
            }
            backView={
              <View>
                <OtherProfileScreen
                  handler={this.handler}
                  id={this.state.matchedPersonDbId}
                  name={this.state.matchPerson}
                  navigation={this.props.navigation}
                  handleChatWithFriend={() => {
                    console.log(111111)
                  }}
                />
              </View>
            }
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
  },
  spinnerTextStyle: {
    color: '#FFF',
    fontSize: 30
  },
});