import React from 'react';
import {
  View,
  Button,
  AsyncStorage,
  StyleSheet,
  Text,
} from 'react-native';
import t from 'tcomb-form-native'; // 0.6.9

const Form = t.form.Form;
const User = t.struct({
  name: t.String,
  email: t.String
});

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  //logout button
  //         <Button title="Logout this amazing App :)" onPress={this._signOutAsync} />

 handleSubmit = () => {
    // const value = this._form.getValue(); // use that ref to get the form value
    // console.log('value: ', value);
    console.log(1111)
    fetch('http://172.46.0.173:8888/profile/edit/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name : 'TEST 01',
          email : 'TEST 02'
        }),
        redirect: "/"
      }).then((body) => {
        this.props.navigation.navigate('Chat');

        console.log('user added', body)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Profile</Text>
        <Button title="TEST" onPress={this.handleSubmit} />
      
      
      </View>

    );
  }

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
