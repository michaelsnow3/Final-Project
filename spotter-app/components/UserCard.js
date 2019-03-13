import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image} from "react-native";

function UserCard({
  name,
  id,
  handler,
  page,
  setFriendName,
  handleChatWithFriend,
  friend,
  userId,
  url,
  fetchChatrooms,
  prevFriend
}) {

  let newLetterContainerStyle;

  if(page === 'ShowFriends') {
    newLetterContainerStyle = {
      backgroundColor: "#e8e8e8",
      borderBottomWidth: 1
    }
  }else {
    newLetterContainerStyle = {
      backgroundColor: "#e8e8e8",
      borderBottomWidth: 1
    }
  }

  let newLetter = false;
  let userCardStyle = styles.container
  if (
    !prevFriend ||
    name[0].toUpperCase() !== prevFriend.name[0].toUpperCase()
  ) {
    userCardStyle = [styles.container, { borderBottomWidth: 1 }]
    newLetter = (
      <View style={newLetterContainerStyle}>
        <Text style={styles.newLetterText}>{name[0].toUpperCase()}</Text>
      </View>
    );
  }

  if (page === "FriendRequests") {
    newLetter = false;
  }
  //set user profile picture
  let profilePicture = friend.avatar || 
    'data:image/jpeg;base64,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'

  let avatar = (
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={{
          uri: profilePicture
        }}
      />
    </View>
  )

  handler2 = () => {
    console.log(111111, "usercard", id);
    handler(id, "OtherProfileScreen");
  };
  async function startNewChat() {
    console.log("url startNewChat:", `${url}/chat/chatroom/create`);

    await fetch(`${url}/chat/chatroom/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: userId,
        friendId: id
      })
    })
      .then(data => {
        let chatroomId = JSON.parse(data._bodyInit).chatroomId;
        handleChatWithFriend(
          {
            name: friend.name,
            chatroomId: chatroomId
          },
          "showChat"
        );
      })
      .then(() => {
        fetchChatrooms();
      });
  }
  if (handleChatWithFriend) {
    handler2 = () => {
      startNewChat();
    };
  }

  if (setFriendName) {
    handler2 = () => {
      console.log(22222222, "usercard", id);
      setFriendName(name);
      handler(id, "OtherProfileScreen");
    };
  }
  
  return (
    <View>
      {newLetter}
      <TouchableOpacity style={styles.container} onPress={handler2}>
        {avatar}
        <Text style={styles.name}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 25,
    textAlignVertical: "center",
    marginLeft: 15
  },
  newLetterContainer: {
    backgroundColor: "#e8e8e8",
    borderBottomWidth: 1,
    borderTopWidth: 1
  },
  newLetterText: {
    fontSize: 20,
    paddingLeft: 15
  },
  imageContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 15,
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20
  }
});

export default UserCard;
