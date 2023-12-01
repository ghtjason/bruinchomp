import axios from "axios";
import { auth_token } from "./constants";


export const fetchPosts = async (searchTerm) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://api-m46o.onrender.com/posts',
    headers: { 
      'ngrok-skip-browser-warning': 'true',
      'Authorization': auth_token
    }
  };
  try {
    if(searchTerm === '') {
      const response = await axios.request(config);
      return response.data;
    }
    else {
      // query API with the search term
      const response = await axios.request(config);
      console.log('reached here instead with: ', searchTerm)
      return response.data;
    }
  } 
  catch (error) {
    console.log('Error:', error);
    return '';
  }
};
