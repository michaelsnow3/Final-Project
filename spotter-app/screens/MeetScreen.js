import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  View,
  AsyncStorage,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import OtherProfileScreen from './OtherProfileScreen.js';
import People from '../components/People';


export default class MeetScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: true,
      user_id : null,
      page : 'Greet',
      people : [],
      friend_id : null,
      friend_name: null,
    }
  }
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    console.log('meet render')
  }

  setFriendName = async (name) => {
    await this.setState({
      friend_name: name,
    })
    this.setState({
      page: 'OtherProfileScreen'
    })
  };

  meet = async () => {
    console.log('meet call');
    this.setState({
      page: 'Meet'
    });

    const nodeServerUrl = await AsyncStorage.getItem('nodeServerUrl');
    const userIdFromSpotify = await AsyncStorage.getItem('userIdFromSpotify');
    console.log("userIdFromSpotify:", userIdFromSpotify);
    console.log("url meet:", `${nodeServerUrl}/meet/get`);

    fetch(`${nodeServerUrl}/nearby/get_id/${userIdFromSpotify}`)
    .then((response) => response.json())
    .then((jsonData) => {
      console.log("jsonData:");
      console.log(jsonData);
      if (jsonData.id !== undefined) {
        fetch(`${nodeServerUrl}/meet/get`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id : jsonData.id,
          }),
        })
        .then(data => {
          // parsing received data, extracting required data
          let parsedData = JSON.parse(data._bodyInit)
          let newParsedData = [];
          // user name and id were passed in one string, and so must be extracted and separated
          for (let user of parsedData) {
            let splitUser = user.split(' ')
            let user_id = splitUser[splitUser.length-1]
            splitUser.pop();

            let user_name = splitUser.join(' ')
            if (user_name === userIdFromSpotify) {
              continue;
            }
            let newUser = {
              id : user_id,
              name : user_name
            }
            // this.setFriendName(user_name);
            newParsedData.push(newUser);
          }
          // need to accept in an array of people's names and ids (strecth: avatars)
          this.setState({
            people : newParsedData,
            searching: false,
            timer: 0,
          });
          clearInterval(this.timerSearchingText);
        })
        .catch((err) => {
          console.log(err);
        });
      }
    })
    .catch(function(error) {
      console.log('Problem with get user db Id at meet:', error);
      throw error;
    });
  }

  back = () => {
    this.setState ({
      page : 'Greet',
      people : [],
      searching: true,
    })
  }

  handler = (friend_id, page) => {
    this.setState({
      friend_id : friend_id,
      page : page
    })
  }

  handleMeet = (page) => {
    this.setState({
      page : page
    })
  }

  _showSearchingOrResult = () => {
    return (this.state.searching) ?
      (<Spinner
        visible={this.state.searching}
        textContent={'Searching...'}
        textStyle={styles.spinnerTextStyle}
       />) :
      (<View>
        <People people={this.state.people} handler={this.handler} setFriendName={this.setFriendName} />
       </View>);
  };

  render() {

    const showSearchingOrResult = this._showSearchingOrResult();

    switch (this.state.page) {
      case 'Greet':
        return (
          <View style={styles.container}>
            <Text>Meet others who share your music tastes!</Text>
            <Button title="Meet!" onPress={this.meet} />
          </View>
        )
      case 'Meet':
        return (
          <View>
            <Button title="Back" onPress={this.back} />
            {showSearchingOrResult}
          </View>);
      case 'OtherProfileScreen':
        return (
          <OtherProfileScreen
          handler={this.handler}
          id={this.state.friend_id}
          navigation={this.props.navigation}
          name={this.state.friend_name}
          handleMeet={this.handleMeet}
          handleChatWithFriend={() => {}} />
        )
    }
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
    fontSize: 30
  },
});
