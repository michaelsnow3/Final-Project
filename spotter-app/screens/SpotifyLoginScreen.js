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

  constructor(props) {
    super(props);
    this.state = {
      loginClicked: false,
      nodeServerUrl: "http://f81f3112.ngrok.io",
      socketServerUrl: "http://172.46.1.177"
    }
  }

  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    const linkOrLoginPage = (this.state.loginClicked) ?
      (<WebView
         source={
           { uri: `${this.state.nodeServerUrl}/login/`,
             method: 'GET',
             headers: { 'Cache-Control':'no-cache'}
           }
         }
         style={{marginTop: 20}}
         onLoadEnd={this.onLoadEnd}
         onError={this.onLoadError}
       />) :
      (<View style={styles.container}>
         <Button title="Login with spotify" onPress={this._clickLogin} />
       </View>);

    return linkOrLoginPage;
  }

  onLoadEnd = (data) => {
    const userTokenIndex = data.nativeEvent.url.indexOf('#access_token=');
    if (userTokenIndex > 0) {
      const userToken = data.nativeEvent.url.substring(userTokenIndex + 14); // 14 is the length of "#access_token="
      this._signInAsync(userToken);
    } else {
      this.props.navigation.navigate('Auth');
    }
  };

  onLoadError = (data) => {
    console.log("OnloadError at Login Screen:", data);
  };

  _clickLogin = () => {
    this.setState({loginClicked: true});
  };

  _signInAsync = async (userToken) => {
    await AsyncStorage.setItem('userToken', userToken);
    await AsyncStorage.setItem('nodeServerUrl', this.state.nodeServerUrl);
    await AsyncStorage.setItem('socketServerUrl', this.state.socketServerUrl);
    this.props.navigation.navigate('App');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});