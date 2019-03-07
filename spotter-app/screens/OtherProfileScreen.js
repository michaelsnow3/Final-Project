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
      user_id : 4,//this.props.user_id,
      name : "A",
      avatar : "B",
      top3 : "C",
      primary_id : "3"
    }
  }

  // get primary user id from async storage????????????????????
  getPrimaryId = async () => {
    try {
      const value_id = await AsyncStorage.getItem('user_id');
      if (value_id !== null) {
        console.log(`Primary user id : ${value_id}`);
        return value_id;
      }
    } catch (error) { 
      console.log(error);
      }
  };
 
  getUser = async (user_id) => {
    console.log(user_id)
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
  }
    
    
    
    
    
  //   .then((data) => {
  //     console.log(data)
  //     const user = {
  //       name: data.name,
  //       avatar: data.avatar
  //     }
  //     cb(user);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }  

  // getFav = (user_id) => {
  //   fetch(`http://172.46.0.173:8888/show_profile/:${user_id}/fav`, {
  //     method: 'GET',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       id : user_id
  //     })
  //   }).then((data) => {
  //     console.log(data)
  //     const fav = {
  //       top3: data.top3
  //     }
  //     return fav;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }  

  checkFriend = (primary_id, user_id) => {
    fetch(`http://172.46.0.173:8888/show_profile/friend_status/:${primary_id}/:${user_id}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id : primary_id,
      friend_id : user_id
    }),
    })
    .then((data) => {
      console.log(data)
      // if access data element that is true of false, and then set that in the if statement
      // return data?this.setState({friend: true}):this.setState({friend: false});
    })
    .catch((err) => {
      console.log(err);
    });
  }

  addFriend = () => {
    fetch(`http://172.46.0.173:8888/show_profile/add_friend/:${primary_id}/:${user_id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id : primary_id,
        friend_id : user_id
      }),
      })
      .then(() => {
        console.log(`Primary user # ${primary_id} added a friend # ${user_id}`)
      })
      .catch((err) => {
        console.log(err);
      });
    this.props.navigation.navigate(`/show_profile/${this.user_id}`);
  }

  message = () => { 
    this.props.navigation.navigate(`/chat/`);
  }

  componentDidMount() {
    // console.log(this.getUser(this.state.user_id))
    

    this.getUser(4);
    // this.setState({
    //   name : this.getUser(this.state.user_id, function(user){
    //     console.log("Name :", user.name)
    //   }),
    //   avatar : "this.getUser(this.state.user_id).avatar",
    //   top3 : "getFav(this.state.user_id)",
    //   primary_id : "3"// this.getPrimaryId()
    // }) 

  }
//<Image source={this.state.avatar} />
  render() {
    console.log("RENDERS")

    const addOrMsg = (this.checkFriend(this.state.primary_id, this.state.user_id)) ?
            (<Button title="Message" onPress={this.message} />) :
            (<Button title="Add Friend" onPress={this.addFriend} />);

    return (
      <View style={styles}>
          
          <Text>
            {this.state.name}
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


