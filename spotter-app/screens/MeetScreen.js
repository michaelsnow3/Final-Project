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
} from 'react-native';
import OtherProfileScreen from './OtherProfileScreen.js';
import People from '../components/People';


export default class MeetScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id : 3,
      page : 'Greet',
      people : [],
      friend_id : null,
    }
  }
  static navigationOptions = {
    header: null,
  };

  meet = () => {
    this.setState({
      page: 'Meet'
    })
    fetch(`http://172.46.0.173:8888/meet/get`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',   
        'Content-Type': 'application/json',  
      },
      body: JSON.stringify({  
        user_id : this.state.user_id,
      }), 
      })   
      .then(data => { 
        // parsing received data, extracting required data
        let parsedData = JSON.parse(data._bodyInit)
        let newParsedData = []
        for (let user of parsedData) {
          let id = user.split(' ')[user.split(' ').length-1]
          let splitUser = user.split(' ')
          splitUser.pop();
          let name = splitUser.join(' ')
          let newUser = {
            id : "",
            name : ""
          }
          newUser.id = id
          newUser.name = name
          newParsedData.push(newUser)
        } 
        // need to accept in an array of people's names and ids (strecth: avatars)
        this.setState({  
          people : newParsedData
        })
      })
      .catch((err) => {
        console.log(err);  
      });
  }

  back = () => {
    this.setState ({
      page : 'Greet'
    })
  }

  handler = (friend_id, page) => {
    this.setState({
      friend_id : friend_id,
      page : page
    })
  }

  // page status 'meet' start with loading, on componentDidMount load everything

  componentDidMount() {

  }

  render() { 
 
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
          <ScrollView>
            <Button title="Back" onPress={this.back} />
            <People people={this.state.people} handler={this.handler} handleChatWithFriend={() => {}} />
          </ScrollView>
        )
      case 'OtherProfileScreen':
        return ( 
          <OtherProfileScreen 
          handler={this.handler}
          id={this.state.friend_id}
          navigation={this.props.navigation}
          handleChatWithFriend={() => {}} />
        )
    }
  }
}

const styles = StyleSheet.create({

});
