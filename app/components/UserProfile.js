import React, { Component } from 'react';
import { Text } from 'react-native';
import { getUserProfile } from '../services/apiCalls';

export default class UserProfile extends Component {
  static navigationOptions = {
    headerTransparent: true,
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  state = {
    user: [],
    isLoading: true,
  };

  componentDidMount = () => {
    this.fetchUserProfileFromAPIToLocalStorage();
    this._retrieveData();
  };

  fetchUserProfileFromAPIToLocalStorage = async () => {
    try {
      const user = await getUserProfile();
      this._storeData(user);
    } catch (e) {
      console.error(e);
    }
  };

  _storeData = async data => {
    try {
      if (data) {
        return await AsyncStorage.setItem('user', JSON.stringify(data));
      }
    } catch (e) {
      console.error(e);
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        this.setState({ user: JSON.parse(value), isLoading: false });
      }
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const { isLoading, user } = this.state;
    const {
      navigation: {
        state: {
          params: { userId },
        },
      },
    } = this.props;
    const loader = isLoading && <Text>Loading</Text>;
    const userProfile = !isLoading && <Text>UserProfile</Text>;
    return <Text>{loader || userProfile}</Text>;
  }
}
