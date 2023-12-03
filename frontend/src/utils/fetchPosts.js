import axios from "axios";

// this is only for default case
export const fetchPosts = async (username, authToken) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://api-m46o.onrender.com/posts/user/' + username,
    headers: { 
      'ngrok-skip-browser-warning': 'true',
      'Authorization': 'Bearer ' + authToken
    }
  };
  try {
    const response = await axios.request(config);
    return response.data;
  }
  catch (error) {
    console.log('Error:', error);
    return '';
  }
};
