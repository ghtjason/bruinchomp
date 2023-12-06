import axios from "axios";
import { fetchUserInfo } from '../utils/fetchUserInfo'

export const fetchPosts = async (username, authToken) => {
  let config = {
    method: 'get',
    url: 'https://api-m46o.onrender.com/posts/user/' + username,
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + authToken
    }
  };
  console.log(config.url);
  try {
    const response = await axios.request(config);
    return response.data;
  }
  catch (error) {
    console.log('Error:', error);
    return false;
  } 
};
