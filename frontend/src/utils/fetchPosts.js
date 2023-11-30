import axios from "axios";

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://a36e-169-232-110-172.ngrok-free.app/posts',
  headers: { 
    'ngrok-skip-browser-warning': 'true',
  }
};

export const fetchPosts = async ({searchTerm}) => {
  try {
    if(searchTerm === '') {
      console.log('reached here')
      console.log(searchTerm)
      const response = await axios.request(config);
      return response.data;
    }
    else {
      // query API with the search term
      console.log('reached here instead with: ', searchTerm)
      return;
    }
  } 
  catch (error) {
    console.log('Error:', error);
    return '';
  }
};
