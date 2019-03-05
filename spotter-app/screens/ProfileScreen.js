import React from 'react';
import {
  View,
  Button,
  AsyncStorage,
  StyleSheet,
  Text,
} from 'react-native';

export default class ProfileScreen extends React.Component {

  state = {
    userToken: null,
    serverUrl: null
  };

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: null,
  };

  render() {

    this._getUserInfo();

    return (
      <View style={styles.container}>
        <Text>Profile</Text>
        <Button title="Logout this amazing App :)" onPress={this._signOutAsync} />
      </View>
    );
  }

  _getUserInfo = async () => {

    const userToken = await AsyncStorage.getItem('userToken');
    this.setState({userToken: userToken});
    const serverUrl = await AsyncStorage.getItem('serverUrl');
    this.setState({serverUrl: serverUrl});

    // fetch('https://mywebsite.com/endpoint/', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     firstParam: 'yourValue',
    //     secondParam: 'yourOtherValue',
    //   }),
    // });
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
