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
  TouchableHighlight,
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
          <View style={{justifyContent: 'center',textAlign: 'center'}}>
          <View>
            <Text style={{fontSize: 50,textAlign: 'center'}}>Meet</Text>
            <Text></Text>
          </View>
          <View style={{justifyContent: 'center',textAlign: 'center',}}>
            <Text style={{fontSize: 20,textAlign: 'center'}}>Meet others who share your music tastes!</Text>
            <Text>{'\n'}</Text>

            <View style={{
              borderWidth:1,
              borderRadius: 10,
              width:350,
              justifyContent: 'center',
              textAlign: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
              <Text style={{
                justifyContent: 'center',
                fontSize: 15,
                textAlign: 'center',
                width: 350,
                alignSelf: 'center',
              }}>Make finding more precise{'\n'}add your favorite music{'\n'}at your Profile!</Text>
              <Image
                  style={{width: 300, height: 200}}
                  source={{uri: "https://media.giphy.com/media/8L0wzMc4bVkkI78r4x/giphy.gif"}}
              />
              </View>
            <Text>{'\n'}</Text>
          </View>
            <TouchableHighlight
              style={{justifyContent: 'center',alignItems: 'center',borderRadius: 40}}
              onPress={this.meet}>
              <Image
                style={{width: 80, height: 80, borderRadius: 40}}
                source={{uri: "http://blog.tourradar.com/wp-content/uploads/2013/10/TourRadar_App_icon.png"}}
              />
            </TouchableHighlight>
          </View>
        )
      case 'Meet':
        return (
          <View>
            <TouchableOpacity
            style={
              {
                backgroundColor: 'white',
                width: 100,
                height: 30,
                top:10,
                justifyContent: 'center',
                alignItems:'center',
                borderRadius:10,
                borderWidth:2,
                alignSelf: 'center'
              }
            }
            onPress={this.back}>
            <Text style={{fontSize:20,color:'black',fontWeight: 'bold'}}>
              Back
            </Text>
          </TouchableOpacity>
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
