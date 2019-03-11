import React from 'react';
import {
  View,
  Button,
  Image,
  StyleSheet,
  Text,
} from 'react-native';

export default class OtherProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friend: false,
      user_id : this.props.id,
      name : "",
      avatar : null,
      top3 : "",
      primary_id : 5
    }
  }
  static navigationOptions = {
    header: null,
  };

  // get primary user id from async storage????????????????????
  // getPrimaryId = async () => {
  //   try {
  //     const value_id = await AsyncStorage.getItem('user_id');
  //     if (value_id !== null) {
  //       console.log(`Primary user id : ${value_id}`);
  //       return value_id;
  //     }
  //   } catch (error) { 
  //     console.log(error);
  //     }
  // };

  setUserId = (id, cb) =>  { 
    this.setState({
      user_id: id
    }, cb)
  }

  getUser = async () => {
    fetch(`http://172.46.0.173:8888/show_profile/info`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },  
      body: JSON.stringify({
        id : this.state.user_id 
      })  
    })
    .then(data => data.json()) 
    .then(json => { 
      this.setState({  
        name : json.name,
        avatar : json.avatar   
      }) 
    })
    .catch((err) => {
      console.log(err);
    });    
  } 
  
  getFav = async () => {
    fetch(`http://172.46.0.173:8888/show_profile/fav`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id : this.state.user_id
      })
    })
    .then((data) => data.json())
    .then(json => {
      const songNames = [];
      json.forEach(entry => {
        songNames.push(entry.name)
      }) 
      top3 = songNames.join("\r\n");
      this.setState({
        top3: top3
      })
    })
    .catch((err) => {
      console.log(err);
    });
  }  

  checkFriend = () => {
    fetch(`http://172.46.0.173:8888/show_profile/friend_status`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }, 
    body: JSON.stringify({
      user_id : this.state.primary_id, 
      friend_id : this.state.user_id
    }),  
    })   
    .then((response) => { 
      (response._bodyText === 'true') ? this.setState({friend : true}) : this.setState({friend : false});
    })  
    .catch((err) => {
      console.log(err);  
    });   
  }  
 
  addFriend = () => {
    fetch(`http://172.46.0.173:8888/show_profile/add_friend`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',  
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({
        user_id : this.state.primary_id,
        friend_id : this.state.user_id
      }),
      })  
      .then(() => {
        this.setState({friend : true})
      })
      .catch((err) => {
        console.log(err); 
      });
  } 
  
  message = () => { 
    this.props.navigation.navigate(`Chat`);  
  }
  
  componentDidMount() {    
    // this.setPrimaryUserId()
    /////////// Set User should acquire ID from props or async storage
    this.setUserId(this.state.user_id, function() {
      this.getUser();
      this.getFav();
      this.checkFriend();
    })
  } 
  render() { 
    const addOrMsg = (this.state.friend) ?
    (<Button title="Message" onPress={this.message} style={styles.container}/>) :
    (<Button title="Add Friend" onPress={this.addFriend} style={styles.container}/>); 

    const avatar = (this.state.avatar === null ) ? 
    <Text> No Image </Text> : 
    <Image style={{width: 180, height: 180}} source={{uri: this.state.avatar}} />

    return ( 
      <View> 
        {avatar} 
        <Text>
          {this.state.name}
        </Text> 
        <Text>
          Top 3 Favourite Songs:
        </Text>
        <Text>
          {this.state.top3}
        </Text>
        {addOrMsg}
        <Button title="View Friends" 
                onPress={() => {this.props.handler( null, 'ShowFriends')}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    marginTop: 40,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
});
