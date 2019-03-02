import React from 'react';
import {
  View,
  StyleSheet,
  Button,
  AsyncStorage,
} from 'react-native';

export default class SpotifyLoginScreen extends React.Component {

  constructor() {
    super();
    console.log(this);
  }

  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Login with spotify" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
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