import React, { Component, Fragment } from 'react';
import { Text, AsyncStorage, View } from 'react-native';
import MasonryList from 'react-native-masonry-list';
import { getPhotos } from '../services/apiCalls';
import styled from 'styled-components';

export default class ImgContainer extends Component {
  static navigationOptions = {
    title: 'Trending',
    headerStyle: {
      backgroundColor: 'fff',
      height: 50,
    },
    headerTintColor: '#2c3e50',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerTitleContainerStyle: {
      marginHorizontal: 65,
    },
    headerRight: <Text />,
    headerLeft: <Text />,
  };

  state = {
    photos: [],
    isLoading: true,
  };

  componentDidMount = () => {
    this.fetchPhotosFromAPIToLocalStorage();
    this._retrieveData();
  };

  fetchPhotosFromAPIToLocalStorage = async () => {
    try {
      const photos = await getPhotos();
      this._storeData(photos);
    } catch (e) {
      console.error(e);
    }
  };

  _storeData = async data => {
    try {
      if (data) {
        return await AsyncStorage.setItem('images', JSON.stringify(data));
      }
    } catch (e) {
      console.error(e);
    }
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('images');
      if (value !== null) {
        this.setState({ photos: JSON.parse(value), isLoading: false });
      }
    } catch (e) {
      console.error(e);
    }
  };

  onPressThumbImage = (item, index) => {
    const { navigate } = this.props.navigation;
    navigate('Image', { imageId: index, item });
  };

  render() {
    const { isLoading, photos } = this.state;
    const loader = isLoading && <Text>Loading</Text>;
    const photosContainer = !isLoading && (
      <MasonryList
        images={photos.map(
          ({
            urls: { thumb, regular },
            user: {
              name,
              profile_image: { medium },
              instagram_username,
              id,
            },
            links: { download },
          }) => ({
            uri: regular,
            user: {
              name,
              profileImage: medium,
              instagram: instagram_username,
              id,
            },
            download: download,
          })
        )}
        columns={3}
        spacing={1}
        onPressImage={this.onPressThumbImage}
      />
    );
    return <Fragment>{loader || photosContainer}</Fragment>;
  }
}

const AppBackground = styled(View)`
  background-color: #27ae60;
`;
