import React from 'react';
import {
  View,
  StyleSheet,
  AsyncStorage,
  WebView,
  Linking,
  TouchableHighlight,
  Text,
  Image
} from 'react-native';

import { AppLoading, Font } from 'expo';
import { getUserProfile } from '../components/GetUserProfile';

export default class SpotifyLoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loginClicked: false,
      nodeServerUrl: "https://mysterious-gorge-24322.herokuapp.com",
      socketServerUrl: "https://agile-everglades-42861.herokuapp.com",

      loading: true
    }
  }

  async componentWillMount() {
    await Font.loadAsync({
      AmarulaPersonalUse: require('./../assets/fonts/Amarula_Personal_Use.ttf'),
    });

    this.setState({ loading: false });
  };

  static navigationOptions = {
    title: 'Spotter',
  };

  render() {

    if (this.state.loading) {
      return <Expo.AppLoading />;
    }

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
        <Image
          style={{width: 45, height: 45, position: "absolute",top: 12, left:12}}
          source={{uri: "data:image/png;base64,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"}}
        />
        <Image
          style={{width: 60, height: 60, position: "absolute",top: 6, right:6}}
          source={{uri: "https://st2.depositphotos.com/2234823/8318/i/950/depositphotos_83181408-stock-photo-inbox-envelope-mail-icon-illustration.jpg"}}
        />
        <TouchableHighlight
          style={{justifyContent: 'center',alignItems: 'center',}}
          onPress={this._clickLogin}>
          <Image
            style={{width: 258, height: 47}}
            source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzmUgBqPvMOiq4p1RoLihLjilrO3PeRD9ZNPz44hLZHqWTKjYVFQ"}}
          />
        </TouchableHighlight>

        <View style={{position: "absolute",bottom: 60, flexDirection:'row',}}>
          <Text style={{fontFamily: "AmarulaPersonalUse", fontSize: 25}}>Stan</Text>
          <Text style={{fontFamily: "AmarulaPersonalUse", fontSize: 10}}>  x  </Text>
          <Text style={{fontFamily: "AmarulaPersonalUse", fontSize: 25}}>Michael </Text>
          <Text style={{fontFamily: "AmarulaPersonalUse", fontSize: 10}}>  x </Text>
          <Text style={{fontFamily: "AmarulaPersonalUse", fontSize: 25}}>YuNing</Text>
        </View>
        <View style={{flexDirection:'row',position: "absolute", bottom:15, left:24}}>
          <Image
            style={{width: 168, height: 45,}}
            source={{uri: "https://techalliance.ca/wp-content/uploads/2017/04/LHL-banner.jpg"}}
          />
          <Image
            style={{position: "relative", width: 132, height: 19, right:8, top: 18,}}
            source={{uri: "https://upload.cc/i1/2019/03/13/QIMWcX.png"}}
          />
        </View>
       </View>);

    return linkOrLoginPage;
  }

  onLoadEnd = (data) => {
    const userTokenIndex = data.nativeEvent.url.indexOf('#access_token=');
    if (userTokenIndex > 0) {
      const userToken = data.nativeEvent.url.substring(userTokenIndex + 14); // 14 is the length of "#access_token="
      this.dealWithEdealWithEmailThenJumpPagemail(userToken);
    } else {
      this.props.navigation.navigate('Auth');
    }
  };

  dealWithEdealWithEmailThenJumpPagemail = (userToken) => {
    getUserProfile(userToken)
    .then((response) => response.json())
    .then((jsonData) => {
      if (jsonData) {
        console.log(jsonData);
        this._signInAsync(userToken, jsonData.email, jsonData.display_name);
      }
    }).catch(function(error) {
      console.log('Problem with your currentMusic processing: ' + error.message);
      throw error;
    });
  };

  onLoadError = (data) => {
    console.log("OnloadError at Login Screen:", data);
  };

  _clickLogin = () => {
    this.setState({loginClicked: true});
  };

  _signInAsync = async (userToken, email, userIdFromSpotify) => {
    if (email) {
      await AsyncStorage.setItem('email', email);
    }

    if(userToken) {
      await AsyncStorage.setItem('userToken', userToken);
    }

    if (userIdFromSpotify) {
      await AsyncStorage.setItem('userIdFromSpotify', userIdFromSpotify);
    }

    await AsyncStorage.setItem('nodeServerUrl', this.state.nodeServerUrl);
    await AsyncStorage.setItem('socketServerUrl', this.state.socketServerUrl);
    await AsyncStorage.setItem('lastLoginTime', String(Date.now() / 1000 | 0));
    this.props.navigation.navigate('App');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 10,
    borderColor: '#D3D3D3',
    borderRadius: 20,
  },
});