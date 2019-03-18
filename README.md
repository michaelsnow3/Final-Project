# Spotter
Spotter provides an enhanced social network for Spotify. Users can login with
their spotify account, meet others who share their musical taste, find nearby 
people who are currently listening to the same music, chat with one another, and suggest music to friends.

## Built with
- Front-End: react-native
- Back-End: express, socket.io, Spotify API, postgres

## Dependencies
### Front-End
- bluebird
- expo
- react
- react-native
- react-native-cli
- react-native-elements
- react-native-loading-spinner-overlay
- react-native-webview
- react-navigation
- socket.io-client
### Back-End
- algorithmia
- body-parser
- cookie-parser
- cors
- dotenv
- express
- knex
- pg
- querystring
- request
- request-promise
- socket.io
- uuid

## Getting Started
- install expo app on mobile device
- cd into spotter-app and run `npm install`
- cd into spotter-server and run `npm install`
- In spotter-server run command `node socket-server/socket-server.js`
- In spotter-app run command `npm start` to start expo
- Scan QR code on mobile device to open app
