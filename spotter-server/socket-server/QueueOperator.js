class userQueueOperator {

  getUsersFromQueue() {
    return this.users;
  };

  addUserInfoQueue(usersQueue, data) {

    // userInfo.userInfo is userToken
    // Use it as key of our users queue
    usersQueue[data.userInfo] = {
      currentMusicData: data.currentMusicData,
      locationInfo: data.locationInfo
    }

    return usersQueue;
  };

  pairPeopleFromQueue(usersQueue, myName, socket) {

    console.log("usersQueue:");
    console.log(usersQueue);

    let myData = usersQueue[myName];

    console.log("myData:");
    console.log(myData);

    if (!myData || !usersQueue) {
      return;
    }

    let pairedObj = {}; //key: userToken

    let myAlbum  = myData.currentMusicData.album;
    let myArtist = myData.currentMusicData.artist;
    let mySong   = myData.currentMusicData.song;

    for (let user in usersQueue) {
      if (myName !== user) {

        console.log("user:", user);

        let distance = this.getDistanceFromLatLonInKm(
          myData.locationInfo.latitude, myData.locationInfo.longitude,
          usersQueue[user].locationInfo.latitude, usersQueue[user].locationInfo.longitude);
        console.log("Distance:" + distance + " KM");

        if (distance < 100) {
          let yourAlbum  = usersQueue[user].currentMusicData.album;
          let yourArtist = usersQueue[user].currentMusicData.artist;
          let yourSong   = usersQueue[user].currentMusicData.song;
          let cover      = usersQueue[user].currentMusicData.cover;

          if (mySong === yourSong) {
            console.log("You are listening the same song");
            return {
              matchPerson: user,
              matchType: "Song",
              matchContent: mySong,
              matchCover: cover
            };
          } else if (myAlbum === yourAlbum) {
            console.log("You are listening the same album");
            return {
              matchPerson: user,
              matchType: "Album",
              matchContent: myAlbum,
              matchCover: cover
            };
          } else if (myArtist === yourArtist) {
            console.log("You are listening the same artist");
            return {
              matchPerson: user,
              matchType: "Artist",
              matchContent: myArtist,
              matchCover: cover
            };
          } else {
            console.log("You just close. No similar music taste.");
          }
        }
      }
    }

    return null;
  };

  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
  };

  deg2rad(deg) {
    return deg * (Math.PI/180)
  };
}

module.exports = userQueueOperator;