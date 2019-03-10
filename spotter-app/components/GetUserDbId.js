import React from 'react';
import { AsyncStorage } from 'react-native';

async function getUserDbId(userNameFromSpotify, nodeServerUrl) {
  try {

    console.log("url:", `${nodeServerUrl}/nearby/get_id/${userNameFromSpotify}`);
    const userUserDbId = await fetch(
      `http://${nodeServerUrl}/nearby/get_id/${userNameFromSpotify}`
    );
    return userUserDbId;
  } catch(error) {
    console.log('Problem with your get Id: ' + error.message);
    throw error;
  }
}

export { getUserDbId }