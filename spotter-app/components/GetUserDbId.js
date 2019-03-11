import React from 'react';
import { AsyncStorage } from 'react-native';

async function getUserDbId(userNameFromSpotify, nodeServerUrl) {

    console.log("url:", `${nodeServerUrl}/nearby/get_id/${userNameFromSpotify}`);
    return await fetch(`http://${nodeServerUrl}/nearby/get_id/${userNameFromSpotify}`);
}

export { getUserDbId }