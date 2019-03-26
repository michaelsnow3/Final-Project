# Spotter
 	Wouldn't it be cool, if you could listen to a song on Spotify, and then find someone else who is listening to the same artist, album or even song?<br/>
  	Wouldn't it be nice if you could chat with them? Maybe suggest a song or two?<br/>
  	Wouldn't it be awesome if you could find many others who share your musical tastes, and connect with them basing on your shared preferences?
  
#### You can with Spotter.
	Spotter solves the problem of a lack of social media features on Spotify. Although Spotify does integrate with Facebook and Twitter, it seems to provide little to no incentive to connect with others and meet new people. We solve this problem by providing these features within our App.<br/>
	Our users are able to login into the app with their Spotify account. They are be able to see their friends and their profiles within our system. Our two main features, Meet and Nearby, let users connect with others who share their musical tastes.<br/>
  	Firstly, the Nearby feature connects a user with one person. It would be a person that is in close physical proximity to user's current location, as determined by GPS. Connected users would need to be listening to a song on their Spotify, as the connection criteria takes into account the song and artist currently playing. The users can then view each others' profiles, and add one another as friends.<br/>
  	Once both users have friended each other, they can initiate a chat. The chat window will contain previous messages history (if there is any), as well as the suggested songs history.<br/>
	Suggest a song is a feature that allows a user to search for a song on Spotify through our app, and then send it as a link to another user via the chat window.<br/>
	Last but not least, our Meet feature provides a list of people that our user can view and connect with. We want to unite people who share similar musical taste, and hence our matching algorithm works solely on common musical preferences.<br/>
## Group Members
- [Yu-Ning Wang](https://github.com/wang790222)
- [Stan Solo](https://github.com/Stan-Solo)
- [Michael Snow](https://github.com/michaelsnow3)

## Built with
- Front-End: react-native
- Back-End: express, socket.io, Spotify API, postgres

## Final Product
!["Nearby feature"](https://github.com/michaelsnow3/Final-Project/blob/master/docs/Mar-18-2019%2013-24-02.gif?raw=true)
<br/>
!["Friends feature"](https://github.com/michaelsnow3/Final-Project/blob/master/docs/Mar-18-2019%2013-24-17.gif?raw=true)
<br/>
!["Chat feature"](https://github.com/michaelsnow3/Final-Project/blob/master/docs/Mar-18-2019%2013-23-31.gif?raw=true)
<br/>
!["Meet feature"](https://github.com/michaelsnow3/Final-Project/blob/master/docs/Mar-18-2019%2012-59-10.gif?raw=true)

## Dependencies
### Front-End
- react
- react-native
- react-native-cli
- react-native-elements
- react-native-loading-spinner-overlay
- react-native-webview
- react-navigation
- socket.io-client
- expo
- bluebird
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
- clone git repo then cd into Final-Project
- cd into spotter-app and run `npm install`
- In spotter-app run command `npm start` to start expo
- Scan QR code on mobile device to open app
- Login with Spotify account
