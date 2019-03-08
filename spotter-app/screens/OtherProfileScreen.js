import React from 'react';
import {
  View,
  Button,
  Image,
  StyleSheet,
  Text,
} from 'react-native';
import {AsyncStorage} from 'react-native';

// receive id from props or ????
// fetch user info by id,
// get primary user id from async storage
// receive user avatar, name and top3 favourites 
// render user with info and display 

// button:
// if friend state = false
//   button = addfriend
// else 
//   button = messageFriend

// const primary_id = async storage user_id

// set user info in state, call functions in component did mount
// have two diffrent route names and routers
////////////// how to make 2 separate calls to the same route? have diff path names
//////////// have a list of all route paths

export default class OtherProfileScreen extends React.Component { 
  constructor() {
    super();
    this.state = {
      friend: false,
      user_id : 9,//this.props.user_id,
      name : "A",
      avatar : null,
      top3 : "C",
      primary_id : 3
    }
  }

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
 
  getUser = async (user_id) => {
    fetch(`http://172.46.0.173:8888/show_profile/info`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },  
      body: JSON.stringify({
        id : user_id 
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
  
  getFav = async (user_id) => {
    fetch(`http://172.46.0.173:8888/show_profile/fav`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id : user_id
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


// PARSING ERROR 
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
      (response._bodyText === 'true') ? this.setState({friend : true}) : this.setState({friend : false})
      // data ? this.setState({friend : true}) : this.setState({friend : false})
      // if access data element that is true of false, and then set that in the if statement
      // return data?this.setState({friend: true}):this.setState({friend: false});
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
        // this.setState({ state: this.state });
        console.log(`Primary user # ${this.state.primary_id} added a friend # ${this.state.user_id}`)
        this.setState({friend : true})
      })
      .catch((err) => {
        console.log(err);
      });
    // this.props.navigation.navigate(`/show_profile/${this.user_id}`);
  } 

  message = () => { 
    this.props.navigation.navigate(`/chat/`);  
  }

  componentDidMount() {    
    this.getUser(7);
    this.getFav(7);
    this.checkFriend()    
  }
  render() { 
    const addOrMsg = (this.state.friend) ?
    (<Button title="Message" onPress={this.message} />) :
    (<Button title="Add Friend" onPress={this.addFriend} />); 

    const avatar = (this.state.avatar === null ) ? 
    <Text> No Image </Text> : 
    <Image style={{width: 150, height: 150}} source={{uri: this.state.avatar}} />

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
      </View>
    );
  }
}

const styles = StyleSheet.create({

});


