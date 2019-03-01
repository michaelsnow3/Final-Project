import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import FriendScreen from '../screens/FriendScreen';
import ChatScreen from '../screens/ChatScreen';
import MeetScreen from '../screens/MeetScreen';
import NearbyScreen from '../screens/NearbyScreen';
import ProfileScreen from '../screens/ProfileScreen';

const FriendStack = createStackNavigator({
  Friend: FriendScreen,
});

FriendStack.navigationOptions = {
  tabBarLabel: 'Friends',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'}
    />
  ),
};

const ChatStack = createStackNavigator({
  Chat: ChatScreen,
});

ChatStack.navigationOptions = {
  tabBarLabel: 'Chat',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-chatboxes' : 'md-chatboxes'}
    />
  ),
};

const MeetStack = createStackNavigator({
  Meet: MeetScreen,
});

MeetStack.navigationOptions = {
  tabBarLabel: 'Meet',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-musical-note' : 'md-musical-note'}
      //name={Platform.OS === 'ios' ? 'ios-person-add' : 'md-person-add'}
    />
  ),
};

const NearbyStack = createStackNavigator({
  Nearby: NearbyScreen,
});

NearbyStack.navigationOptions = {
  tabBarLabel: 'Nearby',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'}
    />
  ),
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Me',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
    />
  ),
};

export default createBottomTabNavigator({
  FriendStack,
  ChatStack,
  MeetStack,
  NearbyStack,
  ProfileStack
});
