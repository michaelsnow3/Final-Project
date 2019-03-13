import React from 'react';
import {
  View,
  Button,
  Image,
  StyleSheet,
  Text,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';

export default class OtherProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      my_id : null,
      friend: false,
      user_id : this.props.id,
      name : "",
      avatar : null,
      nodeServerUrl: null,
      favoriteSongs: null,
      favoriteArtists: null,
      favoriteGenres: null,
    }
    console.log(`id:${this.props.id},in OtherProfileScreen`);
  }
  static navigationOptions = {
    header: null,
  };
  
  componentDidMount() {
    this._getMyId();
    //this.props.navigation.addListener('willFocus', this._getMyId);
  }
  
  _getMyId = async () => {
    
    console.log(`execute _getMyId`);
    
    const userIdFromSpotify = await AsyncStorage.getItem('userIdFromSpotify');
    const nodeServerUrl     = await AsyncStorage.getItem('nodeServerUrl');
    this.setState({nodeServerUrl: nodeServerUrl});
    
    console.log("get my id url:", `${nodeServerUrl}/nearby/get_id/${userIdFromSpotify}`);
    
    fetch(`${nodeServerUrl}/nearby/get_id/${userIdFromSpotify}`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": 'application/json',   
        "Connection": "close",   
      }
    })
    .then((response) => response.json())
    .then((jsonData) => {
      if (jsonData.id !== undefined) {
        this.setState({my_id: jsonData.id});
        
        this.getUser(nodeServerUrl, this.props.name);
        //this.getFav();
        this.checkFriend(nodeServerUrl);
      }
    })
    .catch(function(error) {
      console.log('Problem with get my_id:', error);
      throw error;
    });
  };
  
  getUser = async (nodeServerUrl, username) => {
    
    console.log("get user url:", `${nodeServerUrl}/profile/user_info/${username}`);
    
    fetch(`${nodeServerUrl}/profile/user_info/${username}`)
    .then((response) => response.json())
    .then((jsonData) => {
      
      console.log("jsonData:");
      console.log(jsonData);
      
      this._setUserInfo(jsonData);
      this._setUserFav(jsonData);
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
  };
  
  _setUserInfo = (jsonData) => {
    if (jsonData.name) {
      this.setState({name: jsonData.name});
    }
    
    if (jsonData.avatar) {
      this.setState({avatar: jsonData.avatar});
    }
  };
  onlyUnique = (value, index, self) => { 
    return self.indexOf(value) === index;
  }
  _setUserFav = (jsonData) => {
    if (jsonData.favoriteGenres) {
      const favGenres = jsonData.favoriteGenres;
      let favGenresParsed = [];
      for (let i = 0; i < 5; i++) {
        if (favGenres[i]){ 
          favGenresParsed.push(favGenres[i])       
        } else {
          break;
        } 
      }
      const favGenresSorted = favGenresParsed.filter(this.onlyUnique)
      const top5Gen = favGenresSorted.join(', ')
      this.setState({favoriteGenres: top5Gen});
    }
    
    if (jsonData.favoriteArtists) {
      const favArtists = jsonData.favoriteArtists;
      let favAristsParsed = [];
      for (let i = 0; i < 5; i++) {
        if (favArtists[i]){
          favAristsParsed.push(favArtists[i])    
        } else {
          break;
        }
      }
      const favAristsSorted = favAristsParsed.filter(this.onlyUnique)
      const top5Art = favAristsSorted.join(', ')
      this.setState({favoriteArtists: top5Art});
    }
    
    if (jsonData.favoriteSongs) {
      const favSongs = jsonData.favoriteSongs;
      let favSongsParsed = [];
      for (let i = 0; i < 5; i++) {
        if (favSongs[i]){
          favSongsParsed.push(favSongs[i])    
        } else {
          break;
        }      
      }
      const favSongsSorted = favSongsParsed.filter(this.onlyUnique)
      const top5Songs = favSongsSorted.join(', ')
      this.setState({favoriteSongs: top5Songs});
    }
  }
  
  checkFriend = (nodeServerUrl) => {
    fetch(`${nodeServerUrl}/show_profile/friend_status`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id : this.state.my_id,
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
  
  addFriend = async () => {
    
    //await this._getMyId()
    
    console.log("url in addFriend:", `${this.state.nodeServerUrl}/show_profile/add_friend`);
    console.log("this.state.my_id:", this.state.my_id);
    console.log("this.state.user_id:", this.state.user_id);
    
    fetch(`${this.state.nodeServerUrl}/show_profile/add_friend`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id : this.state.my_id,
        friend_id : this.state.user_id
      }),
    })
    .then(() => {
      this.setState({friend : true}, async () => {
        if (this.props.getUserId) {
          await this.props.getUserId();
          this.props.handler(null, 'ShowFriends')
        }
      })
    })
    .catch((err) => {
      console.log(err);
    });
  }
  
  message = () => {
    this.props.navigation.navigate(`Chat`);
  }
  
  render() {
    
    const avatar = (this.state.avatar === null ) ?
    <Text style={styles.textStyle1}> No Image Available </Text> :
    <Image style={styles.imgStyle1} source={{uri: this.state.avatar}} />
    
    const addOrMsg = (this.state.friend) ?    
    (<TouchableOpacity onPress={this.message}>
      <Image style={styles.imgStyle2} source={require('../assets/images/message.jpg')} />
    </TouchableOpacity>) :
    
    (<TouchableOpacity onPress={this.addfriend}>
        <Image style={styles.imgStyle2} source={require('../assets/images/add_friend.jpg')} />
    </TouchableOpacity>)

    const backButton = (this.props.handleMeet)?
    (<TouchableOpacity onPress={() => {this.props.handleMeet('Meet')}} >
      <Image style={styles.imgStyle2} source={require('../assets/images/back_button.png')} />
    </TouchableOpacity>) :
    (<TouchableOpacity title="View Friends" onPress={() => {this.props.handler( null, 'ShowFriends')}}>
      <Image style={styles.imgStyle2} source={require('../assets/images/back_button.png')} />
    </TouchableOpacity>)
  
    const favoriteGenres = (this.state.favoriteGenres) ? 
    (<Text style={styles.textStyle2} numberOfLines={1}> Genres - {this.state.favoriteGenres}</Text>): 
    null
     
    const favoriteArtists = (this.state.favoriteArtists) ?
    (<Text style={styles.textStyle2} numberOfLines={1}> Artists - {this.state.favoriteArtists}</Text>):  
    null
    
    const favoriteSongs = (this.state.favoriteSongs) ? 
    (<Text style={styles.textStyle2} numberOfLines={1} > Songs - {this.state.favoriteSongs}</Text>):
    null
  
    const likes = (!this.state.favoriteGenres && !this.state.favoriteArtists && !this.state.favoriteSongs) ? 
    (<Text style={styles.textStyle1} adjustsFontSizeToFit={true} >No favorites yet</Text>) : 
    (<Text style={styles.textStyle1} adjustsFontSizeToFit={true} >Likes:</Text>)
    
    return (
      <View style={{flex : 1, flexDirection: 'column', justifyContent: 'space-between'}}> 
        <View style={{flex : 1, flexDirection: 'row', justifyContent: 'space-between'}} >
          {backButton}  
          <Text style={styles.textStyle1} adjustsFontSizeToFit={true} >
            {this.state.name}{'\n'}
          </Text>
          {addOrMsg}
        </View>
          <View style={{flex:1, justifyContent: "center", alignItems: "center"}} >
            {avatar}
          </View>
          <View style={{flex:1, flexDirection: "column",}}>
            {likes}
            {favoriteGenres}
            {favoriteArtists}
            {favoriteSongs}
          </View> 
      </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    textStyle1: {
      flex: 0.9,
      marginTop: 3,
      textAlign: 'center',
      fontSize: 34,
    }, 
    imgStyle1: {
      width: 180, 
      height: 180, 
      marginBottom: 100, 
      justifyContent: "center",
      alignItems: "center"
    }, 
    imgStyle2: {
      width: 45, 
      height: 45,
      margin: 5
    },
    textStyle2: {
      fontSize:22,
      marginBottom: 5
    },
  });
  