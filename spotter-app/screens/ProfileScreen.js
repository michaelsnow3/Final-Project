
import React from 'react';
import {
  View,
  AsyncStorage,
  StyleSheet,
  Text,
  TouchableOpacity,
  Form,
  TextInput,
  Alert,
  TouchableHighlight,
  Image,
  ScrollView
} from 'react-native';

export default class ProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userToken: null,
      nodeServerUrl: null,
      socketServerUrl: null,
      userIdFromSpotify: null,
      email: null,
      favoriteGenres: [],
      favoriteArtists: [],
      favoriteSongs: [],
      favoriteType: "Genre",
      displayInfo: true,
      favoriteContent: '',
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('willFocus', this._getUserInfo);
  }

  static navigationOptions = {
    header: null,
  };

  render() {

    const favoriteInfo = this._selectfavorite(this.state.favoriteType);
    const editOrDisplay = this._selectPageContent(favoriteInfo, this.state.favoriteType);
    const editTitle = (this.state.displayInfo) ?
    (`Add Favorite ${this.state.favoriteType}`) :
    (`Go Back`);
    let profilePic = (this.state.avatar) ?
      (<Image style={{justifyContent: 'center',alignItems: 'center',width: 175, height: 175,}} source={{uri: this.state.avatar}}/>) :
      (<Image style={{justifyContent: 'center',alignItems: 'center',width: 175, height: 175,}} source={{uri: "data:image/jpeg;base64,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"}} />);

    return (
      <View style={{alignItems: 'center',}}>
        <View style={{flexDirection: 'row',}}>
          <Text style={{fontSize: 50,textAlign: 'center',}}>Profile</Text>
          <TouchableHighlight
            style={{position: 'relative', left:88, top:6}}
            onPress={this._signOutAsync}>
            <Image
              style={{width: 50, height: 50}}
              source={{uri: "https://cdn2.iconfinder.com/data/icons/picons-essentials/57/logout-512.png"}}
            />
          </TouchableHighlight>
        </View>
        {profilePic}
        <View style={{alignItems:'flex-start'}}>
          <Text style={
              {
                fontSize: 20,

              }
            }
            >
              Id: {this.state.userIdFromSpotify}
            </Text>
            <Text style={
              {
                fontSize: 20,
               }
             }
            >
            Email: {this.state.email}
          </Text>
        </View>
        <Text></Text>
        {editOrDisplay}
        <Text></Text>
        <TouchableOpacity
          style={
            {
              backgroundColor: 'white',
              width: 200,
              height: 30,
              justifyContent: 'center',
              alignItems:'center',
              borderRadius:10,
              borderWidth:2,
            }
          }
          onPress={this._editInfo}>
          <Text style={{fontSize:20,color:'black',fontWeight: 'bold'}}>
            {editTitle}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  _editInfo = () => {
    this.setState({displayInfo: !this.state.displayInfo});
  };

  _selectPageContent = (favoriteInfo, type) => {

    let addNewPlaceHolder = `New ${type}`;

    if (this.state.displayInfo) {

      let contentGenre  = null;
      let contentArtist = null;
      let contentSong   = null;

      let opacityGenre  = 0.3;
      let opacityArtist = 0.3;
      let opacitySong   = 0.3;

      switch (type) {
        case "Genre":
          contentGenre  = favoriteInfo;
          opacityGenre  = 1;
          opacityArtist = 0.3;
          opacitySong   = 0.3;
          break;
        case "Artist":
          contentArtist = favoriteInfo;
          opacityGenre  = 0.3;
          opacityArtist = 1;
          opacitySong   = 0.3;
          break;
        case "Song":
          contentSong   = favoriteInfo;
          opacityGenre  = 0.3;
          opacityArtist = 0.3;
          opacitySong   = 1;
          break;
      };

      return (
      <View style={{flexDirection: 'row',}}>
        <View style={{width:130, flexDirection: 'column',alignItems:'center',opacity: opacityGenre}}>
          <TouchableOpacity
            style={{
             borderRadius:10,
             borderColor: "transparent",
             alignItems:'center',
             justifyContent:'center',
             width:100,
             height:30,
             backgroundColor:'powderblue',
           }}
            onPress={this._accessGenere}>
            <Text style={{fontSize:20,color:'black'}}>Genre</Text>
          </TouchableOpacity>
          {contentGenre}
        </View>
        <View style={{width:130, flexDirection: 'column',alignItems:'center',opacity: opacityArtist}}>
          <TouchableOpacity
            style={{
             borderRadius:10,
             borderColor: "transparent",
             alignItems:'center',
             justifyContent:'center',
             width:100,
             height:30,
             backgroundColor:'steelblue',
           }}
            onPress={this._accessArtist}>
            <Text style={{fontSize:20,color:'black'}}>Artist</Text>
          </TouchableOpacity>
          {contentArtist}
        </View>
        <View style={{width:130, flexDirection: 'column',alignItems:'center',opacity: opacitySong}}>
          <TouchableOpacity
            style={{
             borderRadius:10,
             borderColor: "transparent",
             alignItems:'center',
             justifyContent:'center',
             width:100,
             height:30,
             backgroundColor:'steelblue',
           }}
            onPress={this._accessSong}>
            <Text style={{fontSize:20,color:'black'}}>Song</Text>
          </TouchableOpacity>
          {contentSong}
        </View>
      </View>
      );
    } else {
      return (
        <View>
          <Text></Text>
          <View style={{flexDirection: 'row',}}>
            <TextInput style={
              {
                width: 125,
                height: 30,
                borderColor: 'gray',
                borderWidth: 1,
              }
            }
              onChangeText={(text) => this.setState({favoriteContent: text})}
              value={this.state.favoriteContent}
              placeholder={addNewPlaceHolder} />
            <Text>   </Text>
            <TouchableOpacity
              style={
                {
                  borderRadius:10,
                  borderWidth:1,
                  width: 50,
                  justifyContent: 'center',
                  alignItems: 'center'
                }
              }
              onPress={this._addNewValue}>
              <Text style={{fontSize:12,}}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  _addNewValue = () => {
    console.log(this.state.favoriteContent);
    console.log(this.state.favoriteType);
    if (this.state.favoriteContent !== '') {
      let updateData = null;

      console.log("before switch:");

      switch (this.state.favoriteType) {
        case "Genre":
          updateData = this.state.favoriteGenres;
          updateData.push(this.state.favoriteContent);
          this.setState({favoriteGenres: updateData});
          break;
        case "Artist":
          updateData = this.state.favoriteArtists;
          updateData.push(this.state.favoriteContent);
          this.setState({favoriteArtists: updateData});
          break;
        case "Song":
          updateData = this.state.favoriteSongs;
          updateData.push(this.state.favoriteContent);
          this.setState({favoriteSongs: updateData});
          break;
      }

      console.log("updateData:");
      console.log(updateData);

      this._updateFavoriteDb(this.state.favoriteType, updateData);
      this.setState({favoriteContent: ''});
      this._editInfo();
    }
  };

  _selectfavorite = (type) => {
    switch (type) {
      case "Genre":
        return (
          <ScrollView style={{height:150}}>
           {
            this.state.favoriteGenres.map((item, index) => (
              <View key = {index}>
                <Text
                  style={{fontSize:20}}
                  onLongPress={() => Alert.alert(
                    'Delete Genre',
                    item,
                    [
                      {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                      {text: 'OK', onPress: () => this._deleteFavoriteItem("Genre", item)},
                    ]
                  )}
                >
                {item}
                </Text>
              </View>
            ))
           }
          </ScrollView>
        );
      case "Artist":
        return (
          <ScrollView style={{height:150}}>
           {
            this.state.favoriteArtists.map((item, index) => (
               <View key = {index}>
                <Text
                  style={{fontSize:20}}
                  onLongPress={() => Alert.alert(
                    'Delete Artist',
                    item,
                    [
                      {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                      {text: 'OK', onPress: () => this._deleteFavoriteItem("Artist", item)},
                    ]
                  )}
                >
                {item}
                </Text>
              </View>
            ))
           }
          </ScrollView>
        );
      case "Song":
        return (
          <ScrollView style={{height:150}}>
           {
            this.state.favoriteSongs.map((item, index) => (
              <View key = {index}>
                <Text
                  style={{fontSize:20,}}
                  onLongPress={() => Alert.alert(
                    'Delete Song',
                    item,
                    [
                      {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                      {text: 'OK', onPress: () => this._deleteFavoriteItem("Song", item)},
                    ]
                  )}
                >
                {item}
                </Text>
              </View>
            ))
           }
          </ScrollView>
        );
    };
  };

  _updateFavoriteDb = async (favoriteType, newData) => {

    fetch(`${this.state.nodeServerUrl}/profile/edit/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: this.state.userIdFromSpotify,
        type: favoriteType,
        favoriteData: newData
      }),
    }).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
      this._signOutAsync();
    });
  };

  _deleteFavoriteItem = (favoriteType, item) => {
    let index = -1;
    switch (favoriteType) {
      case "Genre":
        let newFavoriteGenres = [];
        this.state.favoriteGenres.map((genre) => {
          if (genre !== item) {
            newFavoriteGenres.push(genre);
          }
        });

        this._updateFavoriteDb("Genre", newFavoriteGenres);
        this.setState({favoriteGenres: newFavoriteGenres})
        break;
      case "Artist":
        let newFavoriteArtists = [];
        this.state.favoriteArtists.map((artist) => {
          if (artist !== item) {
            newFavoriteArtists.push(artist);
          }
        });

        this._updateFavoriteDb("Artist", newFavoriteArtists);
        this.setState({favoriteArtists: newFavoriteArtists})
        break;
      case "Song":
        let newFavoriteSongs = [];
        this.state.favoriteSongs.map((song) => {
          if (song !== item) {
            newFavoriteSongs.push(song);
          }
        });

        this._updateFavoriteDb("Song", newFavoriteSongs);
        this.setState({favoriteSongs: newFavoriteSongs})
        break;
      break;
    };
  };

  _accessGenere = () => {
    this.setState({favoriteType: "Genre"});
  };

  _accessArtist = () => {
    this.setState({favoriteType: "Artist"});
  };

  _accessSong = () => {
    this.setState({favoriteType: "Song"});
  };

  _getUserInfo = async () => {

    const email               = await AsyncStorage.getItem('email');
    const userToken           = await AsyncStorage.getItem('userToken');
    const userIdFromSpotify   = await AsyncStorage.getItem('userIdFromSpotify');
    const nodeServerUrl       = await AsyncStorage.getItem('nodeServerUrl');
    const socketServerUrl     = await AsyncStorage.getItem('socketServerUrl');

    this.setState({email: email});
    this.setState({userToken: userToken});
    this.setState({userIdFromSpotify: userIdFromSpotify});
    this.setState({nodeServerUrl: nodeServerUrl});
    this.setState({socketServerUrl: socketServerUrl});

    fetch(`${nodeServerUrl}/profile/user_info/${userIdFromSpotify}`, {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
     })
    .then((response) => response.json())
    .then((jsonData) => {

      if (jsonData.avatar) {
        this.setState({avatar: jsonData.avatar});
      }

      if (jsonData.favoriteGenres) {
        this.setState({favoriteGenres: jsonData.favoriteGenres});
      }

      if (jsonData.favoriteArtists) {
        this.setState({favoriteArtists: jsonData.favoriteArtists});
      }

      if (jsonData.favoriteSongs) {
        this.setState({favoriteSongs: jsonData.favoriteSongs});
      }
    })
    .catch((error) => {
      console.error(error);
      this._signOutAsync();
    });
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('AuthLoading');
  };
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 5,
  }
});