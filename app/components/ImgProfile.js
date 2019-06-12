import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Button,
  Linking,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components';

export default class ImgProfile extends Component {
  static navigationOptions = {
    headerTransparent: true,
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  getDownloadLink = async downloadLink => {
    try {
      if (Linking.canOpenURL(downloadLink)) {
        return await Linking.openURL(downloadLink);
      }
    } catch (e) {
      console.error(e);
    }
  };

  getUserPage = userId => {
    const { navigate } = this.props.navigation;
    navigate('User', { userId });
  };

  render() {
    const { height, width } = Dimensions.get('window');
    const {
      navigation: {
        state: {
          params: {
            item: {
              uri,
              user: { name, profileImage, instagram, id },
              download,
            },
          },
        },
      },
    } = this.props;
    console.log(profileImage);
    return (
      <Container>
        <Image
          source={{ uri }}
          style={{
            width,
            height,
          }}
        />
        <Overlay>
          <TouchableOpacity onPress={this.getUserPage.bind(null, id)}>
            <Image
              source={{ uri: profileImage }}
              style={{ width: 50, height: 50, borderRadius: 50 }}
            />
          </TouchableOpacity>
          <LegendContainer>
            <Legend>{name}</Legend>
            <Legend>{instagram}</Legend>
          </LegendContainer>
          <Button
            title="get it!"
            color="#2ecc71"
            onPress={this.getDownloadLink.bind(null, download)}
          />
        </Overlay>
      </Container>
    );
  }
}

const Container = styled(View)`
  position: relative;
  justify-content: flex-end;
`;

const Overlay = styled(View)`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 15px;
  width: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const LegendContainer = styled(View)`
  align-items: center;
`;

const Legend = styled(Text)`
  color: white;
`;
