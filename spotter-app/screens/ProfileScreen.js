import React from 'react';
import {
  View,
  Button,
  AsyncStorage,
  StyleSheet,
  Text,
} from 'react-native';

export default class ProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this._getUserInfo();
  }

  state = {
    userToken: null,
    serverUrl: null,
    userId: null
  };

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Id: {this.state.userId}</Text>
        <Button title="Logout this amazing App :)" onPress={this._signOutAsync} />
      </View>
    );
  }

  _getUserInfo = async () => {

    const userToken = await AsyncStorage.getItem('userToken');
    this.setState({userToken: userToken});
    const serverUrl = await AsyncStorage.getItem('serverUrl');
    this.setState({serverUrl: serverUrl});

    // // use the access token to access the Spotify Web API
    // request.get(options, function(error, response, body) {
    //   let avatar = (body.images.length === 0) ? null : body.images[0].url;
    //   let userInfo = {
    //     username: body.display_name,
    //     avatar: avatar,
    //     email: body.email
    //   };
    //   console.log(userInfo);
    // });
    console.log("Going to fetch:");
    fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: { Authorization: "Bearer " + userToken }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.setState({userId: responseJson.id});
    })
    .catch((error) => {
      console.error(error);
    });
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

const styles = StyleSheet.create({

});
