import React from 'react';
import {
  View,
  StyleSheet,
  Button,
  AsyncStorage,
  WebView,
  Linking,
} from 'react-native';

export default class SpotifyLoginScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      loginClicked: false
    }
  }

  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    const linkOrLoginPage = (this.state.loginClicked) ?
            (<WebView
               source={
                 { uri: `http://05dc7bba.ngrok.io/login/`,
                   method: 'GET',
                   headers: { 'Cache-Control':'no-cache'}
                 }
               }
               style={{marginTop: 20}}
               isDefaultPrevented={true}
               onLoadEnd={this.onLoadEnd}
             />) :
            (<View style={styles.container}>
               <Button title="Login with spotify" onPress={this._clickLogin} />
             </View>);

    return linkOrLoginPage;
  }

  onLoadEnd = (data) => {
    const userTokenIndex = data.nativeEvent.url.indexOf('#access_token=');
    if (userTokenIndex > 0) {
      const userToken = data.nativeEvent.url.substring(userTokenIndex + 14);
      console.log("userToken:");
      console.log(userToken);
      this._signInAsync(userToken);
      this.props.navigation.navigate('App');
    } else {
      this.props.navigation.navigate('Auth');
    }
  }

  _clickLogin = () => {
    this.setState({loginClicked: true});
  }

  _signInAsync = async (userToken) => {
    await AsyncStorage.setItem('userToken', "userToken");
    this.props.navigation.navigate('App');
  }

  _oAuthSpotify = async () => {
    try {
      let response = await fetch(
        'http://14374d31.ngrok.io/login/',
      );
      return responseJson = await response.json();
    } catch (error) {
      console.error(error);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});