import axios from "axios";

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://a36e-169-232-110-172.ngrok-free.app/posts',
  headers: { 
    'ngrok-skip-browser-warning': 'true',
  }
};

export const fetchPosts = async () => {
  try {
    const response = await axios.request(config);
    return response.data;
  } 
  catch (error) {
    console.log('Error:', error);
    return '';
  }
};
