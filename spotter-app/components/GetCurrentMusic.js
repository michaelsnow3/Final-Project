import React from 'react';
import { AsyncStorage } from 'react-native';

async function getCurrentMusic() {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    const userCurrentMusic = await fetch(`https://api.spotify.com/v1/me/player/`, {
       method: 'GET',
       headers: {
        'Authorization': "Bearer " + userToken
      }
    });

    return userCurrentMusic;
  } catch(error) {
    console.log('Problem with your fetch operation: ' + error.message);
    throw error;
  }
}

export { getCurrentMusic }