import styled from 'styled-components';
import { accessKey, secretKey } from '../data/auth';
import axios from 'axios';

const baseUrl = 'https://api.unsplash.com/';
const clientId = `client_id=${accessKey}`;

export const getPhotos = async () => {
  const { data } = await axios.get(`${baseUrl}photos?page=1&${clientId}`);
  console.log(data);
  return data;
};

export const getUserProfile = async userId => {
  const { data } = await axios.get(`${baseUrl}users/${userId}`);
  console.log(data);
  return data;
};
