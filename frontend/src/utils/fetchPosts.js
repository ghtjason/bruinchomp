import axios from "axios";
import { proxy_server } from "./constants";

export const fetchPosts = async (username, authToken) => {
  let config = {
    method: 'get',
    url: `${proxy_server}/posts/user/${username}`,
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
