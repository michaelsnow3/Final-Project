import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator   from './MainTabNavigator';
import SpotifyLoginScreen from '../screens/SpotifyLoginScreen';

class AuthLoadingScreen extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {
    this.props.navigation.addListener('willFocus', this._bootstrapAsync);
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken     = await AsyncStorage.getItem('userToken');
    const lastLoginTime = await AsyncStorage.getItem('lastLoginTime');
    const current       = Date.now() / 1000 | 0;
    const outDated      = ((current - parseInt(lastLoginTime, 10)) > 3600000);

    if (outDated) {
      await AsyncStorage.clear();
    }

    this.props.navigation.navigate((outDated || !userToken) ? 'Auth' : 'App');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AuthStack = createStackNavigator({ SignIn: SpotifyLoginScreen });
const AppStack = createStackNavigator({ Main: MainTabNavigator });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack,
    App: AppStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));