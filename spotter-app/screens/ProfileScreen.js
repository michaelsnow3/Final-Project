import React from 'react';
import {
  View,
  Button,
  AsyncStorage,
  StyleSheet,
  Text,
  TouchableOpacity,
  Form,
  TextInput,
  Alert,
} from 'react-native';

export default class ProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userToken: null,
      serverUrl: 'http://172.46.0.173:8888/',
      userId: null,
      email: null,
      favoriteGenres: [], 
      favoriteArtists: [],
      favoriteSongs: [], 
      favoriteType: "Genre",
      displayInfo: true,
      favoriteContent: ''
    };

    this._getUserInfo();
  }

  static navigationOptions = {
    header: null,
  };

  render() {

    const favoriteInfo = this._selectfavorite(this.state.favoriteType);
    const editOrDisplay = this._selectPageContent(favoriteInfo, this.state.favoriteType);
    const editTitle = `Add Favorite ${this.state.favoriteType}`;

    return (
      <View>
        <Button title={editTitle} onPress={this._editInfo} />
        {editOrDisplay}
        <Button title="Logout this amazing App :)" onPress={this._signOutAsync} />
      </View>
    );
  }

  _editInfo = () => {
    this.setState({displayInfo: !this.state.displayInfo});
  };

  _selectPageContent = (favoriteInfo, type) => {

    let addNewPlaceHolder = `New ${type}`;

    if (this.state.displayInfo) {
      return (
        <View style={styles.container}>
          <View>
            <Text>Id: {this.state.userId}</Text>
            <Text>Email: {this.state.email}</Text>
          </View>
          <View style={styles.favoriteBtn}>
            <TouchableOpacity style={{width: 100, height: 25, backgroundColor: 'powderblue'}} onPress={this._accessGenere}>
              <Text>Genre</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width: 100, height: 25, backgroundColor: 'skyblue'}} onPress={this._accessArtist}>
              <Text>Artist</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width: 100, height: 25, backgroundColor: 'steelblue'}} onPress={this._accessSong}>
              <Text>Song</Text>
            </TouchableOpacity>
          </View>
          {favoriteInfo}
        </View>
      );
    } else {
      return (
        <View style={styles.AddNewcontainer}>
          <TextInput style={
                       { width: 120,
                         borderColor: 'gray',
                         borderWidth: 1,
                       }
                     }
                     onChangeText={(text) => this.setState({favoriteContent: text})}
                     value={this.state.favoriteContent}
                     placeholder={addNewPlaceHolder} />
          <Button title='Submit' onPress={this._addNewValue} />
        </View>
      );
    }
  };

  _addNewValue = () => {
    console.log(this.state.favoriteContent);
    console.log(this.state.favoriteType);
    if (this.state.favoriteContent !== '') {

      let updateData = null;

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
        break;
      };

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
        if (this.state.favoriteGenres !== null) {
          let genreList = [];
          this.state.favoriteGenres.forEach(genre => {
            genreList.push(
              <Text key={genre} onLongPress={() =>
                Alert.alert('Delete Genre', genre,
                  [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                    {text: 'OK', onPress: () => this._deleteFavoriteItem("Genre", genre) },
                  ]
              )}>
                {genre}
              </Text>
            );
          });
          return genreList;
        }
        break;
      case "Artist":
        if (this.state.favoriteArtists !== null) {
          let artistList = [];
          this.state.favoriteArtists.forEach(artist => {
            artistList.push(
              <Text key={artist} onLongPress={() =>
                Alert.alert('Delete Artist', artist,
                  [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                    {text: 'OK', onPress: () => this._deleteFavoriteItem("Artist", artist)},
                  ]
              )}>
                {artist}
              </Text>
            );
          });
          return artistList;
        }
        break;
      case "Song":
        if (this.state.favoriteSongs !== null) {
          let songList = [];
          this.state.favoriteSongs.forEach(song => {
            songList.push(
              <Text key={song} onLongPress={() =>
                Alert.alert('Delete Song', song,
                  [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                    {text: 'OK', onPress: () => this._deleteFavoriteItem("Song", song)},
                  ]
              )}>
                {song}
              </Text>
            );
          });
          return songList;
        }
        break;
    };
  };

  _updateFavoriteDb = async (favoriteType, newData) => {

    fetch(`${this.state.serverUrl}/profile/edit/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: this.state.userId,
        type: favoriteType,
        favoriteData: newData
      }),
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

    const userToken = await AsyncStorage.getItem('userToken');
    this.setState({userToken: userToken});
    const serverUrl = await AsyncStorage.getItem('serverUrl');
    this.setState({serverUrl: serverUrl});

    fetch(`${serverUrl}/profile/user_info/${userToken}`, {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
     })
    .then((response) => response.json())
    .then((jsonData) => {
      console.log(jsonData);
      this.setState({userId: jsonData.name});
      this.setState({email: jsonData.email});
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
    });
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  favoriteBtn: {
    flex: 1,
    flexDirection: 'row',
    height: 25,
  },
  favoriteText: {
    backgroundColor: '#fff',
  },
  AddNewcontainer: {
    alignItems: 'center',
  },
});
