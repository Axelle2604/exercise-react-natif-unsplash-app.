import React, { Component } from 'react';
import { ScrollView, Platform, StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components';
import ImgContainer from './components/ImgContainer';
import ImgProfile from './components/ImgProfile';
import UserProfile from './components/UserProfile';

import { createStackNavigator, createAppContainer } from 'react-navigation';


const AppNavigator = createStackNavigator(
  {
    Home: { screen: ImgContainer },
    Image: { screen: ImgProfile, path: 'images/:imageId' },
    User: { screen: UserProfile, path: 'users/:userId' },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: { headerTitle: <Text>Coucou</Text> },
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

const Title = styled(Text)`
  font-size: 20;
`;
